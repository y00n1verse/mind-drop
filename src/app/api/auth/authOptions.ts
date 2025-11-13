import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text', placeholder: '이메일 입력' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return { id: user.id.toString(), email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: 'jwt' },
  pages: { signIn: '/signin' },

  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;

      const provider = account.provider;
      const providerId = account.providerAccountId;

      let existingUser = await prisma.user.findUnique({
        where: { providerId },
      });

      if (!existingUser && user.email) {
        existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
      }

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name ?? '',
            image: user.image ?? '',
            provider,
            providerId,
          },
        });
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user?.nickname) {
        token.nickname = session.user.nickname;
      }

      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          token.id = dbUser.id.toString();
          token.nickname = dbUser.nickname ?? '';
          token.hasPassword = !!dbUser.password;
          token.provider = dbUser.provider ?? 'credentials';
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token?.id) {
        session.user.id = token.id;
        session.user.nickname = token.nickname ?? '';
        session.user.hasPassword = token.hasPassword;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};

import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text', placeholder: '이메일 입력' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        return { id: user.id, email: user.email };
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
      const providerId = account.providerAccountId ?? null;
      const email = user.email ?? null;

      let existingUser: any = null;
      if (providerId) {
        existingUser = await prisma.user.findUnique({
          where: { providerId },
        });
      }

      if (!existingUser && email) {
        existingUser = await prisma.user.findUnique({
          where: { email },
        });
      }

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: email ?? undefined,
            name: user.name ?? '',
            image: user.image ?? '',
            provider,
            providerId: providerId ?? undefined,
          },
        });
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        const dbUser = await prisma.user.findFirst({
          where: {
            OR: [
              { providerId: account.providerAccountId ?? undefined },
              { email: user.email ?? undefined },
            ],
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.nickname = dbUser.nickname;
          token.provider = dbUser.provider;
          token.providerId = dbUser.providerId;
          token.hasPassword = !!dbUser.password;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.email = token.email ?? null;
        session.user.nickname = token.nickname ?? null;
        session.user.provider = token.provider ?? null;
        session.user.providerId = token.providerId ?? null;
        session.user.hasPassword = token.hasPassword ?? false;
      }
      return session;
    },
  },
};

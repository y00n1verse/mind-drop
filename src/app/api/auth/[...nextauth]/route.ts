import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text', placeholder: '이메일 입력' },
        password: {
          label: '비밀번호',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          console.error('이메일 또는 비밀번호가 입력되지 않았습니다.');
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.error('존재하지 않는 유저입니다.');
          return null;
        }

        if (!user.password) {
          console.error('비밀번호가 지정되어 있지 않은 계정입니다.');
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          console.error('비밀번호가 유효하지 않습니다.');
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
        };
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

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider && user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? '',
              image: user.image ?? '',
              provider: account.provider,
            },
          });
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        token.id = dbUser ? dbUser.id.toString() : (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: { signIn: '/signin' },
});

export { handler as GET, handler as POST };

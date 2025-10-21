import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
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
  ],

  session: {
    strategy: 'jwt',
  },

  pages: { signIn: '/signin' },
});

export { handler as GET, handler as POST };

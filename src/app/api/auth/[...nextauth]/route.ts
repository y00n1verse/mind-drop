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
      async authorize(credentials, req) {
        const { email, password } = credentials ?? {};

        // 테스트용 로그인
        if (email === 'test@example.com' && password === '1234') {
          return { id: '1', name: '홍지윤', email };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: { signIn: '/login' },
});

export { handler as GET, handler as POST };

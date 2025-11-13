import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      nickname?: string | null;
      image?: string | null;
      hasPassword?: boolean;
      provider?: string;
      providerId?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string | null;
    hasPassword?: boolean;
    provider?: string;
    providerId?: string | null;
    nickname?: string | null;
  }
}

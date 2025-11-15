import SignupForm from './SignupForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <SignupForm />;
}

import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    );
  }

  const { currentPassword, newPassword } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json(
      { message: '유저를 찾을 수 없습니다.' },
      { status: 404 },
    );
  }

  if (!user.password) {
    return NextResponse.json(
      { message: '소셜 로그인 유저는 비밀번호를 변경할 수 없습니다.' },
      { status: 400 },
    );
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json(
      { message: '현재 비밀번호가 올바르지 않아요.' },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashed },
  });

  return NextResponse.json({
    message: '비밀번호가 변경되었습니다.',
  });
}

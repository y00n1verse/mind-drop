import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/authOptions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json(
      { message: '로그인이 필요해요.' },
      { status: 401 },
    );

  const { nickname } = await req.json();

  if (!nickname || typeof nickname !== 'string' || !nickname.trim()) {
    return NextResponse.json(
      { message: '닉네임을 입력해주세요.' },
      { status: 400 },
    );
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { nickname: nickname.trim() },
    });

    return NextResponse.json({ message: '닉네임이 변경되었어요.' });
  } catch {
    return NextResponse.json(
      { message: '닉네임 변경 중 오류가 발생했어요.' },
      { status: 500 },
    );
  }
}

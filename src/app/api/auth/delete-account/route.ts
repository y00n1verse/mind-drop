import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/authOptions';

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: '인증되지 않은 요청입니다' },
      { status: 401 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    await prisma.$transaction([
      prisma.diary.deleteMany({ where: { userId: user.id } }),
      prisma.user.delete({ where: { id: user.id } }),
    ]);

    return NextResponse.json({
      message: '회원 탈퇴 및 모든 일기 데이터가 삭제되었습니다.',
    });
  } catch (error) {
    console.error('[DELETE_ACCOUNT]', error);
    return NextResponse.json(
      { error: '회원 탈퇴 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

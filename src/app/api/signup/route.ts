import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, nickname } = await request.json();

    const { default: prisma } = await import('@/lib/prisma');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, nickname },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('회원가입 실패:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

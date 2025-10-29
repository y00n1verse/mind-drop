import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

async function requireUser() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    throw NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }
  return userId;
}

const res = <T>(data: T, status = 200) => NextResponse.json(data, { status });

export async function GET(req: Request) {
  try {
    const userId = await requireUser();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (date) {
      const diary = await prisma.diary.findUnique({
        where: { userId_date: { userId, date } },
      });
      if (!diary)
        return res({ error: '해당 날짜에 일기가 존재하지 않습니다.' }, 404);
      return res(diary);
    }

    const diaries = await prisma.diary.findMany({
      where: { userId },
      select: { date: true, title: true, emotion: true, createdAt: true },
    });

    return res(diaries);
  } catch (e) {
    if (e instanceof Response) return e;
    console.error('GET', e);
    return res({ error: '일기를 가져오는 중 오류가 발생했습니다.' }, 500);
  }
}

export async function POST(req: Request) {
  try {
    const userId = await requireUser();
    const body = await req.json();
    const diary = await prisma.diary.create({ data: { ...body, userId } });
    return res(diary, 201);
  } catch (e) {
    if (e instanceof Response) return e;
    console.error('POST', e);
    return res({ error: '일기를 추가하는 중 오류가 발생했습니다.' }, 500);
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await requireUser();
    const { date, title, content, emotion } = await req.json();
    if (!date) return res({ error: '날짜가 존재하지 않습니다.' }, 400);

    const diary = await prisma.diary.update({
      where: { userId_date: { userId, date } },
      data: { title, content, emotion },
    });

    return res(diary);
  } catch (e) {
    if (e instanceof Response) return e;
    console.error('PUT', e);
    return res({ error: '일기를 수정하는 중 오류가 발생했습니다.' }, 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await requireUser();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    if (!date) return res({ error: '날짜가 존재하지 않습니다.' }, 400);

    await prisma.diary.delete({ where: { userId_date: { userId, date } } });
    return res({ message: '일기가 삭제되었습니다.' });
  } catch (e) {
    if (e instanceof Response) return e;
    console.error('DELETE', e);
    return res({ error: '일기를 삭제하는 중 오류가 발생했습니다.' }, 500);
  }
}

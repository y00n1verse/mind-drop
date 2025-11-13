'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import MindDropText from '@/assets/icons/MindDropText.svg';
import { useTranslation } from 'react-i18next';
import useI18nReady from '@/app/hooks/useI18nReady';
import { Dropdown } from '../common/Dropdown/Dropdown';
import { DropdownTrigger } from '../common/Dropdown/DropdownTrigger';
import { DropdownList } from '../common/Dropdown/DropdownList';
import { DropdownItem } from '../common/Dropdown/DropdownItem';
import { House, Calendar, Globe, ChartColumn, UserRound } from 'lucide-react';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const ready = useI18nReady();
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!ready) return null;

  const isLoggedIn = !!session?.user;

  const navMenu = [
    { href: '/', label: t('nav.main'), Icon: House },
    { href: '/calendar', label: t('nav.calendar'), Icon: Calendar },
    { href: '/report', label: t('nav.report'), Icon: ChartColumn },
  ];

  const changeLanguage = (lang: string) => i18n.changeLanguage(lang);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 hidden w-full bg-[color:var(--background-tertiary)] md:block">
        <div className="mx-auto flex h-16 max-w-480 items-center justify-between px-8">
          <Link href="/" className="flex min-w-50 items-center">
            <MindDropText className="h-8 w-auto" />
          </Link>

          {isLoggedIn && (
            <div className="flex items-center space-x-8">
              {navMenu.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 text-base transition-colors ${
                    pathname === href
                      ? 'text-[color:var(--color-brand-primary)]'
                      : 'text-[#CBCBCB] hover:text-[color:var(--color-brand-primary)]'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="flex max-w-50 items-center gap-2">
            {isLoggedIn ? (
              <>
                <Dropdown>
                  <DropdownTrigger className="group flex min-w-22 cursor-pointer items-center gap-1 rounded-md text-[#CBCBCB] transition-colors hover:text-[color:var(--color-brand-primary)]">
                    <Globe className="group h-6 w-6 shrink-0" />
                    <span>
                      {i18n.language === 'ko'
                        ? '한국어'
                        : i18n.language === 'en'
                          ? 'English'
                          : i18n.language === 'zh'
                            ? '中文'
                            : '한국어'}
                    </span>
                  </DropdownTrigger>
                  <DropdownList>
                    <DropdownItem onSelect={() => changeLanguage('ko')}>
                      한국어
                    </DropdownItem>
                    <DropdownItem onSelect={() => changeLanguage('en')}>
                      English
                    </DropdownItem>
                    <DropdownItem onSelect={() => changeLanguage('zh')}>
                      中文
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>

                <Link
                  href="/mypage"
                  className={`flex max-w-50 items-center gap-1 truncate transition-colors ${
                    pathname === '/mypage'
                      ? 'text-[color:var(--color-brand-primary)]'
                      : 'text-[#CBCBCB] hover:text-[color:var(--color-brand-primary)]'
                  }`}
                >
                  <UserRound className="h-6 w-6 shrink-0" />
                  <span className="truncate overflow-hidden text-ellipsis">
                    {session?.user?.nickname ||
                      session?.user?.name ||
                      session?.user?.email?.split('@')[0]}
                  </span>
                </Link>
              </>
            ) : (
              <Link
                href="/signin"
                className="text-lg text-[#CBCBCB] hover:text-[color:var(--color-brand-primary)]"
              >
                {t('nav.signin')}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {isLoggedIn && (
        <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around bg-[color:var(--background-tertiary)] md:hidden">
          {[
            ...navMenu,
            { href: '/mypage', label: t('nav.mypage'), Icon: UserRound },
          ].map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1.5 text-xs ${
                pathname === href
                  ? 'text-[color:var(--color-brand-primary)]'
                  : 'text-[#CBCBCB] hover:text-[color:var(--color-brand-primary)]'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

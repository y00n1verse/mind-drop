'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import UserIcon from '@/assets/icons/UserIcon.svg';
import HomeIcon from '@/assets/icons/HomeIcon.svg';
import ReportIcon from '@/assets/icons/ReportIcon.svg';
import MindDropLogo from '@/assets/icons/MindDropLogo.svg';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg';
import { useTranslation } from 'react-i18next';
import useI18nReady from '@/app/hooks/useI18nReady';
import { Dropdown } from '../common/Dropdown/Dropdown';
import { DropdownTrigger } from '../common/Dropdown/DropdownTrigger';
import { DropdownItem } from '../common/Dropdown/DropdownItem';
import { DropdownList } from '../common/Dropdown/DropdownList';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const ready = useI18nReady();
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!ready) return null;

  const isLoggedIn = !!session?.user;

  const navMenu = [
    { href: '/', label: t('nav.main'), Icon: HomeIcon },
    { href: '/calendar', label: t('nav.calendar'), Icon: CalendarIcon },
    { href: '/report', label: t('nav.report'), Icon: ReportIcon },
  ];

  const navUser = { href: '/mypage', label: t('nav.mypage'), Icon: UserIcon };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if (isLoggedIn) {
    return (
      <>
        <nav className="fixed top-0 left-0 z-50 hidden w-full bg-[color:var(--background-tertiary)] md:block">
          <div className="mx-auto max-w-480 px-4 sm:px-6 lg:px-8">
            <div className="flex h-18 items-center justify-between">
              <Link href="/">
                <MindDropLogo />
              </Link>

              <div className="flex justify-center space-x-20">
                {navMenu.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 text-lg transition-colors ${
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

              <div className="flex items-center gap-3">
                <Dropdown>
                  <DropdownTrigger className="group cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                    <div className="flex gap-1 text-[#CBCBCB] group-hover:text-[color:var(--color-brand-primary)]">
                      <Globe className="h-6 w-6" />
                      <span>
                        {i18n.language === 'ko'
                          ? '한국어'
                          : i18n.language === 'en'
                            ? 'English'
                            : i18n.language === 'zh'
                              ? '中文'
                              : '한국어'}
                      </span>
                    </div>
                  </DropdownTrigger>
                  <DropdownList className="text-gray-600">
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
                  href={navUser.href}
                  className={`flex items-center gap-2 transition-colors ${
                    pathname === navUser.href
                      ? 'text-[color:var(--color-brand-primary)]'
                      : 'text-[#CBCBCB] hover:text-[color:var(--color-brand-primary)]'
                  }`}
                >
                  <navUser.Icon className="h-6 w-6" />
                  <span>{navUser.label}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around bg-[color:var(--background-tertiary)] md:hidden">
          {[...navMenu, navUser].map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 text-xs ${
                pathname === href
                  ? 'text-[color:var(--color-brand-primary)]'
                  : 'text-[#CBCBCB] transition-colors hover:text-[color:var(--color-brand-primary)]'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 hidden w-full bg-[color:var(--background-tertiary)] md:block">
        <div className="mx-auto max-w-480 px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--color-brand-primary)]"
            >
              <MindDropLogo />
            </Link>

            <Link
              href="/signin"
              className="text-lg text-[#CBCBCB] hover:text-[color:var(--color-brand-primary)]"
            >
              {t('nav.signin')}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

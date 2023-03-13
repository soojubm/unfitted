import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Logo from 'components/logo'
import Avatar from 'components/avatar'
import Popover from 'components/popover'

import { logout } from 'services/auth'
import { ACCESS_TOKEN } from 'services/constants'
import { ROUTES } from 'services/routes'

import LanguageIcon from 'public/language.svg'
import useOutsideClick from 'hooks/useOutsideClick'

import styles from './Navbar.module.css'

import NavbarMenu from './NavbarMenu'

const languages = [
  { name: '', label: 'korean', locale: 'ko' },
  { name: '', label: 'english', locale: 'en' },
]

function Navbar() {
  const { t } = useTranslation('common')

  const [openedPopovers, setOpenedPopovers] = useState('')
  const [testUser, setTestUser] = useState<string | null>(null)

  const router = useRouter()
  let { pathname } = router

  // TODO: accordion과 같은 맥락. 팝오버는 항상 하나만 열 수 있다.
  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget as HTMLButtonElement

    setOpenedPopovers(name)
  }

  const handleLogout = () => {
    logout()
    router.push(ROUTES.LOGIN)
  }

  // useEffect(() => {
  //   setTestUser(localStorage.getItem(ACCESS_TOKEN) || null)
  // }, [testUser])

  // todo PopoverContainer ref={ref}
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  useOutsideClick(ref1, () => setOpenedPopovers(''))
  useOutsideClick(ref2, () => setOpenedPopovers(''))

  return (
    <>
      <nav className={styles.navbar} role="navigation">
        <Link href={ROUTES.HOME}>
          <Logo alt="로고" />
        </Link>

        {/* <NavbarMenu /> */}

        <div className={styles.language}>
          <div className="popover" ref={ref1} style={{ position: 'relative' }}>
            <button
              className={styles['language-trigger']}
              name="language"
              onClick={handlePopoverClick}
            >
              <LanguageIcon viewBox="0 0 48 48" width="16" height="16" />
            </button>
            {openedPopovers === 'language' && (
              <Popover align="right">
                {languages.map(item => {
                  return (
                    <Link
                      key={item.locale}
                      className="menuitem"
                      locale={item.locale}
                      href={`/${pathname.slice(1)}`}
                      onClick={() => setOpenedPopovers('')}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </Popover>
            )}
          </div>
        </div>
        {/* <Dropdown
          isOpen={isOpen}
          trigger={<Chip label={chipLabel} onClick={handleTriggerClick} isExpandable />}
          target={dateFilterOptions.map(option => {
            return (
              <MenuItem key={option.value} option={option} onMenuItemClick={handleMenuItemClick} />
            )
          })}
        /> */}
        <div className={styles.user}>
          <div className="popover" ref={ref2} style={{ position: 'relative' }}>
            <button
              className={styles['language-trigger']}
              name="userAvatar"
              onClick={handlePopoverClick}
            >
              <Avatar name="test" size="medium" fallback="test" />
            </button>
            {openedPopovers === 'userAvatar' && (
              <Popover align="right">
                <button className="menuitem" onClick={handleLogout}>
                  {t('logout')}
                </button>
              </Popover>
            )}
          </div>
        </div>
      </nav>
      <div className={styles['navbar-backdrop']}></div>
    </>
  )
}

export default React.memo(Navbar)

interface MenuItemProps {}

// function MenuItem(props: MenuItemProps) {
//   return (
//     <button
//       onClick={() => setOpenedPopovers('')}
//       className="menuitem"
//       style={{ display: 'block', width: '100%' }}
//     >
//       <Link className="menuitem" href={`/${pathname.slice(1)}`} locale="en">
//         English
//       </Link>
//     </button>
//   )
// }

// export async function getStaticProps({ locale, locales }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//       locales,
//     },
//   }
// }

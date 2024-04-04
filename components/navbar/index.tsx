import React, { useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Logo from 'components/logo'
import Avatar from 'components/avatar'
import Popover from 'components/popover'

import { logout } from 'services/auth'
import { ACCESS_TOKEN } from 'services/constants'
import { ROUTES } from 'services/routes'

import useOutsideClick from 'hooks/useOutsideClick'

import styles from './Navbar.module.css'

import NavbarMenu from './NavbarMenu'

function Navbar() {
  const { t } = useTranslation('common')

  const [openedPopovers, setOpenedPopovers] = useState('')

  const router = useRouter()
  let { pathname } = router

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget as HTMLButtonElement

    setOpenedPopovers(name)
  }

  const handleLogout = () => {
    logout()
    router.push(ROUTES.LOGIN)
  }

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
        <NavbarMenu />
        <div className="popover" ref={ref1} style={{ position: 'relative' }}>
          <button name="language" onClick={handlePopoverClick}>
            언어선택
          </button>
          {openedPopovers === 'language' && (
            <Popover align="right">
              {[
                { name: '', label: 'korean', locale: 'ko' },
                { name: '', label: 'english', locale: 'en' },
              ].map(item => {
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
        {/* <Dropdown
          isOpen={isOpen}
          trigger={<Chip label={chipLabel} onClick={handleTriggerClick} isExpandable />}
          target={dateFilterOptions.map(option => {
            return (
              <MenuItem key={option.value} option={option} onMenuItemClick={handleMenuItemClick} />
            )
          })}
        /> */}
        <div className="popover" ref={ref2} style={{ position: 'relative' }}>
          <button onClick={handlePopoverClick}>
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
      </nav>
      <div className={styles['navbar-backdrop']}></div>
    </>
  )
}

export default Navbar

// export async function getStaticProps({ locale, locales }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//       locales,
//     },
//   }
// }

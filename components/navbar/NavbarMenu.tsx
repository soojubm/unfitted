import Link from 'next/link'
import { useRouter } from 'next/router'

import { ROUTES } from 'services/routes'

// const menus = [
//   {
//     id: 'custom',
//     label: '커스텀',
//     href: '/',
//   },
//   {
//     id: 'temp',
//     label: '도어 꾸미기',
//     href: '/',
//   },
//   { id: 'settings', label: '프로필 설정', href: '/' },
//   { id: 'linked', label: '연결된 방 관리', href: '/' },
//   { id: 'preview', label: '마이룸 미리보기', href: '/' },
// ]

const pages = [
  { name: 'Page1', href: ROUTES.PAGE1 },
  { name: 'Page2', href: ROUTES.PAGE2 },
]

function NavbarMenu() {
  const router = useRouter()

  return (
    <menu>
      {pages.map(item => {
        const isActive = router.asPath === item.href.toLocaleLowerCase()
        return (
          <Link key={item.name} href={item.href} legacyBehavior>
            <a>{item.name}</a>
          </Link>
        )
      })}
    </menu>
  )
  // if (!isOpen) return null
  // // const NAVBAR_MENU_STYLES = styles["navbar-menu"]
  // const navbarMenuClassname = isOpen
  //   ? `${styles['navbar-menu']} ${styles['is-active']}`
  //   : styles['navbar-menu']
  // return createPortal(
  //   <div className={navbarMenuClassname} role="navigation">
  //     {menus.map(menu => {
  //       return (
  //         <Link key={menu.id} href="/">
  //           {menu.label}
  //         </Link>
  //       )
  //     })}
  //   </div>,
  //   document.querySelector('#container')!,
  // )
}

export default NavbarMenu

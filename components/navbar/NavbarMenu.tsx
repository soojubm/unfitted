import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTES } from 'services/routes'

const menus = [{ name: 'home', href: ROUTES.HOME }]

function NavbarMenu() {
  const router = useRouter()

  // if (!isOpen) return null

  return (
    <menu>
      {menus.map(item => {
        const isActive = router.asPath === item.href.toLocaleLowerCase()
        return (
          <Link key={item.name} href={item.href} legacyBehavior>
            <a>{item.name}</a>
          </Link>
        )
      })}
    </menu>
  )
  // return createPortal(
  //   <nav
  //     className={
  //       isOpen
  //         ? `${styles['navbar-menu']} ${styles['is-active']}`
  //         : styles['navbar-menu']
  //     }
  //   ></nav>,
  //   document.querySelector('#container')!,
  // )
}

export default NavbarMenu

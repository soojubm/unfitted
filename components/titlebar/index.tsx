import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Logo from 'components/logo'

import styles from './Titlebar.module.css'

function Titlebar() {
  return (
    <header className={styles.titlebar}>
      {/* <BackButton /> */}
      <span style={{ marginLeft: '1rem' }}>
        <Link href="/login">
          <Logo alt="로고" />
        </Link>
      </span>
    </header>
  )
}

function BackButton() {
  const router = useRouter()

  const handleClick = () => router.back()

  return (
    <button className={styles.iconButton} onClick={handleClick}>
      <Image src="/arrow_back.svg" alt="" width="20" height="20" />
    </button>
  )
}

export default Titlebar

import styles from './Pagehead.module.css'

interface PageheadProps {
  title: string
}

function Pagehead(props: PageheadProps) {
  return (
    <header className={styles.container}>
      <h1>{props.title}</h1>
    </header>
  )
}

export default Pagehead

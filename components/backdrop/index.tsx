import styles from './Backdrop.module.css'

interface BackdropProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Backdrop(props: BackdropProps) {
  return <button className={styles.backdrop} onClick={props.onClick}></button>
}

export default Backdrop

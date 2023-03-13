import styles from './Alert.module.css'

interface AlertProps {
  description: string
}

function Alert(props: AlertProps) {
  return (
    <div className={styles.alert} role="alert" aria-live="assertive">
      {/* <Image src="/error.svg" alt="" width="20" height="20" /> */}
      <p>{props.description}</p>
    </div>
  )
}

export default Alert

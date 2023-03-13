import styles from './Tag.module.css'

interface TagProps {
  label?: string
}

interface StatusTagProps extends TagProps {
  status?: Status
}

function Tag(props: StatusTagProps) {
  return (
    <div className={styles.tag} data-status={props.status?.toLocaleLowerCase()}>
      <span className={styles.label}>{props.label}</span>
    </div>
  )
}

export default Tag

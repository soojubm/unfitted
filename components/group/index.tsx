import styles from './Group.module.css'

interface GroupProps {
  isHorizontalScroll?: boolean
  children: React.ReactNode
}

function Group(props: GroupProps) {
  return (
    <div role="group" className={styles.container} data-scroll={props.isHorizontalScroll}>
      {props.children}
    </div>
  )
}

export default Group

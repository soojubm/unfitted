import styles from './Popover.module.css'

interface PopoverProps {
  align?: 'left' | 'right'
  children: React.ReactNode
}

function Popover(props: PopoverProps) {
  return (
    <aside className={styles.menu} data-align={props.align}>
      {props.children}
    </aside>
  )
}

export default Popover

import Avatar from 'components/avatar'

import styles from './Item1.module.css'

interface Item1Props {
  item: Item1
  isActive: boolean
  onItemClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Item1(props: Item1Props) {
  const chipLabel = props.isActive ? 'test1' : 'test2'

  const value = props.item.name

  return (
    <button
      key={value}
      value={value}
      className={styles.container}
      data-status={props.isActive ? 'is-active' : ''}
      onClick={props.onItemClick}
    >
      <Avatar size="medium" name="test" fallback={value.slice(0, 1).toUpperCase()}></Avatar>
      <b>{value}</b>
      <div style={{ marginLeft: 'auto' }}>
        <span className="chip-container">{chipLabel}</span>
      </div>
    </button>
  )
}

export default Item1

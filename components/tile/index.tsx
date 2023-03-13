import styles from './Tile.module.css'

interface TileProps {
  type?: 'flat' | 'elevated'
  size?: 'medium' | 'small'
  children: React.ReactNode
}

function Tile({ type, size, children }: TileProps) {
  return (
    <div className={styles.tile} data-type={type || 'flat'} data-size={size || 'medium'}>
      {children}
    </div>
  )
}

export default Tile

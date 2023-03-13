import Image from 'next/image'

import styles from './Chip.module.css'
import CheckIcon from 'public/check.svg'

interface ChipProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  name?: string
  value?: string | number
  label?: string
  isActive?: boolean
  isDisabled?: boolean
  type?: 'checkable'
  isExpandable?: boolean
}

function Chip({
  name,
  value,
  type,
  label,
  isActive,
  isDisabled,
  isExpandable,
  onClick,
}: ChipProps) {
  return (
    <button
      type="button"
      name={name}
      value={value}
      className={[styles.chip, isActive ? styles['is-active'] : ''].join(' ')}
      disabled={isDisabled}
      onClick={onClick}
    >
      {type === 'checkable' && (
        <span className="icon-indicator" style={{ marginLeft: 'var(--space-2)' }}>
          <CheckIcon viewBox="0 0 48 48" width={14} height={14} fill={isActive ? '#fff' : '#000'} />
        </span>
      )}
      <span className={styles.label}>{label}</span>

      {isExpandable && (
        <span className="indicator">
          <Image src="/arrow_down.svg" alt="indicator" width="18" height="18" />
        </span>
      )}
    </button>
  )
}

export default Chip

// select와 같은 props?
interface ChipGroupProps {
  options: Option[]
  selectedValue: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function ChipGroup(props: ChipGroupProps) {
  return (
    <div className={styles.group}>
      {props.options.map(option => {
        const isSelected = option.value === props.selectedValue

        return (
          <Chip
            key={option.value}
            name={option.name}
            value={option.value}
            label={option.label}
            isActive={isSelected}
            onClick={props.onClick}
          />
        )
      })}
    </div>
  )
}

import Image from 'next/image'
import styles from './Select.module.css'

interface SelectProps {
  label: string
  selectedValue: string | number
  options: Option[]
  hiddenLabel?: boolean
  name: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  // id: string
}

// todo a11y: label은 항상 존재해야 한다. 시각적으로만 숨겨져야 함.

function Select(props: SelectProps) {
  return (
    <div className={styles.container}>
      {!props.hiddenLabel && (
        <label htmlFor={props.name} hidden={props.hiddenLabel}>
          {props.label}
        </label>
      )}
      {/* <b className={styles.value}>{props.options[0].label}</b> */}
      <select
        id={props.name}
        name={props.name}
        value={props.selectedValue}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          // const isSelected = option.name === props.selectedValue;
          return (
            <option key={`${option.value}${index}`} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      <span className={styles.indicator}>
        <Image src="/arrow_down.svg" alt="indicator" width="18" height="18" />
      </span>
    </div>
  )
}

export default Select

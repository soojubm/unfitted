import styles from './Checkbox.module.css'

interface CheckboxProps {
  name: string
  label: string
  isChecked?: boolean
  isDisabled?: boolean
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
  // isIndeterminated?: boolean
}

function Checkbox(props: CheckboxProps) {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        id={props.name}
        checked={props.isChecked}
        disabled={props.isDisabled}
        onChange={props.onChange}
        // indeterminate={props.isIndeterminated}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  )
}

export default Checkbox

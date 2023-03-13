import { forwardRef } from 'react'

import styles from './Textfield.module.css'

interface TextfieldProps {
  type?: 'text' | 'password' | 'email' | 'number'
  id: string
  name: string
  label: string
  value?: string | number
  defaultValue?: string | number
  placeholder: string
  isAutoFocus?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  helperText?: string
  // status: 'readonly' | 'disabled' | 'active' | 'invalid'

  size?: 'small' | 'medium'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// eslint-disable-next-line react/display-name
const Textfield = forwardRef((props: TextfieldProps, ref) => {
  return (
    <div className={[styles.textfield, props.size === 'small' ? styles['is-small'] : ''].join(' ')}>
      <label htmlFor="">{props.label}</label>
      <input
        type={props.type || 'text'}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.isAutoFocus}
        disabled={props.isDisabled}
        readOnly={props.isReadOnly}
        autoComplete="off"
      />
      {/* // <span className="Input__error-underline-message">{helperText}</span></p> */}
    </div>
  )
})

export default Textfield

import styles from './Button.module.css'

// interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  theme?: 'primary' | 'secondary'

  type?: 'submit' | 'button'
  name?: string
  label?: string
  isActive?: boolean
  isDisabled?: boolean
  isFullWidth?: boolean
  href?: string
  size?: 'medium' | 'small'
}

function Button({ name, label, theme, type, isDisabled, isFullWidth, size, onClick }: ButtonProps) {
  return (
    <button
      type={type || 'button'}
      name={name}
      className={styles.container}
      disabled={isDisabled}
      onClick={onClick}
      style={{ width: isFullWidth ? '100%' : 'auto' }}
      data-theme={theme || 'primary'}
      data-size={size || 'medium'}
    >
      {label}
    </button>
  )
}

export default Button

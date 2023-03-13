import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

// naming conventions : modal => portal presentation. modal / non-modal / modal => dialog 등...
// portal 이 있으니 결국 overay 컴포넌트를 만드는 게 맞을까.
function Modal(props: ModalProps) {
  return (
    <div>
      <div className={styles.modal}>{props.children}</div>
      <div className={styles.overay} onClick={props.onClick}></div>
    </div>
  )
}

export default Modal

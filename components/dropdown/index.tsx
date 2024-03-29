import Popover from 'components/popover'

interface DropdownProps {
  isOpen: boolean
  trigger: React.ReactNode
  target: React.ReactNode
}

const TARGET_INITIAL_STATE = false

function Dropdown(props: DropdownProps) {
  // TODO useDropdown as const
  // 글로벌 유아이 상태를 써야 드롭다운 컴포넌트와 실제 컴포넌트에 상태를 쓸 수 있다.
  return (
    <div style={{ position: 'relative' }}>
      {/* <div ref={ref} style={{ position: 'relative' }}> */}
      {props.trigger}
      {props.isOpen && <Popover>{props.target}</Popover>}
    </div>
  )
}

export default Dropdown

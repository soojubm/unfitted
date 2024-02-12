import { useState } from 'react'
import Image from 'next/image'

import useFilter from './useFilter'

import Chip from 'components/chip'
import Popover from 'components/popover'

import { getFilterLabel } from 'services/utils'
import MenuItem from 'components/menuitem'
import Backdrop from 'components/backdrop'

interface MultipleFilterFieldProps {
  initialState: string
  state: any
  options: Option[]
  type?: 'sort' | 'filter'
}

// todo Type
const TARGET_INITIAL_STATE = false

function MultipleFilterField(props: MultipleFilterFieldProps) {
  // const ref = useRef<HTMLDivElement>(null)
  // useOutsideClick(ref, () => setIsOpen(TARGET_INITIAL_STATE))

  const [isOpen, setIsOpen] = useState(TARGET_INITIAL_STATE)
  const handleTriggerClick = () => setIsOpen(prevState => !prevState)

  const [filterValue, handleFilter] = useFilter(props.initialState, props.state, 'click')

  const handleMenuItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleFilter(event)
    handleTriggerClick()
  }

  const chipLable = getFilterLabel(props.options, filterValue)

  return (
    <div style={{ position: 'relative' }}>
      {props.type === 'sort' ? (
        <button
          type="button"
          onClick={handleTriggerClick}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {chipLable}
          <span className="indicator">
            <Image src="/arrow_down.svg" alt="indicator" width="18" height="18" />
          </span>
        </button>
      ) : (
        <Chip label={chipLable} onClick={handleTriggerClick} isExpandable />
      )}
      {isOpen && (
        <div>
          <Popover>
            <Menu options={props.options} onClick={handleMenuItemClick} />
          </Popover>
          <Backdrop onClick={handleTriggerClick}></Backdrop>
        </div>
      )}
    </div>
  )
}

export default MultipleFilterField

// props 관리가 너무 복잡해지는데?
// chip array - options / onClick
interface MenuProps {
  options: any
  onClick: any
}

function Menu(props: MenuProps) {
  return (
    <>
      {props.options.map((option: any) => {
        return <MenuItem key={option.value} option={option} onMenuItemClick={props.onClick} />
      })}
    </>
  )
}

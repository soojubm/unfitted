import { useState, useRef } from 'react'
import Image from 'next/image'

import useFilter from './useFilter'

import Chip from 'components/chip'
import Popover from 'components/popover'

import useOutsideClick from 'hooks/useOutsideClick'

import { getFilterLabel } from 'services/utils'
import MenuItem from 'components/menuitem'

interface MultipleFilterFieldProps {
  initialState: string
  state: any
  options: Option[]
  type?: 'sort' | 'filter'
}

// todo Type
const TARGET_INITIAL_STATE = false

function MultipleFilterField(props: MultipleFilterFieldProps) {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setIsOpen(TARGET_INITIAL_STATE))

  const [isOpen, setIsOpen] = useState(TARGET_INITIAL_STATE)
  const handleTriggerClick = () => setIsOpen(prevState => !prevState)

  const [filterValue, handleFilter] = useFilter(props.initialState, props.state, 'click')

  const handleMenuItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleFilter(event)
    handleTriggerClick()
  }

  const chipLable = getFilterLabel(props.options, filterValue)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
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
        <Popover>
          {props.options.map(option => {
            return (
              <MenuItem key={option.value} option={option} onMenuItemClick={handleMenuItemClick} />
            )
          })}
        </Popover>
      )}
    </div>
  )
}

export default MultipleFilterField

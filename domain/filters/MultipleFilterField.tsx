import Chip from 'components/chip'
import Popover from 'components/popover'
import MenuItem from 'components/menuitem'
import Backdrop from 'components/backdrop'
import useToggle from 'hooks/useToggle'

import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
  initialState: string
  state: any
  options: Option[]
}

function MultipleFilterField(props: Props) {
  const [dropdown, toggleDropdown] = useToggle(false)
  const router = useRouter()
  const { query } = router

  const [label, setLabel] = useState('')
  const handleMenuItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const current = props.options.find(option => option.value === value)
    setLabel(current!.label)

    const { name, value } = event.currentTarget as HTMLButtonElement
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [name]: value },
    })
    // 전체를 다시 그리는 것은 어쩔 수 없나?

    toggleDropdown()
  }

  return (
    <div style={{ position: 'relative' }}>
      <Chip
        label={label || props.options[0].label}
        onClick={toggleDropdown}
        isExpandable
      />
      {dropdown && (
        <Popover>
          {props.options.map(option => (
            <MenuItem
              key={option.value}
              option={option}
              onMenuItemClick={handleMenuItemClick}
            />
          ))}
        </Popover>
      )}
      {dropdown && <Backdrop onClick={toggleDropdown}></Backdrop>}
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
        return (
          <MenuItem
            key={option.value}
            option={option}
            onMenuItemClick={props.onClick}
          />
        )
      })}
    </>
  )
}

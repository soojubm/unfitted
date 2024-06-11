import React, { useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// import Searchfield from 'components/searchfield'
import Item1 from 'domain/item1/Item1'
import Chip from 'components/chip'

type FormValues = {
  keyword: string
}

const initialFormValues = { keyword: '' }

export const coinMenuState = atom({
  key: 'coinMenuState',
  default: [] as string[],
})

function CoinMenu() {
  const [selectedItem, setselectedItem] = useRecoilState(coinMenuState)
  const [tempselectedItem, setTempselectedItem] = useState(selectedItem)
  const [searchedItems, setSearchedItems] = useState<Item1[]>([])

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: initialFormValues,
  })

  // const handleAllClick = () => {
  //   const values = lists.map(item => item.value)
  //   setselectedItem(selectedItem.length === lists.length ? [] : values)
  // }

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget as HTMLButtonElement

    if (tempselectedItem.includes(value)) {
      setTempselectedItem(tempselectedItem.filter(item => item !== value))
    } else {
      setTempselectedItem(prevStates => [...prevStates, value])
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async data => {
    // const lists = props.data
    // const searchedItems = lists.filter(item => item.name.includes(data['keyword']))
    // setSearchedItems([...searchedItems])
  }

  // 확인 취소 버튼의 유무에 따른 복잡도.
  // const handleModalCancelClick = (event: React.MouseEvent<HTMLElement>) => {
  //   initializeList()
  //   props.onModalClick(event)
  // }
  // const handleModalConfirmClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setselectedItem([...selectedItemArray])
  //   props.onModalClick(event)
  // }

  return (
    <section>
      <header></header>
      {/* <SearchBar /> */}
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="keyword"
          control={control}
          render={({ field }) => <Searchfield size="small" {...field} isAutoFocus placeholder="" />}
        />
      </form> */}
      {/* <p>{tempselectedItem.filter((value) => !Number(value) ).join(', ') }</p> */}
      <div className="scrollbox">
        {searchedItems?.map(item => {
          // const isActive = tempselectedItem.includes(item.name)
          const isActive = tempselectedItem.some(
            tempItem => tempItem === item.name,
          )
          return (
            <Item1
              key={item.name}
              item={item}
              isActive={isActive}
              onItemClick={handleItemClick}
            />
          )
        })}
      </div>
      {/* <BottomFixedContainer>
          <Button
            name=""
            label="선택 완료"
            isFullWidth
            onClick={handleModalConfirmClick}
          />
        </BottomFixedContainer> */}
    </section>
  )
}

export default CoinMenu

interface BottomFixedContainerProps {
  children: React.ReactNode
}

function BottomFixedContainer(props: BottomFixedContainerProps) {
  return (
    <div
      className="stack"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '0',
      }}
    >
      {props.children}
    </div>
  )
}

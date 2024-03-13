import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import DatePicker from 'react-datepicker'

import Avatar from 'components/avatar'
import Button from 'components/button'
import Checkbox from 'components/checkbox'
import Chip, { ChipGroup } from 'components/chip'
import Group from 'components/group'
import Modal from 'components/modal'
import Portal from 'components/portal'
import Radio from 'components/radio'
import Textfield from 'components/textfield'
// import Searchfield from 'components/searchfield'
import Select from 'components/select'
import Tabs from 'components/tab'
import Tag from 'components/tag'
import Tooltip from 'components/tooltip'

import { lists } from 'services/constants'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import Datefield from 'components/datefield'

import useTab from 'components/tab/hooks'
import Item1 from './Item1'
import Layout from 'layouts/LayoutWide'
import { useDateRange } from 'components/datefield/hook'

const initialFilters = {
  type: '',
  status: '',
  dateType: 'yesterday',
}

function Sampler() {
  const [isOpen, setIsOpen] = useState(false)
  const handleModalClick = () => setIsOpen(!isOpen)

  const [startDate, endDate, handleDateRangeChange] = useDateRange()

  const [selectedFilters, setSelectedFilters] = useState(initialFilters)
  // const [selectedTab, handleTabClick] = useTab(typeOptions[1].value)
  // const [selectedChip, setSelectedChip] = useState(dateFilterOptions[0].name)

  const handleChipClick = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.FormEvent<HTMLInputElement>,
    ) => {
      const { name, value } = event.target as
        | HTMLButtonElement
        | HTMLInputElement

      setSelectedFilters(prevState => ({ ...prevState, [name]: value }))
    },
    [selectedFilters],
  )

  // useEffect(() => {
  //   if (selectedFilters.test === 'single') setIsOpen(true)
  // }, [selectedFilters['test']])

  return (
    <Layout>
      {lists.map((item, index) => {
        return (
          <Item1
            key={item.name}
            src={item.src}
            name={item.name}
            status={item.status}
            date={item.date}
            publicKey={item.publicKey}
            width={item.width}
            height={item.height}
            value={item.value}
          />
        )
      })}
      <br />
      <h3>Icon indicator - avatar tiny</h3>
      <div className="icon-indicator">1</div>
      <div className="icon-indicator">2</div>
      <br />
      <h1 style={{ margin: '2rem 0 1rem' }}>Color tokens</h1>
      <article className="c-tile">
        <TokenItem color="var(--color-primary)" />
      </article>
      <article className="c-tile">
        <TokenItem color="var(--gray100)" />
      </article>
      <article className="c-tile">
        <TokenItem color="var(--gray200)" />
      </article>
      <article className="c-tile">
        <TokenItem color="var(--gray600)" />
      </article>
      <article className="c-tile">
        <TokenItem color="var(--gray800)" />
      </article>
      <style jsx>{`
        .c-tile {
          margin: 1rem 0;
        }
        .c-tile header {
          margin: -0.5rem 0 1rem 0;
        }
        .c-tile > div {
          display: flex;
          min-height: 8rem;

          padding: 1rem;
          border: var(--border);
          border-radius: var(--radius);
        }
      `}</style>
      <h1 style={{ margin: '2rem 0 1rem' }}>Actions</h1>
      <article className="c-tile">
        <header>
          <h3>Button</h3>
        </header>
        <div>
          <Group>
            <Button label="버튼" onClick={() => console.log()} />
            <Button
              size="small"
              label="버튼 스몰"
              onClick={() => console.log()}
            />
          </Group>
        </div>
      </article>
      <article className="c-tile">
        <header>
          <h3>Chip</h3>
        </header>
        <div style={{ display: 'block' }}>
          <Group>
            <Chip name="" label="칩" onClick={() => console.log()} />
            <Chip name="" label="모달 열기" onClick={handleModalClick} />
            <Select
              options={[
                { name: 'test1', value: '1', label: '레이블1' },
                { name: 'test2', value: '2', label: '레이블2' },
              ]}
              name="select"
              label="셀렉트"
              onChange={() => console.log()}
              selectedValue="test1"
            />
          </Group>
        </div>
      </article>
      <article className="c-tile">
        <header>
          <h3>Tab</h3>
        </header>
        {/* <Tabs tabs={typeOptions} onClick={handleTabClick} />
            <Tabs
              type="segmented"
              tabs={typeOptions}
              // selected={selectedTab}
              onClick={handleTabClick}
            /> */}
      </article>
      <article className="c-tile">
        <header>
          <h3>Radio group</h3>
        </header>
        <div>
          <Radio
            id="radio1"
            name="radio"
            label="Radio button"
            isChecked={true}
            onChange={() => console.log()}
          />
        </div>
      </article>
      <article className="c-tile">
        <header>
          <h3>Checkbox</h3>
        </header>
        <div>
          <Checkbox
            name="checkbox"
            label="Checkbox"
            onChange={handleChipClick}
          />
        </div>
      </article>
      <h1 style={{ margin: '2rem 0 1rem' }}>Text inputs</h1>
      <article className="c-tile">
        <header>
          <h3>Textfield</h3>
        </header>
        <div style={{ display: 'block' }}>
          <Textfield
            id="test10"
            name="test"
            label="Label"
            placeholder="입력해주세요."
            onChange={() => console.log()}
          />
          <div style={{ height: '.75rem' }} />
        </div>
      </article>
      <article className="c-tile">
        <header>
          <h3>Searchfield</h3>
        </header>
        <div style={{ display: 'block' }}>
          {/* <Searchfield name="test" placeholder="global search" onChange={() => console.log()} /> */}
          <div style={{ height: '.75rem' }} />
          {/* <Searchfield
            name="test"
            size="small"
            placeholder="local search"
            onChange={() => console.log()}
          /> */}
        </div>
      </article>
      <article className="c-tile">
        <header>
          <h3>Datefield</h3>
        </header>
        <div>
          <Datefield
            onChange={() => console.log()}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </article>

      <h1 style={{ margin: '2rem 0 1rem' }}>Visual informations</h1>
      <article className="c-tile">
        <header>
          <h3>Avatar</h3>
        </header>
        <div>
          <Group>
            <Avatar name="아바타" size="huge" fallback="정진" />
            <Avatar name="아바타" size="large" fallback="정진" />
            <Avatar name="아바타" size="medium" fallback="정진" />
            <Avatar name="아바타" size="small" fallback="진" />
          </Group>
        </div>
      </article>
      <article className="c-tile">
        <header>
          <h3>Tab</h3>
        </header>
        <div style={{ display: 'block' }}>
          <Group>
            <Tag label="태그" />
            <Tag label="confirmed" status="" />
          </Group>
        </div>
      </article>

      <article className="c-tile">
        <header>
          <h3>Tab</h3>
        </header>
        <div style={{ display: 'block' }}>
          <Tooltip content="툴팁 테스트">Tooltip</Tooltip>
        </div>
      </article>
      <h1 style={{ margin: '2rem 0 1rem' }}>Menus</h1>
      <article className="c-tile">
        <header>
          <h3>Dropdown menus</h3>
        </header>
        <div style={{ display: 'block' }}>
          <div className="menulist">
            <button
              className="menuitem"
              name=""
              value=""
              onClick={() => console.log()}
            >
              menu item
              {/* {isChecked && <span>check</span>} */}
            </button>
            <button
              className="menuitem"
              name=""
              value=""
              onClick={() => console.log()}
            >
              menu item
              {/* {isChecked && <span>check</span>} */}
            </button>
          </div>
        </div>
      </article>
      {isOpen && (
        <Portal selector="drawer">
          <Modal onClick={handleModalClick}>test</Modal>
        </Portal>
      )}
    </Layout>
  )
}

export default Sampler

interface TokenItemProps {
  color: string
}

function TokenItem(props: TokenItemProps) {
  return (
    <div>
      <figure
        style={{
          width: '100%',
          height: 'var(--size-large)',
          border: 'var(--border)',
          marginBottom: '.5rem',
          borderRadius: 'var(--radius)',
          background: props.color,
        }}
      ></figure>
      <span>{props.color}</span>
    </div>
  )
}

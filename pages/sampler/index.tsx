import { useCallback, useState } from 'react'
import Image from 'next/image'

import Avatar from 'components/avatar'
import Chip, { ChipGroup } from 'components/chip'
import Group from 'components/group'
import Modal from 'components/modal'
import Portal from 'components/portal'
import Textfield from 'components/textfield'
// import Searchfield from 'components/searchfield'
import Select from 'components/select'
import Tabs from 'components/tab'
import Tag from 'components/tag'
import Tooltip from 'components/tooltip'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import Datefield from 'components/datefield'

import useTab from 'components/tab/hooks'
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
      <div className="icon-indicator">1</div>
      <br />
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <TokenItem color="var(--color-primary)" />
        <TokenItem color="var(--gray100)" />
        <TokenItem color="var(--gray200)" />
        <TokenItem color="var(--gray600)" />
        <TokenItem color="var(--gray800)" />
      </div>
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
      <article className="c-tile">
        <Group>
          <Chip name="" label="칩" onClick={() => console.log()} />
          <Chip name="" label="모달 열기" onClick={handleModalClick} />
          <Select
            options={[
              { value: '1', label: '레이블1' },
              { value: '2', label: '레이블2' },
            ]}
            name="select"
            label="셀렉트"
            onChange={() => console.log()}
            selectedValue="test1"
          />
        </Group>
      </article>

      <article className="c-tile">
        <Textfield
          id="test10"
          name="test"
          label="Label"
          placeholder="입력해주세요."
          onChange={() => console.log()}
        />
      </article>
      <article className="c-tile">
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
        <Datefield
          onChange={() => console.log()}
          startDate={startDate}
          endDate={endDate}
        />
      </article>
      <article className="c-tile">
        <Group>
          <Avatar name="아바타" size="huge" fallback="정진" />
          <Avatar name="아바타" size="large" fallback="정진" />
          <Avatar name="아바타" size="medium" fallback="정진" />
          <Avatar name="아바타" size="small" fallback="진" />
        </Group>
      </article>
      <article className="c-tile">
        <Group>
          <Tag label="태그" />
          <Tag label="confirmed" status="" />
        </Group>
      </article>

      <article className="c-tile">
        <div style={{ display: 'block' }}>
          <Tooltip content="툴팁 테스트">Tooltip</Tooltip>
        </div>
      </article>
      <article className="c-tile">
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

function Item1(props: Item1) {
  return (
    <>
      <style jsx>{`
        .entity {
          width: 800px;
          height: 96px;
          position: relative;
          z-index: 1;
        }

        .entity + .entity {
          margin: 1.25rem 0 0 0;
        }
        .entity figure {
          float: left;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 96px;
          margin: 0 1rem 0 0;
          padding: 0 0.75rem;
          border: var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          /* margin-right: var(--space-after-avatar-large); */
          background-color: var(--color-background);
        }

        .entity b {
          display: block;
          font-size: var(--font-size-large);
          line-height: var(--font-line-height-small);
        }
        .entity > span {
          position: absolute;
          left: -0.25rem;
          top: -0.25rem;
        }

        .entity time {
          display: block;
          margin: 1rem 0 0 0;
          color: var(--color-text-light);
        }
      `}</style>
      <div className="entity">
        <figure>
          <Image
            src={props.src}
            alt="Vercel Logo"
            width={props.width || 72}
            height={props.height || 16}
          />
        </figure>
        <b>{props.name}</b>
        <p>{props.publicKey}</p>
        <span>
          <Tag label={props.status} />
        </span>
        <time>{props.date}</time>
      </div>
    </>
  )
}

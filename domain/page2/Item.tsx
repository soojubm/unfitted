import { useEffect } from 'react'
import Avatar from 'components/avatar'
import Tag from 'components/tag'

import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'

import { useTranslation } from 'next-i18next'

import styles from './List.module.css'

function Item(props: Item) {
  return (
    <div className={styles.row} role="row">
      <div className={styles.column} role="cell" data-cell="cell1">
        {/* <span>{dayjs().format('YY-MM-DD HH:mm:ss')}</span> */}
      </div>

      <div className={styles.column} role="cell" data-cell="cell2">
        <span></span>
      </div>

      <div className={styles.column} role="cell" data-cell="cell3">
        <Avatar
          name="test"
          size="medium"
          // fallback={true ? props.name.slice(0, 1) : props.origin.slice(0, 1)}
          fallback="test"
        />
        <div style={{ marginLeft: '.75rem' }}>
          <span>{props.name}</span>
        </div>
      </div>
      <div className={styles.column} role="cell" data-cell="cell4">
        {/* {props.tradeCurrency === 'KRW' ? '₩' : '$'} */}
        {props.tradeAmount.toLocaleString()}
      </div>
      {/* <div className={styles.column} role="cell" data-cell="">
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              // border: '1px solid #777',
              background: '#f6f6f6',
              borderRadius: '50%',
            }}
          >
            <CheckIcon viewBox="0 0 48 48" width={14} height={14} fill="#333" />
          </span>
      </div> */}
      <div className={styles.column} role="cell" data-cell="cell5">
        <Tag label={props.status} status={props.status} />
      </div>
    </div>
  )
}

export default Item

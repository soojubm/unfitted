import Avatar from 'components/avatar'
import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'next-i18next'

function Item(props: Item) {
  return (
    <div className="order-item tile-elevated">
      <header className="order-item-head">
        <span className="tag order-item-head-type">포장</span>
        <time className="order-item-head-time">2022. 12. 05. 15:32</time>
        <b className="order-item-head-status">배달완료</b>
      </header>
      <div
        className="item"
        data-size="large"
        style={{ margin: 'var(--space-3) 0 var(--space-4)' }}
      >
        <Avatar
          name="test"
          size="medium"
          // fallback={true ? props.name.slice(0, 1) : props.origin.slice(0, 1)}
          fallback="test"
        />
        <b className="item-name">쩜순이네닭강정</b>
        <p
          className="item-description"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span>떡볶이</span>
          <span>close</span>
          <span>5</span>
        </p>
      </div>
      <small>네이버는 왜 주문 내역 삭제을 숨길 수 있게 했나?</small>
    </div>
    // <div classNameName={styles.row} role="row">
    //   <div classNameName={styles.column} role="cell" data-cell="cell1">
    //     {/* <span>{dayjs().format('YY-MM-DD HH:mm:ss')}</span> */}
    //   </div>

    //   <div classNameName={styles.column} role="cell" data-cell="cell2">
    //     <span></span>
    //   </div>

    //   <div classNameName={styles.column} role="cell" data-cell="cell3">
    //     <Avatar
    //       name="test"
    //       size="medium"
    //       // fallback={true ? props.name.slice(0, 1) : props.origin.slice(0, 1)}
    //       fallback="test"
    //     />
    //     <div style={{ marginLeft: '.75rem' }}>
    //       <span>{props.name}</span>
    //     </div>
    //   </div>
    //   <div classNameName={styles.column} role="cell" data-cell="cell4">
    //     {/* {props.tradeCurrency === 'KRW' ? '₩' : '$'} */}
    //     {props.tradeAmount.toLocaleString()}
    //   </div>
    //   {/* <div classNameName={styles.column} role="cell" data-cell="">
    //       <span
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           width: '24px',
    //           height: '24px',
    //           // border: '1px solid #777',
    //           background: '#f6f6f6',
    //           borderRadius: '50%',
    //         }}
    //       >
    //         <CheckIcon viewBox="0 0 48 48" width={14} height={14} fill="#333" />
    //       </span>
    //   </div> */}
    //   <div classNameName={styles.column} role="cell" data-cell="cell5">
    //     <Tag label={props.status} status={props.status} />
    //   </div>
    // </div>
  )
}

export default Item

import Image from 'next/image'

import Tag from 'components/tag'

import styles from './Entity.module.css'

function Item1(props: Item1) {
  return (
    <div className={styles.entity}>
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
  )
}

export default Item1

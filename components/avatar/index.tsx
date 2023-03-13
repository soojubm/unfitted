import Image from 'next/image'

import styles from './Avatar.module.css'

interface AvatarProps {
  name: string
  src?: string
  size: 'huge' | 'large' | 'medium' | 'small'
  fallback?: string | React.ReactNode
}

function Avatar(props: AvatarProps) {
  // const empty = props.fallback.length > 0 ? 'true' : 'false'
  return (
    <figure className={styles.avatar} data-size={props.size}>
      {props.src && <Image src={props.src} alt={props.name} width="24" height="24" />}
      {props.fallback && <>{props.fallback}</>}
    </figure>
  )
}

export default Avatar

import Image from 'next/image'

interface LogoProps {
  alt: string
}

function Logo(props: LogoProps) {
  return <Image src="/" alt={props.alt} width={70} height={21} />
}

export default Logo

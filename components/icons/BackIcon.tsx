interface IconProps {
  size: 'medium' | 'small'
  color: string
  children?: React.ReactNode
}

function BackIcon(props: IconProps) {
  return (
    <div className="icon" data-size={props.size}>
      <svg xmlns="http://www.w3.org/2000/svg" height={props.size} width={props.size}>
        <path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z" />
      </svg>
    </div>
  )
}

export default BackIcon

{
  /* 
function Icon(props: IconProps) {
  return (<div>
                  {props.children}
  </div>)
} */
}

interface Props {
  orientation: 'vertical' | 'horizontal'
}

function Separator({ orientation }: Props) {
  const orientations = {
    vertical: {
      margin: '0px',
      borderWidth: '0px 0px 1px',
      borderColor: 'rgb(225, 227, 234)',
      borderStyle: 'solid',
      width: 'auto',
    },
    horizontal: {
      margin: '0px',
      borderWidth: '0px 0px 0px 1px',
      borderColor: 'rgb(225, 227, 234)',
      borderStyle: 'solid',
      width: 'auto',
    },
  }
  return <hr style={orientations[orientation]} />
}

export default Separator

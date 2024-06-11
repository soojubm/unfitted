interface Props {
  elevation?: '0' | '1' | '2'
  children: React.ReactNode
}

function Page(props: Props) {
  const baseStyles = {}
  const elevations = {
    '0': { boxShadow: '0 0 0 rgba(0,0,0,.1)' },
    '1': { boxShadow: '0 0 0 rgba(0,0,0,.1)' },
    '2': { boxShadow: '0 0 0 rgba(0,0,0,.1)' },
  }
  return (
    <section style={{ ...baseStyles, ...elevations[props.elevation || '0'] }}>
      {props.children}
    </section>
  )
}

export default Page

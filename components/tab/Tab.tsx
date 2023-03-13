import styles from './Tab.module.css'

interface TabListProps {
  tabs: Option[]
  selected: string | number
  src?: string
  type?: string
  // onClick: (event: React.MouseEvent<HTMLElement>) => void
  onClick: (event: any) => void
}

function Tabs(props: TabListProps) {
  return (
    <div className={styles.tablist} data-type={props.type}>
      {props.tabs.map(tab => (
        <button
          key={tab.value}
          name={tab.name}
          value={tab.value}
          className={styles.tab}
          data-active={props.selected === tab.value}
          onClick={props.onClick}
        >
          {tab.label}
          {/* {props.badgeLabel && <span className={styles.badge}>{props.badgeLabel}</span>} */}
        </button>
      ))}
    </div>
  )
}

// function TabPanel({ state, ...props }) {
//   let ref = React.useRef();
//   let { tabPanelProps } = useTabPanel(props, state, ref);
//   return (
//     <div {...tabPanelProps} ref={ref}>
//       {state.selectedItem?.props.children}
//     </div>
//   );
// }

export default Tabs

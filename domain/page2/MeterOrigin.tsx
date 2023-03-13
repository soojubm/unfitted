import Tooltip from 'components/tooltip'

import {
  STATUS_1,
  STATUS_1_VALUE,
  STATUS_2,
  STATUS_2_VALUE,
  STATUS_3,
  STATUS_3_VALUE,
} from 'services/constants'

// todo meters metrics
export const meters = [
  { label: STATUS_1, value: STATUS_1_VALUE, count: 153 },
  { label: STATUS_2, value: STATUS_2_VALUE, count: 24 },
  { label: STATUS_3, value: STATUS_3_VALUE, count: 888 },
]

function Meter() {
  return (
    <div className="meter">
      <h1 className="meter-title">전체 소비 31,381건</h1>
      <div className="meter-graph">
        {meters.map(item => (
          <div
            key={item.value}
            className="meter-graph-bar"
            data-status={item.value}
            style={{ width: item.count }}
          ></div>
        ))}
      </div>
      <div className="meter-legend">
        {meters.map(item => {
          return (
            <div className="meter-legend-item" data-status={item.value} key={item.value}>
              <i className="meter-legend-item-color"></i>
              <Tooltip content="test">
                <h3 className="meter-legend-item-title">{item.label}</h3>
              </Tooltip>
              <div className="meter-legend-item-value">
                <b>{item.count.toLocaleString()}건</b>
                <small className="meter-legend-item-percentage">55%</small>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Meter

import {useState, useContext} from 'react'
import {BarChart, Bar, XAxis, YAxis} from 'recharts'
import ReactContext from '../../context/ReactContext'
import Header from '../Header'
import './index.css'

const Reports = () => {
  const {initialMonthsList, initialEmojisList, initialMonth} =
    useContext(ReactContext)
  const [currMonth, setCurrMonth] = useState(initialMonth)

  // Find the selected month object based on currMonth
  const presentMonth =
    initialMonthsList.find(eachMonth => eachMonth.month === currMonth) || {}

  // Get the overall count of emojis for the selected month
  const getEmojisOverallCount = emojiName =>
    presentMonth.dates?.reduce(
      (count, eachDate) =>
        eachDate.emojiName === emojiName ? count + 1 : count,
      0,
    ) || 0

  // Handle month selection change
  const onChangeMonth = event => {
    const selectedMonth = initialMonthsList.find(
      month => month.month === parseInt(event.target.value, 10),
    )
    setCurrMonth(selectedMonth.month)
  }

  // Prepare data for the chart
  const data =
    initialEmojisList.map(emoji => ({
      name: emoji.emojiName,
      emojiCount: getEmojisOverallCount(emoji.emojiName),
    })) || []

  // Custom label for the bars in the chart
  const renderCustomBarLabel = props => {
    const {x, y, width, value} = props
    return (
      <text x={x + width / 2} y={y} fill="#000" textAnchor="middle" dy={-6}>
        {value}
      </text>
    )
  }

  return (
    <div className="report-page-container" data-testid="reportPageContainer">
      <Header />
      <div className="reports-container">
        <h1 className="report-container-heading">Overall Emojis Reports</h1>

        <ul className="emojis-count-unorder-list">
          {initialEmojisList.length > 0 ? (
            initialEmojisList.map(eachEmoji => (
              <li key={eachEmoji.emojiName} className="emoji-list-item">
                <p className="report-emoji-name">{eachEmoji.emojiName}</p>
                <img
                  src={eachEmoji.emojiUrl}
                  alt={eachEmoji.emojiName}
                  className="report-emoji-image"
                />
                <p className="report-emoji-count">
                  {getEmojisOverallCount(eachEmoji.emojiName)}
                </p>
              </li>
            ))
          ) : (
            <p>No emojis available.</p>
          )}
        </ul>

        <div className="heading-graph-container">
          <h1 className="monthly-report-heading">Monthly Reports</h1>
          <select
            className="select-month"
            name="months"
            value={currMonth}
            onChange={onChangeMonth}
          >
            {initialMonthsList.map(each => (
              <option key={each.month} value={each.month}>
                {each.monthName}
              </option>
            ))}
          </select>
        </div>

        {data.length > 0 ? (
          <div className="chart-container">
            <BarChart
              width={900}
              height={400}
              data={data}
              margin={{top: 0, right: 0, bottom: 0, left: 0}}
            >
              <XAxis dataKey="name" tick={{stroke: 'gray', strokeWidth: 1}} />
              <YAxis tick={{stroke: 'gray', strokeWidth: 0}} />
              <Bar
                dataKey="emojiCount"
                barSize={50}
                fill="yellow"
                label={renderCustomBarLabel}
              />
            </BarChart>
          </div>
        ) : (
          <p>No data available for the selected month.</p>
        )}
      </div>
    </div>
  )
}

export default Reports

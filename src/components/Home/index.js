import {useContext} from 'react'
import {MdChevronRight, MdChevronLeft} from 'react-icons/md'
import ReactContext from '../../context/ReactContext'
import Header from '../Header'
import './index.css'

const Home = () => {
  const {
    initialMonthsList,
    initialDaysList,
    initialEmojisList,
    handleNextMonth,
    handlePreviousMonth,
    initialMonth,
    setDate,
    setDay,
    setEmoji,
    selectedDay,
    selectedEmoji,
    emojiCount,
    selectedDate,
    setactiveEmojiId,
    activeEmojiId,
  } = useContext(ReactContext)

  const showPresentMonth = initialMonthsList.find(
    each => each.month === initialMonth,
  ) || {monthName: '', dates: []}

  return (
    <div className='home-page-container' data-testid='homePageContainer'>
      <Header />
      <div className='home-container'>
        <h1 className='home-heading'>Moods in a Month</h1>
        <div className='month-mood-container'>
          {/* Month Navigation */}
          <div className='mood-month-calendar-container'>
            <div className='mood-month-container'>
              <button
                className='month-nav-button'
                onClick={handlePreviousMonth}
                type='button'
                data-testid='previous-button'
              >
                <MdChevronLeft className='month-nav-icons' />
              </button>
              <h1 className='month-name'>{showPresentMonth.monthName}</h1>
              <button
                className='month-nav-button'
                onClick={handleNextMonth}
                type='button'
                data-testid='next-button'
              >
                <MdChevronRight className='month-nav-icons' />
              </button>
            </div>

            {/* Days List */}
            <ul className='days-list-container'>
              {initialDaysList.map(each => (
                <li key={each.day} className='day-name-list'>
                  <p className='day-name'>{each.day}</p>
                </li>
              ))}
            </ul>

            {/* Dates List */}
            <ul className='dates-list-container'>
              {showPresentMonth.dates.map(each => (
                <li key={each.date} className='mood-date'>
                  <button
                    className='date-button mood-date'
                    type='button'
                    onClick={() => setDate(each.id)}
                  >
                    <p className='date-button'>{each.date}</p>
                    {each.emojiUrl && (
                      <img
                        src={each.emojiUrl}
                        alt={selectedDate}
                        className='day-mood-emoji'
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Set Day Mood Section */}
          <div className='set-day-mood-section-container'>
            {/* Emoji Selection */}
            <ul className='emoji-container' data-testid='emojiContainer'>
              {initialEmojisList.map(each => (
                <li
                  key={each.id}
                  className={`emoji-item ${
                    each.id === activeEmojiId ? 'active-emoji-item' : ''
                  }`}
                  data-testid='emojiItem'
                  onClick={() => setactiveEmojiId(each.id)}
                >
                  <button className='select-emoji-button' type='button'>
                    <p className='emoji-name'>{each.emojiName}</p>
                    <img
                      src={each.emojiUrl}
                      alt={each.emojiName}
                      className={`emoji-url ${
                        activeEmojiId === each.id
                          ? 'active-select-emoji-button'
                          : ''
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Select Day and Emoji filter container */}
            <div className='mood-editor-container'>
              <div className='select-elements-container'>
                <select
                  className='select-element'
                  onChange={event => setEmoji(event.target.value)}
                  value={selectedEmoji}
                >
                  {initialEmojisList.map(each => (
                    <option
                      key={each.id}
                      className={`options-element ${
                        selectedEmoji === each.emojiName
                          ? 'active-option-element'
                          : ''
                      }`}
                      value={each.emojiName}
                      data-id={each.id}
                    >
                      {each.emojiName}
                    </option>
                  ))}
                </select>
                <select
                  className='select-element'
                  onChange={event => setDay(event.target.value)}
                  value={selectedDay}
                >
                  {initialDaysList.map(each => (
                    <option
                      key={each.id}
                      className={`options-element ${
                        selectedDay === each.day ? 'active-option-element' : ''
                      }`}
                      value={each.day}
                    >
                      {each.day}
                    </option>
                  ))}
                </select>
              </div>
              {/* Emoji Count */}
              <h1 className='selected-date'>{emojiCount}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

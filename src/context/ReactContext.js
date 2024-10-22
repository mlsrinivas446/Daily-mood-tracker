import React from 'react'

const defaultFun = () => {}

const ReactContext = React.createContext({
  initialMonthsList: [],
  initialMonth: '',
  daysList: [],
  initialDaysList: [],
  initialEmojisList: [],
  onClickPreviousMonth: defaultFun,
  handlePreviousMonth: defaultFun,
  handleNextMonth: defaultFun,
  onClickNextMonth: defaultFun,
  updateMonthsList: defaultFun,
  setDate: defaultFun,
  setDay: defaultFun,
  setEmoji: defaultFun,
  setActiveEmoji: defaultFun,
  selectedDate: '01',
  selectedDay: 'Sun',
  selectedEmoji: 'happy emoji',
  toggleDropdown: defaultFun,
  toggleDayDropdown: defaultFun,
  isEmojiDropdownOpen: false,
  setActiveEmojiId: defaultFun,
  activeEmojiId: null,
  isDayDropdownOpen: false,
  activeDayId: null,
})

export default ReactContext

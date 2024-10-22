import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'
import {IoIosClose} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const {history, location} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const isHomeActiveCheck = location.pathname === '/'
  const isReportsActiveCheck = location.pathname === '/reports'

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header-container" data-testid="headerContainer">
      <h1 className="header-title">Daily Mood Tracker</h1>
      {isMenuOpen ? (
        <IoIosClose
          className={`close-icon ${!isMenuOpen ? 'hide' : ''}`}
          onClick={toggleMenu}
        />
      ) : (
        <RxHamburgerMenu
          className={`hamburger-icon ${isMenuOpen ? 'hide' : ''}`}
          onClick={toggleMenu}
        />
      )}
      <div className={`nav-items-list ${isMenuOpen ? 'show-menu' : ''}`}>
        <Link
          to="/"
          className={`link ${
            isHomeActiveCheck ? 'active-route nav-item' : 'nav-item'
          }`}
        >
          Home
        </Link>
        <Link
          to="/reports"
          className={`link ${
            isReportsActiveCheck ? 'active-route nav-item' : 'nav-item'
          }`}
        >
          Reports
        </Link>

        <button
          className="logout-button"
          type="button"
          onClick={onClickLogout}
          data-testid="logoutButton"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)

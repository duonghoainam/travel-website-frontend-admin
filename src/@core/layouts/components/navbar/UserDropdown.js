// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import axios from 'axios'
import jwtDefaultConfig from '../../../auth/jwt/jwtDefaultConfig'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, RefreshCw, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
// import { useTranslation } from 'react-i18next'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
const [userAvatar, setUserAvatar] = useState(require('@src/assets/images/avatars/avatar-blank.png').default)
  const [userName, setUserName] = useState('Name not set')
  const [userRole, setUserRole] = useState('Role not set')

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      async function fetchData() {

        const response = await axios.get('/api/v1/users/me')
        if (response.data.data.full_name) setUserName(response.data.data.full_name)
        if (response.data.data.role_name) setUserRole(response.data.data.role_name)
        if (response.data.data.avatar_url) setUserAvatar(`${jwtDefaultConfig.endPoint}${response.data.data.avatar_url}`)
      }
      fetchData()
    }

  }, [])

  //** Vars
  const avatar = userAvatar || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{userName}</span>
          <span className='user-status'>{userRole}</span>
        </div>
        <Avatar img={avatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to='/pages/profile'>
          <User  size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider /> */}
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/reset-password-basic'>
          {/* <CreditCard size={14} className='me-75' /> */}
          <RefreshCw size={14} className='me-75' />
          <span className='align-middle'>Change password</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to='/login-basic' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown

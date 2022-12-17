// ** React Imports
import { Link } from 'react-router-dom'
import axios from 'axios'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { store } from '@store/store'
// import { deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  // if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar_url ? row.avatar_url : require('@src/assets/images/avatars/avatar-blank.png').default} width='32' height='32' />
  // } else {
  //   return (
  //     <Avatar
  //       initials
  //       className='me-1'
  //       color={row.avatarColor || 'light-primary'}
  //       content={row.fullName || 'John Doe'}
  //     />
  //   )
  // }
}

// ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     subscriber: {
//       class: 'text-primary',
//       icon: User
//     },
//     maintainer: {
//       class: 'text-success',
//       icon: Database
//     },
//     editor: {
//       class: 'text-info',
//       icon: Edit2
//     },
//     author: {
//       class: 'text-warning',
//       icon: Settings
//     },
//     admin: {
//       class: 'text-danger',
//       icon: Slack
//     }
//   }

//   // const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
//       {row.role}
//     </span>
//   )
// }

// const statusObj = {
//   pending: 'light-warning',
//   active: 'light-success',
//   inactive: 'light-secondary'
// }

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'full_name',
    selector: row => row.full_name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{row.full_name}</span>
          {/* <small className='text-truncate text-muted mb-0'>{row.email}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role_id',
    selector: row => row.role_name,
    cell: row =>  <span className='fw-bolder'>{row.role_name}</span>
  },
  {
    name: 'Email',
    minWidth: '138px',
    sortable: true,
    sortField: 'email',
    selector: row => row.email,
    cell: row => <span className='text-capitalize'>{row.email}</span>
  },
  {
    name: 'Phone',
    minWidth: '230px',
    sortable: true,
    sortField: 'phone',
    selector: row => row.phone,
    cell: row => <span className='text-capitalize'>{row.phone}</span>
  },
  {
    name: 'Date of birth',
    minWidth: '138px',
    sortable: true,
    sortField: 'dob',
    selector: row => row.dob,
    cell: row => <span className='text-capitalize'>{row.dob?.substring(0, 10)}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <div
          className='w-100 cursor-pointer'
          onClick={(e) => {
            e.preventDefault()
            // store.dispatch(deleteUser(row.id))
            console.log(row.id)
            async function deleteUser() {
              const response = await axios.delete(`/api/v1/users/${row.id}`)

              console.log('api delete user', response)
            }
            deleteUser()
          }}
        >
          <Trash2 size={14} className='me-50' />
          <span className='align-middle'>Delete</span>
        </div>
        {/* <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </div>
    )
  }
]

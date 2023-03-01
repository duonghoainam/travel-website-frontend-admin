// // import axios from 'axios'
// // ** React Imports
// import { Fragment } from 'react'
// import { Link } from 'react-router-dom'

// // ** Custom Components
// import Avatar from '@components/avatar'

// // ** Reactstrap Imports
// import {
//   Badge,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   UncontrolledTooltip,
//   UncontrolledDropdown
// } from 'reactstrap'

// // ** Third Party Components
// import {
//   Eye,
//   Send,
//   Edit,
//   Copy,
//   Save,
//   Info,
//   Trash,
//   PieChart,
//   Download,
//   TrendingUp,
//   CheckCircle,
//   MoreVertical,
//   ArrowDownCircle
// } from 'react-feather'

// export let data

// // ** Get initial Data
// // axios.get('/api/datatables/initial-data').then(response => {
// //   data = response.data
// // })
// export const reOrderColumns = [
//     {
//       name: 'ID',
//       reorder: true,
//       sortable: true,
//       maxWidth: '100px',
//       selector: row => row.ContainerID
//     },
//     {
//       name: 'Container No',
//       reorder: true,
//       sortable: true,
//       minWidth: '225px',
//       selector: row => row.ContainerNo
//     },
//     {
//       name: 'Setting Temp',
//       reorder: true,
//       sortable: true,
//       minWidth: '310px',
//       selector: row => row.SettingTemp
//     },
//     {
//       name: 'Ventilation',
//       reorder: true,
//       sortable: true,
//       minWidth: '250px',
//       selector: row => row.Ventilation
//     },
//     {
//       name: 'Location',
//       reorder: true,
//       sortable: true,
//       minWidth: '100px',
//       selector: row => row.Location
//     },
//     {
//       name: 'StatusDate',
//       reorder: true,
//       sortable: true,
//       minWidth: '175px',
//       selector: row => row.StatusDate
//     },
//     {
//       name: 'CO Code',
//       reorder: true,
//       sortable: true,
//       minWidth: '175px',
//       selector: row => row.COCode
//     },
//     {
//       name: 'Act Date',
//       reorder: true,
//       sortable: true,
//       minWidth: '175px',
//       selector: row => row.ActDate
//     }
//   ]

//   // const invoiceStatusObj = {
//   //   Sent: { color: 'light-secondary', icon: Send },
//   //   Paid: { color: 'light-success', icon: CheckCircle },
//   //   Draft: { color: 'light-primary', icon: Save },
//   //   Downloaded: { color: 'light-info', icon: ArrowDownCircle },
//   //   'Past Due': { color: 'light-danger', icon: Info },
//   //   'Partial Payment': { color: 'light-warning', icon: PieChart }
//   // }
//   // const renderClient = row => {
//   //   const stateNum = Math.floor(Math.random() * 6),
//   //     states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
//   //     color = states[stateNum]

//   //   if (row.avatar.length) {
//   //     return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
//   //   } else {
//   //     return <Avatar color={color} className='me-50' content={row.client ? row.client.name : 'John Doe'} initials />
//   //   }
//   // }

//   export const columns = [
//     {
//       name: 'ID',
//       sortable: true,
//       sortField: 'ContainerID',
//       minWidth: '107px',
//       // selector: row => row.id,
//       cell: row => <Link to={`/apps/invoice/preview/${row.ContainerID}`}>{`#${row.ContainerID}`}</Link>
//     },
//     {
//       sortable: true,
//       minWidth: '102px',
//       sortField: 'ContainerNo',
//       name: <TrendingUp size={14} />,
//       // selector: row => row.invoiceStatus,
//       cell: row => {
//         // const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
//         //   Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : Edit
//         return (
//           <Fragment>
//             {row.ContainerNo}
//             {/* <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.containerNo}`} /> */}
//             {/* <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
//               <span className='fw-bold'>{row.invoiceStatus}</span>
//               <br />
//               <span className='fw-bold'>Balance:</span> {row.balance}
//               <br />
//               <span className='fw-bold'>Due Date:</span> {row.dueDate}
//             </UncontrolledTooltip> */}
//           </Fragment>
//         )
//       }
//     },
//     {
//       name: 'Setting Temp',
//       sortable: true,
//       minWidth: '350px',
//       sortField: 'SettingTemp',
//       // selector: row => row.client.name,
//       cell: row => {
//         // const name = row.client ? row.client.name : 'John Doe',
//         //   email = row.client ? row.client.companyEmail : 'johnDoe@email.com'
//         return (
//           <div className='d-flex justify-content-left align-items-center'>SettingTemp {row.SettingTemp}
//             {/* {renderClient(row)}
//             <div className='d-flex flex-column'>
//               <h6 className='user-name text-truncate mb-0'>{name}</h6>
//               <small className='text-truncate text-muted mb-0'>{email}</small>
//             </div> */}
//           </div>
//         )
//       }
//     },
//     {
//       name: 'Ventilation',
//       sortable: true,
//       minWidth: '150px',
//       sortField: 'Ventilation',
//       // selector: row => row.total,
//       cell: row => <span>${row.Ventilation || 0}</span>
//     },
//     {
//       sortable: true,
//       minWidth: '200px',
//       name: 'Location',
//       sortField: 'Location',
//       cell: row => row.Location
//       // selector: row => row.dueDate
//     },
//     {
//       sortable: true,
//       name: 'Status Date',
//       minWidth: '164px',
//       sortField: 'StatusDate',
//       // selector: row => row.balance,
//       cell: row => {
//         return row.StatusDate !== 0 ? (
//           <span>{row.StatusDate}</span>
//         ) : (
//           <Badge color='light-success' pill>
//             Paid
//           </Badge>
//         )
//       }
//     },
//     {
//       sortable: true,
//       name: 'COCode',
//       minWidth: '164px',
//       sortField: 'COCode',
//       // selector: row => row.COCode,
//       cell: row => {
//         return row.COCode !== 0 ? (
//           <span>{row.COCode}</span>
//         ) : (
//           <Badge color='light-success' pill>
//             Paid
//           </Badge>
//         )
//       }
//     },
//     {
//       sortable: true,
//       name: 'ActDate',
//       minWidth: '164px',
//       sortField: 'ActDate',
//       // selector: row => row.ActDate,
//       cell: row => {
//         return row.ActDate !== 0 ? (
//           <span>{row.ActDate}</span>
//         ) : (
//           <Badge color='light-success' pill>
//             Paid
//           </Badge>
//         )
//       }
//     },
//     {
//       name: 'Action',
//       minWidth: '110px',
//       cell: row => (
//         <div className='column-action d-flex align-items-center'>
//           <Send className='cursor-pointer' size={17} id={`send-tooltip-${row.ContainerID}`} />
//           <UncontrolledTooltip placement='top' target={`send-tooltip-${row.ContainerID}`}>
//             Send Mail
//           </UncontrolledTooltip>
//           <Link to={`/apps/invoice/preview/${row.ContainerID}`} id={`pw-tooltip-${row.ContainerID}`}>
//             <Eye size={17} className='mx-1' />
//           </Link>
//           <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.ContainerID}`}>
//             Preview Invoice
//           </UncontrolledTooltip>
//           <UncontrolledDropdown>
//             <DropdownToggle tag='span'>
//               <MoreVertical size={17} className='cursor-pointer' />
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
//                 <Download size={14} className='me-50' />
//                 <span className='align-middle'>Download</span>
//               </DropdownItem>
//               <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.ContainerID}`} className='w-100'>
//                 <Edit size={14} className='me-50' />
//                 <span className='align-middle'>Edit</span>
//               </DropdownItem>
//               <DropdownItem
//                 tag='a'
//                 href='/'
//                 className='w-100'
//                 onClick={{}}
//               >
//                 <Trash size={14} className='me-50' />
//                 <span className='align-middle'>Delete</span>
//               </DropdownItem>
//               <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
//                 <Copy size={14} className='me-50' />
//                 <span className='align-middle'>Duplicate</span>
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </div>
//       )
//     }
//   ]

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
// const renderClient = row => {
  // if (row.avatar.length) {
  // return <Avatar className='me-1' img={row.avatar_url ? row.avatar_url : require('@src/assets/images/avatars/avatar-blank.png').default} width='32' height='32' />
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
// }

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
    name: 'Name',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {/* {renderClient(row)} */}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{row.name}</span>
          {/* <small className='text-truncate text-muted mb-0'>{row.email}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Time',
    sortable: true,
    minWidth: '172px',
    sortField: 'time',
    selector: row => row.time,
    cell: row =>  <span className='fw-bolder'>{row.time}</span>
  },
  {
    name: 'Vehicle',
    minWidth: '138px',
    sortable: true,
    sortField: 'vehicle',
    selector: row => row.vehicle,
    cell: row => <span className='text-capitalize'>{row.vehicle}</span>
  },
  {
    name: 'DeparturePlace',
    minWidth: '230px',
    sortable: true,
    sortField: 'departurePlace',
    selector: row => row.departurePlace,
    cell: row => <span className='text-capitalize'>{row.departurePlace}</span>
  },
  {
    name: 'Destination',
    minWidth: '138px',
    sortable: true,
    sortField: 'destination',
    selector: row => row.destination,
    cell: row => <span className='text-capitalize'>{row.destination}</span>
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
            console.log(row)

            async function deleteUser() {
              const response = await axios.delete(`https://travel-website-backend.up.railway.app/api/tour-packages/${row._id}`)

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

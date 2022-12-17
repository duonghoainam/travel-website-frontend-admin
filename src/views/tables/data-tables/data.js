// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

export let data

// ** Get initial Data
axios.get('/api/datatables/initial-data').then(response => {
  data = response.data
})

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '310px',
    selector: row => row.email
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Salary',
    sortable: true,
    minWidth: '175px',
    selector: row => row.salary
  }
]
// ** Table ReOrder Column
export const reOrderColumns = [
  {
    name: 'ID',
    reorder: true,
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'Name',
    reorder: true,
    sortable: true,
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    reorder: true,
    sortable: true,
    minWidth: '310px',
    selector: row => row.email
  },
  {
    name: 'Position',
    reorder: true,
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Age',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Salary',
    reorder: true,
    sortable: true,
    minWidth: '175px',
    selector: row => row.salary
  }
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Name',
    minWidth: '250px',
    sortable: row => row.full_name,
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )}
        <div className='user-info text-truncate ms-1'>
          <span className='d-block fw-bold text-truncate'>{row.full_name}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: row => row.salary
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Status',
    minWidth: '150px',
    sortable: row => row.status.title,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: row => row.salary
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: row => row.status,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Full Name',
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    sortable: true,
    name: 'Email',
    minWidth: '250px',
    selector: row => row.email
  },
  {
    sortable: true,
    name: 'Position',
    minWidth: '250px',
    selector: row => row.post
  },
  {
    sortable: true,
    name: 'Office',
    minWidth: '150px',
    selector: row => row.city
  },
  {
    sortable: true,
    name: 'Start Date',
    minWidth: '150px',
    selector: row => row.start_date
  },
  {
    sortable: true,
    name: 'Salary',
    minWidth: '150px',
    selector: row => row.salary
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Post',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '150px',
    selector: row => row.city
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '100px',
    selector: row => row.salary
  }
]


export const VictMockDataSmall = [
  {"containerNo ":989, setT:99, "actualTemp ":4, st:"F", "venti ":51.3531567, "location ":"36931003389560", "pluginDate ":"2022-08-06T17:47:10Z", "plugoutDate ":"2022-09-27T18:18:34Z", checkPlugOut:false, "remark ":"RUB", "ves ":"Infiniti", "voy ":2012, "lastmonitoring ":"10:27"},
  {"containerNo ":990, setT:19, "actualTemp ":-73, st:"M", "venti ":4.9741169, "location ":"06048114141997049", "pluginDate ":"2022-03-30T08:00:51Z", "plugoutDate ":"2021-11-13T06:06:27Z", checkPlugOut:false, "remark ":"XAF", "ves ":"Dodge", "voy ":2009, "lastmonitoring ":"21:45"},
  {"containerNo ":991, setT:-90, "actualTemp ":-94, st:"F", "venti ":-6.6727682, "location ":"4844913352549733", "pluginDate ":"2022-05-28T08:19:56Z", "plugoutDate ":"2022-01-24T13:12:03Z", checkPlugOut:true, "remark ":"IDR", "ves ":"BMW", "voy ":1996, "lastmonitoring ":"0:36"},
  {"containerNo ":992, setT:-84, "actualTemp ":54, st:"M", "venti ":17.372649, "location ":"3560296952904928", "pluginDate ":"2022-04-22T19:49:29Z", "plugoutDate ":"2022-03-05T05:42:53Z", checkPlugOut:false, "remark ":"PHP", "ves ":"GMC", "voy ":2013, "lastmonitoring ":"13:00"},
  {"containerNo ":993, setT:18, "actualTemp ":-8, st:"F", "venti ":23.9891132, "location ":"374288709389406", "pluginDate ":"2022-10-10T17:51:11Z", "plugoutDate ":"2022-07-24T13:39:56Z", checkPlugOut:true, "remark ":"MXN", "ves ":"Chevrolet", "voy ":2009, "lastmonitoring ":"4:11"},
  {"containerNo ":994, setT:-43, "actualTemp ":23, st:"M", "venti ":40.7746041, "location ":"633110656722657180", "pluginDate ":"2022-01-13T09:34:15Z", "plugoutDate ":"2021-12-16T14:00:49Z", checkPlugOut:true, "remark ":"ALL", "ves ":"Porsche", "voy ":2006, "lastmonitoring ":"6:31"},
  {"containerNo ":995, setT:26, "actualTemp ":-23, st:"F", "venti ":11.4385093, "location ":"3554125742322281", "pluginDate ":"2022-10-02T09:18:18Z", "plugoutDate ":"2022-01-31T08:53:57Z", checkPlugOut:false, "remark ":"NIO", "ves ":"Infiniti", "voy ":2011, "lastmonitoring ":"21:00"},
  {"containerNo ":996, setT:76, "actualTemp ":-6, st:"F", "venti ":25.905283, "location ":"5100172166091970", "pluginDate ":"2022-07-21T12:23:11Z", "plugoutDate ":"2022-10-06T06:50:07Z", checkPlugOut:true, "remark ":"CNY", "ves ":"Cadillac", "voy ":1994, "lastmonitoring ":"4:20"},
  {"containerNo ":997, setT:-28, "actualTemp ":-93, st:"F", "venti ":26.312444, "location ":"5100133167647087", "pluginDate ":"2022-01-30T04:55:37Z", "plugoutDate ":"2022-01-25T20:05:32Z", checkPlugOut:false, "remark ":"CNY", "ves ":"Toyota", "voy ":2012, "lastmonitoring ":"16:34"},
  {"containerNo ":998, setT:-50, "actualTemp ":-43, st:"M", "venti ":-14.9061237, "location ":"337941396042326", "pluginDate ":"2022-02-27T11:45:54Z", "plugoutDate ":"2022-02-23T20:18:30Z", checkPlugOut:false, "remark ":"MGA", "ves ":"Lexus", "voy ":2008, "lastmonitoring ":"3:25"},
  {"containerNo ":999, setT:-21, "actualTemp ":-50, st:"M", "venti ":62.3822834, "location ":"3556546742146115", "pluginDate ":"2021-11-27T01:25:36Z", "plugoutDate ":"2021-11-27T07:07:25Z", checkPlugOut:true, "remark ":"EUR", "ves ":"Volvo", "voy ":2002, "lastmonitoring ":"13:11"},
  {"containerNo ":1000, setT:-46, "actualTemp ":97, st:"F", "venti ":8.116779, "location ":"30535473141959", "pluginDate ":"2022-06-25T11:54:26Z", "plugoutDate ":"2022-02-02T13:15:36Z", checkPlugOut:false, "remark ":"ETB", "ves ":"Audi", "voy ":1988, "lastmonitoring ":"18:11"}
  
]

export default ExpandableTable

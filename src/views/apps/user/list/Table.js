// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getListUser } from '../store'//getAllData, getData, 
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, CloudLightning } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import SidebarEditUser from './SidebarEdit'


// ** User filter options
const roleOptions = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Reefer' },
    { value: '3', label: 'Enquiry' }
  ]

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm, handleRoleFilter, currentRole }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row className='justify-content-between'>
        <Col xl='4' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='role-select'>Role</Label>
            <Select
              isClearable={false}
              value={currentRole}
              options={roleOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
              onChange={handleRoleFilter}
            />
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Add New User
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)
  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarEditOpen, setSidebarEditOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select role...' })
  
  const [selectedUser, setSelectedUser] = useState('')
  
// ** Function to toggle sidebar
const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
const toggleSidebarEdit = () => setSidebarEditOpen(!sidebarEditOpen)

const handleRoleFilter = (data) => {
  setCurrentRole(data)
  console.log(data)

  dispatch(getListUser(
    {
      search: searchTerm,
      order_by: `${sortColumn} ${sort}`,
      limit: rowsPerPage,
      skip: (currentPage - 1) * 10,
      role_id: data.value,
      is_deleted: false
    }
  )).then((result) => {
    console.log(result)
    return result.payload.data.data
  }).catch((err) => {
    console.log(err)
  })
}
// ** Table data to render
  const dataToRender = () => {
    dispatch(getListUser({is_deleted: false})).then((result) => {
      console.log(result)
      return result.payload.data.data
    }).catch((err) => {
      console.log(err)
    })

  }
  // ** Get data on mount
  useEffect(() => {
    dataToRender()

  }, [])//dispatch, store.data.length, sort, sortColumn, currentPage

  
  // ** Function in get data on page change
  const handlePagination = page => {
   
    setCurrentPage(page.selected + 1)

    dispatch(getListUser(
      {
        search: searchTerm,
        order_by: `${sortColumn} ${sort}`,
        limit: value,
        skip: (page.selected - 1) * 10,
        role_id: currentRole.value,
        is_deleted: false
      }
    )).then((result) => {
      console.log(result)
      return result.payload.data.data
    }).catch((err) => {
      console.log(err)
    })
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
   
    console.log(value)
    setRowsPerPage(value)
   
    dispatch(getListUser(
      {
        search: searchTerm,
        order_by: `${sortColumn} ${sort}`,
        limit: value,
        skip: (currentPage - 1) * 10,
        role_id: currentRole.value,
        is_deleted: false
      }
    )).then((result) => {
      console.log(result)
      return result.payload.data.data
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleFilter = val => {
    setSearchTerm(val)
    
    dispatch(getListUser(
      {
        search: val,
        order_by: `${sortColumn} ${sort}`,
        limit: rowsPerPage,
        skip: (currentPage - 1) * 10,
        role_id: currentRole.value,
        is_deleted: false
      }
    )).then((result) => {
      console.log(result)
      return result.payload.data.data
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    console.log(sortDirection + column.sortField)
    console.log(`${sort  } ${  sortColumn}`)

    dispatch(getListUser(
      {
        search: searchTerm,
        limit: rowsPerPage,
        order_by: `${sortColumn} ${sort}`,
        skip: (currentPage - 1) * 10,
        role_id: currentRole.value,
        is_deleted: false
      }
    )).then((result) => {
      console.log(result)
      return result.payload.data.data
    }).catch((err) => {
      console.log(err)
    })
  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }  


  return (
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable            
            noHeader
            subHeader
            onRowDoubleClicked={(row) => {
              toggleSidebarEdit()
              console.log(row)
              setSelectedUser(row.id)
            }}
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={store.data}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                handleRoleFilter={handleRoleFilter}
                currentRole={currentRole}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <SidebarEditUser open={sidebarEditOpen} toggleSidebar={toggleSidebarEdit} userid={selectedUser}/>
    </Fragment>
  )
}

export default UsersList

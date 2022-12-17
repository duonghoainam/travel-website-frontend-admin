/* eslint-disable no-unused-vars */
// ** React Imports
import { useEffect, Fragment, useState, forwardRef } from 'react'
// ** Table Data & Columns
import { getData } from '../store'
import { VictMockData, data, columns, reOrderColumns, VictMockDataSmall } from './columns'
import { useDispatch, useSelector } from 'react-redux'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'
import ViewDetailModal from './ViewDetailModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'

const DataTableWithButtons = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('DESC')  
  const [sortColumn, setSortColumn] = useState('id')

  const [currentPage, setCurrentPage] = useState(0)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [modal, setModal] = useState(false)
  const [modalDetail, setModalDetail] = useState(false)

  useEffect(() => {
    dispatch(
      getData({
        oder_by: (sortColumn.concat(" ", sort.toUpperCase())),
        search: value,
        skip: currentPage,
        limit: (rowsPerPage)
      })
    )
  }, [dispatch, store.data?.length])
  // ** Function to handle Modal toggle
  const handleModalDetail = (_row, _e) => {
    setModalDetail(!modalDetail)
  }
  const handleModal = (_row, _e) => {
    setModal(!modal)
  }

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        oder_by: (sortColumn.concat(" ", sort.toUpperCase())),
        search: val,
        skip: currentPage,
        limit: (rowsPerPage)
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        oder_by: (sortColumn.concat(" ", sort.toUpperCase())),
        search: value,
        skip: currentPage,
        limit: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handlePagination = page => {
    dispatch(
      getData({
        oder_by: (sortColumn.concat(" ", sort.toUpperCase())),
        search: value,
        skip: currentPage,
        limit: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      search: value,
      status: statusValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data?.length > 0) {
      return store.data
    } else if (store.data?.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData?.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        oder_by: (column.sortField.concat(" ", sortDirection.toUpperCase())),
        search: value,
        skip: currentPage,
        limit: rowsPerPage
      })
    )
  }

  return (
    <Fragment>
      <Card>
        <Row className='justify-content-end mx-0 mb-50'>
          <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='d-flex align-items-center me-2'>
              <label className='h2 d-flex align-items-center mb-0'>Blog</label>
            </div>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add Record</span>
            </Button>
          </Col>  
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12' sx={{marginBottom: "14px"}}>
            <div className='d-flex align-items-center me-1 ms-2 mb-50 dataTable-filter'>
              <label htmlFor='rows-per-page'>Show</label>
              <Input
                type='select'
                id='rows-per-page'
                value={rowsPerPage}
                onChange={handlePerPage}
                className='form-control ms-50 pe-3'
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
              </Input>
            </div>
            <Label className='me-1 ms-2' for='search-input' sx={{marginLeft: "20px"}}>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={value}
              onChange={e => handleFilter(e.target.value)}
            />
          </Col>
        </Row>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            onRowDoubleClicked = {(row, e) => handleModalDetail(row, e)}
            // selectableRows
            columns={columns}
            responsive={true}
            onSort={handleSort}
            defaultSortField='invoiceId'
            data={dataToRender()}
            paginationPerPage={rowsPerPage}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage}
            // selectableRowsComponent={BootstrapCheckbox}
            // data={searchValue.length ? filteredData : data}
          />
        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
      <ViewDetailModal open={modalDetail} handleModal={handleModalDetail} />
    </Fragment>
  )
}

export default DataTableWithButtons

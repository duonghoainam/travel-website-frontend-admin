// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from 'reactstrap'
import TableWithButtons from './TableWithButtons'
import DataTableWithButtons from '../../../tables/data-tables/basic/TableExpandable'


import '@styles/react/libs/tables/react-dataTable-component.scss'
const VictPlugOutManagement = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <TableWithButtons />
          <DataTableWithButtons/>
        </Col>
      </Row>
    </Fragment>
  )
}

export default VictPlugOutManagement

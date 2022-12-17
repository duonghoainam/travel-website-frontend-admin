// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from 'reactstrap'
import TableWithButtons from './TableWithButtons'

import '@styles/react/libs/tables/react-dataTable-component.scss'
const VictMonitoringManagement = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <TableWithButtons />
        </Col>
      </Row>
    </Fragment>
  )
}

export default VictMonitoringManagement

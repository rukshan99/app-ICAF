import React, { lazy } from 'react';
import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CCallout
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

  import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const Dashboard = () => {
    return (
      <>
        <WidgetsDropdown />
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">Traffic</h4>
                <div className="small text-muted">November 2017</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton color="primary" className="float-right">
                  <CIcon name="cil-cloud-download"/>
                </CButton>
                <CButtonGroup className="float-right mr-3">
                  {
                    ['Day', 'Month', 'Year'].map(value => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))
                  }
                </CButtonGroup>
              </CCol>
            </CRow>
            <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
          </CCardBody>
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="success"
                  value={40}
                />
                </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      </>
  )
}
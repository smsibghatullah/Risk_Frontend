import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import _nav from 'src/_nav';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import { 
  CCard,
  CCardBody,  
  CCol,
  CRow, 
  CContainer, CButton, CCardTitle, CCardText
} from '@coreui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import UsersService from 'src/services/users.service';


const CommonHome = () => {
    const navigate=useNavigate();

const ActiveUser = useRecoilValue(activeUserAtom);


  useEffect(()=>{ 
       
   }, [ActiveUser]);



  return (
    <>
    <CContainer style={{ "marginLeft": '0px'}} xxl>
      <CRow  >
          <CCol sm={6} lg={6}>
                <h1> GRC Dashboard </h1>
          </CCol>
          <CCol sm={6} lg={6}>
              
          </CCol>
      </CRow>
    </CContainer>

    <CContainer style={{ "min-height": "50vh", "marginLeft": '0px'}}>
   
                <CRow >
                {UsersService.hasPermission('risk_dashboard') && 
    <CCol style={{'padding': '10px' }} sm={4} lg={4}>
          <CCard style={{'background':'red','min-height':'30vh'}} color="success">
          <span className='divcorner'  style={{'min-height':'30vh', 'margin':'-2px' }}>              
                <CRow className="g-0">

                    <CCol md={8}>
                        <CCardBody>
                            <CCardTitle style={{width:275}}>Enterprise Risk Management</CCardTitle>
                            <hr></hr>
                            <CCardText style={{'minHeight':'20px'}}> View Risk Management</CCardText>
                            <Link to="/RiskDashboard">
                               <CButton  style={{'float': 'right'}} color="success" variant="outline">Go To Risk <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}></i></CButton>
                            </Link>
                        </CCardBody>
                    </CCol>
                </CRow>
            </span>
          </CCard>
    </CCol>
}
    {UsersService.hasPermission('audit_plan') && 
    <CCol style={{'padding': '10px' }} sm={4} lg={4}>
          <CCard style={{'background':'green','min-height':'30vh'}} color="danger">
          <span className='divcorner'  style={{'min-height':'30vh', 'margin':'-2px' }}>              
                <CRow className="g-0">

                    <CCol md={8}>
                        <CCardBody>
                            <CCardTitle style={{width:275}}>Internal Audit Management</CCardTitle>
                            <hr></hr>
                            <CCardText style={{'minHeight':'20px'}}>View Audit Management</CCardText>
                            <Link to="/Audit_plan">
                                 <CButton  style={{'float': 'right'}} color="danger" variant="outline">Go To Audit <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}></i></CButton>
                            </Link>
                        </CCardBody>
                    </CCol>
                </CRow>
            </span>
          </CCard>
    </CCol>}

    {UsersService.hasPermission('policy_dashboard') && 
      
    <CCol style={{'padding': '10px' }} sm={4} lg={4}>
        <CCard style={{'min-height':'30vh'}} color="primary">
            <span className='divcorner'  style={{'min-height':'30vh', 'margin':'-2px' }}>              
                <CRow className="g-0">

                    <CCol md={8}>
                        <CCardBody>
                            <CCardTitle style={{width:316}}>Policy and Regulatory Compliance</CCardTitle>
                            <hr></hr>
                            <CCardText style={{'minHeight':'20px'}}>View Policies  </CCardText>
                            <Link to="/policydashboard">
                            <CButton  style={{'float': 'right'}} color="primary" variant="outline">Go To Policy <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}></i></CButton>
                            </Link>
                        </CCardBody>
                    </CCol>
                </CRow>
            </span>
      </CCard>
        
    </CCol>
    }
    
   
   
  </CRow>
  </CContainer>
    <CContainer style={{ "min-height": "50vh"}} xxl>
    </CContainer>
    </>
  )
}

export default CommonHome

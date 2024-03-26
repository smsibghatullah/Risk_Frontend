import React, { useState ,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import "./pages.css"
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext'

import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
import axios from 'axios'

function Forgot_Password(){
    const toast = useRef(null);
    const [Email, setEmail] = useState("");

    const accept = () => {
      postData()
        // toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'Thank you for submitting your email address to reset your password. Please check your inbox for an email with further instructions.', life: 5000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    let postData=()=>{

      axios.post(`${API_URL}/forgot-password/`, { email: Email, })
      .then((success) => {
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: success.data.success, life: 5000 });
       
      }).catch((err) => {
       
        toast.current.show({ severity: 'info', summary: '', detail: err.response.data.error, life: 3000 });

      })
    
    }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center back_image" style={{height:'100%'}}>
      <CContainer>
      <Toast ref={toast} />
      <ConfirmDialog />
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup className='cards'>
              <CCard className="p-4">
                <CCardBody>
                  <CForm >
                                        <center style={{marginBottom:40}} >
                  <Image src={require('../../../assets/images/avatars/GR-CONNECT.png')} zoomSrc={require('../../../assets/images/avatars/GR-CONNECT.png')} alt="Image"     width="259px" /></center>
                    <h3>Forgot Password</h3>
                    <p className="text-medium-emphasis">Enter your Email</p>
                    <CInputGroup className="mb-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-at"></i>
                            </span>
                            <InputText value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" tooltip="Enter your Email" required autoComplete="username"/>
                        </div>
                                            </CInputGroup>
                    <CRow>
                    <CCol xs={6}>
                      {/* <Link to="/dashboard"> */}
                        <CButton variant="outline" color="primary" onClick={confirm1}  className="px-4">
                         Send
                        </CButton>
                        {/* </Link> */}
                      </CCol>
                      <CCol xs={6} className="text-right mt-2">
                       <Link to="/" > 
                        <h6>Login?</h6>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-dark bg-dark  py-5 register_back" style={{height:400,backgroundColor:'blue'}}>
                <CCardBody className="text-center">
                 
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Forgot_Password

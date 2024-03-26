import React, { useState ,useEffect,useRef} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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


function Reset_Password(){
    const toast = useRef(null);
    const routeParams = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
      console.log(" ====> ", routeParams.token)
      setToken(routeParams.token)
    },[routeParams])


    const [Email, setEmail] = useState("");
    const [Token, setToken] = useState(routeParams.token);
    const [Password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");

    const accept = () => {
      if(Password == CPassword){

        postData()
      }else{

        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'password and confirm password should be same.', life: 5000 });
      }
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

      axios.post(`${API_URL}/reset-password/`, {
         email: Email, 
         password: Password,
         password_reset_token: Token
        })
      .then((success) => {
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: success.success, life: 5000 });
        // navigate('/');
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
                    <center>
                  <Image src={require('../../../assets/images/avatars/GR-CONNECT.png')} zoomSrc={require('../../../assets/images/avatars/GR-CONNECT.png')} alt="Image" height="200px"  /></center>
                  <CRow>
                    <h3>Reset Password</h3>
                    <CInputGroup className="mb-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-at"></i>
                            </span>
                            <InputText value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" tooltip="Enter your Email" required autoComplete="username"/>
                        </div>
                                            </CInputGroup>
                    </CRow>
                    <CRow>
                    <CInputGroup className="mb-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText type={'password'} value={Password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" tooltip="Enter your Password" required autoComplete="password"/>
                        </div>
                                            </CInputGroup>
                    </CRow>
                    <CRow>
                    <CInputGroup className="mb-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText type={'password'} value={CPassword} onChange={(e)=>setCPassword(e.target.value)} placeholder="Confirm Password" tooltip="Enter your Confirm Password" required autoComplete="password"/>
                        </div>
                                            </CInputGroup>
                    </CRow>
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
              <CCard className="text-dark bg-dark  py-5 register_back" style={{height:540,backgroundColor:'blue'}}>
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

export default Reset_Password

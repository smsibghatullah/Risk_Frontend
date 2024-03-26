import React, { useState ,useEffect,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { Toast } from 'primereact/toast';
import UsersService from 'src/services/users.service'
import { useRecoilState } from 'recoil'
import { activeUserAtom } from 'src/_state/activeUserAtom'
import "./pages.css"

import { Image } from 'primereact/image';
import { Button } from '@coreui/coreui'
import { InputText } from 'primereact/inputtext'
        
import { getSecrets } from "src/config";
 const API_URL = getSecrets.API_URL
function Login(){
const [UserName,setUserName] = useState("")
const [Password,setPassword] = useState("")
const [ActiveUser, setActiveUser] = useRecoilState(activeUserAtom);
const navigate=useNavigate();
const handlename =(e)=>{
  setUserName(e.target.value)
}
const handlepassword =(e)=>{
  setPassword(e.target.value)
}
const toast = useRef(null);
let postData=()=>{
     
      axios.post(API_URL+'/api-token-auth/',{
       username: UserName, 
       password: Password, 
        }).then((success) => {
            console.log("api-token-auth ==> ", success.data);
            localStorage.setItem('token',success.data.token);
            
            // debugger;

            let _activeUser = {...ActiveUser};
            _activeUser['token'] = success.data.token;
            setActiveUser(_activeUser);
            fetchUserDetails(success.data.user_id, success.data.token);
           

         
        }).catch((err) => {
          toast.current.show({ severity: 'info', summary: '', detail: 'Your Email and Password are invalid', life: 3000 });
        })
    }

  const fetchUserDetails = (userId, userToken) => {
      console.log("fetchUserDetails :");
      let useServiceApi = new UsersService;
        useServiceApi.fetchUserDetails(userId, userToken).then((res) => { 
        setActiveUser(res.data);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user',JSON.stringify(res.data))
        navigate('/Home')
    }).catch((err) => { }); 
  }
     
  useEffect(() => {
    postData()
  }, [])
    
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center back_image" style={{height:'100%'}}>
      <CContainer>
      <Toast ref={toast} />
        <CRow className="justify-content-center ">
          <CCol md={8}>
            <CCardGroup className='cards'>
              <CCard className="p-4 " style={{    height: 451}} >
                <CCardBody>
                  <CForm >
                    <center style={{marginBottom:40}} >
                  <Image src={require('../../../assets/images/avatars/GR-CONNECT.png')} zoomSrc={require('../../../assets/images/avatars/GR-CONNECT.png')} alt="Image"     width="259px" /></center>
                    <h3>Login</h3>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Username" tooltip="Enter your username" onKeyPress={(e) => e.key === 'Enter' ? postData() : null} onChange={handlename} required="required" value={UserName}  autoComplete="username"/>
                        </div>
                                            </CInputGroup>
                    <CInputGroup className="mb-4">
                       <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText type='password' placeholder="Password" tooltip="Enter your Password" onKeyPress={(e) => e.key === 'Enter' ? postData() : null} value={Password} required="required"   onChange={handlepassword}  autoComplete="username"/>
                        </div>
                    </CInputGroup>
                    <CRow>
                    <CCol xs={6}>
                      {/* <Link to="/dashboard"> */}
                        <CButton color="primary" variant="outline" onKeyPress={(e) => e.key === 'Enter' ? postData() : null} onClick={postData} className="px-4">
                          Login
                        </CButton>
                        {/* </Link> */}
                      </CCol>
                      <CCol xs={6} className="text-right mt-2">
                       <Link to="/Forgot_Password" > 
                        <h6 style={{width:132}}>Forgot Password?</h6>
                        </Link>
                    {/* <Link to="/register" >
                      <CButton color="primary"  active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-dark bg-white  py-5 register_back"  >
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

export default Login

import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token=getSecrets.token
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
} from '@coreui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

function DepartmentView(){
  const [Data,setData]=useState([])

  const navigate=useNavigate();
  let params=useParams()

  useEffect( ()=>{
    if(!localStorage.getItem('token')){
      navigate("/")
    }
    (async ()=>{
        let result=await fetch(API_URL+`/department/${params.id}/`);
        result=await result.json();
        setData(result)} ) ();
 },[]);

  return (
    <CRow>
      <CCol className="" xs={12}> 
    
      <CCard className="p-3">
      <CCardHeader>
          <h3  style={{fontWeight:400}}> Department<span className="" style={{float:"right"}}> <Link to="/Department"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
          </CCard>
          </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
         
          <CCardBody>
            <CForm >
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput
                  disabled
                  defaultValue={Data.name}
                    type="text"
                  />
                </CCol>
              </div>
             
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Slug</CFormLabel>
                  <CFormInput 
                  disabled
                    type="text"
                    defaultValue={Data.slug}
                  />
                </CCol>
              </div>
              
            </CForm>



            </CCardBody>

     
      </CCard>
      </CCol>



    </CRow>
  )
}

export default DepartmentView

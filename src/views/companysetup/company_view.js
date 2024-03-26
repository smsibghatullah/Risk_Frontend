import React, { useState,useEffect,useRef } from 'react'
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token=getSecrets.token
import {
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
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
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'

function Company_setup_view(){
  const [Data,setData] =useState([])
  const [ Departments,setDepartments] =useState([""])
  const navigate=useNavigate()


 //popup

 const toast = useRef(null);


 

const [Data1,setData1] =useState([])
let params=useParams()
let department_data=()=>{
  var config = {
    method: 'get',
    url: API_URL+`/department/`,
    headers: { 
      'Authorization': token, 
    },
  };
  axios(config)
  .then((res) => {
    setData1(res.data.filter(i => Data['departments'].includes(i.id)));
  }).catch((err) => {
   
  })
}
async function company_data(){
  let result=await fetch(API_URL+`/companysetup/${params.id}/`);
  result=await result.json();
  setData(result)
}


useEffect(() => {
  department_data()
}, [Data]);

 useEffect( ()=>{
  if(!localStorage.getItem('token')){
    navigate("/")
  }
    company_data()
 },[]);
  return (
    <CRow>
       <Toast ref={toast} />
      <CCol className="mb-4" xs={12}>
     
        <CCard className="p-3">
          <CCardHeader>
          <h3  className=''>Company Setup <span className="" style={{float:"right"}}> <Link to="/company-setup"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
          <CCardBody>
            <CForm >
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Company Name</CFormLabel>
                  <CFormInput defaultValue={Data.name} 
                    type="text"
                    disabled
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Company Name"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Company Industry</CFormLabel>
                <CFormSelect disabled defaultValue={Data.industry}  className="mb-3" aria-label="Large select example">
                  <option>{Data.industry}</option>
                  <option value="Investment Management">Investment Management</option>
                  <option value="Finance Company">Finance Company</option>
                  <option value="Trading">Trading</option>
                  <option value="Services">Services</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Real Estate">Real Estate</option>
                </CFormSelect>
                </CCol>
              </div> 
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Company Departments</CFormLabel>
                 <CFormSelect multiple disabled  aria-label="Default select example" defaultValue={Data1.name} >
                  {
                    Data1.map(item=>{
                      return(
                  <option key={item.id}>{item.name}</option> 
                      )
                    
                    })
                  }
                    
                 
                   </CFormSelect>
                   </CCol>
                 
              </div> 
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Business Type</CFormLabel>
                <CFormInput defaultValue={Data.business_type} 
                  type="text"
                  disabled
                  id="exampleFormControlInput2"
                  placeholder="Company Type"
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
export default Company_setup_view


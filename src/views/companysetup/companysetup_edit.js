import React, { useState,useEffect,useRef } from 'react'
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token=getSecrets.token
import { MultiSelect } from 'primereact/multiselect';
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

function Company_setup_edit(){
  const [ Name,setName] =useState("")
  const [OptionSelect,setOptionSelect]=useState("select one or more options")
  const [ industry,setindustry] =useState("")
  const [ departments,setdepartments] =useState("")
  const [ business_type,setbusiness_type] =useState("")
  const [Data,setData] =useState([])
  const [ Departments,setDepartments] =useState([])
  const navigate=useNavigate()
const handleName = (e) =>{
  setName(e.target.value)
}
const handleindustry = (e) =>{
  setindustry(e.target.value)
}
const handlebusiness_type = (e) =>{
  setbusiness_type(e.target.value)
}
 //popup

 const toast = useRef(null);

let updateData=(event = null)=>{
  if (updateData.length) {
    // Show an error message to the user
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have updated', life: 3000 });
    return;
  }
console.log(Name,industry,departments,business_type)
  axios.patch(API_URL+`/companysetup/${params.id}/`,{
    name: Name,
    industry: industry,
    departments: Departments,
    business_type: business_type
  }).then((success) => {
      setData(success)
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have updated', life: 3000 });
   setTimeout(()=>{navigate("/company-setup")},[1000])
    }).catch((err) => {
      toast.current.show({ severity: 'info', summary: '', detail: 'Update All Fields ', life: 3000 });
    })
 
}
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
    setData1(res.data);
  }).catch((err) => {
   
  })
}
async function company_data(){
  let result=await fetch(API_URL+`/companysetup/${params.id}/`);
  result=await result.json();
  setName(result.name);
  setindustry(result.industry);
  setDepartments(result.departments)
  setbusiness_type(result.business_type)
  setData(result)
}




 useEffect( ()=>{
  if(!localStorage.getItem('token')){
    navigate("/")
  }
    company_data()
  department_data()
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
            <CForm onSubmit={(event) => updateData(event)}>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Company Name</CFormLabel>
                  <CFormInput Value={Name} onChange={handleName }
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Company Name"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Company Industry</CFormLabel>
                <CFormSelect Value={industry} onChange={handleindustry} className="mb-3" aria-label="Large select example">
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
                <MultiSelect key={Data1} placeholder={OptionSelect} style={{width:"100%"}} display="chip" optionLabel="name" optionValue="id" value={Departments}  options={Data1} onChange={(e)=>{setDepartments(e.value)}} />
                   </CCol>
                 
              </div> 
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Business Type</CFormLabel>
                <CFormInput Value={business_type} onChange={ handlebusiness_type}
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="Company Type"
                />
                </CCol>
              </div>

             
            </CForm>
          </CCardBody>
          <div className='mb-3 d-flex justify-content-center'>
          <Button type='submit' style={{background:"#64748B"}} onClick={(event) => updateData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
      </div>
        </CCard>
      </CCol>
   
    </CRow>
  )
}
export default Company_setup_edit


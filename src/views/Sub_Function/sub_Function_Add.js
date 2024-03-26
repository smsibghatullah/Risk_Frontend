import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
const token = getSecrets.token()
const API_URL = getSecrets.API_URL
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
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

var Sub_Add_Function = (prop)=> {
  const [ Name,setName] =useState("")
  const [ slug,setslug] =useState("")
  const [ department,setdepartment] =useState("")
  const [Data,setData] =useState([])
 
  const navigate=useNavigate();
  const handleName = (e) =>{
    setName(e.target.value)
  }
  const handleslug = (e) =>{
    setslug(e.target.value)
  }
  const handledepartment=(e)=>{
    setdepartment(e.target.value)
  }

  const toast = useRef(null);


let postData=(event = null)=>{
  if (postData.length) {
    // Show an error message to the user
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
    return;
  }
  console.log(Name,slug)
    axios.post(API_URL+'/subdepartment/',{
      name: Name,
      slug: Name,
      department: prop.department || department
    }).then((success) => {
        setData(success)
       
        if(!prop.ispopup){

          setTimeout(()=>{navigate("/Sub_Function")},[1000])
        }else{
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
          prop.setVisible(false);
        }
      }).catch((err) => {
        toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
      })
  }
 
  const [Data1,setData1] =useState([])

let department_data=()=>{
  var config = {
    method: 'get',
    url: API_URL+'/department/',
    headers: { 
      "Authorization":token
    }
  };
  axios(config).then((res) => {
      setData1(res.data)
        }).catch((err) => {
        
        })
}
    
  useEffect(() => {
   department_data();
    
  }, [])

  return (
    <CRow>
       <Toast ref={toast} />
      <CCol xs={12}>
        <CCard className="p-3">
          {!prop.ispopup && 
        <CCardHeader >
          <h3  style={{fontWeight:400}}>Sub Function<span className="" style={{float:"right"}}> <Link to="/Sub_Function"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
        </CCardHeader>
          }
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)} >
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Sub Function Name</CFormLabel>
                  <CFormInput onChange={handleName}
                    type="text"
                    placeholder="Sub Function"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                 <CFormSelect disabled={prop.department} value={prop.department || department} onChange={handledepartment} onKeyPress={(e) => e.key === 'Enter' ? postData() : null} aria-label="Default select example">
                      <option>Select</option>
                   {
                      Data1.map((item)=>{ 
                  return(
                      <option value={item.id}>{item.name}</option>
                       );
                           })
                   }
                   </CFormSelect>
                   </CCol>
              </div> 
              {/* <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Slug</CFormLabel>
                  <CFormInput onChange={handleslug}
                  onKeyPress={(e) => e.key === 'Enter' ? postData() : null}
                    type="text"
                    placeholder="Slug"
                  />
                </CCol>
              </div> */}
               <div className='mb-3 d-flex justify-content-center'>
      <Button
  onKeyPress={(e) =>
    e.key === 'Enter' ? (e.target.type = 'submit') : null
  }
  type="button" // Set initial type to "button"
  style={{ background: '#64748B' }}
  icon="pi pi-check"
  label="Confirm"
  onClick={(event) => postData(event)}
  className="mr-2"
></Button>
             </div>
            </CForm>



            </CCardBody>

     
      </CCard>
      </CCol>
    </CRow>
  )
}

export default Sub_Add_Function

import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
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
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'

function Sub_edit_Function(prop){
  const [ Name,setName] =useState("")
  const [ department,setdepartment] =useState("")
  const [ slug,setslug] =useState("")
  const [Data,setData] =useState([])
  const API_URL = getSecrets.API_URL
  const token=getSecrets.token()
  let params=useParams()
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
   //popup
 const toast = useRef(null);

let updateData=(event = null)=>{
  if (updateData.length) {
    // Show an error message to the user
    toast.current.show({ severity: 'error', summary: 'Success', detail: 'You have submitted', life: 3000 });
    return;
  }
  console.log(Name,slug)
    axios.patch(API_URL+`/subdepartment/${prop.id||params.id}/`,{
      name: Name,
      slug: Name,
      department:department
    }).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      // setTimeout(()=>{navigate("/Sub_Function")},[1000]) 
      prop.setVisible(false)
      setData(success)
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
   
    (async ()=>{
        let result=await fetch(API_URL+`/subdepartment/${prop.id||params.id}/`);
        result=await result.json();
        setName(result.name);
        setslug(result.slug)
        setdepartment(result.department)
        setData(result)} ) ();
    if(!localStorage.getItem('token')){
      navigate("/")
    }
    department_data()
  }, [])
  return (
    <CRow>
      <Toast ref={toast} />
      <CCol className="" xs={12}> 
      {!prop.ispopup && 
      <CCard className="p-3">
      <CCardHeader>
            <h3  style={{fontWeight:400}}>Sub Function<span className="" style={{float:"right"}}> <Link to="/Sub_Function"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
          </CCard>
}
          </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={(event) => updateData(event)}>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Sub Function Name</CFormLabel>
                  <CFormInput onChange={handleName}
                  Value={Name}
                  onKeyPress={(e) => e.key === 'Enter' ? updateData() : null}
                    type="text"
                    placeholder="Sub Function"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                 <CFormSelect disabled value={prop.department || department} onChange={handledepartment} onKeyPress={(e) => e.key === 'Enter' ? postData() : null} aria-label="Default select example">
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
                  onKeyPress={(e) => e.key === 'Enter' ? updateData() : null}
                  Value={slug}
                    type="text"
                    placeholder="Slug"
                  />
                </CCol>
              </div> */}
            </CForm>
            </CCardBody>
      <div className='mb-3 d-flex justify-content-center'>
      <Button onKeyPress={(e) => e.key === 'Enter' ? updateData() : null} type='submit' style={{background:"#64748B"}} onClick={(event) => updateData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
             </div>
      </CCard>
      </CCol>
    </CRow>
  )
}

export default Sub_edit_Function

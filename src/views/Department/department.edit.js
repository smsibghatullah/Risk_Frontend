import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
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
  CFormFeedback
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

function Departmentedit(prop){
  const [isValid, setIsValid] = useState(true);
  const [Data,setData]=useState([])
  const [ Name,setName] =useState("")
  const [ slug,setslug] =useState("")
  const handleName = (e) =>{
    setName(e.target.value)
    if (e.target.value === "") {
      setIsValid(false);
      setErrorMessage("Name field cannot be empty.");
  } else {
      setIsValid(true);
      setErrorMessage('');
      setName(e.target.value)
  }
  }
  const handleslug = (e) =>{
    setslug(e.target.value)
    if (e.target.value === "") {
      setIsValid(false);
      setErrorMessage("Name field cannot be empty.");
  } else {
      setIsValid(true);
      setErrorMessage('');
      setName(e.target.value)
  }
  }
 //popup
 const toast = useRef(null);
  const navigate=useNavigate();
  let params=useParams()
  let updatedata =  (event = null) => {
    if (updatedata.length) {
      // Show an error message to the user
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have updated', life: 3000 });
      return;
    }
    console.log(Name,slug)
    axios.patch(API_URL+`/department/${prop.id || params.id}/`,{
      name: Name,
      slug: Name
    }).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have updated', life: 3000 });
        prop.setVisible(false)
        // setTimeout(()=>{navigate("/Department")},[1000])
      }).catch((err) => {
        toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
      })
   };
  useEffect( ()=>{
    if(!localStorage.getItem('token')){
      navigate("/")
    }
    (async ()=>{
      let result=await fetch(API_URL+`/department/${prop.id || params.id}/`);
      result=await result.json();
      setName(result.name);
      setslug(result.name)
      setData(result)} ) ();
 },[]);


  return (
    <CRow>
       <Toast ref={toast} />
      <CCol className="" xs={12}> 
      {!prop.ispopup && 
      <CCard className="p-3">
      <CCardHeader>
          <h3  style={{fontWeight:400}}> Department<span className="" style={{float:"right"}}> <Link to="/Department"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
          </CCard>
}
          </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
         
          <CCardBody>
            <CForm onSubmit={(event) => updatedata(event)}>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput
                  onChange={handleName}
                  Value={Name}
                    type="text"
                    placeholder="Name     "
                    className={isValid ? '' : 'is-invalid'}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid Department.</CFormFeedback>
                </CCol>
              </div>
             
              {/* <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Slug</CFormLabel>
                  <CFormInput 
                  onChange={handleslug}
                    type="text"
                    Value={slug}
                    placeholder="Slug    "
                    className={isValid ? '' : 'is-invalid'}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid Slug.</CFormFeedback>
                </CCol>
              </div> */}
              
            </CForm>



            </CCardBody>

      <div className='mb-3 d-flex justify-content-center'>
      <Button type='submit' style={{background:"#64748B"}} onClick={(event) => updatedata(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
             </div>
      </CCard>
      </CCol>



    </CRow>
  )
}

export default Departmentedit

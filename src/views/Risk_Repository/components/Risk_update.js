import {useState,React,useEffect,useRef} from 'react'
import axios from 'axios';
import { getSecrets } from "src/config";
import { CCol, CRow,  CButton, CForm, CFormLabel,  CFormInput, CFormTextarea, CFormSelect ,CCardHeader,CCard,CCardBody} from '@coreui/react'
const API_URL = getSecrets.API_URL
const token=getSecrets.token()
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import {  useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const RiskUpdate = (props) => {
   const [Data,setData]=useState([])
  let params=useParams()
  const navigate=useNavigate()
  const [ Title,setTitle] =useState("")
  const handletitle = (e) =>{ setTitle(e.target.value) }

  const [ Discription,setDiscription] =useState("")
  const handlediscription = (e) =>{ setDiscription(e.target.value) }

  const [ Department,setDepartment] =useState("")
  const handledepartment = (e) => { console.log("handledepartment",e.target.value); setDepartment(e.target.value) }
 //popup
 const toast = useRef(null);
 let postData=()=>{
    if (postData.length) {
      // Show an error message to the user
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have update', life: 3000 });
      return;
    }
      console.log(Title,Discription)
        axios.put(API_URL+`/risk_repo/${params.id}/`,{
          title: Title,
          description:Discription,
          department_id: Department
          
        }).then((success) => {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have Update', life: 3000 });
          setTimeout(()=>{navigate("/Risk_Repository")},[1000])  
          }).catch((err) => {
            toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
          })
      }
 async function company_data(){
    let result=await fetch(API_URL+`/risk_repo/${params.id}/`);
    result=await result.json();
    setTitle(result.title);
    setDiscription(result.description);
    setDepartment(result.department_id);
    setData(result)
  }
  const [Data1,setData1]=useState([])
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
  useEffect(() => {  company_data();
    department_data()
  }, [])
    return(
      <>
      <Toast ref={toast} />
        <CForm >
        <CRow>
        <CCard className='P-3'>
            <CCardBody>
        <CCardHeader className="mb-3">
          <h3  className=''>Risk Repositry<span className="" style={{float:"right"}}> <Link to="/Risk_Repository"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
               <CCol className="mb-3"> 
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput onChange={handletitle} Value={Title}  type="text"  placeholder="Title"  />
               </CCol>
           
             <CCol className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Company Departments</CFormLabel>
             <CFormSelect onChange={handledepartment} value={Department} aria-label="Default select example"  >
                  
                  {Data1.map(item=>{
                  return(
                 <option value={item.id}>{item.name}</option>
                  )

                  })}
                  
               </CFormSelect>
             </CCol>
             <CCol className="mb-3" > 
            <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
            <CFormTextarea   value={Discription} onChange={handlediscription}  rows="4"></CFormTextarea>
             </CCol>
             <CCol>
             <div className='mb-3 mt-4 d-flex justify-content-center'>
             <Button type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}   icon="pi pi-check" label="Confirm" className="mr-2"></Button>
         </div>
             </CCol>
             </CCardBody>
             </CCard>
        </CRow>
        </CForm>
        
        </>
     )
}

export default RiskUpdate;
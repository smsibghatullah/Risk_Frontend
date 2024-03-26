import {useState,React,useEffect,useRef} from 'react'
import axios from 'axios';
import { getSecrets } from "src/config";
import { CCol, CRow,  CButton, CForm, CFormLabel,  CFormInput, CFormTextarea, CFormSelect } from '@coreui/react'
const API_URL = getSecrets.API_URL
const token=getSecrets.token()
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { useRecoilState } from 'recoil';
import { departmentAtom } from 'src/_state/departmentAtom';

const RiskForm = (props) => {
    const [Data,setData] =useState([])
    const [department, setdepartment ] = useRecoilState(departmentAtom)

    const [ Title,setTitle] =useState("")
    const handletitle = (e) =>{ setTitle(e.target.value) }

    const [ Discription,setDiscription] =useState("")
    const handlediscription = (e) =>{ 
        setDiscription(e.target.value) 
      }

    const [ Department,setDepartment] =useState("")
    const handledepartment = (e) => { console.log("handledepartment",e.target.value); setDepartment(e.target.value) }

    const [Departments,setDepartments] =useState([])
    let department_data=()=>{ 
      var config = {
        method: 'get',
        url: API_URL+'/department/',
        headers: { 
          'Authorization': token 
        },
      };
      axios(config).then((res) => { setdepartment(res.data);  setDepartments(res.data); }).catch((err) => { })}  
  
    useEffect(() => {  department_data()  }, [])
 //popup
 const toast = useRef(null);

    let postData=()=>{
      if (postData.length) {
        // Show an error message to the user
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
        return;
      }
        console.log(Title,Discription)
          axios.post(API_URL+'/risk_repo/',{
            title: Title,
            description:Discription,
            department_id: Department
            
          }).then((success) => {
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
              setData(success)
              props.refreshData();
            }).catch((err) => {
              toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
            })
        }

    return(
      <>
      <Toast ref={toast} />
        <CForm onSubmit={(event) => postData(event)}>
        <CRow>
             
               <CCol > 
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput className='' value={Title} onChange={handletitle}  type="text"  placeholder="Title"  />
               </CCol>
           
             <CCol>
            <CFormLabel htmlFor="exampleFormControlInput1">Company Departments</CFormLabel>
             <CFormSelect className='' onChange={handledepartment} aria-label="Default select example"  >
                  <option>Select</option>
                  {
                  Departments.map((item)=>{ 
                  return( <option key={item.id} value={item.id}>{item.name}</option> );
                       })
                   }
               </CFormSelect>
             </CCol>
             <CCol > 
            <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
            <CFormTextarea value={Discription} onChange={handlediscription}  rows="4"></CFormTextarea>
             </CCol>
        </CRow>
        </CForm>
        <CCol>
             <div className='mb-3 mt-4 d-flex justify-content-center'>
             <Button type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
         </div>
             </CCol>
        </>
     )
}

export default RiskForm;
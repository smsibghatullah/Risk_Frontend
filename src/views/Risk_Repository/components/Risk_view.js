import {useState,React,useEffect,useRef} from 'react'
import axios from 'axios';
import { getSecrets } from "src/config";
import { CCol, CRow,  CButton, CForm, CFormLabel,  CFormInput, CFormTextarea, CFormSelect, CCard, CCardBody,CCardHeader } from '@coreui/react'
const API_URL = getSecrets.API_URL
const token=getSecrets.token
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { departmentAtom } from 'src/_state/departmentAtom';
import { useRecoilValue } from 'recoil';

const RiskView = (props) => {

   const [Data,setData]=useState([])
  let params=useParams()
   
 //popup

 const [Data1,setData1] =useState([])
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
     setData1(res.data.filter(i => Data['department_id']));
   }).catch((err) => {
    
   })
 }
 async function risk_data(){
    let result=await fetch(API_URL+`/risk_repo/${params.id}/`);
    result=await result.json();
    setData(result)
  }
  useEffect(() => {
    department_data();
  }, [Data]);

  useEffect(() => {  risk_data() }, [])
    return(
      <>
        <CForm >
        <CRow>
          <CCard className='P-3'>
            <CCardBody>
        <CCardHeader className="mb-3">
          <h3  className=''>Risk Repositry<span className="" style={{float:"right"}}> <Link to="/Risk_Repository"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
               <CCol className="mb-3"> 
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput disabled defaultValue={Data.title}  type="text"  placeholder="Title"  />
               </CCol>
                <CCol className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Risk Departments</CFormLabel>
                 <CFormSelect disabled  aria-label="Default select example" defaultValue={Data1.name} >
                  {
                    Data1.map(item=>{
                      return(
                  <option key={item.id}>{item.name}</option> 
                      )
                    
                    })
                  }
                    
                 
                   </CFormSelect>
                   </CCol>
             <CCol className="mb-3"> 
            <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
            <CFormTextarea disabled  defaultValue={Data.description}   rows="4"></CFormTextarea>
             </CCol>
             </CCardBody>
             </CCard>
        </CRow>
        </CForm>
       
        </>
     )
}

export default RiskView;
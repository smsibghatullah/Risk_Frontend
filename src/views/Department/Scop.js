import {useState,React,useEffect} from 'react'
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
  CNavItem,
  CNavTitle,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavLink,
} from '@coreui/react'
import CNavbars from '../base/navbars/Navbars';
import {
    BrowserRouter ,
    Routes,
    Switch,
    Route,
    Link,
    useParams,
    useNavigate
  } from "react-router-dom";
  import "./Scop.css"
import axios from 'axios';
import { getSecrets } from "src/config";
import NaVbar from '../Navbar/navbar';
function Scop(){
    const [visible, setVisible] = useState(false)
    const[Data1,setData1]=useState([])
    const[Data,setData]=useState([])
    const[Name,setName]=useState("")
    const[Assigned_To,setAssigned_To]=useState("")
    const[Discription,setDiscription]=useState("")
    const[Objectives,setObjectives]=useState("")
    const API_URL = getSecrets.API_URL
    const navigate=useNavigate();
    const handlename=(e)=>{
    setName(e.target.value)
    }
    const handleassigned_to=(e)=>{
    setAssigned_To(e.target.value)
    }
    const handlediscription=(e)=>{
    setDiscription(e.target.value)
    }
    const handleobjectives=(e)=>{
    setObjectives(e.target.value)
    }
let params=useParams()
console.log(params)
let getdata = ()=>{
    axios.get(API_URL+'/department/').then((res) => {
    console.log(res)
    setData1(res.data)
       console.log(setData)
      }).catch((err) => {
      })
  }
  let audit_data=()=>{
    (async ()=>{
        let result=await fetch(API_URL+'/auditengagement/'+params.id);
        result=await result.json();
        setData(result)} ) ();
  }
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
   getdata()
   audit_data()
  }, [])
  
  return (
    <CCardBody>
    <CForm >
       <div className="mb-3">
            </div>
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Annual Plan</CFormLabel>
                 <CFormSelect disabled onChange={(e)=>handleannual_plan(e.target.value)}  aria-label="Default select example">
                      <option>{Data.allocated_manager}</option>
                   </CFormSelect>
                   </CCol>
            </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput onChange={handlename}
                  disabled
                  defaultValue={Data.name}
                    type="text"
                    name='name'
                    placeholder="Name"
                  />
                </CCol>
            </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Assigned To</CFormLabel>
                  <CFormInput onChange={handleassigned_to}
                  disabled
                  defaultValue={Data.allocated_manager}
                    type="text"
                    placeholder="Search"
                  />
                </CCol>
            </div>
              <div className="mb-3">
              <CCol >
                   <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
                   <CFormTextarea name='discription' disabled defaultValue={Data.description}  onChange={handlediscription}  rows="4"></CFormTextarea>
                   </CCol>
                  </div>
                   <div className="mb-3">
              <CCol >
                   <CFormLabel htmlFor="exampleFormControlInput1">Objectives</CFormLabel>
                   <CFormTextarea disabled name='objectives'defaultValue={Data.objective} onChange={handleobjectives} id="exampleFormControlTextarea1" rows="6"></CFormTextarea>
                   </CCol>
                  </div>
            </CForm>
            </CCardBody>
  )
}
export default Scop

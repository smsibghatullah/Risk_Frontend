import {useState,React,useEffect,useRef} from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { TabView, TabPanel } from 'primereact/tabview';  
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
import axios from 'axios';
import {
    Link,
    useParams,
    useNavigate
  } from "react-router-dom";
  import { getSecrets } from "src/config";
  import "./scop.css"
import AuditProgram from '../Audit_Engagement/Audit_Program';
import { Button } from 'primereact/button';
import UsersService from 'src/services/users.service';
import Audit_Program_List from '../Audit_Engagement/Component_Audit_Repo/Audit_program_list';
import RiskRegisterService from 'src/services/Riskregister.service';
import { useSetRecoilState } from 'recoil';
import { riskAtom } from 'src/_state/riskAtom';
import { Toast } from 'primereact/toast';
import Audit_Planning from '../Audit_Engagement/Component_Audit_Repo/Audit_Planing';
function NaVbar(){
  const [activeIndex, setActiveIndex] = useState(0)
  const [Name,setName]=useState("")
  const [Data,setData]=useState([]);
  const [description,setDescription]=useState('')
  const toast = useRef(null);

  const API_URL = getSecrets.API_URL
  const navigate=useNavigate();
    let params=useParams()
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
    const handledescription=(e)=>{
      setDescription(e.target.value)
    }
   

let getdata = ()=>{
    axios.get(API_URL+`/auditengagement/${params.id}/`).then((res) => {
    setData(res.data)
    setDescription(res.data.description_approval)
       console.log(res.data,'lllkggggggggggg')
      }).catch((err) => {
      })
  }


  let patch_data=()=>{
    axios.put(API_URL+`/auditengagement/${params.id}/`,{
      description_approval:description,
      state:"Approved"
    })
    .then((res) => {toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have Approved', life: 3000 });})
    .catch((err) => {})
  }
  useEffect(()=>{getdata()}, [params])
   useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
  getdata()
 
  }, []) 
  
return(
    <CCard className='p-4'>
        

       
        <h6>{Data.name}</h6>
<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>

    <TabPanel header="Scope">
    <>
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
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
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
                   <CFormTextarea  name='discription' disabled defaultValue={Data.description}  onChange={handlediscription}  rows="4"></CFormTextarea>
                   </CCol>
                  </div>
                   <div className="mb-3">
              <CCol >
                   <CFormLabel htmlFor="exampleFormControlInput1">Objectives</CFormLabel>
                   <CFormTextarea disabled name='objectives'defaultValue={Data.objective} onChange={handleobjectives} id="exampleFormControlTextarea1" rows="6"></CFormTextarea>
                   </CCol>
                  </div>
            </CForm>
            </>
    </TabPanel>
    <TabPanel header='Audit Planning'>
      <>
      <Audit_Planning/>
      </>
    </TabPanel>
    <TabPanel header="Audit Program">
      <>
   <Audit_Program_List/>
    </>
    </TabPanel>
    {/* <TabPanel header="Approval">
      <>
      <Toast ref={toast} />
    <div className="mb-3">
    <CForm onSubmit={(e)=>patch_data(e)}>
                <CCol xs="auto">
                 <CFormLabel>Description</CFormLabel>
                 <CFormTextarea value={description} onChange={handledescription} rows={4}/>
                </CCol>
                </CForm>
              </div>
              <div>
                <CCol>
               
                  { UsersService.hasPermission('audit_engagements_head') &&  
                <Button onClick={(e)=>patch_data(e)} type="submit" style={{background:"green",float:"right"}}   icon="pi pi-check" label="Approved" className="mr-2"></Button>
                }
                </CCol>
              </div>
              </>
    </TabPanel> */}
    {/* <TabPanel header="Back">

    </TabPanel> */}
</TabView>







</CCard>
)}
export default NaVbar
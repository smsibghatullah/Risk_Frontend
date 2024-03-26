import {useState,React,useEffect,useRef, Component} from 'react'
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
  CNavItem,
} from '@coreui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
  json
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import Risklist from 'src/views/risk/Risk';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeCompanyAtom } from 'src/_state/activeCompanyAtom';
import { borderRadius } from '@mui/system';
import { globalEventAtom } from 'src/_state/globalEventAtom';
import { activeUserAtom } from 'src/_state/activeUserAtom';

function getdepartment(){

const ActiveUser = useRecoilValue(activeUserAtom);

const [Data1,setData1] =useState([])
const [Data2,setData2] =useState([])
const navigate=useNavigate()
const [selectedOption, setSelectedOption] = useState(null);
const [activeCompany, setActiveCompany] = useRecoilState(activeCompanyAtom);
const globatEvent = useRecoilValue(globalEventAtom); 

let company_data=()=>{
    var config = {
        method: 'get',
        url: API_URL+'/companysetup/',
        headers: { 
          "Authorization":token
        }
      };
      axios(config).then((res) => { setData2(res.data); setActiveCompany(res.data[0] || {}) }).catch((err) => {})
}

let department_data=()=>{
  var config = {
    method: 'get',
    url: API_URL+'/department/',
    headers: { 
      "Authorization":token
    }
  };
  axios(config).then((res) => {   setData1(res.data.filter(i => Data2[0]['departments'].includes(i.id))) }).catch((err) => {})
}


useEffect(() => {
    department_data();
}, [Data2, ActiveUser]);

useEffect(()=>{
  switch(globatEvent.eventName) {
    case 'updatedepartment':
      company_data();
      department_data();
      break;
    default:
      // code block
  }
}, [globatEvent]);


const handle_Risk=(department_id=null,e)=>{
  setSelectedOption(department_id);
    navigate('./Risk/'+department_id);
    // e.target.style.backgroundColor = 'var(--cui-sidebar-nav-link-active-bg)';
    }

useEffect(() => {
  
   company_data()
    
  }, [])
  
  return (
    <CRow>
              <div className="mb-3 ">
                <CCol>
                {
                      Data1
                      .filter(i => ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic' )
                      .map((item)=>{ 
                  return(  
                    <span className='risk'>   

                    {           
                      <option selected={item.id === selectedOption} key={item.id} className={`mb-3  ${selectedOption === item.id ? "selected" : ""}`} style={{cursor:"pointer",marginLeft:50,padding:3}} onClick={(e)=>{handle_Risk(item.id,e);}} value={item.id}>{item.name}</option>                   
                    } 
                      </span>  
                       );
                           })
                   }

                   {ActiveUser.usertype == 'Department' &&
                      Data1.filter(i =>  JSON.parse(ActiveUser.department).includes(i.id) ).map((item)=>{ 
                  return(  
                    <span className='risk'>   

                    {           
                      <option selected={item.id === selectedOption} key={item.id} className={`mb-3  ${selectedOption === item.id ? "selected" : ""}`} style={{cursor:"pointer",marginLeft:50,padding:3}} onClick={(e)=>{handle_Risk(item.id,e);}} value={item.id}>{item.name}</option>                   
                    } 
                      </span>  
                       );
                           })
                   }
                  
                 </CCol>
              </div> 
    </CRow>
  )
}

export default getdepartment

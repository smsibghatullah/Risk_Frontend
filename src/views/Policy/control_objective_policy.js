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
  useParams
} from "react-router-dom";
import axios from 'axios';
import { TabPanel, TabView } from 'primereact/tabview';
import { useRecoilValue } from 'recoil';
import { selectedPolicyAtom } from 'src/_state/selectedPolicyAtom';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag

function Control_objective_Policy_view(){
const [Data1,setData1] =useState([])
const [Data4,setData4] =useState([])

let control_data=()=>{
    var config = {
        method: 'get',
        url: API_URL+`/controlObject/policy/?policyId=${selectedPolicy.id}`,
        headers: { 
          "Authorization":token
        }
      };
      axios(config).then((res) => { 
        setData4(res.data); }).catch((err) => {})
}

useEffect(() => {
  control_data()
}, []);

const selectedPolicy = useRecoilValue(selectedPolicyAtom); 

  return (
    <>
    <CRow className='mt-4'>
<CCol className="mb-4" xs={12}>
<ConfirmDialog /> 
<CCard className="mb-4">
          <CCardBody>
            <DataTable value={Data4}  showGridlines responsiveLayout="scroll" size="small" >
              <Column alignHeader={'center'} field="description" header="Description" sortable></Column>
              <Column alignHeader={'center'} field="responsible_person" header="Responsible Person" ></Column>
              <Column alignHeader={'center'} field="frequency" header="Frequency" ></Column> 
            </DataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Control_objective_Policy_view

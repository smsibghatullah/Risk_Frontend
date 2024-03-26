import {React,useEffect,useState} from "react";
import { useParams } from "react-router-dom";
const API_URL = getSecrets.API_URL
import { CForm , CFormLabel, CFormInput, CFormTextarea} from '@coreui/react'

import axios from 'axios';
import { getSecrets } from "src/config";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton
  } from '@coreui/react'
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
  import { DocsExample } from 'src/components'
  import CIcon from '@coreui/icons-react'
import RiskRegisterService from "src/services/Riskregister.service";
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import CompanySetupService from "src/services/Companysetup.service";
import AuditengagementService from "src/services/Auditengagement.service";
import RiskrepositoryService from "src/services/RiskRepository.service";


function RiskDataListHistory(props){

const [DataTableList,setDataTableList] =useState([]);
const [globalFilterValue, setGlobalFilterValue] = useState('');
const [DataTableListRepo,setDataTableListRepo] =useState([]);

const [ Title,setTitle] =useState("")
const handletitle = (e) =>{ setTitle(e.target.value) }

const [ Discription,setDiscription] =useState("")
const handlediscription = (e) =>{ setDiscription(e.target.value) }

const routeParams = useParams();
const navigate=useNavigate()

const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
         <span className="mb-3">
         <h3  className=''>Risk Register<span className="" style={{float:"right"}}> </span></h3>
          </span>
          <span className="p-input-icon-left">
         
              <i className="pi pi-search" />
              <InputText onChange={onGlobalFilterChange} value={globalFilterValue}  placeholder="Search Risk" />
          </span>
      </div>
  )
}

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  setGlobalFilterValue(value);
  get_data(value);
}

const header = renderHeader();

const items = (data) => ([
{
  label: "Assessment",
  icon: "pi pi-window-maximize",
  
  command: (e) =>  {
    navigate('/RiskAdd/'+data.id ); 
}

},
{
  label: "Delete",
  icon: "pi pi-times",
  command: (e) => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => delete_record(data),
  });
   
  },
},
]);


let get_data=(parent_id)=>{ 
    let api = new RiskRegisterService;

    api.getChildRisk(parent_id).then((res) => { 
        let risk_list = res.data;
      if(risk_list.length){
        setDataTableList([...DataTableList, ...risk_list]); 
        
      }
    }).catch((err) => { });
}

useEffect(()=>{
  let _id = DataTableList.length > 0 ? DataTableList[DataTableList.length - 1]['id'] : null;
  _id ?  get_data(_id) : "";
}, [DataTableList])

let delete_record = (rowData) => {
let api = new RiskRegisterService;
api.deleteRiskRegister(rowData.id).then((res) => { 
  get_data(); 
  toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
}).catch((err) => { })
}


useEffect(() => {
  if(!localStorage.getItem('token')){
    navigate("/")
  }
  get_data(props.selected.id);
 
 }, []);

 const statusBodyTemplate = (rowData) => {
  return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
 
}



return(
<>
<CCol className="" xs={12}>
      
<ConfirmDialog /> 
<CCard className="mb-4">
          <CCardBody>

            <DataTable value={DataTableList} showGridlines responsiveLayout="scroll" size="small" paginator rows={10} rowsPerPageOptions={[10,20,50]}>
              
              <Column field="title" header="Title" sortable ></Column>
              <Column field="root_cause" header="Description" ></Column>     
              <Column field="inherent_risk_rating_rating" header="Inherent Risk Rating" sortable></Column>     
              <Column field="overall_control_rating" header="Overall Control Rating" sortable></Column>     
              <Column field="residual_risk_scoring_score" header="Residual Risk Scoring" sortable></Column>     
              <Column field="category" header="category" sortable></Column>     
              <Column field="risk_owner" header="Owner" sortable></Column>     
              <Column field="risk_champion" header="Champion" sortable></Column>     
              {/* <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
             
            </DataTable>

          </CCardBody>
</CCard>



      </CCol>
</>

)
}




export default RiskDataListHistory;
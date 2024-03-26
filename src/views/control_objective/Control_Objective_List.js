import {React,useEffect,useState,useRef} from "react";
import axios from 'axios';
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
const API_URL = getSecrets.API_URL
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate

} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import CompanySetupService from "src/services/Companysetup.service";
import SubdepartmentService from "src/services/Subdepartment.service";
import ControlObjectiveService from "src/services/control_objective.service";
import { activeUserAtom } from "src/_state/activeUserAtom";
import { useRecoilValue } from "recoil";
import PolicyService from "src/services/policy.service";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { policyAtom } from "src/_state/policyAtoms";
import { Toast } from 'primereact/toast';

function Control_Objective_List(){
  const navigate=useNavigate();
  const [DataTableList,setDataTableList] =useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const ActiveUser = useRecoilValue(activeUserAtom);
  const globatEvent = useRecoilValue(globalEventAtom);
  const policy = useRecoilValue(policyAtom);
  const toast = useRef(null);

  const getpolicy = (rowData) => {
    console.log(rowData,'rowData')
    const policyIds = Array.isArray(rowData.policy) ? rowData.policy : [];
    const filteredPolicies = policy.filter(item => policyIds.includes(item.id));
    const policyNames = filteredPolicies.map(item => item.name).join("<br><hr>");
    return <div dangerouslySetInnerHTML={{ __html: policyNames }} />;
  }


  const renderHeader = () => {
    return (
        <div className="flex justify-content-between">
           <span className="mb-3">
            <h3  className=''>Control Objectives<span className="" style={{float:"right"}}> 
            {(ActiveUser.is_superuser ||ActiveUser.usertype == 'Department') && 
            <>
               <Link to="/Control_Objective_Form">
                <CButton style={{background:"#64748B",width:100,padding:10}}>Add</CButton>
                </Link>
              <CButton onClick={handleDelete} style={{background:"#64748B",width:100,padding:10,marginLeft:5}}>Delete</CButton>
           
              </>
            }
            </span></h3>
            </span>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText onChange={onGlobalFilterChange} value={globalFilterValue}  placeholder="Keyword Search" />
            </span>
           
        </div>
    )
  }
  
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    get_data(value);
  }
  
  const handleClick = (event) => {
    console.log( event);
    const clickedRowData = event.data;
    const clickedRowId = clickedRowData.id;
    navigate(`/Control_Objective_update/${clickedRowId}/`);
  }
  let delete_record = () => {
    let _data = selectedRows.map(i=>i.id);
    let api = new ControlObjectiveService();
    _data.forEach((id) => {
      api.deleteControlobjective(id)
        .then((res) => {
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
        })
        .catch((err) => {})
    });
  };
  
  const handleDelete = () => {
    if (selectedRows.length > 0) {
      confirmDialog({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: delete_record,
      });
    }else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
    }
  };
  
  const header = renderHeader();
  
  
  const items = (data) => ([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command:(e) =>  navigate(`/Control_Objective_update/${data.id}/` )
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
  
  
  let get_data=(search = "")=>{ 
  let api = new ControlObjectiveService;
  api.getAllControlobjective(search).then((res) => { 
    let _data = res.data;
    _data = _data.map(i=>{ i['policy'] =  getpolicy(i); return i });
    setDataTableList(_data); 
  
  }).catch((err) => { });
  }
  
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
    get_data();
   
   }, [policy])
   const statusBodyTemplate = (rowData) => {
    return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
   ;
  }


  useEffect(()=>{
    switch(globatEvent.eventName) {
      case 'refreshcontrol':
        get_data();
          // code block
          break;
      default:
        // code block
    }
  }, [globatEvent]);
return(
<>
<CCol xs={12} className="mb-4">
<ConfirmDialog /> 
<Toast ref={toast} />
<CCard className="mb-4">
          <CCardBody>
            <DataTable 
            selectionMode={'checkbox'} 
            selection={selectedRows} 
            onSelectionChange={(e) => {setSelectedRows(e.value); console.log(e.value)}} 
            onRowDoubleClick={(e) => { handleClick(e) }}
            value={DataTableList} 
            header={header} 
            showGridlines 
            responsiveLayout="scroll" 
            size="small" paginator 
            rowHover
            rows={10} 
            rowsPerPageOptions={[10,20,50]}>
            <Column   alignHeader={'center'} align="center" selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column   alignHeader={'center'} style={{cursor:'pointer'}} field="title" header="Title" ></Column>
            <Column alignHeader={'center'} style={{cursor:'pointer'}} field="description" header="Description" sortable></Column>
            <Column alignHeader={'center'} style={{cursor:'pointer'}} field="responsible_person" header="Responsible Person" ></Column>
            <Column alignHeader={'center'} style={{cursor:'pointer'}} field="policy" header="Policy" ></Column>
            <Column alignHeader={'center'} style={{cursor:'pointer'}} field="category" header="Category" ></Column>
            {/* <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
            </DataTable>
          </CCardBody>
        </CCard>
      </CCol>
</>
)
}
export default Control_Objective_List;
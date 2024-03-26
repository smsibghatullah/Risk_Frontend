import React, { useState,useEffect } from "react";
import axios from 'axios';
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL

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
  import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import CompanySetupService from "src/services/Companysetup.service";
import DepartmentService from "src/services/Department.service";


function CompanysetupForm(){
const navigate=useNavigate();
const [DataTableList,setDataTableList] =useState([])
const [globalFilterValue, setGlobalFilterValue] = useState('');
const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
         <span className="mb-3">
         
          <h3  className=''>Company Setup <span className="" style={{float:"right"}}> <Link to="/company-setupAdd"><CButton style={{background:"#64748B",width:100,padding:10}}>ADD</CButton></Link></span></h3>
         
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


const header = renderHeader();


const items = (data) => ([
{
  label: "Update",
  icon: "pi pi-refresh",
  command: (e) =>  navigate(`/company_setup_edit/${data.id}/` )
},
{
  label: "View",
  icon: "pi pi-refresh",
  command: (e) =>  navigate(`/company-setupview/${data.id}/` )
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
let api = new CompanySetupService;
api.getAllCompany(search).then((res) => { setDataTableList(res.data); }).catch((err) => { });
}

let delete_record = (rowData) => {
let api = new CompanySetupService;
api.deleteCompany(rowData.id).then((res) => { 
  get_data(); 
  toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
}).catch((err) => { })
}


useEffect(() => {
  if(!localStorage.getItem('token')){
    navigate("/")
  }
  get_data();
 
 }, [])
 const statusBodyTemplate = (rowData) => {
  return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
 ;
}
return(
<>
<CCol className="" xs={12}>
  
<ConfirmDialog /> 
<CCard className="mb-4">
          <CCardBody>

            <DataTable value={DataTableList} header={header} showGridlines responsiveLayout="scroll" size="small" paginator rows={10} rowsPerPageOptions={[10,20,50]}>
              
              <Column field="name" header="Name" sortable></Column>
              <Column field="industry" header="Industry" ></Column>
              {/* <Column field="business_type" header="Business Type" ></Column>     */}
              <Column field="departments" header="Departments" ></Column> 
              <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
             
            </DataTable>

          </CCardBody>
        </CCard>

      </CCol>
</>
)
}
export default CompanysetupForm;
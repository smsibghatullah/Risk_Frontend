import {React,useEffect,useState,useRef} from "react";
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
  import SubdepartmentService from "src/services/Subdepartment.service";
import DepartmentService from "src/services/Department.service";

function Sub_Function(prop){
 
  const navigate=useNavigate();
  const [DataTableList,setDataTableList] =useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const renderHeader = () => {
    return (
        <div className="flex justify-content-between">
          {!prop.ispopup && 
          <>
           <span className="mb-3">
           
           
            <h3  className=' '>Sub Department<span className="" style={{float:"right"}}> <Link to="/Sub_Add_Function"><CButton style={{background:"#64748B",width:100,padding:10}}>ADD</CButton></Link></span></h3>
            </span>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText onChange={onGlobalFilterChange} value={globalFilterValue}  placeholder="Keyword Search" />
            </span>
            </>
  }
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
    command: (e) =>  navigate(`/Sub_edit_Function/${data.id}/` )
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
    if(!localStorage.getItem('token')){
      navigate("/")
    }
  let api = new SubdepartmentService;
  api.getAllSubdepartment(search).then((res) => { setDataTableList(res.data); }).catch((err) => { });
  }
  
  let delete_record = (rowData) => {
  let api = new SubdepartmentService;
  api.deleteSubdepartment(rowData.id).then((res) => { 
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

  useEffect(() => {
    get_data()
   }, [])
    
return(
<>
<CCol xs={12} className="mb-4">
<ConfirmDialog /> 
<CCard className="mb-4">
          <CCardBody>

            <DataTable value={DataTableList} header={header} showGridlines responsiveLayout="scroll" size="small" paginator rows={10} rowsPerPageOptions={[10,20,50]}>
              
              <Column field="name" header="Sub Department"  sortable></Column>
              <Column field="department" header="Department" body={DepartmentService.getsubfunctions} ></Column>
              <Column field="slug" header="Slug"></Column>
              <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
          </CCardBody>
        </CCard>

      </CCol>
</>

)
}
export default Sub_Function;
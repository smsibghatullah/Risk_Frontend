import {React,useEffect,useState} from "react";
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
  import { DataTable } from 'primereact/datatable';
  import {Column} from 'primereact/column';
  import { Button } from 'primereact/button';
  
  import { SplitButton } from 'primereact/splitbutton';
  import { InputText } from 'primereact/inputtext';
  
  import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
  import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
  import CompanySetupService from "src/services/Companysetup.service";
  import AuditplanService from "src/services/Auditplan.service";
import RiskMatrixService from "src/services/Riskmatrix.service";

function RiskmatrixAdd(){
  const [DataTableList,setDataTableList] =useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const renderHeader = () => {
    return (
        <div className="flex justify-content-between">
           <span className="mb-3">
           <h3  className=''>Risk Matrix<span className="" style={{float:"right"}}> <Link to="/RiskmatrixAdd"><CButton style={{background:"#64748B",width:100,padding:10}}>ADD</CButton></Link></span></h3>
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
    label: "View",
    icon: "pi pi-refresh",
    command:(e) => navigate(`/Audit/${data.id}/` )
    
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
  let api = new RiskMatrixService;
  api.getAllRiskMatrix(search).then((res) => { setDataTableList(res.data); }).catch((err) => { });
  }
  
  let delete_record = (rowData) => {
  let api = new RiskMatrixService;
  api.deleteRiskMatrix(rowData.id).then((res) => { 
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
<CCol className="mb-4" xs={12}>
<ConfirmDialog /> 
<CCard className="mb-4">
          <CCardBody>

            <DataTable value={DataTableList} header={header} showGridlines responsiveLayout="scroll" size="small" paginator rows={10} rowsPerPageOptions={[10,20,50]}>
              
              <Column field="likehood" header="Likehood" sortable></Column>
              <Column field="impact" header="Impact" ></Column>
              <Column field="combine" header="Combine" ></Column> 
              <Column field="score" header="Score" sortable></Column>
              <Column field="likehood_rate" header="Likehood Rate" ></Column>
              <Column field="impact_rate" header="Impact Rate" ></Column>    
              <Column field="score_rate" header="Score Rate" ></Column>  
              <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
             
            </DataTable>

          </CCardBody>
        </CCard>


      </CCol>
</>

)
}
export default RiskmatrixAdd;
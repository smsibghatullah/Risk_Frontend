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
  import ControlsService from "src/services/control.service";
import PolicyService from "src/services/policy.service";
import ControlObjectiveService from "src/services/control_objective.service";
import RegulatorylawService from "src/services/Regulatory_law.services";
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "src/_state/activeUserAtom";
import { globalEventAtom } from "src/_state/globalEventAtom";
import DepartmentService from "src/services/Department.service";
import { Toast } from 'primereact/toast';


function Control_List(){
  const navigate=useNavigate();
  const [DataTableList,setDataTableList] =useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const ActiveUser = useRecoilValue(activeUserAtom);
  const toast = useRef(null);
  const intersects = (itemDepartments)=>{
    if(ActiveUser.department && itemDepartments){

      return itemDepartments.filter(value =>{ 
      
      try{
        if(ActiveUser.is_superuser){
          return true
        }else{
          return  JSON.parse(ActiveUser.department).includes(value); 
        }
      }catch(e){
        return false;
      }
      
      }).length;
    }else{
      return false;
    }
  }

  const getFilteredData = ()=>{
    // return DataTableList;
    if(ActiveUser.usertype == 'Department'){
      return DataTableList.filter(i =>  intersects(i.departments));
    }else{
      return DataTableList;
    }
  }

  const renderHeader = () => {
    return (
        <div className="flex justify-content-between">

           <span className="mb-3">           
              <h3  className=''>Controls
                <span className="" style={{float:"right"}}>
                  {(ActiveUser.is_superuser || ActiveUser.usertype == 'Department' ) && 
                  <>
                   <Link to="/control_form">
                  <CButton style={{background:"#64748B",width:100,padding:10}}>Add</CButton></Link> 
                    <CButton onClick={handleDelete} style={{background:"#64748B",width:100,padding:10,marginLeft:5}}>Delete</CButton>
                   
                  </>
                  }
                </span>
              </h3>
           
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
    navigate(`/Control_Update/${clickedRowId}/`);
  }


  let delete_record = () => {
    let _data = selectedRows.map(i=>i.id);
    let api = new ControlsService();
    _data.forEach((id) => {
      api.deleteControl(id)
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
    }else{
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
    }
  };
  
  const header = renderHeader();
  
  let get_data=(search = "")=>{ 
  let api = new ControlsService;
  api.getAllControl(search).then((res) => { setDataTableList(res.data); }).catch((err) => { });
  }
  
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
    setIsLoading(true);
    get_data();
    setIsLoading(false);
   }, [])
   const globatEvent = useRecoilValue(globalEventAtom);


   useEffect(()=>{
     switch(globatEvent.eventName) {
       case 'get_data':
         get_data();
          
           break;
       default:
       
     }
   }, [globatEvent]);
return(
<>
<CCol xs={12} className="mb-4">
<ConfirmDialog /> 
<Toast ref={toast} />
<CCard className="mb-4">
          <CCardBody>
          {isLoading ? <p>Loading...</p> : 
          <DataTable 
          selectionMode={'checkbox'} 
          selection={selectedRows} 
          onSelectionChange={(e) => {setSelectedRows(e.value); console.log(e.value)}} 
          onRowDoubleClick={(e) => { handleClick(e) }}
          value={getFilteredData() } 
          header={header} 
          showGridlines 
          responsiveLayout="scroll" 
          size="small" paginator 
          rows={10} 
          rowHover
          rowsPerPageOptions={[10,20,50]}>
              <Column alignHeader={'center'} align="center" selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="description" header="Description" sortable></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="departments" header="Departments" body={DepartmentService.getNameFromIds} sortable></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="responsible_person" header="Responsible Person" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="responsible_manager" header="Responsible manager" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="policy" header="Policy" body={PolicyService.getpolicy} sortable></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="regulatory_laws" header="Regulatory Laws" body={RegulatorylawService.getlaw}></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="status" header="Status" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="control_objective" header="Control Objective" body={ControlObjectiveService.getcontrol}></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="is_critical" header="Is Critical" ></Column>
              {/* <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
            </DataTable>}
          </CCardBody>
</CCard>

      </CCol>
</>

)
}
export default Control_List;
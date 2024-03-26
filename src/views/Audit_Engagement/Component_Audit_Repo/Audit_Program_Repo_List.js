import {useState,React,useEffect,useRef} from 'react'
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import {
  CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router';
import Audit_Program_Repo_Service from 'src/services/Audit_Program_Repo.service';
import Audit_Program_repo_Form from './Audit_program_repo';
import { Toast } from 'primereact/toast';

function Audit_Program_Repo(){

  const navigate=useNavigate() 
  const [DataTableList,setDataTableList] =useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef(null);
  const handleDelete = () => {
    if (selectedRows.length > 0) {
      confirmDialog({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: delete_record,
      });
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
    }
  };
  const renderHeader = () => {
    return (
        <div className="flex justify-content-between">
          <h3 className=''> <span className="" style={{ float: "right" }}>
            <CButton onClick={handleDelete} style={{ background: "#64748B", width: 100, padding: 10, marginLeft: 5 }}>Delete</CButton>
          </span></h3>
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

  
// const items = (data) => ([
//   {
//     label: "Update",
//     icon: "pi pi-refresh",
//     command: (e) =>  navigate(`/Audit_Program_Repo_update/${data.id}/` )
//   },
//   {
//     label: "Delete",
//     icon: "pi pi-times",
//     command: (e) => {
//       confirmDialog({
//         message: 'Are you sure you want to proceed?',
//         header: 'Confirmation',
//         icon: 'pi pi-exclamation-triangle',
//         accept: () => delete_record(data),
//     });
     
//     },
//   },
// ]);
const handleClick = (event) => {
  console.log(event);
  const clickedRowData = event.data;
  const clickedRowId = clickedRowData.id;
  navigate(`/Audit_Program_Repo_update/${clickedRowId}/`);
}


let get_data=(search = "")=>{ 
  let api = new Audit_Program_Repo_Service;
  api.getAllAuditrepo(search).then((res) => { setDataTableList(res.data); }).catch((err) => { });
}
let delete_record = () => {
  let _data = selectedRows.map(i => i.id);
  let api = new Audit_Program_Repo_Service();
  _data.forEach((id) => {
    api.deleteAuditrepo(id)
      .then((res) => {
        get_data();
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
      })
      .catch((err) => { })
  });
};
// let delete_record = (rowData) => {
//   let api = new Audit_Program_Repo_Service;
//   api.deleteAuditrepo(rowData.id).then((res) => { 
//     get_data(); 
//     toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
//   }).catch((err) => { })
// }
useEffect(() => {
}, [DataTableList]);

useEffect(() => {
        if(!localStorage.getItem('token')){ navigate("/") }
        get_data()
 }, []);

 
 const statusBodyTemplate = (rowData) => {
  return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
 ;
}

  return (




    
    <CRow>
      <ConfirmDialog /> 
      <ConfirmDialog /> 
      <Toast ref={toast} />
      <CCol className="" xs={12}> 
    
      <CCard className="p-3">
      
      <CCardHeader className='text-center'>
            <h3 style={{fontWeight:400}}>Audit Program Repo..</h3>
           
      </CCardHeader>
          </CCard>
          </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
             <Audit_Program_repo_Form refreshData={get_data}/>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardBody>

            <DataTable 
            selectionMode={'checkbox'}
            selection={selectedRows}
            onSelectionChange={(e) => { setSelectedRows(e.value); console.log(e.value) }}
            onRowDoubleClick={(e) => { handleClick(e) }}
            rowHover 
            value={DataTableList} 
            header={header} 
            showGridlines 
            responsiveLayout="scroll" 
            size="small" paginator 
            rows={10} 
            rowsPerPageOptions={[10,20,50]}>
              <Column selectionMode="multiple" align="center" alignHeader={'center'} headerStyle={{ width: '3rem',cursor:'pointer' }}></Column>
              <Column style={{cursor:'pointer'}} alignHeader={'center'} field="title" header="Title" sortable></Column>
              <Column style={{cursor:'pointer'}} alignHeader={'center'} field="summary" header="Summary"></Column>   
              <Column style={{cursor:'pointer'}} alignHeader={'center'} field="description" header="Description" ></Column>   
              <Column style={{cursor:'pointer'}} alignHeader={'center'} field="category" header="Category"></Column>   
              {/* <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem',cursor:'pointer' }}></Column> */}
             
            </DataTable>

          </CCardBody>
        </CCard>

      </CCol>
    </CRow>
  )
}

export default Audit_Program_Repo

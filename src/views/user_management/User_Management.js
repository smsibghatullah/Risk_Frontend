import {useState,React,useEffect,useRef} from 'react'
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import RiskrepositoryService from '../../services/RiskRepository.service'
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
// import  RiskForm  from "./components/RiskForm";
import {
  CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  
} from '@coreui/react'
import { Toast } from 'primereact/toast';
import { useNavigate, useParams } from 'react-router';
import { departmentAtom } from 'src/_state/departmentAtom';
import { useRecoilValue } from 'recoil';
import DepartmentService from 'src/services/Department.service';
import UsersService from 'src/services/users.service';
import UserForm from './components/Form';
import { activeUserAtom } from 'src/_state/activeUserAtom';

function User_Management(){
  const _user = useRecoilValue(activeUserAtom);

  const navigate=useNavigate() 
  const [UserList,setUserList] =useState([])
  const [SelectedUser,setSelectedUser] =useState([])
  const [Data,setData]=useState([])
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

  
const items = (data) => ([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: (e) =>  {setSelectedUser(data)}
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
const handleClick = (event) => {
  console.log(event);
  const clickedRowData = event.data;
  setSelectedUser(clickedRowData)
}


let get_data=(search = "")=>{ 
    let api = new UsersService;
    api.getAllUsers(search).then((res) => { console.log("Users List",{[res.data]:[]}); setUserList(res.data); setSelectedUser({}) }).catch((err) => { });

}
let delete_record = () => {
  let _data = selectedRows.map(i => i.id);
  let api = new UsersService();
  _data.forEach((id) => {
    api.deleteUser(id)
      .then((res) => {
        get_data();
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
      })
      .catch((err) => { })
  });
};
// let delete_record = (rowData) => {
//   let api = new UsersService;
//   api.deleteUser(rowData.id).then((res) => { 
//     get_data(); 
//     toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
//   }).catch((err) => { })
// }

useEffect(() => {
  // console.log("User Management ================= >>>>>> ", _user.is_superuser );
  // console.log("User Management ================= >>>>>> ", UsersService.hasPermission('risk_dashoboard') );

}, [UserList]);

useEffect(() => {
        if(!localStorage.getItem('token')){ navigate("/") }        
        get_data()
 }, []);

 
 const actionsBodyTemplate = (rowData) => {
  return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
 
}

  return (

    <CRow>
      <ConfirmDialog /> 
      <Toast ref={toast} />
      <CCol className="" xs={12}> 
    
      <CCard className="p-3">
      
      <CCardHeader className='text-center'>
            <h3 style={{fontWeight:400}}>User Management</h3>
           
      </CCardHeader>
          </CCard>
          </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
         
          <CCardBody>
             <UserForm refresh={get_data} userData={SelectedUser} />
          </CCardBody>
          
        </CCard>

        <CCard className="mb-4">
          <CCardBody>

            <DataTable 
              selectionMode={'checkbox'}
              selection={selectedRows}
              onSelectionChange={(e) => { setSelectedRows(e.value); console.log(e.value) }}
              onRowDoubleClick={(e) => { handleClick(e) }}
              value={UserList} 
              header={header} 
              showGridlines
              responsiveLayout="scroll" 
              size="small" paginator 
              rows={10} 
              rowHover
              rowsPerPageOptions={[10,20,50]}>
                <Column selectionMode="multiple" align="center" headerStyle={{ width: '3rem',cursor:'pointer' }}></Column>
                <Column alignHeader={'center'} style={{cursor:'pointer'}} field="first_name" header="First Name" sortable></Column>
                <Column alignHeader={'center'} style={{cursor:'pointer'}} field="last_name" header="Last Name" ></Column>   
                <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="email" header="Email" ></Column>   
                <Column alignHeader={'center'} style={{cursor:'pointer'}} field="username" header="User Name" ></Column>   
                <Column alignHeader={'center'} style={{cursor:'pointer'}} field="usertype" header="User Type" ></Column>   
                <Column alignHeader={'center'} style={{cursor:'pointer'}} field="is_superuser" header="Is Super User" ></Column>   
                <Column alignHeader={'center'} style={{cursor:'pointer'}} header="Assigned Permissions" body={UsersService.getGroupsNames} ></Column>   
                {/* <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
             
            </DataTable>

          </CCardBody>
        </CCard>

      </CCol>
    </CRow>
  )
}

export default User_Management

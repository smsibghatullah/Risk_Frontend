import { React, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token = getSecrets.token()
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
import { Dialog } from 'primereact/dialog';
import {Comment} from "src/views/widgets/Comment";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import AuditplanService from "src/services/Auditplan.service";
import DepartmentService from "src/services/Department.service";
import { AuditplanAtom } from "src/_state/AuditplanAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { Toast } from 'primereact/toast';
import { activeUserAtom } from "src/_state/activeUserAtom";
import { departmentAtom } from "src/_state/departmentAtom";

        

function Audit_Plan() {
  const navigate = useNavigate();
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  // const setGlobatEvent = useSetRecoilState(globalEventAtom);
  const [audit_plan, setAuditPlan] = useRecoilState(AuditplanAtom)
  const [selectedRows, setSelectedRows] = useState([]);
  const ActiveUser = useRecoilValue(activeUserAtom);
  const [displayBasic, setdisplayBasic] = useState(false);
  // const [audit_plan, setAuditPlan] = useState([])
  const departmentList = useRecoilValue(departmentAtom);



  useEffect(() => {
    // if (!localStorage.getItem('token')) { navigate("/") }
    get_data();
    // setGlobatEvent({ eventName: 'refreshAuditPlan', message: '', data: {} })

  }, [departmentList])

  const commentForChanges = () => {
    console.log("==> : ",selectedRows);
    if (selectedRows) {
      setdisplayBasic(true)
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the Row' });
    }
  };
  const makeId = ()=>{
    let id = ""
    try {
      
      id =selectedRows['id'];
      return id;
    } catch (error) {
      
      return "";
    }
  }
  

  const renderHeader = () => {
    return (<>
      {ActiveUser.usertype != 'Department' &&
    <>
    <div className="flex justify-content-between">
    <span className="mb-3">
      <h3 className=''>Risk Based Internal Audit Plans<span className="" style={{ float: "right" }}>
      <Dialog position="right" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => setdisplayBasic(false)}>
             <Comment docId={ makeId() } belogTo={'audit_plan'} processed_function = {run_changes_process}/>
      </Dialog>
        {
        
        (ActiveUser.is_superuser || ActiveUser.usertype == 'Head')  &&  <>
          <Link to="/Audit_Plan_Add"><CButton style={{ background: "#64748B", width: 100, padding: 10,marginRight:10 }}>Add</CButton></Link>   
          
              <CButton onClick={handleDelete} style={{ background: "#64748B", width: 100, padding: 10,marginRight:10 }}>Delete</CButton>
              
              {selectedRows.state == 'Sended For Approval' && <CButton onClick={handleApprove}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Approve</CButton>}
                         
              <CButton onClick={commentForChanges}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Comments</CButton>
            
         
          </>
        }
       { ActiveUser.usertype == 'Basic' &&
          <> 
                          
                          
              <Link to="/Audit_Plan_Add"><CButton style={{ background: "#64748B", width: 100, padding: 10,marginLeft:5  }}>Add</CButton></Link>   
              <CButton onClick={handleDelete} style={{ background: "#64748B", width: 100, padding: 10,marginLeft:10 }}>Delete</CButton>
              <CButton onClick={sendForApproval}  style={{background:"#64748B",width:200,padding:10,marginLeft:10}}>Send For Approval</CButton>
              <CButton onClick={commentForChanges}  style={{background:"#64748B",width:200,padding:10,marginLeft:10}}>Comments</CButton>

          </> 
        }

      </span></h3>


    </span>
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText onChange={onGlobalFilterChange} value={globalFilterValue} placeholder="Keyword Search" />
    </span>

  </div>
    </>
    }
     </>
    )
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

      setGlobalFilterValue(value);
    // get_data(value);
  }

  const handleClick = (e) => {
    console.log("Double clck: ",e)
    const clickedRowData = e.data;
    const clickedRowId = clickedRowData.id;
    navigate(`/Audit_Plan_Add/${clickedRowId}/`);
  }

  let delete_record = () => {
    let api = new AuditplanService();
      api.deleteAuditplan(selectedRows.id)
        .then((res) => {
          setSelectedRows({});
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
          get_data();

          // setGlobatEvent({ eventName: 'refreshAuditPlan', message: '', data: {} })

        })
        .catch((err) => {})
  };

  const handleDelete = () => {
    if (selectedRows) {
      console.log(selectedRows);
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


  const handleApprove = () => {
                
            if(!(selectedRows.state == "Approved")){
              var formdata = {
                // state:(selectedRows.state === "Draft" || "Comment for Changes")?"Sended For Approval":(selectedRows.state === "Sended For Approval") ? "Approved":"Approved" 
                state: "Approved" 
              }
              axios.put(API_URL+`/annualplan/${selectedRows.id}/`, formdata, {
                headers: { "Authorization":token, }
              })
              .then((response) => {
                get_data();
                // setGlobatEvent({ eventName: 'refreshAuditPlan', message: '', data: {} })
                if(selectedRows.state === "Sended For Approval"){
                  toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have Approved', life: 3000 });
                }else if(selectedRows.state === "Draft"){
                  toast.current.show({ severity: 'success', summary: 'Success', detail: 'Sent for Approval', life: 3000 });
                }else if(selectedRows.state === "Approved"){
                  toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have Already Approved', life: 3000 });
                }
              })
              .catch((error) => {
               toast.current.show({ severity: 'error', summary: '', detail: 'you have Un approved', life: 3000 });
              })

            }else{
              toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have Already Approved', life: 3000 });
            }
               
  }

  const run_changes_process = () => {
    setdisplayBasic(false);

      var formdata = {
        // state:(selectedRows.state === "Draft" || "Comment for Changes")?"Sended For Approval":(selectedRows.state === "Sended For Approval") ? "Approved":"Approved" 
        state: "Comment For Changes" 
      }
      axios.put(API_URL+`/annualplan/${selectedRows.id}/`, formdata, {
        headers: { "Authorization":token, }
      })
      .then((response) => {
        get_data();
        // setGlobatEvent({ eventName: 'refreshAuditPlan', message: '', data: {} })

          toast.current.show({ severity: 'success', summary: 'Success', detail: 'Comment has been Submitted', life: 3000 });
       
      })
      .catch((error) => {
      toast.current.show({ severity: 'error', summary: '', detail: 'some thing went wrong', life: 3000 });
      })
    
  }

  const sendForApproval = () => {
                
      var formdata = { state: "Sended For Approval"  }

      axios.put(API_URL+`/annualplan/${selectedRows.id}/`, formdata, {
        headers: { "Authorization":token, }
      })
      .then((response) => { get_data();  })
      .catch((error) => {
      toast.current.show({ severity: 'error', summary: '', detail: 'Some Thing went wrong', life: 3000 });
      })
          
}

  const header = renderHeader();
  const toast = useRef(null);
  const token = getSecrets.token()
  
  let get_data=(search = "")=>{ 
      // let api = new AuditplanService
      // api.getAllAuditplan(search).then((res) => {          
      //     setAuditPlan(res.data);
      // }).catch((err) => { });


      axios.get(API_URL + '/annualplan/').then((success) => {
        let data = success.data.map(i=>{ i['_department']  = department(i); return i; });
         data = success.data.map(i=>{ i['_proposed_schedule']  = proposed_schedule(i); return i; });
         data = success.data.map(i=>{ i['_allocated_manager']  = allocated_manager(i); return i; });
         data = success.data.map(i=>{ i['_sub_department']  = sub_department(i); return i; });
        
        setAuditPlan(data);
      }).catch((err) => { toast.current.show({ severity: 'error', summary: '', detail: 'Opps some thing went wrong', life: 3000 }); })

    }

    const getDepName = (rowData) =>  { 
     
      let filtered = departmentList.filter(i => i.id == rowData.department_id);
      return filtered.length ?  filtered[0]['name'] : "";
    
   }

  const department = (item) => {
    try {
      let _scop = JSON.parse(item.departments)
        return _scop.map(i=> getDepName(i)).join("\n");
      } catch (error) {
        return "";
      }
  }

  const proposed_schedule = (item) => {
    try {
      let _scop = JSON.parse(item.departments)
      return _scop.map(i=>i.proposed_schedule).join("\n");
    } catch (error) {
      return "";
    }
   }

   const allocated_manager = (item) => {
    try {
      let _scop = JSON.parse(item.departments)
      return _scop.map(i=>i.allocated_manager).join("\n");
    } catch (error) {
      return "";
    }
   }

   const sub_department = (item) => {
    try {
      let _scop = JSON.parse(item.departments)
      return  _scop.map(i=>i.sub_department.map(i=>i.name)).join("\n");
    } catch (error) {
      return "";
    }
   
   }

   const getFilteredData = ()=>{
    if(ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ){
      return audit_plan.filter(i=>i.state == 'Approved' || i.state == 'Sended For Approval');
    }
    else if(ActiveUser.usertype == 'Basic'){
      return audit_plan
    }
    else if(ActiveUser.usertype == 'Department'){
      return audit_plan.filter(i=>i.state == 'Approved')
    }
  }

  return (
    <>
     {ActiveUser.usertype != 'Department' &&
     <>

<CCol xs={12} className="mb-4">
      <Toast ref={toast} />
        <ConfirmDialog />
       
        <CCard className="mb-4">
          <CCardBody>
            <DataTable 
            
            selectionMode={'single'}
            selection={selectedRows} 
            onSelectionChange={(e) => {

                console.log(e.value);
                // setSelectedRows(e.value);
                e.value?setSelectedRows(e.value):setSelectedRows([]);
            
            }
            } 
            onRowDoubleClick={(e) => { handleClick(e) }}
            // value={audit_plan}  
            value={getFilteredData()} 

            header={header} 
            showGridlines 
            responsiveLayout="scroll" 
            size="small" paginator 
            rows={10} 
            rowsPerPageOptions={[10, 20, 50]}>
              <Column align="center" selectionMode="single" headerStyle={{ width: '3rem', textAlign: 'center' }}></Column>
              <Column  alignHeader={'center'} field="title" header="Title" sortable></Column>
              {/* <Column  alignHeader={'center'} field="departments" header="Scope" body={department} style={{ whiteSpace: 'pre-line' }}></Column>
              <Column  alignHeader={'center'} field="departments" header="Proposed Schedule" body={proposed_schedule} style={{ whiteSpace: 'pre-line' }} ></Column>
              <Column  alignHeader={'center'} field="departments" header="Allocated Manager" body={allocated_manager} style={{ whiteSpace: 'pre-line' }}></Column>
              <Column  alignHeader={'center'} field="departments" header="Sub Department" body={sub_department} style={{ whiteSpace: 'pre-line' }} ></Column> */}
             
             
               <Column  alignHeader={'center'} field="_department" header="Scope" style={{ whiteSpace: 'pre-line' }}></Column>
              <Column  alignHeader={'center'} field="_proposed_schedule" header="Proposed Schedule"  style={{ whiteSpace: 'pre-line' }} ></Column>
              <Column  alignHeader={'center'} field="_allocated_manager" header="Allocated Manager" style={{ whiteSpace: 'pre-line' }}></Column>
              <Column  alignHeader={'center'} field="_sub_department" header="Sub Department" style={{ whiteSpace: 'pre-line' }} ></Column>
             
             
              <Column   alignHeader={'center'} field="start_date" header="Start Date" 
               body={(rowData) => {
                const date = new Date(rowData.start_date);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
               }}
              ></Column>
              <Column  alignHeader={'center'} field="end_date" header="End Date" 
               body={(rowData) => {
                const date = new Date(rowData.end_date);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
               }}
              ></Column>
              <Column   alignHeader={'center'} field="state" header="Status" ></Column>
              {/* <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}

            </DataTable>

          </CCardBody>
        </CCard>


      </CCol>

     </>
     }
     
    </>

  )
}
export default Audit_Plan;
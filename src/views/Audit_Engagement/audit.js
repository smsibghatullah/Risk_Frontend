import React, { useState, useEffect, useRef } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CButton
} from '@coreui/react'
import {
  BrowserRouter as Router,
   Link,
  useNavigate,
  useParams
} from "react-router-dom";
import { Dialog } from 'primereact/dialog';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import AuditengagementService from "src/services/Auditengagement.service";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { Toast } from 'primereact/toast';
import { activeUserAtom } from "src/_state/activeUserAtom";
import {Comment} from "src/views/widgets/Comment";


function Formaudit() {
  const params =useParams()
  const navigate = useNavigate();
  const [DataTableList, setDataTableList] = useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const setGlobalEvent = useSetRecoilState(globalEventAtom);
// checkbox functionalty start
  const toast = useRef(null);
  const [checkedRows, setCheckedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const ActiveUser = useRecoilValue(activeUserAtom);


  let delete_record = () => {
    let _data = selectedRows.map(i=>i.id);
    let api = new AuditengagementService();
    _data.forEach((id) => {
      api.deleteAuditEngagement(id)
        .then((res) => {
          get_data();
          setGlobalEvent({ eventName: 'refreshAuditPlan', message: '', data: {} })

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

  const showReport = () => {
    if (selectedRows.length > 0) {
     
    }else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
    }
  };

  // ========================================================================================Status

  let handleChangeStatus = (status) => {
    let formdata = {
      state: status
    }
    let _data = selectedRows.map(i=>i.id);
    let api = new AuditengagementService();
    // _data.forEach((id) => {
      api.patchAuditEngagement(selectedRows[0].id, formdata)
        .then((res) => {
          get_data();
          setGlobalEvent({ eventName: 'refreshAuditPlan', message: '', data: {} })

          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Action Completed Successfully' });
        })
        .catch((err) => {})
    // });
  };

  const ConfirmChangeStatus = (status) => {
    if (selectedRows.length > 0) {
      confirmDialog({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: ()=>{handleChangeStatus(status);  setdisplayBasic(false)},
      });
    }else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row' });
    }
  };
  // ========================================================================================Status


  const handleClick = (event) => {
    console.log( event);
    const clickedRowData = event.data;
    const clickedRowId = clickedRowData.id;
    navigate(`/Audtdetails/${clickedRowId}/`);
  }
// checkbox functionalty end

const commentForChanges = () => {
  if (selectedRows.length > 0) {
    setdisplayBasic(true)
    // run_changes_process
  } else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row' });
  }
};

const [displayBasic, setdisplayBasic] = useState(false);
const makeId = ()=>{
  let id = ""
  try {
    
    id =(selectedRows[0]['id']+"_"+selectedRows[0]['department']).replace(/\s/, '');
    return id;
  } catch (error) {    
    return "";
  }
}

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
         { (ActiveUser.is_superuser || ActiveUser.usertype == 'Head')  &&
         <>
           <span className="mb-3">
              <h3>Audit Engagement<span className="" style={{ float: "right" }}>
                <span>  <Link to={`/AudtAdd/${params.id}/`}><CButton style={{ background: "#64748B", width: 100, padding: 10 ,marginRight:10}}>Add</CButton></Link></span>
                <span><CButton onClick={handleDelete} style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Delete</CButton></span>
               
                {
                  (selectedRows.length > 0 && (selectedRows[0].state == 'Sended For Approval' || selectedRows[0].state == 'Added By Head')) &&
                
                  <>  
                    <span><CButton onClick={()=>{ConfirmChangeStatus('Approved')}} style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Approved</CButton></span>
                  </>
               }
               <span><CButton onClick={()=>{commentForChanges()}} style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Comment for Changes</CButton></span>
            </span></h3>
            </span>
         </>
         }

          { (ActiveUser.usertype == 'Basic')  &&
              <>
                <span className="mb-3">
                    <h3>Audit Engagement<span className="" style={{ float: "right" }}>
                      <span><Link to={`/AudtAdd/${params.id}/`}><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Add</CButton></Link></span>
                      <span><CButton onClick={handleDelete} style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Delete</CButton></span>
                      {
                        (selectedRows.length > 0 && (selectedRows[0].state == 'Draft' || selectedRows[0].state == 'Added By Head' || selectedRows[0].state == 'Comment For Changes')) &&
                        <span><CButton onClick={()=>{ConfirmChangeStatus('Sended For Approval')}} style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Sended For Approval</CButton></span>
                      }
                      <span><CButton onClick={()=>{commentForChanges()}} style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Comments</CButton></span>
                    </span></h3>
                  </span>
              </>
          }
       
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={onGlobalFilterChange} value={globalFilterValue} placeholder="Keyword Search" />
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

  let get_data = (search = "") => {
    let api = new AuditengagementService;
    api.getAllAuditEngagement(search).then((res) => { 
    const approvedStatePlans = res.data.filter(plan => plan.annual_plan == params.id);
    setDataTableList(approvedStatePlans); }).catch((err) => { });
  }
  useEffect(()=>{get_data()}, [params])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    get_data();
    setGlobalEvent({ eventName: 'refreshRisk', message: '', data: {} })
  }, [])


const getFilteredData = ()=>{
  let _head_filter = ['Added By Head', 'Sended For Approval', 'Approved', 'Sended for Review', 'Sended for Management', 'Accepted and Closed']
  if(ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ){
    return DataTableList.filter(i => _head_filter.includes(i.state) );
  }
  else if(ActiveUser.usertype == 'Basic'){
    return DataTableList
  }
  else if(ActiveUser.usertype == 'Department'){
    return DataTableList.filter(i=>i.state == 'Sended for Review')
  }
}

const progress = (row)=>{
  let _inprogress = ['Draft', 'Comment For Changes', 'Added By Head', 'Sended For Approval']; 
  let _acceptedandclosed = ['Approved'];

  if(_inprogress.includes(row.state)) {return "In Progress"; }  
  else if(_acceptedandclosed.includes(row.state)) {return "Accepted and Closed"; } 
  else { return "_ ";}
 
}

  return (
    <>
      <Dialog position="right" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => setdisplayBasic(false)}>
                 <Comment docId={ makeId() } belogTo={'auditEngagement'} processed_function = {()=>{ConfirmChangeStatus('Comment For Changes')}}/>
        </Dialog>
      <CCol xs={12}>
        <ConfirmDialog />
          <Toast ref={toast} />
            <CCard className="mb-4">
                  <CCardBody>
                        <DataTable 
                              // selectionMode="single"
                              selection={selectedRows} 
                              onSelectionChange={(e) => {e.value?setSelectedRows([e.value]):''; console.log(e.value)}} 
                              // value={DataTableList.filter(e => ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic' || JSON.parse(ActiveUser.department).includes(e.department) )} header={header} 
                              value={getFilteredData()} header={header} 
                              onRowDoubleClick={(e) => { handleClick(e) }}
                              showGridlines 
                              responsiveLayout="scroll" 
                              size="small" paginator 
                              rows={10} 
                              rowHover
                              rowsPerPageOptions={[10, 20, 50]}>
                              <Column align="center" selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                              <Column alignHeader={'center'} style={{cursor:'pointer'}}  field="name" header="Name"  ></Column>
                              <Column alignHeader={'center'} field="allocated_manager" style={{cursor:'pointer'}} header="Allocated Manager" ></Column>
                              {/* <Column field="duration_days" header="Duration Days" ></Column>
                              <Column field="duration_hours" header="Duration Hours" sortable></Column> */}
                              <Column alignHeader={'center'} field="start_date" style={{cursor:'pointer'}} header="Start Date" 
                                 body={(rowData) => {
                                  const date = new Date(rowData.start_date);
                                  const day = date.getDate().toString().padStart(2, '0');
                                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                  const year = date.getFullYear().toString();
                                  return `${day}/${month}/${year}`;
                                 }}
                              ></Column>
                              <Column alignHeader={'center'} field="end_date" style={{cursor:'pointer'}} header="End Date" 
                                 body={(rowData) => {
                                  const date = new Date(rowData.end_date);
                                  const day = date.getDate().toString().padStart(2, '0');
                                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                  const year = date.getFullYear().toString();
                                  return `${day}/${month}/${year}`;
                                 }}
                              ></Column>
                               <Column alignHeader={'center'} field="state" style={{cursor:'pointer'}} header="Status" ></Column>
                               <Column alignHeader={'center'} style={{cursor:'pointer'}} header="Progress" field="state" body={progress} ></Column>     

                        </DataTable>
                  </CCardBody>
            </CCard>
      </CCol>
    </>

  )
}
export default Formaudit;
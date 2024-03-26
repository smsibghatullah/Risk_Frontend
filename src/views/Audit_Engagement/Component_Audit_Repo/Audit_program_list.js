import {React,useEffect,useState,useRef} from "react";
import { Link, useParams } from "react-router-dom";
const API_URL = getSecrets.API_URL
import { CForm , CFormLabel, CFormInput, CFormTextarea} from '@coreui/react'
import UsersService from 'src/services/users.service'; 

import axios from 'axios';
import { getSecrets } from "src/config";
import moment from "moment";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CFormSelect,
    CFormFeedback
  } from '@coreui/react'
import {
    BrowserRouter as Router,
    useNavigate
  } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import Audit_Program_Repo_Service from 'src/services/Audit_Program_Repo.service';
import Audit_Program_List_Service from "src/services/Audit_program_data.service";
import { Toast } from 'primereact/toast';
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "src/_state/activeUserAtom";
import {Comment} from "src/views/widgets/Comment";
import { departmentAtom } from "src/_state/departmentAtom";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { faL } from "@fortawesome/free-solid-svg-icons";


function Audit_Program_List(props){

  const [audit_Department,setAudit_Department]=useState([])
  const toast = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [DataTableList,setDataTableList] =useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [visibleRight, setVisibleRight] = useState(false);
  const [DataTableListRepo,setDataTableListRepo] =useState([]);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [Discription,setDiscription] = useState("")
  const [Summary,setSummary] = useState("")
  const params=useParams()
  const [review, setReview] = useState([]);
  const ActiveUser = useRecoilValue(activeUserAtom);
  


  const [ Title,setTitle] = useState("")
  const handletitle = (e) =>{ setTitle(e.target.value) }
  // const agreedateactionplan = (row)=>{
  //   if(row.agree_date_action_plan){
  //     const d = new Date(row.agree_date_action_plan);
  //     let data = moment(d).format('D/MM/Y');
  //     return data != 'Invalid date'? data:"";
  //   }else{ return ""; } 
  // }

  const [Category,setCategory] = useState("")
  const handleCategory = (e) =>{ setCategory(e.target.value) }

const routeParams = useParams();
const navigate=useNavigate()
;

const handleApproval = ()=>{

 
  let api = new Audit_Program_List_Service();
  selectedRows.forEach((item) => {
      item.approval_status = 'Approved';
      item.reviews=review;
      let _agree_date_action_plan=new Date()
      item.agree_date_action_plan = _agree_date_action_plan.getFullYear() +"-"+(_agree_date_action_plan.getMonth()+1)+"-"+ _agree_date_action_plan.getDate();;
      api.editAuditProgram(item.id, item)
        .then((res) => {
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success ', detail: 'You have Approved' });
         
        })
        .catch((err) => {})      
  });
  
}

const sendForReview = ()=>{

  let api = new Audit_Program_List_Service();
  selectedRows.forEach((item) => {
      item.approval_status = 'Sended for Review';
      item.reviews=review;
      let _agree_date_action_plan=new Date()
      item.agree_date_action_plan = _agree_date_action_plan.getFullYear() +"-"+(_agree_date_action_plan.getMonth()+1)+"-"+ _agree_date_action_plan.getDate();;
      api.editAuditProgram(item.id, item)
        .then((res) => {
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Sent for Review' });
         
        })
        .catch((err) => {})      
  });
  
}


const handleRevert = ()=>{

  let api = new Audit_Program_List_Service();
  selectedRows.forEach((item) => {
      item.approval_status = 'Comment For Changes';
      item.reviews=review;
      let _agree_date_action_plan=new Date()
      item.agree_date_action_plan = _agree_date_action_plan.getFullYear() +"-"+(_agree_date_action_plan.getMonth()+1)+"-"+ _agree_date_action_plan.getDate();;
      api.editAuditProgram(item.id, item)
        .then((res) => {
          setdisplayBasic(false);
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Comment has been Submitted' });
         
        })
        .catch((err) => {})   
   
  });
  
}
const group = useRecoilValue(activeUserAtom); 
const [isHead, setisHead] = useState(false);            
const [isUser, setisUser] = useState(false);            

const hasPermission = (permission)=>{
  return group.groups.filter( f => f.name == permission).length > 0;
}

useEffect(()=>{console.log("hello");
  setisHead(hasPermission('audit_engagements_head'));
  setisUser(hasPermission('audit_engagements'));
},[])

const handleSendForApproval = ()=>{
  let api = new Audit_Program_List_Service();
  selectedRows[0]['agree_date_action_plan'] = null
  selectedRows.forEach((item) => {
    // if(item.approval_status == 'created'){
    item.approval_status = 'Sended For Approval';
    api.editAuditProgram(item.id, item)
      .then((res) => {
        get_data();
        toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Sent For Approval' });
      })
      .catch((err) => {})
    // }
  });
}


const [displayBasic, setdisplayBasic] = useState(false);
const makeId = ()=>{
  let id = ""
  try {
    
    id = selectedRows[0]['id']
    return id;
  } catch (error) {
    
    return "";
  }
}

const commentForChanges = () => {
  if (selectedRows.length > 0) {
    setdisplayBasic(true)
    // run_changes_process
  } else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the Row' });
  }
};

// ================================================================================

const handleStatusChange = (status)=>{
  let api = new Audit_Program_List_Service();
  selectedRows[0]['agree_date_action_plan'] = null
  selectedRows.forEach((item) => {
    item.approval_status = status;
    api.editAuditProgram(item.id, item)
      .then((res) => {
        get_data();
        toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Sent For Approval' });
      })
      .catch((err) => {})
  });
}

const confirmationForStatusChange = (status) => {
  if (selectedRows.length > 0) {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{handleStatusChange(status)},
    });
  }else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row' });
  }
};

// ================================================================================

const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
          <Dialog position="right" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => setdisplayBasic(false)}>
                 <Comment docId={ makeId() } belogTo={'audit_program'} processed_function = {handleRevert}/>
        </Dialog>
         <span className="mb-3">
         <h3  className=''>Audit Program<span className="" style={{float:"right"}}> 
        {  (ActiveUser.is_superuser || ActiveUser.usertype == 'Head')  &&
        <>
<CButton onClick={() => {setVisibleRight(true);audit_department();  get_data_repo();}} style={{background:"#64748B",width:100,padding:10,marginLeft:5}}>Add</CButton>

 <CButton onClick={handleDelete} style={{background:"#64748B",width:100,padding:10,marginLeft:5}}>Delete</CButton>
         

        {(selectedRows.length ? selectedRows[0]['approval_status']: "") == 'Sended for Management' && 
           <CButton onClick={()=>{confirmationForStatusChange('Accepted and Closed')}} style={{background:"#64748B",width:100,padding:10, marginLeft:5}}>Accept and Close</CButton>
         }
         {(selectedRows.length ? selectedRows[0]['approval_status']: "") == 'Sended For Approval' && 
         <CButton onClick={handleApproval} style={{background:"#64748B",width:100,padding:10, marginLeft:5}}>Approve</CButton>
         }

         {((selectedRows.length ? selectedRows[0]['approval_status'] : "") == 'Approved' || (selectedRows.length ? selectedRows[0]['approval_status'] : "") == 'Added By Head') && 
         <CButton onClick={sendForReview} style={{background:"#64748B",width:200,padding:10, marginLeft:5}}>Send for Review</CButton>
         }
         
         <CButton onClick={commentForChanges}  style={{background:"#64748B",width:200,padding:10,marginLeft:5}}>Comment for Changes</CButton>

        
        </>
        }

        {  ActiveUser.usertype == 'Basic' &&
        <>
                 <CButton onClick={() => {setVisibleRight(true);  get_data_repo();}} style={{background:"#64748B",width:100,padding:10}}>Add</CButton>
          <CButton onClick={handleDelete} style={{background:"#64748B",width:100,padding:10,marginLeft:5}}>Delete</CButton>

         <CButton onClick={handleSendForApproval} style={{background:"#64748B",width:200,padding:10,marginLeft:5}}>Send for Approval</CButton>
         <CButton onClick={commentForChanges}  style={{background:"#64748B",width:200,padding:10,marginLeft:5}}>Comments</CButton>

       
         </>
        }

      {  ActiveUser.usertype == 'Department' &&
        <>
         {(selectedRows.length ? selectedRows[0]['approval_status']: "") == 'Sended for Review' && 
         <CButton onClick={()=>{confirmationForStatusChange('Sended for Management')}} style={{background:"#64748B",width:200,padding:10,marginLeft:5}}>Send to Management</CButton>
      }
         </>
        }

      <Link target="_blank" to={`/Audit_engagement_report_print/${params.id}`}><CButton style={{ background: "#64748B", width: 100, padding: 10, marginLeft:5 }}>Report</CButton></Link>


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
  navigate(`/Audit_program/${clickedRowId}/`);
}

let delete_record = () => {
  let _data = selectedRows.map(i=>i.id);
  let api = new Audit_Program_List_Service();
  _data.forEach((id) => {
    api.deleteAuditrepoList(id)
      .then((res) => {
        get_data();
        get_data_Audit_Program()
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
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
  label: "Assessment",
  icon: "pi pi-window-maximize",
  
  command: (e) =>  {
    navigate('/Audit_program/'+data.id+"/"); 
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

let get_data=(search = "")=>{ 
    let api = new Audit_Program_List_Service;
    api.getAllAuditrepoList(search).then((res) => { 
      setDataTableList(res.data);
    }).catch((err) => { });
}

useEffect(() => {
  if(!localStorage.getItem('token')){  navigate("/"); }
  get_data();   
  get_data_Audit_Program();
 }, []);
 const globatEvent = useRecoilValue(globalEventAtom);
 const _departmentAtom = useRecoilValue(departmentAtom);


 const audit_department = () => {
  axios.get(API_URL + `/auditengagement/${params.id}/`)
    .then((success) => {
      setAudit_Department(success.data);
    })
    .catch((err) => {
      // Handle error
    });
};

let get_data_repo = (search = "") => {
  axios.get('http://192.168.10.5:8001/audit_program_repo?format=json', {})
    .then((response) => {
      const engagementDepartment = _departmentAtom.find(dept => dept.id === audit_Department.department);
      const departmentName = engagementDepartment ? engagementDepartment.name : null;
      const filteredProgramData = response.data.filter(row =>
        row.department_name.includes(departmentName)
      );
      setDataTableListRepo(filteredProgramData);
    });
};

useEffect(() => {
  audit_department();
}, []);

useEffect(() => {
  if (audit_Department) {
    get_data_repo();
    
  }
}, [audit_Department]);


const [Datatableprogram,setDatatableprogram]=useState([])
let get_data_Audit_Program = (search = "") => {
  axios.get(API_URL + `/audit_program/audit_engagement/${params.id}`)
    .then((res) => {
      const filteredData = res.data.filter(item => item.audit_engagement.toString() === params.id);
      setDatatableprogram(filteredData);
    })
    .catch((err) => {
      // Handle error
    });

};

useEffect(() => {
  audit_department()
  get_data_Audit_Program();
  get_data();
}, [routeParams])


const repoFooterContent = (
  <div>
     <Button label="Cancel" icon="pi pi-times" onClick={() => setVisibleRight(false) }  style={{ background: "#64748B" ,color:'white'}}  className="p-button-text" />
      <Button label="Save" icon="pi pi-check" onClick={() => saveSelectedInRegister() }  style={{ background: "#64748B",marginLeft:10 }}  autoFocus />
  </div>
);

const riskFormMini = ( <>
      <CForm>
                <CCol className="mb-4"> 
                    <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                    <CFormInput onChange={handletitle} type="text"  placeholder="Title" invalid={isValid ? '' : 'is-invalid'} />
                    <CFormFeedback invalid>Please provide a valid Title.</CFormFeedback>
                </CCol>
                <CCol className="mb-4">
                    <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                    <CFormSelect onChange={handleCategory} className="mb-3" aria-label="Large select example" invalid={isValid ? '' : 'is-invalid'}>
                      <option value="">Select</option>
                      <option  value="Test of Control">Test of Control</option>
                      <option  value="Other">Other</option>
                    </CFormSelect>
                    <CFormFeedback invalid>Please provide a valid Category.</CFormFeedback>
                </CCol>
            
                <CCol className='mb-3 d-flex justify-content-center'>
                <Button label="Add" icon="pi pi-check" style={{ background: "#64748B" }} onClick={() => addNewAuditProgram() } autoFocus />
              </CCol>
            
      </CForm>
</>
);

const addNewAuditProgram = ()=>{
  console.log('mubeentest1')
  let review_status = ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ? 'Added By Head':'Draft';
  axios.post(API_URL+'/audit_program/',{
    title_of_procedure: Title,
    description: Discription,
    summary_of_procedure:Summary,
    category:Category,
    audit_engagement:params.id,
    approval_status: review_status
  }).then((success) => {  
      setTitle("");
      setSummary("")
      setCategory("")
      setDiscription("")
      get_data();
      get_data_Audit_Program() 
      setVisibleRight(false);  
      setdisplayBasic(false)
      
    }).catch((err) => {  get_data();get_data_Audit_Program()  })
    
    
}


const saveSelectedInRegister = (e)=>{
  console.log('mubeentest2')
 let audit=params.id
  selectedRisk.map(i=> {
    let  approval_status = ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ? 'Added By Head':'Draft';
  axios.post(API_URL+`/audit_program/`,{
    title_of_procedure:i.title,
    description:i.description,
    summary_of_procedure: i.summary,
    category: i.category,
    audit_engagement:params.id,
    approval_status
  }).then((success) => {  
      get_data();
      get_data_Audit_Program()
    }).catch((err) => {  get_data();  })
  });
  setVisibleRight(false);  
  get_data_Audit_Program()
}

const getFilteredData = ()=>{
  
  let _head_filter = ['Added By Head', 'Sended For Approval', 'Approved', 'Sended for Review', 'Sended for Management', 'Accepted and Closed']

  if(ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ){
    // return Datatableprogram.filter(i=>i.approval_status == 'Approved' || i.approval_status == 'Added By Head' || i.approval_status == 'Sended For Approval' || i.approval_status == 'Sended for Review');
    return Datatableprogram.filter(i => _head_filter.includes(i.approval_status) );
  }
  else if(ActiveUser.usertype == 'Basic'){
    return Datatableprogram
  }
  else if(ActiveUser.usertype == 'Department'){
    return Datatableprogram.filter(i=>i.approval_status == 'Sended for Review')
  }
}

const progress = (row)=>{
  let _inprogress = ['Draft', 'Comment For Changes', 'Added By Head', 'Sended For Approval', 'Approved', 'Sended for Review'];
  let _underreview = ['Sended for Review'];
  let _sendedformanagement = ['Sended for Management'];
  let _acceptedandclosed = ['Accepted and Closed'];
  if(_inprogress.includes(row.approval_status)) {return "In Progress"; } 
  else if(_underreview.includes(row.approval_status)) {return "Underreview"; } 
  else if(_sendedformanagement.includes(row.approval_status)) {return "Sended for Management"; } 
  else if(_acceptedandclosed.includes(row.approval_status)) {return "Accepted and Closed"; } 
  else { return "_";}
 
}

return(
<>
<CCol className="" xs={12}>
<Toast ref={toast} />

 
  <Dialog maximizable header="Audit Program Repo" visible={visibleRight} style={{ width: '50vw' }} onHide={() => setVisibleRight(false)}>
 
 <p className="m-0">
 <CRow>
   <ConfirmDialog /> 

   <CCol className="" xs={12}> 
  
   </CCol>
   <CCol xs={12}>

     <CCard className="mb-4">
       <CCardBody>
       {riskFormMini}
       <hr/>
         <DataTable rowHover footer={repoFooterContent} value={DataTableListRepo} selection={selectedRisk} onSelectionChange={e => {   setSelectedRisk(e.value)}}  showGridlines responsiveLayout="scroll" size="small" >
           <Column align="center"  alignHeader={'center'} style={{cursor:'pointer'}} selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
           <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="title" header="Title" sortable></Column>
           <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="category" header="Category"></Column>
         </DataTable>
       </CCardBody>
     </CCard>

   </CCol>
 </CRow>
 </p>
</Dialog>




<ConfirmDialog /> 
<CCard className="mb-4">
          <CCardBody>

            <DataTable 
                        selectionMode={'single'} 
                        // selection={selectedRows} 
                        onSelectionChange={(e) => {setSelectedRows([e.value]); }} 
                        onRowDoubleClick={(e) => { handleClick(e) }}
                        value={getFilteredData()} 
                        header={header} 
                        showGridlines 
                        responsiveLayout="scroll" 
                        size="small" 
                        paginator rows={10}
                        rowHover 
                        rowsPerPageOptions={[10,20,50]}>
                        <Column align="center" selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="title_of_procedure" header="Title of Procedure" ></Column>
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="category" header="Type" sortable></Column>
                        <Column  alignHeader={'center'}style={{cursor:'pointer'}} field="audit_process_result" header="Result of Test" ></Column> 
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="summary_of_procedure" header="Issue Summary" ></Column> 
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="control_issue" header="Level of Importance" ></Column>   
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="agree_date_action_plan"  header="Agree Date of Action Plan"></Column>   
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="approval_status" header="Approval Status" ></Column>   
                        <Column  alignHeader={'center'} style={{cursor:'pointer'}} field="approval_status" body={progress} header="Progress" ></Column>   
                        
            </DataTable>

          </CCardBody>
</CCard>



      </CCol>
</>

)
}




export default Audit_Program_List;
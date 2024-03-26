import {React,useEffect,useState,useRef} from "react";
import { useParams } from "react-router-dom";
const API_URL = getSecrets.API_URL
import { CForm , CFormLabel, CFormInput, CFormTextarea} from '@coreui/react'

import axios from 'axios';
import RiskDataListHistory from './RiskDataListHistory';
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
import RiskRegisterService from "src/services/Riskregister.service";
import { DataTable } from 'primereact/datatable';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';

import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

import RiskrepositoryService from "src/services/RiskRepository.service";
import UsersService from "src/services/users.service";
import { Toast } from 'primereact/toast';
import moment from "moment";
import { useRecoilValue } from "recoil";
import { departmentAtom } from "src/_state/departmentAtom";
import { activeUserAtom } from "src/_state/activeUserAtom";
import {Comment} from "src/views/widgets/Comment";
import { saveAs } from 'file-saver';
import 'primeicons/primeicons.css';


function Risklist(props){

const [DataTableList,setDataTableList] =useState([]);
const [globalFilterValue, setGlobalFilterValue] = useState('');
const [visibleRight, setVisibleRight] = useState(false);
const [DataTableListRepo,setDataTableListRepo] =useState([]);
const [selectedRisk, setSelectedRisk] = useState([]);
const ActiveUser = useRecoilValue(activeUserAtom);



const [ Title,setTitle] =useState("")
const handletitle = (e) =>{ setTitle(e.target.value) }

const [ Discription,setDiscription] =useState("")
const handlediscription = (e) =>{ setDiscription(e.target.value) }

const routeParams = useParams();
const navigate=useNavigate()
useEffect(() => { get_data(); get_child_risk(); }, [routeParams]);

const [selectedRows, setSelectedRows] = useState([]);
const toast = useRef(null);

const delete_selection = ()=>{
  let _data = selectedRows.map(i=>i.id);
  let api = new RiskRegisterService;
  _data.forEach(element => {
    api.deleteRiskRegister(element).then(res=>{
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
      get_data(); get_child_risk();
    });
  });
}

const cols = [
  { field: 'title', header: 'Title' },
  
  
  { field: 'inherent_risk_rating_rating', header: 'Inherent Risk Rating Rating' },
  { field: 'overall_control_rating', header: 'Overall Control Rating' },
  { field: 'residual_risk_scoring_score', header: 'Residual Risk Scoring Score' },

  { field: 'last_inherent_risk_rating_rating', header: 'Last Inherent Risk Rating Rating' },
  { field: 'last_overall_control_rating', header: 'Last Overall Control Rating' },
  { field: 'last_residual_risk_scoring_score', header: 'Last Residual Risk Scoring Score' },

  { field: 'treatment_required', header: 'Action Plane Required' },
  { field: 'action_plan_owner', header: 'Action Plane owner' },
  { field: 'implementation_date', header: 'Action Plane Agreed Date' },
  { field: 'review_status', header: 'Status' }
];

const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

const exportPdf = () => {
  import('jspdf').then((jsPDF) => {
    import('jspdf-autotable').then(() => {
      const doc = new jsPDF.default(0, 0);
      
      let _data = DataTableList.map(i => {
        let _child_data = ChildRisk.filter(ci => ci.parent_id === i.id);   
        i['last_inherent_risk_rating_rating'] = _child_data.length ? _child_data[_child_data.length - 1]['inherent_risk_rating_rating'] : "N/A";
        i['last_overall_control_rating'] = _child_data.length ? _child_data[_child_data.length - 1]['overall_control_rating'] : "N/A";
        i['last_residual_risk_scoring_score'] = _child_data.length ? _child_data[_child_data.length - 1]['residual_risk_scoring_score'] : "N/A";
        i['implementation_date'] = i['implementation_date'] ? formatDate(new Date(i['implementation_date'])) : "N/A"; 
        return i;
      });

      const columnWidth = doc.internal.pageSize.getWidth() / exportColumns.length;
      
     
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 0); 
      doc.text("Risk Register", doc.internal.pageSize.getWidth() / 2, 10, {
        align: "center"
      });
      
      
      const currentDate = new Date();
      const formattedDate = `Dated: ${formatDate(currentDate, '-')}`;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(formattedDate, doc.internal.pageSize.getWidth() - 10, 10, {
        align: "right"
      });
      
      doc.autoTable({
        head: [exportColumns.map(col => col.title)],
        body: _data.map(row => exportColumns.map(col => row[col.dataKey])),
        startY: 20,
        headStyles: {
          fillColor: [100, 116, 139],
          textColor: 255,
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
          fontStyle: 'bold',
          halign: 'center' ,
          valign: 'middle' 
        },
        bodyStyles: {
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
          halign: 'center', 
          fontSize: 8
        },
        columnStyles: {
          0: { columnWidth, halign: 'center' }, 
          1: { columnWidth, halign: 'center' },
         
        },
        margin: { top: 2, left: 2, right: 2, bottom: 2 },
      });
      
      doc.save('products.pdf');
    });
  });
};


const formatDate = (date, separator = '/') => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${separator}${month}${separator}${year}`;
};


const handleDelete = () => {
  if (selectedRows.length > 0) {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: delete_selection,
    });
  }else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
  }
};

const run_sendforapproval_process = ()=>{
  let _data = selectedRows;
  let api = new RiskRegisterService;
  _data.forEach(element => {
    element['review_status'] = 'Sended For Approval';
    delete element.file;
    api.patchRiskRegister(element.id, element).then(res=>{
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Sent for Approval' });
      get_data(); get_child_risk();
    });
  });
}

const sendForApproval = () => {
  if (selectedRows.length > 0) {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: run_sendforapproval_process,
    });
  }else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Sent for Approval' });
  }
};

// ==================================================================================================
const change_status = (status)=>{
  let _data = selectedRows;
  let api = new RiskRegisterService;
  _data.forEach(element => {
    element['review_status'] = status;
    delete element.file;
    api.patchRiskRegister(element.id, element).then(res=>{
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Action Completed Successfully' });
      get_data(); get_child_risk();
    });
  });
}

const confirmation_for_status_change = (status) => {
  if (selectedRows.length > 0) {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{change_status(status)} ,
    });
  }else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
  }
};
// ==================================================================================================

const run_sendforreview_process = ()=>{
  let _data = selectedRows;
  let api = new RiskRegisterService;
  _data.forEach(element => {
    element['review_status'] = 'Sended for Review';
    delete element.file;
    api.patchRiskRegister(element.id, element).then(res=>{
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Sent for Review' });
      get_data(); get_child_risk();
    });
  });
}

const sendForReview = () => {


  if (selectedRows.length > 0) {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: run_sendforreview_process,
    });
  }else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
  }
};


const run_changes_process = ()=>{
  let _data = selectedRows;
  let api = new RiskRegisterService;
  _data.forEach(element => {
    element['review_status'] = 'Comment For Changes';
    delete element.file;
    api.patchRiskRegister(element.id, element).then(res=>{
      setdisplayBasic(false);
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Submitted Successfully' });
      get_data(); get_child_risk();
    });
  });
}

const run_approve_process = () => {
  let _data = selectedRows;
  let api = new RiskRegisterService;
  _data.forEach(element => {
    delete element.file;
    element['review_status'] = 'Approved';
    api.patchRiskRegister(element.id, element).then(res=>{
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Approved Successfully' });
      get_data(); get_child_risk();
    });
  });
}

const approve = () => {
  if (selectedRows.length > 0) {
    confirmDialog({
      message: 'Are you sure you want to approve?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: run_approve_process,
    });
  }else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that to approve' });
  }
};

const commentForChanges = () => {
  if (selectedRows.length > 0) {
    setdisplayBasic(true)
    // run_changes_process
  } else {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the Row' });
  }
};

const [displayBasic, setdisplayBasic] = useState(false);

const makeId = ()=>{
  let id = ""
  try {    
    id =(selectedRows[0]['title']+"_"+selectedRows[0]['department_id']).replace(/\s/, '');
    return id;
  } catch (error) {    
    return "";
  }
}

const renderHeader = () => {
  return (
    
      <div className="flex justify-content-between">
        <Dialog position="right" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => setdisplayBasic(false)}>
                 <Comment docId={ makeId() } belogTo={'risk'} processed_function = {run_changes_process}/>
        </Dialog>
        
         <span className="mb-3">
         <h3  className=''>Risk Register<span className="" style={{float:"right"}}> 
         <span>

          { ActiveUser.usertype == 'Basic' &&
            <>    
                <CButton onClick={() => {setVisibleRight(true);  get_data_repo();}} style={{background:"#64748B",width:100,padding:10}}>Add</CButton>
                <CButton onClick={handleDelete}  style={{background:"#64748B",width:100,padding:10,marginLeft:10}}>Delete</CButton>
                <CButton onClick={sendForApproval}  style={{background:"#64748B",width:200,padding:10,marginLeft:10}}>Send For Approval</CButton>
                <CButton onClick={commentForChanges}  style={{background:"#64748B",width:200,padding:10,marginLeft:10}}>Comments</CButton>
            </> 
          }

          { (ActiveUser.is_superuser || ActiveUser.usertype == 'Head')  &&
              <>
            {selectedRows.length > 0 && 
              selectedRows[0].review_status == 'Sended for Management' &&
              <CButton onClick={()=>{confirmation_for_status_change('Accepted and Closed')}}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Accept and Close</CButton>
            }
             { (selectedRows.length > 0 && (selectedRows[0].review_status == 'Sended For Approval' || selectedRows[0].review_status == 'Added By Head')) && 
              <>                       
            
              <CButton onClick={approve}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Approve</CButton>
              <CButton onClick={commentForChanges}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Comment for Changes</CButton>
              </>
             }
             { (selectedRows.length > 0 && (selectedRows[0].review_status == 'Approved')) && 
              <>                       
              <CButton onClick={sendForReview}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Send For Review</CButton>
              </>
             }
                            <CButton onClick={() => {setVisibleRight(true);  get_data_repo();}} style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Add</CButton>

              <CButton onClick={handleDelete}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Delete</CButton>

              <CButton onClick={exportPdf}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>PDF</CButton>


              </>
           }
          { ActiveUser.usertype == 'Department' &&
            <>
            {selectedRows.length > 0 &&
              selectedRows[0].review_status == 'Sended for Review' &&
              <CButton onClick={()=>{confirmation_for_status_change('Sended for Management')}}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Send to Management</CButton>
            }
            </>
          } 
           <>
            {/*
            <CButton onClick={sendForApproval}  style={{background:"#64748B",width:200,padding:10,marginRight:10}}>Send For Approval</CButton>
            <CButton onClick={exportPdf}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>PDF</CButton>
            <CButton onClick={handleDelete}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Delete</CButton>
            <CButton onClick={() => {setVisibleRight(true);  get_data_repo();}} style={{background:"#64748B",width:100,padding:10}}>ADD</CButton> */}
          </>
          </span>
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

const header = renderHeader();

const items = (data) => ([
{
  label: "Assessment",
  icon: "pi pi-window-maximize",
  
  command: (e) =>  {
    navigate('/RiskAdd/'+data.id ); 
}

},
{
  label: "Assessment History",
  icon: "pi pi-window-maximize",
  
  command: (e) =>  {
    setSelected(data);
    show('right')
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

let get_data = async (search = "")=>{ 
    let api = new RiskRegisterService;
    api.getAllRiskRegister(routeParams.department_id, search).then((res) => { 
      let data = res.data;
      setDataTableList(res.data); 
    }).catch((err) => { });
}

const [ChildRisk, setChildRisk] = useState([]);
var get_child_risk = () => {
  let api = new RiskRegisterService;
  api.getAllChildRisk().then((res) => { 
    let data = res.data;
    setChildRisk(res.data); 
    
  }).catch((err) => { });
}

let delete_record = (rowData) => {
  let api = new RiskRegisterService;
  api.deleteRiskRegister(rowData.id).then((res) => { 
    get_data(); 
    toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
  }).catch((err) => { })
}


useEffect(() => {
  if(!localStorage.getItem('token')){
    navigate("/")
  }
  get_data();
  get_child_risk();
 
 }, []);

 const _departmentAtom = useRecoilValue(departmentAtom);
const _department = (row)=>{
  // debugger;
  return row && _departmentAtom.length ? _departmentAtom.filter(i => i.id == row.department_id)[0]['name'] : []
}

let get_data_repo=async (search = "")=>{ 
  setSelectedRisk([]);
  // let api = new RiskrepositoryService; 
  // api.getDataDepartment(routeParams.department_id, search).then((res) => { setDataTableListRepo(res.data); }).catch((err) => { });
const res = await axios.get('http://54.65.28.189:8001/risk_repo?format=json', {}) .then((response) => {
  console.log(response.data);
  
 let _name = _departmentAtom.filter(i => i.id == routeParams.department_id)[0]['name'];
  // console.log("_departmentAtom ", _name,  _departmentAtom, routeParams.department_id)
  // console.log(response.data.filter(r => r.department_name == _name))

  setDataTableListRepo(response.data.filter(r => r.department_name == _name).map(i=>{i['department_id'] =routeParams.department_id; return i; }  ));
  // console.log(response.status);
  // console.log(response.statusText);
  // console.log(response.headers);
  // console.log(response.config);
});

}

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
                    <CFormInput value={Title} onChange={handletitle} type="text"  placeholder="Title"  />
                </CCol>              
                
                <CCol className="mb-4"> 
                  <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                  <CFormTextarea  value={Discription} onChange={handlediscription}  rows="4"></CFormTextarea>
                </CCol>
            
        
              <CCol className='mb-3 d-flex justify-content-center'>
                <Button label="Add" icon="pi pi-check" style={{ background: "#64748B" }} onClick={() => addNewRisk() } autoFocus />
              </CCol>
           
      </CForm>
</>
);

const addNewRisk = ()=>{
  let review_status = ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ? 'Added By Head':'Draft';
  axios.post(API_URL+'/risk_register/department_id/'+routeParams.department_id,{
    department_id: routeParams.department_id,
    status:"active",
    title: Title,
    root_cause: Discription,
    review_status   
  }).then((success) => {  
    
      setDiscription("");
      setTitle("");
      get_data();
      setVisibleRight(false);  
     
    }).catch((err) => {  get_data();  })

}

const saveSelectedInRegister = (e)=>{
  let review_status = ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ? 'Added By Head':'Draft';

  selectedRisk.map(i=> {
  axios.post(API_URL+'/risk_register/',{
    department_id: i.department_id,
    status:"active",
    title: i.title,
    root_cause: i.description,   
    review_status
  }).then((success) => {  
      get_data();
    }).catch((err) => {  get_data();  })

  });
  setVisibleRight(false);  

}

const rowClass = (data) => {
  return {
      'inactive_row': data.status == 'inactive'
  }
}
const [visible, setVisible] = useState(false);
const [position, setPosition] = useState('center');
const [Selected, setSelected] = useState({});
const footerContentHistory = (
  <div>
      <Button label="Close" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
  </div>
);
const show = (position) => {
  setPosition(position);
  setVisible(true);
  
};

let find_last_inherent_rating = (row) =>  {
    let _data = ChildRisk.filter(i => i.parent_id == row.id );
   return _data.length ? _data[_data.length -1]['inherent_risk_rating_rating'] != 'null' ? _data[_data.length -1]['inherent_risk_rating_rating'] :  "Not Applicable" : "Not Applicable"

}

let find_last_control_rating = (row) =>  {
  let _data = ChildRisk.filter(i => i.parent_id == row.id );
   return _data.length ? _data[_data.length -1]['overall_control_rating'] != 'null' ? _data[_data.length -1]['overall_control_rating']: "Not Applicable" : "Not Applicable"

}

let find_last_residual_score = (row) =>  {
  let _data = ChildRisk.filter(i => i.parent_id == row.id );
   return _data.length ? _data[_data.length -1]['residual_risk_scoring_score'] != 'null' ?_data[_data.length -1]['residual_risk_scoring_score']: "Not Applicable" : "Not Applicable"
}

let treatment = (row) => row['treatment_required']??'N/A';  

const RowSelect = (event) => {  navigate('/RiskAdd/'+event.data.id ); };

const implementationDate = (row)=>{
  if(row.implementation_date){
    const d = new Date(row.implementation_date);
    let data = moment(d).format('D/MM/Y');
    return data != 'Invalid date'? data:"";
  }else{ return ""; } 
}

const _body = (item,row)=>{
  let data =  row[item];
  return data && data != 'null' ? data : "Not Applicable";
}


const getFilteredData = ()=>{
  let _head_filter = ['Added By Head', 'Sended For Approval', 'Approved', 'Sended for Review', 'Sended for Management', 'Accepted and Closed']
  if(ActiveUser.is_superuser || ActiveUser.usertype == 'Head' ){
    // return DataTableList.filter(i=>i.review_status == 'Approved' || i.review_status == 'Added By Head' || i.review_status == 'Sended For Approval' || i.review_status == 'Sended for Review');
    return DataTableList.filter(i => _head_filter.includes(i.review_status) );
  }
  else if(ActiveUser.usertype == 'Basic'){
    return DataTableList
  }
  else if(ActiveUser.usertype == 'Department'){
    return DataTableList.filter(i=>i.review_status == 'Sended for Review')
  }
}

const progress = (row)=>{
  let _inprogress = ['Draft', 'Comment For Changes', 'Added By Head', 'Sended For Approval', 'Approved', 'Sended for Review'];
  let _underreview = ['Sended for Review'];
  let _sendedformanagement = ['Sended for Management'];
  let _acceptedandclosed = ['Accepted and Closed'];
  if(_inprogress.includes(row.review_status)) {return "In Progress"; } 
  else if(_underreview.includes(row.review_status)) {return "Underreview"; } 
  else if(_sendedformanagement.includes(row.review_status)) {return "Sended for Management"; } 
  else if(_acceptedandclosed.includes(row.review_status)) {return "Accepted and Closed"; } 
  else { return "_ ";}
 
}
const pdffile = (rowData) => {
  const handleDownload = () => {
    fetch(rowData.file)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, `${rowData.file_name}`); // Change 'file.pdf' to the desired filename
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <i className="pi pi-cloud-download" onClick={handleDownload} style={{ fontSize: '2rem' }}></i>
        {/* <Button type='submit' style={{ background: "#64748B" }} onClick={handleDownload} icon="pi pi-check" label="Download" className="mr-2"></Button> */}
    </div>
  );
};
const headerGroup = (
  <ColumnGroup>
      <Row>
        
          <Column header="" colSpan={6} />
          <Column alignHeader={'center'} header="Last Assessment" colSpan={3} />
          <Column alignHeader={'center'} header="Action Plan" colSpan={3} />
          <Column alignHeader={'center'} header="" colSpan={1} />
          <Column alignHeader={'center'} header="" colSpan={1} />
          <Column alignHeader={'center'} header="" colSpan={1} />
      </Row>
      <Row>

      <Column align="center" header="" field="" />
          <Column align="center" header="Department" field="department_id" />
          <Column align="center" header="Title" field="title" />
          <Column align="center" header="Inherent Risk Rating" field="inherent_risk_rating_rating" />
          <Column align="center" header="Overall Control Rating" field="overall_control_rating" />
          <Column align="center" header="Residual Risk Scoring" field="residual_risk_scoring_score" />

          <Column align="center" header="Inherent Risk Rating Rating" field="inherent_risk_rating_rating" />
          <Column align="center" header="Overall Control Rating" field="overall_control_rating" />
          <Column align="center" header="Residual Risk Scoring" field="residual_risk_scoring_score" />

          <Column align="center" header="Required" field="treatment_required" />
          <Column align="center" header="Owner" field="action_plan_owner" />
          <Column align="center" header="Agreed Date" field="implementation_date" body={data => data.implementation_date || 'N/A'}/>
          <Column align="center" header="Status" field="review_status" />
          <Column align="center" header="Progress" field="review_status" />
          <Column align="center" header="Attachment" body={pdffile} />

      </Row>
  </ColumnGroup>
);


        
return(
<>
<CCol className="" xs={12}>

<Dialog maximizable header="Header" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContentHistory} draggable={false} resizable={false}>
      <p className="m-0">
         <RiskDataListHistory selected={Selected}></RiskDataListHistory>
      </p>
</Dialog>

<Dialog maximizable header="Risk Repository" visible={visibleRight} style={{ width: '50vw' }} onHide={() => setVisibleRight(false)}>
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
            <DataTable rowHover footer={repoFooterContent} value={DataTableListRepo} selection={selectedRisk} onSelectionChange={e => { setSelectedRisk(e.value)}}  showGridlines responsiveLayout="scroll" size="small" >
              <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
              <Column style={{cursor:'pointer'}} field="title" header="Title" sortable></Column>
              <Column style={{cursor:'pointer'}} field="description" header="Description" ></Column>                  
            </DataTable>

          </CCardBody>
        </CCard>

      </CCol>
    </CRow>
    </p>
</Dialog>
       
<ConfirmDialog /> 
<Toast ref={toast} />
<CCard className="mb-4">
          <CCardBody>

            <DataTable 
              onRowDoubleClick={(e) => { RowSelect(e) }}
              selectionMode={'single'}
              onSelectionChange={(e) => {setSelectedRows([e.value]);}} 
              dataKey="id"
              headerColumnGroup={headerGroup} 
              rowClassName={rowClass} 
              value={getFilteredData()} 
              header={header} 
              showGridlines 
              responsiveLayout="scroll" size="small" 
              paginator 
              rows={10} 
              rowHover
              rowsPerPageOptions={[10,20,50]}            
              >
              <Column align="center" selectionMode="single" headerStyle={{ width: '3rem' }}></Column>

              <Column style={{ cursor: 'pointer' }} field="department_id" body={_department}></Column>
<Column style={{ cursor: 'pointer' }} field="title" body={data => data.title || 'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="inherent_risk_rating_rating" body={data => data.inherent_risk_rating_rating || 'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="overall_control_rating" body={data => data.overall_control_rating || 'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="residual_risk_scoring_score" body={data => data.residual_risk_scoring_score || 'N/A'}></Column>

<Column align="center" style={{ cursor: 'pointer' }} field="inherent_risk_rating_rating" body={find_last_inherent_rating}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="overall_control_rating" body={find_last_control_rating}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="residual_risk_scoring_score" body={find_last_residual_score}></Column>

<Column align="center" style={{ cursor: 'pointer' }} field="treatment_required" body={data => data.treatment_required || 'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="action_plan_owner" body={data => data.action_plan_owner || 'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="implementation_date" body={implementationDate||'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="review_status" body={data => data.review_status || 'N/A'}></Column>
<Column align="center" style={{ cursor: 'pointer' }} field="review_status" body={progress}></Column>
<Column align="center" style={{ cursor: 'pointer' }} header="Attachment"  body={pdffile}></Column>
            
            </DataTable>

          </CCardBody>
</CCard>
      </CCol>
</>

)
}

export default Risklist;
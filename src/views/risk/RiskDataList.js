// import {React,useEffect,useState} from "react";
// import { useParams } from "react-router-dom";
// const API_URL = getSecrets.API_URL
// import { CForm , CFormLabel, CFormInput, CFormTextarea} from '@coreui/react'

// import axios from 'axios';
// import { getSecrets } from "src/config";
// import {
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableCaption,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//     CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton
//   } from '@coreui/react'
//   import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useNavigate
//   } from "react-router-dom";
//   import { DocsExample } from 'src/components'
//   import CIcon from '@coreui/icons-react'
// import RiskRegisterService from "src/services/Riskregister.service";
// import { DataTable } from 'primereact/datatable';
// import {Column} from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Sidebar } from 'primereact/sidebar';

// import { SplitButton } from 'primereact/splitbutton';
// import { InputText } from 'primereact/inputtext';
// import { Dialog } from 'primereact/dialog';

// import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
// import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
// import CompanySetupService from "src/services/Companysetup.service";
// import AuditengagementService from "src/services/Auditengagement.service";
// import RiskrepositoryService from "src/services/RiskRepository.service";


// function RiskDataList(props){

// const [DataTableList,setDataTableList] =useState([]);
// const [globalFilterValue, setGlobalFilterValue] = useState('');
// const [DataTableListRepo,setDataTableListRepo] =useState([]);

// const [ Title,setTitle] =useState("")
// const handletitle = (e) =>{ setTitle(e.target.value) }

// const [ Discription,setDiscription] =useState("")
// const handlediscription = (e) =>{ setDiscription(e.target.value) }

// const routeParams = useParams();
// const navigate=useNavigate()
// useEffect(() => { 
//    console.log('Route param Changed changed', routeParams);  get_data();
//   }, [routeParams]);

// const renderHeader = () => {
//   return (
//       <div className="flex justify-content-between">
//          <span className="mb-3">
//          <h3  className=''>Risk Register<span className="" style={{float:"right"}}> </span></h3>
//           </span>
//           <span className="p-input-icon-left">
         
//               <i className="pi pi-search" />
//               <InputText onChange={onGlobalFilterChange} value={globalFilterValue}  placeholder="Search Risk" />
//           </span>
//       </div>
//   )
// }

// const onGlobalFilterChange = (e) => {
//   const value = e.target.value;
//   setGlobalFilterValue(value);
//   get_data(value);
// }

// const header = renderHeader();

// const items = (data) => ([
// {
//   label: "Assessment",
//   icon: "pi pi-window-maximize",
  
//   command: (e) =>  {
//     navigate('/RiskAdd/'+data.id ); 
// }

// },
// {
//   label: "Delete",
//   icon: "pi pi-times",
//   command: (e) => {
//     confirmDialog({
//       message: 'Are you sure you want to proceed?',
//       header: 'Confirmation',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => delete_record(data),
//   });
   
//   },
// },
// ]);


// let get_data=(search = "")=>{ 
//     let api = new RiskRegisterService;
//     api.getAllRisk(routeParams.department_id, search).then((res) => { 
//       let risk_list = res.data;
//       if(routeParams.param_four == 'Inherent'){
//          risk_list =  res.data.filter( i=> i.status == 'active' && i.inherent_risk_rating_likehood == routeParams.param_one && i.inherent_risk_rating_impact == routeParams.param_two && i.inherent_risk_rating_rating == routeParams.param_three );

//       }
//       else if(routeParams.param_four == 'Residual'){
//          risk_list =  res.data.filter( i=> i.status == 'active' && i.overall_control_rating == routeParams.param_one && i.inherent_risk_rating_rating == routeParams.param_two && i.residual_risk_scoring_score == routeParams.param_three );

//       }
//       setDataTableList(risk_list); 
//     }).catch((err) => { });
// }

// let delete_record = (rowData) => {
//   console.log("Delete ",rowData);
// let api = new RiskRegisterService;
// api.deleteRiskRegister(rowData.id).then((res) => { 
//   get_data(); 
//   toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
// }).catch((err) => { })
// }


// useEffect(() => {
//   if(!localStorage.getItem('token')){
//     navigate("/")
//   }
//   get_data();
 
//  }, []);

//  const statusBodyTemplate = (rowData) => {
//   return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
 
// }


// let get_data_repo=(search = "")=>{ 
//   let api = new RiskrepositoryService; 
//   api.getAllRisks(routeParams.department_id, search).then((res) => { setDataTableListRepo(res.data); }).catch((err) => { });
// }


    
// return(
// <>
// <CCol className="" xs={12}>
      
// <ConfirmDialog /> 
// <CCard className="mb-4">
//           <CCardBody>

//             <DataTable value={DataTableList} showGridlines responsiveLayout="scroll" size="small" paginator rows={10} rowsPerPageOptions={[10,20,50]}>
              
//               <Column field="title" header="Title" sortable ></Column>
//               <Column field="root_cause" header="Description" ></Column>     
//               <Column field="inherent_risk_rating_rating" header="Inherent Risk Rating" sortable></Column>     
//               <Column field="overall_control_rating" header="Overall Control Rating" sortable></Column>     
//               <Column field="residual_risk_scoring_score" header="Residual Risk Scoring" sortable></Column>     
//               <Column field="category" header="category" sortable></Column>     
//               <Column field="risk_owner" header="Owner" sortable></Column>     
//               <Column field="risk_champion" header="Champion" sortable></Column>     
//               <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
             
//             </DataTable>

//           </CCardBody>
// </CCard>



//       </CCol>
// </>

// )
// }

// export default RiskDataList;
// =============================================================================================================================

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


function RiskDataList(props){

const [DataTableList,setDataTableList] =useState([]);
const [globalFilterValue, setGlobalFilterValue] = useState('');
const [visibleRight, setVisibleRight] = useState(false);
const [DataTableListRepo,setDataTableListRepo] =useState([]);
const [selectedRisk, setSelectedRisk] = useState(null);

const [ Title,setTitle] =useState("")
const handletitle = (e) =>{ setTitle(e.target.value) }

const [ Discription,setDiscription] =useState("")
const handlediscription = (e) =>{ setDiscription(e.target.value) }

const routeParams = useParams();
const navigate=useNavigate()
useEffect(() => { get_data(); get_child_risk(); }, [routeParams]);

const [selectedRows, setSelectedRows] = useState(null);
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
  { field: 'implementation_date', header: 'Action Plane Agreed Date' }
];

const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

const exportPdf = () => {
  
  import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);
         
          let _data = DataTableList.map(i=>{ 

          let _child_data = ChildRisk.filter(ci => ci.parent_id == i.id );   

            i['last_inherent_risk_rating_rating'] =  _child_data.length ? _child_data[_child_data.length -1]['inherent_risk_rating_rating'] : "";
            i['last_overall_control_rating'] =  _child_data.length ? _child_data[_child_data.length -1]['overall_control_rating'] : "";
            i['last_residual_risk_scoring_score'] =  _child_data.length ? _child_data[_child_data.length -1]['residual_risk_scoring_score'] : "";
            return i;
          })

          doc.autoTable(exportColumns, _data, {
            headStyles: { fillColor: [100, 116, 139] },
            margin: { top: 0, left: 0, right: 0, bottom: 0 },
          });
          doc.save('products.pdf');
      });
  });
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

const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
        
         <span className="mb-3">
         <h3  className=''>Risk Register<span className="" style={{float:"right"}}> 
         <span>
          {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
            <CButton onClick={exportPdf}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>PDF</CButton>
            <CButton onClick={handleDelete}  style={{background:"#64748B",width:100,padding:10,marginRight:10}}>Delete</CButton>
          
            <CButton onClick={() => {setVisibleRight(true);  get_data_repo();}} style={{background:"#64748B",width:100,padding:10}}>ADD</CButton>
          
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

// let get_data = async (search = "")=>{ 
//     let api = new RiskRegisterService;
//     api.getAllRiskRegister(routeParams.department_id, search).then((res) => { 
//       let data = res.data;
//       setDataTableList(res.data); 
//     }).catch((err) => { });
// }

let get_data=(search = "")=>{ 
    let api = new RiskRegisterService;
    api.getAllRisk(routeParams.department_id, search).then((res) => { 
      let risk_list = res.data;
      if(routeParams.param_four == 'Inherent'){
         risk_list =  res.data.filter( i=> i.status == 'active' && i.inherent_risk_rating_likehood == routeParams.param_one && i.inherent_risk_rating_impact == routeParams.param_two && i.inherent_risk_rating_rating == routeParams.param_three );

      }
      else if(routeParams.param_four == 'Residual'){
         risk_list =  res.data.filter( i=> i.status == 'active' && i.overall_control_rating == routeParams.param_one && i.inherent_risk_rating_rating == routeParams.param_two && i.residual_risk_scoring_score == routeParams.param_three );

      }
      setDataTableList(risk_list); 
    }).catch((err) => { });
}


const [ChildRisk, setChildRisk] = useState([]);
var get_child_risk = () => {
  let api = new RiskRegisterService;
  api.getAllChildRisk().then((res) => { 
    let data = res.data;
    console.log("risk =>: ", data)
    setChildRisk(res.data); 
    
  }).catch((err) => { });
}

let delete_record = (rowData) => {
  console.log("Delete ",rowData);
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


let get_data_repo=(search = "")=>{ 
  let api = new RiskrepositoryService; 
  api.getDataDepartment(routeParams.department_id, search).then((res) => { setDataTableListRepo(res.data); }).catch((err) => { });
}

const repoFooterContent = (
  <div>
      <Button label="Cancle" icon="pi pi-times" onClick={() => setVisibleRight(false) } className="p-button-text" />
      <Button label="Save" icon="pi pi-check" onClick={() => saveSelectedInRegister() } autoFocus />
  </div>
);

const riskFormMini = ( <>
      <CForm>
            <CRow>
                <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                    <CFormInput value={Title} onChange={handletitle} type="text"  placeholder="Title"  />
                </CCol>              
                
                <CCol > 
                  <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
                  <CFormTextarea  value={Discription} onChange={handlediscription}  rows="4"></CFormTextarea>
                </CCol>
            </CRow>
            <CRow>
              <CCol>
                <Button label="Add" icon="pi pi-check" onClick={() => addNewRisk() } autoFocus />
              </CCol>
            </CRow>
      </CForm>
</>
);

const addNewRisk = ()=>{

  axios.post(API_URL+'/risk_register/department_id/'+routeParams.department_id,{
    department_id: routeParams.department_id,
    status:"active",
    title: Title,
    root_cause: Discription   
  }).then((success) => {  
      console.log(success);    
      console.log()
      setDiscription("");
      setTitle("");
      get_data();
      setVisibleRight(false);  
     
    }).catch((err) => {  get_data();  })

}

const saveSelectedInRegister = (e)=>{
 
  selectedRisk.map(i=> {
  axios.post(API_URL+'/risk_register/',{
    department_id: i.department_id,
    status:"active",
    title: i.title,
    root_cause: i.description,   
  }).then((success) => {  
      console.log(success);    
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
    console.log("find_last_inherent_rating", _data);
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

const _departmentAtom = useRecoilValue(departmentAtom);
const _department = (row)=>{
  console.log("departmentAtom", _departmentAtom);
  let _filtered = _departmentAtom.filter(i => i.id == row.department_id);
  return _filtered.length ? _filtered[0]['name']: '';
}


const headerGroup = (
  <ColumnGroup>
      <Row>
          <Column header="" colSpan={6} />
          <Column alignHeader={'center'} header="Last Assessment" colSpan={3} />
          <Column alignHeader={'center'} header="Action Plan" colSpan={3} />
      </Row>
      <Row>
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column header="Department" field="department_id" />
          <Column header="Title" field="title" />
          <Column align="center" header="Inherent Risk Rating Rating" field="inherent_risk_rating_rating" />
          <Column align="center" header="Overall Control Rating" field="overall_control_rating" />
          <Column align="center" header="Residual Risk Scoring Score" field="residual_risk_scoring_score" />

          <Column align="center" header="Inherent Risk Rating Rating" field="inherent_risk_rating_rating" />
          <Column align="center" header="Overall Control Rating" field="overall_control_rating" />
          <Column align="center" header="Residual Risk Scoring Score" field="residual_risk_scoring_score" />

          <Column align="center" header="Required" field="treatment_required" />
          <Column align="center" header="Owner" field="action_plan_owner" />
          <Column align="center" header="Agreed Date" field="implementation_date" />

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

<Dialog maximizable header="Risk Repository" visible={visibleRight} style={{ width: '90vw' }} onHide={() => setVisibleRight(false)}>
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
            <DataTable footer={repoFooterContent} value={DataTableListRepo} selection={selectedRisk} onSelectionChange={e => { setSelectedRisk(e.value)}}  showGridlines responsiveLayout="scroll" size="small" >
              <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
              <Column field="title" header="Title" sortable></Column>
              <Column field="description" header="Description" ></Column>                  
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
              selectionMode={'checkbox'} 
              selection={selectedRows} 
              onSelectionChange={(e) => {setSelectedRows(e.value); console.log(e.value)}} 
              dataKey="id"
              headerColumnGroup={headerGroup} 
              rowClassName={rowClass} 
              value={DataTableList} 
              header={header} 
              showGridlines 
              responsiveLayout="scroll" size="small" 
              paginator 
              rows={10} 
              rowsPerPageOptions={[10,20,50]}            
              >
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

              <Column style={{cursor:'pointer'}} field="department_id" body={_department}></Column>
              <Column style={{cursor:'pointer'}} field="title"></Column>
              <Column align="center" field="inherent_risk_rating_rating"></Column>     
              <Column align="center" field="overall_control_rating"></Column>     
              <Column align="center" field="residual_risk_scoring_score"></Column>    

              <Column align="center" field="inherent_risk_rating_rating" body={find_last_inherent_rating}></Column>     
              <Column align="center" field="overall_control_rating" body={find_last_control_rating}></Column>     
              <Column align="center" field="residual_risk_scoring_score" body={find_last_residual_score}></Column>     

              <Column align="center" field="treatment_required" body={treatment} ></Column>     
              <Column align="center" field="action_plan_owner" body={(row)=>_body('action_plan_owner', row)} ></Column>     
              <Column align="center" field="implementation_date" body={implementationDate}></Column>     
            
            </DataTable>

          </CCardBody>
</CCard>
      </CCol>
</>

)
}

export default RiskDataList;
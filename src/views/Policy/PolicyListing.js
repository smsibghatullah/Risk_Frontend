import { React, useEffect, useState, useRef } from "react";
import { Dialog } from 'primereact/dialog';

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
  useNavigate,
  json

} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import CompanySetupService from "src/services/Companysetup.service";
import SubdepartmentService from "src/services/Subdepartment.service";
import PolicyService from "src/services/policy.service";
import RiskDashboard from "../risk_dashboard /risk_dashboard";
import Policy_view from "./Policy_view";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPolicyAtom } from "src/_state/selectedPolicyAtom";
import { Toast } from 'primereact/toast';
import DepartmentService from "src/services/Department.service";
import { activeUserAtom } from "src/_state/activeUserAtom";
import { saveAs } from 'file-saver';
import 'primeicons/primeicons.css';
import { departmentAtom } from "src/_state/departmentAtom";

function PolicyList() {
  const navigate = useNavigate()
  const [DataTableList, setDataTableList] = useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useRecoilState(selectedPolicyAtom);
  const [visibPolicy, setVisibPolicy] = useState(false);
  const ActiveUser = useRecoilValue(activeUserAtom);
  const departmentList = useRecoilValue(departmentAtom);


  // useEffect(()=>{
  //   console.log("ActiveUser==>", ActiveUser.department);
  // }, [ActiveUser]);

  const intersects = (itemDepartments)=>{
    if(ActiveUser.department && itemDepartments){

      return itemDepartments.filter(value => JSON.parse(ActiveUser.department).includes(value)).length;
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

  const handleClick = (e) => {
    console.log("Double clck: ", e)
    const clickedRowData = e.data;
    setSelectedPolicy(clickedRowData)
    setVisibPolicy(true);
  }

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
        <span className="mb-3">
          <h3 className=''>Policy Repository<span className="" style={{ float: "right" }}>
           {(ActiveUser.is_superuser ||ActiveUser.usertype == 'Department') && 
            <>
             <Link to="/policy">
           <CButton style={{ background: "#64748B", width: 100, padding: 10,  }}>Add</CButton>
         </Link>
            <CButton onClick={handleDelete} style={{ background: "#64748B", width: 100, padding: 10,marginLeft: 5 }}>Delete</CButton>
          </>
           }
            </span></h3>
        </span>
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


  const items = (data) => ([
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: (e) => navigate(`/policyupdate/${data.id}/`)
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


  let get_data = (search = "") => {
    let api = new PolicyService;
    api.getAllPolicy(search).then((res) => { 
      let data = res.data;
      data = data.map(i=>{ i['department_name'] = department(i.departments); return i });

      setDataTableList(data); 
    
    }).catch((err) => { });
  }


  const getDepName = (dep_id) =>  { 
     
    let filtered = departmentList.filter(i => i.id == dep_id);
    return filtered.length ?  filtered[0]['name'] : "";
  
 }

const department = (dep_ids) => {
  try {
   
      return dep_ids.map(i=> getDepName(i)).join("\n");
    } catch (error) {
      return "";
    }
}
  
  let delete_record = () => {
    let _data = selectedRows.map(i => i.id);
    let api = new PolicyService();
    _data.forEach((id) => {
      api.deletePolicy(id)
        .then((res) => {
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
        })
        .catch((err) => { })
    });
  };

  // let delete_record = (rowData) => {
  // let api = new PolicyService;
  // api.deletePolicy(rowData.id).then((res) => { 
  //   get_data(); 
  //   toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
  // }).catch((err) => { })
  // }

  const toast = useRef(null);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    get_data();

  }, [departmentList])
  const statusBodyTemplate = (rowData) => {
    return (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)} />  </div>);
    ;
  }

  useEffect(() => { get_data() }, [selectedPolicy]);
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
      </div>
    );
  };
  return (

    <>
      <Toast ref={toast} />
      <CCol xs={12} className="mb-4">
        <ConfirmDialog />
        <Dialog maximizable header="Policy" visible={visibPolicy} style={{ width: '90vw' }} onHide={() => setVisibPolicy(false)}>
          <Policy_view close={setVisibPolicy} refreshData={get_data} ispopup={true}/>
        </Dialog>
        <CCard className="mb-4">
          <CCardBody>
            <DataTable
            style={{cursor:"pointer"}}
              selectionMode={'checkbox'}
              selection={selectedRows}
              onSelectionChange={(e) => {
                setSelectedRows(e.value);
                console.log(e)
              }}
              onRowDoubleClick={(e) => { handleClick(e) }}
              value={getFilteredData()}
              header={header}
              showGridlines
              responsiveLayout="scroll"
              size="small" paginator rows={10}
              rowHover
              rowsPerPageOptions={[10, 20, 50]}>
              <Column alignHeader={'center'} align="center" selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="name" header="Title" sortable>
                {(rowData) => (
                  <tr onClick={handleClick}>
                    <td>{rowData.name}</td>
                  </tr>
                )}
              </Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="department_name" header="Department" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="owner" header="Policy Owner" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="date_approval" header="Approval Date"
                body={(rowData) => {
                  const date = new Date(rowData.date_approval);
                  const day = date.getDate().toString().padStart(2, '0');
                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                  const year = date.getFullYear().toString();
                  return `${day}/${month}/${year}`;
                }}
              ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="review_date" header="Review Date"
                body={(rowData) => {
                  const date = new Date(rowData.review_date);
                  const day = date.getDate().toString().padStart(2, '0');
                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                  const year = date.getFullYear().toString();
                  return `${day}/${month}/${year}`;
                }}
              ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="state" header="Status" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}}  header="Attachment" body={pdffile}></Column>
            </DataTable>
          </CCardBody>
        </CCard>

      </CCol>
    </>

  )
}
export default PolicyList;
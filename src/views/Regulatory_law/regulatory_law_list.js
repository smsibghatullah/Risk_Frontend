import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token = getSecrets.token();
import 'primeicons/primeicons.css';
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
  Switch, OneToOneField,
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
import RegulatorylawService from "src/services/Regulatory_law.services";
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { regulatoryLawAtom } from "src/_state/regulatoryLawAtom";
import DepartmentService from "src/services/Department.service";
import { activeUserAtom } from "src/_state/activeUserAtom";
import PolicyService from "src/services/policy.service";
import { saveAs } from 'file-saver';



function Regulatory_Law_List(props) {
  const navigate = useNavigate();

  const [DataTableList, setDataTableList] = useState([]);
  const setGlobatEvent = useSetRecoilState(globalEventAtom);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const regulatoryLaw = useRecoilValue(regulatoryLawAtom)
  const ActiveUser = useRecoilValue(activeUserAtom);

  const handleApprove = () => {
    const selectedRowIds = selectedRows.map(row => row.id);
    if (selectedRows.state !== 'Approved') {
      const formdata = new FormData();
      formdata.append("state", "Approved");
      selectedRowIds.forEach(id => {
        axios.put(API_URL + `/regulatory_law/${id}/`, formdata, {
          headers: {
            "Authorization": token,
          }
        })
          .then((response) => {
            get_data();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
      });

      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have approved', life: 3000 });

      
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'You have already approved' });
    }
  }
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <span className="mb-3">
          <h3 className=''>Regulatory Law  <span className="" style={{ float: "right" }}>
            {(ActiveUser.is_superuser ||ActiveUser.usertype == 'Department') &&
            <>

              <Link to="/regulatrylaw"><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Add</CButton></Link>
              <CButton onClick={handleDelete} style={{ background: "#64748B", width: 100, padding: 10, marginLeft: 5 }}>Delete</CButton>
              <CButton onClick={handleApprove} style={{ background: "#64748B", width: 100, padding: 10, marginLeft: 5 }}>Approve</CButton>
            
         
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

  const handleClick = (event) => {
    console.log(event);
    const clickedRowData = event.data;
    const clickedRowId = clickedRowData.id;
    navigate(`/regulatrylawupdate/${clickedRowId}/`);
  }
  let delete_record = () => {
    let _data = selectedRows.map(i => i.id);
    let api = new RegulatorylawService();
    _data.forEach((id) => {
      api.deleteregulatorylaw(id)
        .then((res) => {
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
        })
        .catch((err) => { })
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
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the row that says to Delete' });
    }
  };
  const header = renderHeader();
  const toast = useRef(null);

  let get_data = (search = "") => { setGlobatEvent({ eventName: 'refreshRegulatoryLaw', search }); }


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    get_data();

  }, []);

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
      return regulatoryLaw.filter(i =>  intersects(i.departments));
    }else{
      return regulatoryLaw;
    }
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
    const globatEvent = useRecoilValue(globalEventAtom);


    // useEffect(()=>{
    //   switch(globatEvent.eventName) {
    //     case 'refreshRegulatoryLaw':
    //       get_data();
           
    //         break;
    //     default:
    //       // code block
    //   }
    // }, [globatEvent]);
    return (
      <div>
        <i className="pi pi-cloud-download" onClick={handleDownload} style={{ fontSize: '2rem' }}></i>
          {/* <Button type='submit' style={{ background: "#64748B" }} onClick={handleDownload} icon="pi pi-check" label="Download" className="mr-2"></Button> */}
      </div>
    );
  };
  return (
    <>
      <CCol xs={12}>
        <Toast ref={toast} />
        <ConfirmDialog />
        <CCard className="mb-4">
          <CCardBody>

            <DataTable
              selectionMode={'checkbox'}
              selection={selectedRows}
              onSelectionChange={(e) => { setSelectedRows(e.value); console.log(e.value) }}
              onRowDoubleClick={(e) => { handleClick(e) }}
              value={getFilteredData()}
              header={header}
              showGridlines
              responsiveLayout="scroll"
              size="small" paginator
              rows={10}
              rowHover
              rowsPerPageOptions={[10, 20, 50]}>
              <Column align="center" alignHeader={'center'} selectionMode="multiple" headerStyle={{ width: '3rem',cursor:'pointer' }}></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="name" header="Name" sortable></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="departments" header="Departments" body={DepartmentService.getNameFromIds}></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="owner" header="Owner" ></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="policy" header="Policy" body={PolicyService.getpolicy} sortable></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} field="state" header="State" sortable></Column>
              <Column alignHeader={'center'} style={{cursor:'pointer'}} header="Attachment" body={pdffile}></Column>
            </DataTable>

          </CCardBody>
        </CCard>
      </CCol>
    </>

  )
}
export default Regulatory_Law_List;
import { React, useEffect, useState, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { getSecrets } from "src/config";
import { Dropdown } from 'primereact/dropdown';
import {
  CCard,
  CCardBody,
  CCol,
} from '@coreui/react'
const API_URL = getSecrets.API_URL
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { InputText } from 'primereact/inputtext';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

import { selectedPolicyAtom } from "src/_state/selectedPolicyAtom";
import { Toast } from 'primereact/toast';
import DepartmentService from "src/services/Department.service";
import { activeUserAtom } from 'src/_state/activeUserAtom'
import { useRecoilState, useRecoilValue } from 'recoil'


function PolicyDashboard() {
  const navigate = useNavigate()
  const [DataTableList, setDataTableList] = useState([])
  const [DepartmentList, setDepartmentList] = useState([])
  const [departdata, setDepartdata] = useState('')
  const [searchtitle, setSearchtitle] = useState('');
  const [searchOwner, setSearchOwner] = useState('');
  const [searchapproval_date, setSearchApproval_date] = useState('')
  const [searchstatus, setSearchStatus] = useState('')
  const [selectedRows, setSelectedRows] = useState([]);
  const ActiveUser = useRecoilValue(activeUserAtom);
  useEffect(()=>{
    console.log("ActiveUser==>", ActiveUser);
  }, [ActiveUser]);

  const renderHeader = () => {
    return (
      <div className="p-3">
        <h3 className=''>Policy Dashboard <Dropdown filter key='id' value={departdata} onChange={(e) => { console.log(e.target.value); setDepartdata(e.target.value) }} style={{ float: 'right' }} options={DepartmentList} optionLabel="name" optionValue="id" placeholder="Select a Department" className="w-full md:w-14rem" /></h3>
      </div>
    )
  }
  const searchHeadertitle = () => {
    return (
      <div className="flex justify-content-between " >
        <p className="text-center">Title</p>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={(e) => { setSearchtitle(e.target.value); get_data(e.target.value); }} value={searchtitle} placeholder="Keyword Search" />
        </span>

      </div>
    )
  }
  const searchHeaderowner = () => {
    return (
      <div className="flex justify-content-between " >
        <p className="text-center">Owner</p>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={(e) => { setSearchOwner(e.target.value); get_data(e.target.value); }} value={searchOwner} placeholder="Keyword Search" />
        </span>

      </div>
    )
  }
  const searchHeaderstatus = () => {
    return (
      <div className="flex justify-content-between " >
        <p className="text-center">Status</p>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={(e) => { setSearchStatus(e.target.value); get_data(e.target.value); }} value={searchstatus} placeholder="Keyword Search" />
        </span>

      </div>
    )
  }
  const searchHeaderdate = () => {
    return (
      <div className="flex justify-content-between " >
        <p className="text-center">Approval Date</p>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={(e) => { setSearchApproval_date(e.target.value); get_data(e.target.value); }} value={searchapproval_date} placeholder="Keyword Search" />
        </span>

      </div>
    )
  }
  const searchHeaderreviewdate = () => {
    return (
      <div className="flex justify-content-between " >
        <p className="text-center">Review Date</p>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={(e) => { setSearchApproval_date(e.target.value); get_data(e.target.value); }} value={searchapproval_date} placeholder="Keyword Search" />
        </span>

      </div>
    )
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
    axios.get(search ?API_URL+`/policy/?name=`+search:API_URL + `/policy/department/${departdata}`)
      .then((res) => {
        setDataTableList(res.data)
          ;
      }).catch((err) => { });
  }

  let department_data = (search = "") => {
    let api = new DepartmentService;
    api.getAllDepartment(search).then((res) => setDepartmentList(res.data)).catch((err) => { });
  }

  useEffect(() => {
    department_data();
  }, [DataTableList])

  const toast = useRef(null);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    get_data();
  }, [])


  const [selectedPolicy, setSelectedPolicy] = useRecoilState(selectedPolicyAtom);
  const [visibPolicy, setVisibPolicy] = useState(false);

  useEffect(() => { get_data() }, [departdata]);

  return (
    <>
      <Toast ref={toast} />
      <CCol xs={12} className="mb-4">
        <ConfirmDialog />

        <CCard className="mb-4">
          <CCardBody>
            <DataTable  selectionMode={'checkbox'}
              selection={selectedRows} onSelectionChange={(e) => { setSelectedRows(e.value); console.log(e.value) }} emptyMessage="No Data found."  value={DataTableList} header={header} showGridlines responsiveLayout="scroll" size="small" paginator rows={10} rowsPerPageOptions={[10, 20, 50]} globalFilterFields={['name', 'owner', 'date_approval', 'state']} className="p-datatable-customers" >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column field="name" filterField="name" header={searchHeadertitle} >
                {(rowData) => (
                  <tr onClick={handleClick}>
                    <td>{rowData.name}</td>
                  </tr>
                )}
              </Column>
              <Column field="owner" header={searchHeaderowner}></Column>
              <Column field="review_date" header={searchHeaderreviewdate}
                     body={(rowData) => {
                      const date = new Date(rowData.review_date);
                      const day = date.getDate().toString().padStart(2, '0');
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const year = date.getFullYear().toString();
                      return `${day}/${month}/${year}`;
                     }}
                    ></Column>
              <Column field="date_approval" header={searchHeaderdate}
              body={(rowData) => {
                const date = new Date(rowData.date_approval);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
               }}
              ></Column>
              <Column field="state" header={searchHeaderstatus} ></Column>
            </DataTable>
          </CCardBody>
        </CCard>

      </CCol>
    </>

  )
}
export default PolicyDashboard;
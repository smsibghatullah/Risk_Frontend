import React, { forwardRef, useState,useEffect, useImperativeHandle ,useRef} from 'react'

import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import RiskAssessmentService from 'src/services/RiskAssessment.service'
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
import DepartmentService from 'src/services/Department.service';
import { Toast } from 'primereact/toast';

const RiskAssesmentDataTable =  forwardRef((props, ref)=>{
    useImperativeHandle(ref, () => ({
      refreshData() {
        get_data();
        console.log("child function");
      }
    }));
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
  //     command: (e) => props.dataToUpdate(data) 
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
    props.dataToUpdate(clickedRowData)
  }
  
  let get_data=(search = "")=>{ 
    let api = new RiskAssessmentService;
    api.getAllRisks(search).then((res) => { setDataTableList(res.data.map(i => { i['department_id'] = i.responisble_department_id; return i })); }).catch((err) => { });
  }
  
  // let delete_record = (rowData) => {
  //   let api = new RiskAssessmentService;
  //   api.deleteRisks(rowData.id).then((res) => { 
  //     get_data(); 
  //     toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully'}); 
  //   }).catch((err) => { })
  // }
  let delete_record = () => {
    let _data = selectedRows.map(i => i.id);
    let api = new RiskAssessmentService();
    _data.forEach((id) => {
      api.deleteRisks(id)
        .then((res) => {
          get_data();
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
        })
        .catch((err) => { })
    });
  };

  useEffect(() => {
   
    get_data()
}, []);
  
  
  const statusBodyTemplate = (rowData) => {
    return  (<div><SplitButton size="small" label="Actions" className="p-button-secondary p-button-sm" model={items(rowData)}/>  </div>);
   ;
  }

    return (<>
     <CCardBody>
     <Toast ref={toast} />
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
            <Column selectionMode="multiple" headerStyle={{ width: '3rem',cursor:'pointer' }}></Column>
            <Column style={{cursor:'pointer'}}  field="category" header="Category" sortable></Column>
            <Column style={{cursor:'pointer'}}  field="risk_appetite_statement" header="Risk Appetite Statement" ></Column>   
            <Column style={{cursor:'pointer'}}  field="description" header="Description"  ></Column>   
            <Column style={{cursor:'pointer'}}  field="responisble_department_id" body={DepartmentService.getName} header="Responsible Department" ></Column>   
            <Column style={{cursor:'pointer'}}  field="key_risk_indicators" header="Key Risk Indicators"  ></Column>   
            <Column style={{cursor:'pointer'}}  field="risk_appetite" header="Risk Appetite" ></Column>   
            <Column style={{cursor:'pointer'}}  field="date_of_assessment" header="Date of Assessment" ></Column>   
            <Column style={{cursor:'pointer'}}  field="kri_reporting" header="KRI reporting" ></Column>   
            <Column style={{cursor:'pointer'}}  field="previous_assessment" header="previous assessment" ></Column>   
            {/* <Column body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
          
        </DataTable>

    </CCardBody>
    </>);
});

export default RiskAssesmentDataTable;
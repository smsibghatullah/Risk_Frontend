import RiskAssesmentDataTable from './components/data_table'
import RisAssesmentkForm from './components/form'
// =====================================================
import {useState,React,useEffect, useRef} from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  
} from '@coreui/react'

const RiskAssesment = () => {
const title = "Appetite Assesment/Key Risk Indicator";
const DataTableRef = useRef();
const [UpdateData, setUpdateData] = useState({});

const refreshData = ()=>{  DataTableRef.current.refreshData(); setUpdateData({}) }

const dataToUpdate = (data) => { setUpdateData(data); }

 
return (
    <>
   <CRow>
      <ConfirmDialog /> 
  
      <CCol className="" xs={12}> 
    
        <CCard className="p-3">      
          <CCardHeader className='text-center'>
                <h3 style={{fontWeight:400}}>{title}</h3>           
          </CCardHeader>
        </CCard>

      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">         
            <CCardBody>
              <RisAssesmentkForm UpdateData={UpdateData} refreshDataTable={refreshData}></RisAssesmentkForm>
            </CCardBody>
        </CCard>

        <CCard className="mb-4">
        
        <RiskAssesmentDataTable dataToUpdate={dataToUpdate} ref={DataTableRef}></RiskAssesmentDataTable>
      </CCard>

      </CCol>
    </CRow>

            
    </>
  )
}

export default RiskAssesment

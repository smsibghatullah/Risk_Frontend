import { useState, React, useEffect, useRef } from 'react'
import { getSecrets } from "src/config";
import {
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
} from '@coreui/react'
import {useParams} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'

function Audit_Planning() {
    const [department_head, setDepartment_Head] = useState("")
    const [total_staff, setTotal_Staff] = useState("")
    const [approved_policies, setApproved_Policies] = useState("")
    const [audit_observation, setAudit_Observation] = useState("")
    const [open_issues, setOpen_Issues] = useState("")

    const API_URL = getSecrets.API_URL
    const toast = useRef(null);
    const params = useParams()

    const Post_Data = () => {
        const Data = {
            department_head: department_head,
            total_staff: total_staff,
            approved_policies: approved_policies,
            audit_observation: audit_observation,
            open_issues: open_issues
        }
        axios.put(API_URL + `/auditengagement/${params.id}/`, Data)
            .then((success) => { toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have Submitted', life: 3000 }); })
            .catch((error) => { toast.current.show({ severity: 'info', summary: '', detail: 'Fill All Fields', life: 3000 }); })
    }

    async function Get_data() {
        let result = await fetch(API_URL + `/auditengagement/${params.id}/`);
        result = await result.json();
        setDepartment_Head(result.department_head)
        setTotal_Staff(result.total_staff)
        setApproved_Policies(result.approved_policies)
        setAudit_Observation(result.audit_observation)
        setOpen_Issues(result.open_issues)
    }

    useEffect(() => { Get_data() }, [])
    useEffect(() => { Get_data() }, [params])
    return (
        <CRow>
            <Toast ref={toast} />
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <CForm onSubmit={(event) => Post_Data(event)}>
                            <div className="mb-3">
                                <CCol xs="auto">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Department Head</CFormLabel>
                                    <CFormInput type="text" placeholder="Department head" value={department_head} onChange={(e) => { setDepartment_Head(e.target.value) }} />
                                </CCol>
                            </div>
                            <div className="mb-3">
                                <CCol xs="auto">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Total # of staff</CFormLabel>
                                    <CFormInput type="number" placeholder="Total # of staff" value={total_staff} onChange={(e) => { setTotal_Staff(e.target.value) }} />
                                </CCol>
                            </div>
                            <div className="mb-3">
                                <CCol xs="auto">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Approved Policies & Procedures</CFormLabel>
                                    <CFormTextarea type="text" placeholder="Approved policies & procedures" value={approved_policies} onChange={(e) => { setApproved_Policies(e.target.value) }} rows='4'></CFormTextarea>
                                </CCol>
                            </div>
                            <div className="mb-3">
                                <CCol xs="auto">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Summary of Previous Audit Observation</CFormLabel>
                                    <CFormTextarea  type="text" placeholder="Summary of previous audit observation" value={audit_observation} onChange={(e) => { setAudit_Observation(e.target.value) }} rows='4'></CFormTextarea>
                                </CCol>
                            </div>
                            <div className="mb-3">
                                <CCol xs="auto">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Summary of Open Issues</CFormLabel>
                                    <CFormTextarea  type="text" placeholder="Summary of open issues" value={open_issues} onChange={(e) => { setOpen_Issues(e.target.value) }} rows='4'></CFormTextarea>
                                </CCol>
                            </div>
                        </CForm>
                    </CCardBody>
                    <div className='mb-3 d-flex justify-content-center'>
                        <Button type='submit' style={{ background: "#64748B" }} onClick={(e) => { Post_Data(e) }} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
                    </div>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Audit_Planning

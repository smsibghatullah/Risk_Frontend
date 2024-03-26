import { useState, React, useEffect, useRef } from 'react'
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
  CRow,
  CFormSelect,
  CFormFeedback
} from '@coreui/react'
import {
  Link,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'

function Audit_Program_repo_Form(props) {
  const [isValid, setIsValid] = useState(true);
  const API_URL = getSecrets.API_URL
  const toast = useRef(null);
  const [Title, setTitle] = useState("")
  const [Summary, setSummary] = useState("")
  const [Description, setDescription] = useState("")
  const [Category, setCategory] = useState("")
  const navigate = useNavigate();

  const handletitle = (e) => {
    setTitle(e.target.value)
    
  }
  const handlesummary = (e) => {
    setSummary(e.target.value)
    
  }
  const handledescription = (e) => {
    setDescription(e.target.value)
    
  }
  const handlecategory = (e) => {
    setCategory(e.target.value)
    
  }

  let postData = () => {
    const config = {
      title: Title,
      summary: Summary,
      description: Description,
      category: Category
    }
    axios.post(API_URL + '/audit_program_repo/', config).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      props.refreshData();
    }).catch((err) => { toast.current.show({ severity: 'info', summary: '', detail: 'Fill All Fields', life: 3000 }); })
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
  }, [])

  return (
    <CRow>
      <Toast ref={toast} />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                      <CFormInput onChange={handletitle} required
                        type="text"
                        placeholder="Title"
                        invalid={isValid ? '' : 'is-invalid'}
                      />
                      <CFormFeedback invalid>Please provide a valid Title.</CFormFeedback>
                    </CCol>
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Summary</CFormLabel>
                      <CFormInput onChange={handlesummary}
                        type="text"
                        placeholder="Summary"
                        invalid={isValid ? '' : 'is-invalid'}
                      />
                      <CFormFeedback invalid>Please provide a valid Summary.</CFormFeedback>
                    </CCol>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                      <CFormInput onChange={handledescription}
                        type="text"
                        placeholder="Description"
                        invalid={isValid ? '' : 'is-invalid'}
                      />
                      <CFormFeedback invalid>Please provide a valid Description.</CFormFeedback>
                    </CCol>
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                      <CFormSelect onChange={handlecategory} className="mb-3" aria-label="Large select example" invalid={isValid ? '' : 'is-invalid'}>
                        <option value="">Select</option>
                        <option value="Test of Control">Test of Control</option>
                        <option value="Other">Other</option>
                      </CFormSelect>
                      <CFormFeedback invalid>Please provide a valid Category.</CFormFeedback>
                    </CCol>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>

          <div className='mb-3 d-flex justify-content-center'>
            <Button type='submit' style={{ background: "#64748B" }} onClick={(event) => postData(event)} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Audit_Program_repo_Form

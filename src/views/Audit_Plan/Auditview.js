import { useState, React, useEffect } from 'react'
import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token = getSecrets.token()
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
function Audit_View() {
  let navigate = useNavigate()
  const params = useParams()
  const [Data2, setData2] = useState([])
  const [Data4, setData4] = useState([])





  let Sub_function = (selectedDepartment = '') => {
    axios.get(API_URL + `/subdepartment/?departments=${selectedDepartment}`)
      .then((res) => {
        setData2(res.data.filter(i => Data4['subdepartments'].includes(i.id)));
      }).catch((err) => { })
  }
  const [Data1, setData1] = useState([])
  let department_data = () => {
    var config = {
      method: 'get',
      url: API_URL + `/department/`,
      headers: {
        'Authorization': token,
      },
    };
    axios(config)
      .then((res) => {
        setData1(res.data.filter(i => Data4['departments'].includes(i.id)));
      }).catch((err) => {

      })
  }
  async function Data_View() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
      headers: myHeaders,
    };
    let result = await fetch(API_URL + `/annualplan/${params.id}/`, requestOptions);
    result = await result.json();
    setData4(result)

  }
  useEffect(() => {
    department_data()
    Sub_function()
  }, [Data4]);
  useEffect(() => {
    Data_View()

  }, [])
  return (
    <CRow>
      <CCol className="" xs={12}>
        <CCard className="p-3">
          <CCardHeader >
            <h3 className=''>Internal Audit Management <span className="" style={{ float: "right" }}> <Link to="/Audit_Plan"><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Back</CButton></Link></span></h3>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">

          <CCardBody>
            <CForm action='./Risklist' method='post'>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput
                    disabled
                    defaultValue={Data4.title}
                    type="text"
                    placeholder="Title"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                  <CFormSelect defaultValue={Data1.name} multiple disabled aria-label="Default select example" >

                    {
                      Data1.map((item) => {
                        return (
                          <option key={item.id}>{item.name}</option>
                        );
                      })
                    }
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Proposed schedule</CFormLabel>
                  <CFormSelect disabled aria-label="Risk Status" >
                    <option>{Data4.proposed_schedule}</option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Allocated Manager</CFormLabel>
                  <CFormInput
                    disabled
                    defaultValue={Data4.allocated_manager}
                    type="text"
                    placeholder="Allocated Manager"
                  />
                </CCol>
              </div>
            </CForm>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>
  )
}

export default Audit_View

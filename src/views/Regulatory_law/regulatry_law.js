import { useState, React, useEffect, useRef } from 'react'
import { getSecrets } from "src/config";
const token = getSecrets.token()
const API_URL = getSecrets.API_URL
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
  CFormFeedback
} from '@coreui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import { MultiSelect } from 'primereact/multiselect';
import PolicyService from 'src/services/policy.service';
import { globalEventAtom } from 'src/_state/globalEventAtom';


function Regulatory_Law() {
  const [isValid, setIsValid] = useState(true);
  const [OptionSelect, setOptionSelect] = useState("select one or more options")
  const [Data1, setData1] = useState([])
  const [Name, setName] = useState("")
  const [Owner, setOwner] = useState("")
  const [Department, setDepartment] = useState("")
  const [State, setState] = useState("Draft")
  const [File_Name, setFile_Name] = useState("")
  const [File, setFile] = useState("")
  const ActiveUser = useRecoilValue(activeUserAtom);
  const [policy_data, setpolicy_data] = useState([])
  const [Policy,setPolicy] = useState("")


  const navigate = useNavigate();
  const handleName = (e) => {
    setName(e.target.value)
    
  }
  const handleowner = (e) => {
    setOwner(e.target.value)
   
  }
  const handledepartment = (e) => {
    setDepartment(e.target.value)
    
  }
  const handlefile = (e) => {
    const file=e.target.files[0]
    setFile(file)
    setFile_Name(file.name?file.name:'')
   
  }

  const toast = useRef(null);

  let postData = () => {
    var formdata = new FormData();
    formdata.append("name", Name);
    formdata.append("departments", Department);
    formdata.append("owner", Owner);
    formdata.append("state", State);
    Policy.forEach((policyItem) => {
    formdata.append(`policy`, policyItem);
    });
    formdata.append("file_name", File_Name);
    formdata.append("file", File);
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };
    axios.post(API_URL + '/regulatory_law/', formdata, {
      headers: {
        "Authorization": token,
      }
    })
      .then((response) => {
        if (response) {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
          setTimeout(() => {
            navigate("/regulatrylawlist")
          }, [1000])
        }
      })
      .catch((error) => {
        toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
      });
  }

  let department_data = () => {
    var config = {
      method: 'get',
      url: API_URL + '/department/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      console.log(res)
      setData1(res.data)
    }).catch((err) => {

    })
  }
  let policy_DATA =  (search = "") => {
    let api = new PolicyService;
    api.getAllPolicy(search).then((res) => { setpolicy_data(res.data); }).catch((err) => { });
  }

  useEffect(() => {
    department_data();
    policy_DATA()
  }, [])

 

  return (
    <CRow>
      <Toast ref={toast} />
      <CCol xs={12}>
        <CCard className="p-3">
          <CCardHeader>
            <h3 style={{fontWeight:400}}>Regulatory Law <span className="" style={{ float: "right" }}> <Link to="/regulatrylawlist"><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Back</CButton></Link></span></h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)} >
              <CCol>
              </CCol>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput onChange={handleName}
                    type="text"
                    placeholder="Name"
                    className={isValid ? '' : 'is-invalid'}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid Name.</CFormFeedback>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                  <CFormSelect value={Department} onChange={handledepartment} aria-label="Default select example" className={isValid ? '' : 'is-invalid'}
                    required>
                    <option>Select</option>
                    {
                      Data1.map((item) => {
                        return (
                          <option value={item.id}>{item.name}</option>
                        );
                      })
                    }
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid Department.</CFormFeedback>
                </CCol>
              </div>
              <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Policy</CFormLabel>
                          <MultiSelect filter required pattern="[a-zA-Z0-9]+" key={policy_data} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id" value={Policy} options={policy_data} onChange={(e) => { setPolicy(e.target.value) }} itemTemplate={(option) => <div>{option.name}</div>} />
                        </CCol>
                      </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Owner</CFormLabel>
                  <CFormInput onChange={handleowner}
                    type="text"
                    placeholder="Owner"
                    className={isValid ? '' : 'is-invalid'}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid Owner.</CFormFeedback>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">File Attachment</CFormLabel>
                  <CFormInput onChange={handlefile}
                    type="file"
                    placeholder="File Name"
                    className={isValid ? '' : 'is-invalid'}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid File.</CFormFeedback>
                </CCol>
              </div>
            </CForm>
          </CCardBody>

          <div className='mb-3 d-flex justify-content-center'>
            <Button type='submit' style={{ background: "#64748B" }} onClick={(event) => { postData(event); }} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Regulatory_Law

import { useState, React, useEffect, useRef } from 'react'
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
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { getSecrets } from 'src/config';
import axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';
import { TabPanel, TabView } from 'primereact/tabview';
import Regulatory_Law from '../Regulatory_law/regulatry_law';
import { selectedPolicyAtom } from 'src/_state/selectedPolicyAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import 'primeicons/primeicons.css';
import { Container, Navbar } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { activeUserAtom } from 'src/_state/activeUserAtom';


function PolicyFormView(prop) {
  const params = useParams()
  const [Data1, setData1] = useState([])
  const [OptionSelect, setOptionSelect] = useState("select one or more options")
  const API_URL = getSecrets.API_URL
  const token = getSecrets.token()
  const [State, setState] = useState("Approved")
  const [Name, setName] = useState("")
  const [Departments, setDepartments] = useState("")
  const [Owner, setOwner] = useState("")
  const [Policy_Text, setPolicy_text] = useState("")
  const [File_Upload, setFile_Upload] = useState("")
  const [Approval_Date, setApproval_Date] = useState("")
  const [Policy_Edit, setPolicy_Edit] = useState("")
  const [File_Name, setFile_Name] = useState("")
  const [selectedPolicy, setSelectedPolicy] = useRecoilState(selectedPolicyAtom);
  const [Approved, setApproved] = useState("")
  const [isActive, setIsActive] = useState(false);
  const [ReviewDate, setReviewDate] = useState("")
  const ActiveUser = useRecoilValue(activeUserAtom);


  const handlename = (e) => { setName(e.target.value) }
  const handleowner = (e) => { setOwner(e.target.value) }
  const handlepolicy_text = (e) => { setPolicy_text(e.target.value) }
  const handlefile_name = (e) => { setFile_Name(e.target.value) }
  const handleapproval_date = (e) => { setApproval_Date(e.target.value) }
  const handlepolicy_edit = (e) => { setPolicy_Edit(e.target.value) }
  const handlefileupload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile_Upload(file);
      setFile_Name(file.name?file.name:'');
    }
  };
  
  
    

  let postData = () => {
    if (postData.length) {
      // Show an error message to the user
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      return;
    }
    var reviewDate = new Date(ReviewDate);
    let _review_date = reviewDate.getFullYear() + "-" + (reviewDate.getMonth() + 1) + "-" + reviewDate.getDate();
    var aprovalDate = new Date(Approval_Date)
    let _aproval_date = aprovalDate.getFullYear() + "-" + (aprovalDate.getMonth() + 1) + "-" + aprovalDate.getDate();
    var formdata = new FormData();
    formdata.append("name", Name);
    formdata.append("policy_text", Policy_Text);
    formdata.append("owner", Owner);
    // formdata.append("state", State);
    formdata.append("file_name", File_Name);
    formdata.append("file", File_Upload);
    formdata.append("date_approval", _aproval_date);
    formdata.append("policy_edit", Policy_Edit);
    formdata.append("review_date", _review_date);
    Departments.forEach(function (pk_value) {
      formdata.append("departments", pk_value);
    });

    axios.put(API_URL + `/policy/${selectedPolicy.id}/`, formdata, {
      headers: {
        "Authorization": token,
      }
    })
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
        // console.log(prop.delegate.close(false));
        prop.delegate.close(false)
        prop.delegate.refreshData()
        // prop.delegate.setVisibPolicy(false);
      })
      .catch((error) => {
        toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
      });
  }
  let Approve = (event = null) => {
    if(selectedPolicy.state !== 'Approved'){
    selectedPolicy.state ? (setIsActive(true) || toast.current.show({ severity: 'success', summary: '', detail: 'you are Approved', life: 3000 })) : "Draft"
    }else{
      toast.current.show({ severity: 'success', summary: '', detail: 'you have Already Approved', life: 3000 })
    }
    axios.put(API_URL + `/policy/${selectedPolicy.id}/`, {
      state: State
    }).then((success) => {
      setSelectedPolicy(success.data);
    }).catch((err) => {
      toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
    })
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
      setData1(res.data)
    }).catch((err) => {

    })
  }
  //popup
  const toast = useRef(null);
  function handleEndDateBlur() {
    const currentDate = new Date();
    const enteredDate = new Date(Date.parse(Approval_Date));
    const enddate = new Date(Date.parse(ReviewDate));

    if (enteredDate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    } else if (enddate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    }
  }

  async function Policy_data() {
    let result = await fetch(API_URL + `/policy/${selectedPolicy.id}/`);
    result = await result.json();
    setName(result.name);
    setOwner(result.owner);
    setPolicy_text(result.policy_text)
    // setFile_Name(result.file_name)
    // setFile_Upload(result.file)
    setApproval_Date(new Date(Date.parse(result.date_approval)))
    setPolicy_Edit(result.policy_edit)
    setDepartments(result.departments)
    setApproved(result.state)
    setReviewDate(new Date(Date.parse(result.review_date)));
  }
  function handleEndDateBlur() {
    const currentDate = new Date();
    const enteredDate = new Date(Date.parse(Approval_Date));
    const enddate = new Date(Date.parse(ReviewDate));

    if (enteredDate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    } else if (enddate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    }
  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    department_data()
    Policy_data()
  }, [])
  return (
    <>
      <Toast ref={toast} />
      <CRow>
        <CCol xs={12}>
          <Navbar className="mb-3 bg-secondary text-white">
            <Container>
              <Navbar.Brand style={{ marginLeft: 15 }} className='text-white'>{selectedPolicy.state}<i className='pi pi-chevron-right'></i></Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text >
                  {ActiveUser.usertype == 'Department' && 
                  <CButton value={selectedPolicy.state} style={{ marginRight: 15, float: "right", backgroundColor: selectedPolicy.state == 'Approved' ? 'green' : 'blue', width: 100, padding: 10 }} onClick={Approve}>{selectedPolicy.state}</CButton>
                  }
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <CCard className="p-3">
            <CCardBody>
              <CForm onSubmit={(event) => postData(event)}>
                <div className="mb-3">
                  <CCol xs="auto">
                    <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                    <CFormInput
                      disabled={Approved == "Approved" ? selectedPolicy.id : ""}
                      required="required"
                      onChange={handlename}
                      value={Name}
                      type="text"
                      name='name'
                      placeholder="Name"
                    />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol xs="auto">
                    <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                    <MultiSelect  disabled={Approved == "Approved" ? selectedPolicy.id : ""} filter key={Data1} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id" value={Departments} options={Data1} onChange={(e) => { setDepartments(e.target.value) }} itemTemplate={(option) => <div>{option.name}</div>} />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol xs="auto">
                    <CFormLabel htmlFor="exampleFormControlInput1">Owner</CFormLabel>
                    <CFormInput
                      disabled={Approved == "Approved"  ? selectedPolicy.id : ""}
                      onChange={handleowner}
                      value={Owner}
                      type="text"
                      placeholder="Owner"
                    />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol >
                    <CFormLabel htmlFor="exampleFormControlInput1">Policy Text</CFormLabel>
                    <CFormTextarea disabled={Approved == "Approved" ? selectedPolicy.id : ""} onChange={handlepolicy_text} value={Policy_Text} rows="6"></CFormTextarea>
                  </CCol>
                </div>
                <div className='mb-3'>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">File Attachment</CFormLabel>
                    <CFormInput
                      disabled={Approved == "Approved" ? selectedPolicy.id : ""}
                      onChange={handlefileupload}
                      type="file"
                      name='name'
                      placeholder="Name"
                    />
                  </CCol>
                </div>
                <div className='mb-3'>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Review Date</CFormLabel>
                    <ReactDatePicker
                      disabled={Approved == "Approved" ? selectedPolicy.id : ""}
                      className="date-picker"
                      dateFormat="dd/MM/yyyy"
                      showIcon
                      selected={ReviewDate}
                      onChange={(date) => setReviewDate(date)}
                      onBlur={handleEndDateBlur}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                      min={new Date().toISOString().slice(0, 10)}
                    />
                  </CCol>
                </div>

                <div className="mb-3">
                  <CCol xs="auto">
                    <CFormLabel htmlFor="exampleFormControlInput1">Approval Date</CFormLabel>
                    <ReactDatePicker
                      disabled={Approved == "Approved" ? selectedPolicy.id : ""}
                      className="date-picker"
                      dateFormat="dd/MM/yyyy"
                      showIcon
                      selected={Approval_Date}
                      onChange={(date) => setApproval_Date(date)}
                      onBlur={handleEndDateBlur}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                      min={new Date().toISOString().slice(0, 10)}
                    />
                  </CCol>
                </div>
                {/* <div className="mb-3">
                  <CCol xs="auto">
                    <CFormLabel htmlFor="exampleFormControlInput1">Policy Edit</CFormLabel>
                    <CFormInput
                      onChange={handlepolicy_edit}
                      disabled={Approved == "Approved" ? selectedPolicy.id : ""}
                      value={Policy_Edit}
                      type="text"
                      name='name'
                      placeholder="Policy Edit"
                    />
                  </CCol>
                </div> */}
              </CForm>
            </CCardBody>
            <div className='mb-3 d-flex justify-content-center'>
              {ActiveUser.usertype == 'Department' && 
              
              <Button type='submit' disabled={Approved == "Approved" ? selectedPolicy.id : ""} style={{ background: "#64748B" }} onClick={(event) => postData(event)} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
              }
            </div>
          </CCard>
          <CCardBody>
          </CCardBody>
        </CCol>
      </CRow>
    </>
  )
}
export default PolicyFormView

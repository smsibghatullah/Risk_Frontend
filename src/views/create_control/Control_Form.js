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
import { MultiSelect } from 'primereact/multiselect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import { Button } from 'primereact/button'
import { getSecrets } from 'src/config';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import Non_Compliant from './Non-complaint';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import { useRecoilValue } from 'recoil';

function Control_Form() {
  const navigate = useNavigate()
  const [OptionSelect, setOptionSelect] = useState("select one or more options")
  const [Data, setData] = useState([])
  const [Data1, setData1] = useState([])
  const [Data2, setData2] = useState([])
  const [Department,setDepartment] = useState([])
  const API_URL = getSecrets.API_URL
  const token = getSecrets.token();
  const [Is_Crirical, setIs_Crirical] = useState(false);
  const [Discription, setDiscription] = useState("")
  const [Responsible_Person, setResponsible_Person] = useState("")
  const [Responsible_supervisor, setResponsible_Supervisor] = useState("")
  const [Objective, setObjective] = useState("")
  const [Policy, setPolicy] = useState("")
  const [Law, setLaw] = useState("")
  const [Status, setStatus] = useState("")
  const [Departments,setDepartments] = useState("")
  const ActiveUser = useRecoilValue(activeUserAtom);
  const [Id,setId]=useState([])
  const [post,setPost]=useState(false)



  const handlediscription = (e) => { setDiscription(e.target.value); localStorage.setItem("discription", e.target.value); }
  const handleresponsible_person = (e) => { setResponsible_Person(e.target.value) }
  const handleresponsiblesupervisor = (e) => { setResponsible_Supervisor(e.target.value) }
  const handlestatus = (event) => {
    const getuser = event.target.value;
    setStatus(getuser)
  }
  const handleCheckboxChange = (event) => {
    setIs_Crirical(event.target.checked);
  }
  let Objective_data = () => {
    var config = {
      method: 'get',
      url: API_URL + '/controlobjective/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      setData2(res.data)
    }).catch((err) => {

    })
  }
  let policy_data = () => {

    var config = {
      method: 'get',
      url: API_URL + '/policy/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      setData1(res.data)
    }).catch((err) => {

    })
  }
  let law_data = () => {
    console.log('law_data')
    var config = {
      method: 'get',
      url: API_URL + '/regulatory_law/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      setData(res.data)
      
    }).catch((err) => {

    })
  }
  //popup
  const toast = useRef(null);

  let postData = (event = null) => {
    if (postData.length) {
      // Show an error message to the user
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      return;
    }
    const date = new Date(); // Replace this with your date variable

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
    axios.post(API_URL + '/control/', {
      description: Discription,
      departments:Departments?Departments:[],
      responsible_person: Responsible_Person,
      responsible_manager: Responsible_supervisor,
      control_objective: Objective?Objective:[],
      policy: Policy?Policy:[],
      regulatory_laws: Law?Law:[],
      status: Status,
      is_critical: Is_Crirical,
      
      issue_creation_date:`${year}-${month}-${day}`
    }).then((success) => {
      issuecontrol()
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      setPost(true)
     
    }).catch((err) => {
      toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
    })
  }

  const Department_Data = () =>{
    const config={
      method: 'get',
      url: API_URL + '/department/',
      headers: {
        "Authorization": token
      }
    }
    axios(config).then((res) => {setDepartment(res.data)}).catch((err) => {})
  }

  let issuecontrol = () => {
    var config = {
      method: 'get',
      url: API_URL+'/control/',
    };
    axios(config).then((res) => {
      const sortedData = res.data.sort((a, b) => b.id - a.id);
      if (sortedData.length > 0) {
        const latestData = sortedData[0];
        setId(latestData.id); 
      }
    }).catch((err) => {
      
    });
  }
  console.log(post,"ggggggggggg")
 
    useEffect(() => {
      issuecontrol()
    }, [])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    policy_data()
    Objective_data()
    law_data()
    Department_Data()
    issuecontrol()
  }, [])
  return (
    <>
      <CRow>
        <Toast ref={toast} />
        <CCol>
          <CCard className="p-3">
            <CCardHeader >
              <h3 className=''>Controls<span className="" style={{ float: "right" }}> <Link to="/Control_List"><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Back</CButton></Link></span></h3>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <TabView>
        <TabPanel header="Control List">
          <>
            <CRow>
              <CCol xs={12}>
                <CCard className="p-3">
                  <CCardBody>
                    <CForm onSubmit={(event) => postData(event)}>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                          <CFormInput
                            onChange={handlediscription}
                            value={Discription}
                            required
                            type="text"
                            name='name'
                            placeholder="Discription"
                          />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Responsible person</CFormLabel>
                          <CFormInput
                            id='3'
                            required pattern="[a-zA-Z0-9]+"
                            onChange={handleresponsible_person}
                            value={Responsible_Person}
                            type="text"
                            name='name'
                            placeholder="Responsible person"
                          />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Responsible supervisor / manager</CFormLabel>
                          <CFormInput
                            id='4'
                            required pattern="[a-zA-Z0-9]+"
                            onChange={handleresponsiblesupervisor}
                            value={Responsible_supervisor}
                            type="text"
                            placeholder="Responsible supervisor / manager"
                          />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                          <MultiSelect filter required pattern="[a-zA-Z0-9]+" key={Department} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id" options={Department.filter(i => {
                            if(ActiveUser.is_superuser){
                              return true
                            } else{

                              JSON.parse(ActiveUser.department).includes(i.id); 
                            }
                             
                             } )} onChange={(e) => { setDepartments(e.target.value) }} itemTemplate={(option) => <div>{option.name}</div>} value={Departments} />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Control Objective</CFormLabel>
                          <MultiSelect filter required pattern="[a-zA-Z0-9]+" key={Data2} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="description" optionValue="id" options={Data2} onChange={(e) => { setObjective(e.target.value) }} itemTemplate={(option) => <div>{option.description}</div>} value={Objective} />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Policy</CFormLabel>
                          <MultiSelect filter required pattern="[a-zA-Z0-9]+" key={Data1} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id" value={Policy} options={Data1} onChange={(e) => { setPolicy(e.target.value) }} itemTemplate={(option) => <div>{option.name}</div>} />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Law</CFormLabel>
                          <MultiSelect filter required pattern="[a-zA-Z0-9]+" key={Data} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id" value={Law} options={Data} onChange={(e) => { setLaw(e.target.value) }} itemTemplate={(option) => <div>{option.name}</div>} />
                        </CCol>
                      </div>
                      <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                          <CFormSelect id='5' value={Status} required pattern="[a-zA-Z0-9]+" onChange={(e) => handlestatus(e)} aria-label="Default select example" >
                            <option>Select</option>
                            <option value="Compliant">Compliant</option>
                            <option value="Non-Compliant">Non-Compliant</option>
                          </CFormSelect>

                        </CCol>
                      </div>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1"> Critical control</CFormLabel><br />
                        <Checkbox require className='mb-3' inputId="checkbox1" onChange={handleCheckboxChange} checked={Is_Crirical} />

                      </CCol>
                    </CForm>
                    <div className='mb-3 d-flex justify-content-center'>
                      <Button type='submit' style={{ background: "#64748B" }} onClick={(event) => postData(event)} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
                    </div>
                  </CCardBody>
                </CCard>
                <CCardBody>
                </CCardBody>
              </CCol>
            </CRow>
          </>
          </TabPanel>
          {(Status === "Non-Compliant" && Is_Crirical && post=== true) && (
    <TabPanel header="Issue Control List" disabled={!Discription && !Responsible_Person && !Responsible_supervisor && !Departments && !Objective && !Policy && !Law && !Status}>
      <Non_Compliant id={Id} btn={post}/>
    </TabPanel>
  )}
</TabView>

    </>
  )
}
export default Control_Form

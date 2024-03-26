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
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { getSecrets } from "src/config";
import ReactDatePicker from 'react-datepicker';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { globalEventAtom } from 'src/_state/globalEventAtom';
import Audit_Program_List_Service from "src/services/Audit_program_data.service";
import AuditengagementService from "src/services/Auditengagement.service";
import { activeUserAtom } from 'src/_state/activeUserAtom';


function AuditAdd() {
  const [Data, setData] = useState([])
  const [Data1, setData1] = useState([])
  const [Data2, setData2] = useState([])
  const [Name, setName] = useState("")
  const [Assigned_To, setAssigned_To] = useState("")
  const [Annual_Plan, setAnnal_Plan] = useState("")
  const [Department, setDepartment] = useState([""])
  const [Sub_Function, setSub_Function] = useState([])
  const [Discription, setDiscription] = useState("")
  const [Objectives, setObjectives] = useState("")
  const [Duration_Days, setDuration_Days] = useState("")
  const [Duration_Hours, setDuration_Hours] = useState("")
  const [Engagement_Planned_Start, setEngagement_Planned_Start] = useState("")
  const [Engagement_Planned_End, setEngagement_Planned_End] = useState("")
  const [formannualPlan, setformannualPlan] = useState("")
  const [formdepartment, setformdepartment] = useState([])
  const [formsubDepartment, setformsubDepartment] = useState([])
  const [audit_observation, setaudit_observation] = useState("")
  const ActiveUser = useRecoilValue(activeUserAtom);


  const navigate = useNavigate();
  const params=useParams()
  const API_URL = getSecrets.API_URL
  const token = getSecrets.token()
  const handlename = (value) => {
    setName(value)
  }
  const handleassigned_to = (e) => {
    setAssigned_To(e.target.value)
  }
  const handleannual_plan = (e) => {
    setformannualPlan(e.target.value);
    for (const [key, value] of Object.entries(Data1)) {
      if (value['id'] == e.target.value) {
        setAnnal_Plan(value['title']);
        setName(value['title']);
      }
    }

    setTimeout(()=>{
      setData2(
        JSON.parse(Data1.filter(i => i.id == e.target.value)[0]['departments']).map(i => { let data = {}; data['id'] = i['department_id']; data['name'] = getDepartmentName(i['department_id']); return data })
        );

    },1000)

   
  }


  

  const handleDepartment = (e) => { setformdepartment(e); setName(Name + " / " + getDepartmentName(e)); get_listing(e); }

  const handlesubfunction = (e) => { setformsubDepartment(e); setName(Name + " / " + Sub_Function.filter(x => x.id == e)[0]['name']); }

  const handlediscription = (e) => {
    setDiscription(e.target.value)
  }
  const handleobjectives = (e) => {
    setObjectives(e.target.value)
  }
  const handleduration_Days = (e) => {
    setDuration_Days(e.target.value)
  }
  const handleduration_hours = (e) => {
    setDuration_Hours(e.target.value)
  }

  function handleEndDateBlur() {
    const currentDate = new Date();
    const enteredDate = new Date(Date.parse(Engagement_Planned_Start));
    const enddate = new Date (Date.parse(Engagement_Planned_End));
  
    if (enteredDate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    }else  if (enddate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    }
  }

  let fetchDepartments = () => {

    var config = {
      method: 'get',
      url: API_URL + '/department/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      setDepartment(res.data);
    }).catch((err) => {

    })
  }
  let fetchSubDepartments = () => {
    axios.get(API_URL + `/subdepartment/`).then((res) => { setSub_Function(res.data); }).catch((err) => { })
  }
  let getDepartmentName = (id) =>
  {
    // console.log("getDepartmentName  => ", Department)
    // console.log("getDepartmentName :", Department.filter(i => i.id == id).length ?Department.filter(i => i.id == id)[0]['name']:"")
    return Department.filter(i => i.id == id).length ?Department.filter(i => i.id == id)[0]['name']:"";
  } 

  // useEffect(()=>{ 
  //   if(Data1.length){
  //     setData2(
  //       JSON.parse(Data1.filter(i => i.id == e.target.value)[0]['departments']).map(i => { let data = {}; data['id'] = i['department_id']; data['name'] = getDepartmentName(i['department_id']); return data })
  //       );
  //   }
    
  // }, [Department])
    
  //popup
  const toast = useRef(null);
  const setGlobatEvent = useSetRecoilState(globalEventAtom);


  let postData = () => {
    var startDate = new Date(Engagement_Planned_Start);
    let _start_date = startDate.getFullYear() +"-"+(startDate.getMonth()+1)+"-"+ startDate.getDate();
    var endDate = new Date(Engagement_Planned_End)
    let _end_date = endDate.getFullYear() +"-"+(endDate.getMonth()+1)+"-"+ endDate.getDate();
    axios.post(API_URL + '/auditengagement/', {
      name: Name,
      annual_plan: formannualPlan,
      allocated_manager: Assigned_To,
      department: formdepartment,
      subdepartment: formsubDepartment,
      description: Discription,
      objective: Objectives,
      duration_days: Duration_Days,
      duration_hours: Duration_Hours,
      audit_observation: audit_observation,
      start_date: _start_date,
      end_date: _end_date,
      state: (ActiveUser.is_superuser || ActiveUser.usertype == 'Head')? 'Added By Head': 'Draft'
    }).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      setTimeout(() => { setGlobatEvent({eventName:'refreshAuditPlan'}); navigate(`/audit/${params.id}/`) }, [1000])
      setData(success)
    }).catch((err) => {
      toast.current.show({ severity: 'error', summary: '', detail: 'Fill All Fields', life: 3000 });
    })
  }

  let audit_plan_data = (id = '') => {
    axios.get(API_URL + `/annualplan/`)
      .then((res) => {
        const approvedStatePlans = res.data.filter(plan => plan.state === 'Approved' );
        setData1(approvedStatePlans);
      }).catch((err) => { })
  }

  let get_listing = (department)=>{ 

    console.log("api hit");
    let api = new AuditengagementService;
    api.getAllAuditEngagement("").then((res) => { 
      let data  = res.data;
      console.log(params.id, department, data);
      data = data.filter(i=>(i.annual_plan == params.id && i.department == department));
      console.log(" ===> : ", params.id,  data[data.length-1]['open_issues'] );
      setaudit_observation(data[data.length-1]['open_issues']);
  
    }).catch((err) => { });

  }

  
  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate("/") }
    fetchDepartments();
    setTimeout(()=>{
      fetchSubDepartments();
      audit_plan_data()
    }, 1000)
   
  
  }, []);
  // useEffect(()=>{fetchDepartments();},[Data2])
  useEffect(()=>{
    if(Data1.length > 0){     
      handleannual_plan({target:{value:params.id}});
    }
    
   
  }, [params, Data1])

  const handleEngagement_Planned_StartChange = (date) => {
    setEngagement_Planned_Start(date);

    // Check if end date is set and is before the selected start date
    if (Engagement_Planned_End && date > Engagement_Planned_End) {
      setEngagement_Planned_End(date); // Set end date to the selected start date
    }
  };

  const handleEngagement_Planned_EndChange = (date) => {
    // Check if start date is set and is after the selected end date
    if (Engagement_Planned_Start && date < Engagement_Planned_Start) {
      setEngagement_Planned_Start(date); // Set start date to the selected end date
    }

    setEngagement_Planned_End(date);
  };

  return (
    <CRow>
      <Toast ref={toast} />
      <CCol xs={12}>
        <CCard className="p-3 mb-2">
          <CCardHeader > 
            <h3 style={{fontWeight:400}}>Audit Engagement<span className="" style={{ float: "right" }}> <Link to={`/audit/${params.id}/`}><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Back</CButton></Link></span></h3>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <div className="mb-3">
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput disabled onChange={handlename}
                    value={Name}
                    type="text"
                    name='name'
                    placeholder="Name"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Annual Plan</CFormLabel>
                  <CFormSelect disabled={true} value={formannualPlan} onChange={(e) => handleannual_plan(e)}  aria-label="Default select example">
                    <option>Select</option>
                    {
                      Data1.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        );
                      })
                    }
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                  {/* <CFormSelect onChange={(e) => handleDepartment(e.target.value, e)} aria-label="Default select example" >
                    <option>Select</option>
                    { Data2.map((item) =><option key={item.name+item.id} value={item.id}>{item.name} </option>)  }
                  </CFormSelect> */}
                   <CFormSelect 
                   options={[
                    'Select',
                   ...Data2.map(i=>{ return {label: i.name, value: i.id} })
                    // { label: 'One', value: '1' },
                    // { label: 'Two', value: '2' },
                    // { label: 'Three', value: '3', disabled: true }
                  ]}
                   onChange={(e) => handleDepartment(e.target.value, e)} aria-label="Default select example" >
                   
                    {/* { Data2.map((item) =><option key={item.name+item.id} value={item.id}>{item.name} </option>)  } */}
                  </CFormSelect>
                  {/* <select > 
                    <option>Select</option>
                      { Data2.map((item) =><option key={item.name+item.id} value={item.id}>item.name </option>)  }
                  </select> */}

                </CCol>
              </div>
            
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Assigned To</CFormLabel>
                  <CFormInput onChange={handleassigned_to}
                    type="text"
                    placeholder="Search"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol >
                  <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                  <CFormTextarea name='discription' onChange={handlediscription} id="exampleFormControlTextarea1" rows="4"></CFormTextarea>
                </CCol>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCardBody>
        </CCardBody>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <div className="mb-3">
              </div>
              <div className="mb-3">
                <CCol >
                  <CFormLabel htmlFor="exampleFormControlInput1">Objectives</CFormLabel>
                  <CFormTextarea name='objectives' onChange={handleobjectives} id="exampleFormControlTextarea1" rows="6"></CFormTextarea>
                </CCol>
              </div>
              {/* <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Fieldwork Planned Duration </CFormLabel>
                  <CFormInput onChange={handleduration_Days}
                    type="text"
                    placeholder="Working Days"
                  />
                  <CFormInput className='mt-2' onChange={handleduration_hours}
                    type="text"
                    name='EngagementPlannedEndHour'
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Working Hours"
                  />
                </CCol>
              </div> */}
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Engagement Planned Start</CFormLabel>
                  {/* <CFormInput onChange={handleengagement_planned_start}
                    type="date"
                    name='EngagementPlannedStart'
                  /> */}
                  <ReactDatePicker
                      className="date-picker"
                    dateFormat="dd/MM/yyyy"
                    showIcon
                    selected={Engagement_Planned_Start}
                    onChange={handleEngagement_Planned_StartChange}
                    onBlur={handleEndDateBlur}
                    isClearable
                    placeholderText="dd/mm/yyyy"
                    minDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Engagement Planned End</CFormLabel>
                  {/* <CFormInput onChange={handleengagement_planned_end}
                    type="date"
                    name='EngagementPlannedEnd'
                  /> */}
                  <ReactDatePicker
                      className="date-picker"
                    dateFormat="dd/MM/yyyy"
                    showIcon
                    selected={Engagement_Planned_End}
                    onChange={handleEngagement_Planned_EndChange}
                    onBlur={handleEndDateBlur}
                    isClearable
                    placeholderText="dd/mm/yyyy"
                    minDate={Engagement_Planned_Start}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    />
                </CCol>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCardBody>
        </CCardBody>
      </CCol>
      <div className='mb-3 d-flex justify-content-center'>
        <Button type='submit' style={{ background: "#64748B" }} onClick={(event) => postData(event)} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
      </div>
    </CRow>
  )
}
export default AuditAdd

import {useState,React,useEffect,useRef} from 'react'
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
import { Button } from 'primereact/button'
import { getSecrets } from 'src/config';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import { Toast } from 'primereact/toast';

function Non_Compliant(props){
  const navigate = useNavigate()
  const params=useParams()
    const [Data1,setData1] =useState([])
    const [Data2,setData2] =useState([])
    const API_URL=getSecrets.API_URL
    const token=getSecrets.token()
    const [Issue_Refrence_Number,setIssue_Refrence_Number]=useState("")
    const [Creation_Date,setCreation_Date]=useState("")
    const [Status,setStatus]=useState("")
    const [Control_Objective,setControl_Objective]=useState("")
    const [Assigned_To,setAssign_to]=useState("")
    const [Manager_Assign_to,setManager_Assign_to]=useState("")
    const [Discription,setDiscription]=useState("")
    const [Action_Plan,setAction_Plan]=useState("")
    const [Control,setControl]=useState("")
    const handleissue_reference_number=(e)=>{setIssue_Refrence_Number(e.target.value)}
    const handleissue_reference_number_creation_date=(e)=>{setCreation_Date(e.target.value)}
    const handlestatus=(e)=>{setStatus(e.target.value)}
    const handlecontrol_objective=(e)=>{setControl_Objective(e.target.value)}
    const handleassigned_to=(e)=>{setAssign_to(e.target.value)}
    const handlemanager_assigned_to=(e)=>{setManager_Assign_to(e.target.value)}
    const handlediscription=(e)=>{setDiscription(e.target.value)}
    const handleaction_plan=(e)=>{setAction_Plan(e.target.value)}
    const handlecontrol=(e)=>{setControl(e.target.value)}
    const [btnValue, setBtnValue] = useState(props.btn);
    // get data
    let Objective_data=()=>{
      var config = {
        method: 'get',
        url: API_URL+'/controlobjective/',
        headers: { 
          "Authorization":token
        }
      };
        axios(config).then((res) => {
          setData1(res.data)
            }).catch((err) => {
            
            })
      }
      // get data
      let Control_data=()=>{
        var config = {
          method: 'get',
          url: API_URL+'/control/',
          headers: { 
            "Authorization":token
          }
        };
          axios(config).then((res) => {
            setData2(res.data)
              }).catch((err) => {
              
              })
        }

        let Control_data_id=()=>{
          var config = {
            method: 'get',
            url: API_URL+'/control/'+params.id+'/',
            headers: { 
              "Authorization":token
            }
          };
            axios(config).then((res) => {
                }).catch((err) => {
                
                })
          }
      //popup
  const toast = useRef(null);

let postData=(event = null)=>{
  var data = {
          issue_reference_number:Issue_Refrence_Number,
          issue_creation_date:Creation_Date,
          issue_status:Status,
          assign_to:Assigned_To,
          assign_to_manager:Manager_Assign_to,
          short_description:Discription,
          propose_action_plan:Action_Plan
  }

  var config = {
    method: 'put',
    url: API_URL+`/control/${props.id?props.id:params.id}/`,
    headers: { 
      "Authorization":token,
    },
   data:data
  };
        axios(config).then((success) => {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
          setTimeout(() => { navigate("/Control_List") }, [1000])
        }).catch((err) => {
            toast.current.show({ severity: 'error', summary: '', detail: 'Fill All Fields', life: 3000 });
          })
      }
      const handleChangeProp = () => {
        // Modify the state variable to update the prop value
        setBtnValue(!btnValue);
      };
      let issuecontrol=()=>{
        var config = {
          method: 'get',
          url: API_URL+`/control/${params.id}/`,
          headers: {
            "Authorization": token
          }
        };
          axios(config).then((res) => {
           setIssue_Refrence_Number(res.data.issue_reference_number)
           setCreation_Date(res.data.issue_creation_date)
           setStatus(res.data.issue_status)
           setControl_Objective(res.data.control_objective)
           setControl(res.data.control)
           setAssign_to(res.data.assign_to)
           setManager_Assign_to(res.data.assign_to_manager)
           setDiscription(res.data.short_description)
           setAction_Plan(res.data.propose_action_plan)
              }).catch((err) => {
              
              })
        }

useEffect(() => {
    if(!localStorage.getItem('token')){
         navigate("/")
    }
    Objective_data()
    Control_data()
    issuecontrol()
    Control_data_id()
       }, [])
  return (
    <CRow>
        <Toast ref={toast} />
      <CCol xs={12}>
        <CCard className="p-3">
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
            <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Issue Reference Number</CFormLabel>
                  <CFormInput 
                    value={Issue_Refrence_Number}
                    onChange={handleissue_reference_number}
                    type="text"
                    name='name'
                    placeholder="Issue Reference Number"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Issue Creation Date</CFormLabel>
                  <CFormInput 
                  value={Creation_Date}
                    onChange={handleissue_reference_number_creation_date}
                    type="date"
                    name='name'
                    placeholder="Issue Creation Date"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Issue Status</CFormLabel>
                  <CFormSelect value={Status}  onChange={handlestatus} aria-label="Default select example" >
                      <option>Select</option>
                      <option>Resolve</option>
                      <option>Open</option>
                   </CFormSelect>
                </CCol>
              </div>
              {/* <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Control Objective</CFormLabel>
                  <CFormSelect value={Control_Objective}  onChange={handlecontrol_objective} aria-label="Default select example" >
                      <option>Select</option>
                      {Data1.map((item)=>( <option value={item.id}>{item.description}</option>  ))}
                   </CFormSelect>
                </CCol>
              </div> */}
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Assigned to</CFormLabel>
                  <CFormInput 
                  value={Assigned_To}
                    onChange={handleassigned_to}
                    type="text"
                    name='name'
                    placeholder="Assigned To"
                  />
                </CCol>
              </div>
              <div className='mb-3'>
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Assigned to Manager</CFormLabel>
                <CFormInput 
                value={Manager_Assign_to}
                    onChange={handlemanager_assigned_to}
                    type="text"
                    name='name'
                    placeholder="Manager Of Assigned To"
                  />
                  </CCol>
              </div>
              <div className='mb-3'>
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
                <CFormInput 
                value={Discription}
                    onChange={handlediscription}
                    type="text"
                    name='name'
                    placeholder="Discription"
                  />
                  </CCol>
              </div>
              <div className='mb-3'>
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Action Plan</CFormLabel>
                <CFormInput
                value={Action_Plan} 
                    onChange={handleaction_plan}
                    type="text"
                    name='name'
                    placeholder="Action Plan"
                  />
                  </CCol>
              </div>
              {/* <div className='mb-3'>
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Control</CFormLabel>
                    <CFormSelect value={Control}  onChange={handlecontrol} aria-label="Default select example" >
                      <option>Select</option>
                      {Data2.map((item)=>( <option value={item.id}>{item.description}</option>  ))}
                   </CFormSelect>
                  </CCol>
              </div> */}
            </CForm>
            </CCardBody>
            <div className='mb-3 d-flex justify-content-center'>
            <Button type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
                    </div>
      </CCard>
<CCardBody>
</CCardBody>
      </CCol>
    </CRow>
  )
}
export default Non_Compliant

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
  CHeader,
  CFormFeedback
} from '@coreui/react'
import "./audit.css"
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
  Link
} from "react-router-dom";
import ReactDatePicker from 'react-datepicker';
import axios from 'axios';
import { getSecrets } from "src/config";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import AuditengagementService from 'src/services/Auditengagement.service';
import { riskAtom } from 'src/_state/riskAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { globalEventAtom } from 'src/_state/globalEventAtom';
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';
import { AuditengagementAtom } from 'src/_state/Audit_EngagementAtom';
import { Description, TextFields } from '@mui/icons-material';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';
import { activeUserAtom } from 'src/_state/activeUserAtom';

function AuditProgram(prop) {
  const [isValid, setIsValid] = useState(false);
  const setGlobalEvent = useSetRecoilState(globalEventAtom)
  const [Audit_Department, setAudit_Department] = useState([])
  const [Risk_Department, setRisk_Department] = useState([])
  const [showdata, setShowdata] = useState('')
  const [Category, setCategory] = useState("")
  const [Title_Of_Procedure, setTitle_Of_Procedure] = useState("")
  const [Summary_Of_Procedure, setSummary_Of_Procedure] = useState("")
  const [Design_assessment_result, setDesign_assessment_result] = useState("")
  const [Operating_assessment_result, setOperating_assessment_result] = useState("")
  const [Result_of_audit_procedures, setResult_of_audit_procedures] = useState("")
  const [Discription, setDiscription] = useState("")
  const [risk_tagging, setRisk_tagging] = useState("")
  const [Controls,setControls] = useState("")
  const allRisk = useRecoilValue(riskAtom);
  const [Data1, setData1] = useState([])
  const [Issue, setIssue] = useState('')
  const API_URL = getSecrets.API_URL
  const navigate = useNavigate();
  const params = useParams();
  const token = getSecrets.token()
  const [Our_Reputation,setOur_Reputation] = useState("")
  const [Management_Response,setManagement_Response] = useState("")
  const [Action_Plan,setAction_Plan] = useState("")
  const [AllControl,setAllControl] = useState([])
  const [approval_status, setapproval_status] = useState([])
  const [Our_Description,setOur_Description] = useState("")
  const [Implications,setImplications] = useState("")
  const [Observation_Popup, setObservation_Popup] = useState(false)
  const [Observation_Data, setObservation_Data] = useState([])
  const [Agree_date_action_plan, setAgree_date_action_plan] = useState("")
  const ActiveUser = useRecoilValue(activeUserAtom);
  const [fileDATA,setFileDATA]=useState([])
  const [Our_Observation,setOur_Observation] = useState("")
  const [Our_observation_title, setOur_observation_title] = useState([])
  const [Our_observation_description, setOur_observation_description] = useState([])
  const [DepartForCurrent, setDepartForCurrent] = useState('')




  const handletitle_of_procedure = (e) => {
    setTitle_Of_Procedure(e.target.value)
    
  }
  const handlesummary_of_producer = (e) => {
    setSummary_Of_Procedure(e.target.value)
    
  }
  const handledesign_assessment = (e) => {
    setDesign_assessment_result(e.target.value)
    
  }
  const handleoperating_assessment = (e) => {
    setOperating_assessment_result(e.target.value)
    
  }
  const handleresult_audit_proceder = (e) => {
    setResult_of_audit_procedures(e.target.value)
    
  }
  const handlecategory = (e) => {
    const getuser = e.target.value;
    setCategory(getuser)
    setShowdata(getuser)
    
  }
  const handleissue = (e) => {
    setIssue(e.target.value)
    
  }
  const handlemanagement_response = (e) =>{
    setManagement_Response(e.target.value)
    
  }
  const handleaction_plan = (e) => {
    setAction_Plan(e.target.value)
    
  }
  const handleour_reputations = (e) =>{
    setOur_Reputation(e.target.value)
    
  }
  // const handleour_observation = (e) => {
  //   setOur_Observation(e.target.value)
  // }
  const handledescription = (e) => {
    setOur_Description(e.target.value)
  }
  const handleImplications = (e) => {
    setImplications(e.target.value)
  }
 

  const toast = useRef(null);
  const auditprogramattachment=()=>{
    const formDataArray = [];
  const files = refUploader.current.getFiles();

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file_name", files[i].name);
    formData.append("content", files[i]);
    formData.append("auditprogram", params.id);
    formDataArray.push(formData);
  }

  const uploadPromises = formDataArray.map((formData) => {
    return axios.post(API_URL + `/auditprogram_attachment/`, formData);
  });

  Promise.all(uploadPromises)
    .then((responses) => {
      setData1(responses);
    })
    .catch((err) => {
      toast.current.show({
        severity: 'info',
        summary: '',
        detail: 'Fill All Fields',
        life: 3000
      });
    });
  }
 
  let postData = (event = null) => {
    auditprogramattachment();
    const files = refUploader.current.getFiles();
    var startDate = new Date(Agree_date_action_plan);
    let _start_date = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
  
    const formData = new FormData();
    formData.append("category", Category);
    formData.append("title_of_procedure", Title_Of_Procedure);
    formData.append("summary_of_procedure", Summary_Of_Procedure);
    formData.append("design_assessment_result", Design_assessment_result);
    formData.append("operating_assessment_result", Operating_assessment_result);
    formData.append("audit_process_result", Result_of_audit_procedures);
    risk_tagging.forEach((risk) => {
      formData.append("risk_tagging", risk);
      });
    formData.append("control_issue", Issue);
    formData.append("action_plan", Action_Plan);
    formData.append("our_reputation", Our_Reputation);
    formData.append("management_response", Management_Response);
    formData.append("our_observation", JSON.stringify(Observation_Data));
    formData.append("our_description", Our_Description);
    formData.append("implications", Implications);
    formData.append("agree_date_action_plan", _start_date);
  
    Controls.forEach((Control) => {
      formData.append("controls", Control);
      });

    files.forEach(file => {
      formData.append("file_name", file.name);
      formData.append("files", file);
    });

    // if (!_start_date) {
    //   delete form.agree_date_action_plan;
    // }

   
  
    axios
      .patch(API_URL + `/audit_program/${params.id}/`, formData)
      .then((success) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
        setData1(success);
        Audit_program_attachment_data();
      })
      .catch((err) => {
        toast.current.show({ severity: 'info', summary: '', detail: 'Fill All Fields', life: 3000 });
      });
  }
  


  const [Audit_engagement, setAudit_engagement] = useState("")

  async function Audit_program_data() {
    let result = await fetch(API_URL + `/audit_program/${params.id}/`);
    result = await result.json();
  
    setSummary_Of_Procedure(result.summary_of_procedure);
    setTitle_Of_Procedure(result.title_of_procedure);
    setCategory(result.category);
    setShowdata(result.category);
    setDiscription(result.description);
    setResult_of_audit_procedures(result.audit_process_result);
    setOperating_assessment_result(result.operating_assessment_result);
    setDesign_assessment_result(result.design_assessment_result);
    setRisk_tagging(result.risk_tagging);
    setIssue(result.control_issue);
    setImplications(result.implications);
    setAction_Plan(result.action_plan);
    setManagement_Response(result.management_response);
    setOur_Reputation(result.our_reputation);
    setAudit_engagement(result.audit_engagement);
    setControls(result.controls);
    setapproval_status(result.approval_status);
    // setFileDATA(result)
   
  
    if (result.agree_date_action_plan) {
      const agreeDateActionPlan = new Date(Date.parse(result.agree_date_action_plan));
      if (!isNaN(agreeDateActionPlan)) {
        setAgree_date_action_plan(agreeDateActionPlan);
      } else {
        // Handle the case where the date is invalid
        console.error('Invalid date format for agree_date_action_plan');
      }
    } else {
      setAgree_date_action_plan(null); // or handle the case where the value is not present
    }
  
    setObservation_Data(result.our_observation ? JSON.parse(result.our_observation) : []);
  }
  
  const globatEvent = useRecoilValue(globalEventAtom);


  async function Audit_program_attachment_data() {
    try {
      let result = await fetch(API_URL + `/auditprogram_attachment/`);
      result = await result.json();
      const filteredResult = result.filter(item => item.auditprogram.toString() === params.id);
      setFileDATA(filteredResult);
      
    } catch (error) {
      console.error('Error fetching audit program filesmmmm:', error);
    }
  }
const [engagement,setEngagement]=useState([])

async function Audit_program_engagement() {
  try {
    let result = await fetch(API_URL + `/audit_program/audit_engagement/${params.id}`);
    result = await result.json();
    const filteredResult = result.filter(item => item.id.toString() === params.id);
    setEngagement(filteredResult);
  } catch (error) {
    console.error('Error fetching audit program engagement:', error);
  }
}

  
 

  
  const audit_department = () => {
    axios.get(API_URL + `/auditengagement/`).then((success) => {
      setAudit_Department(success.data);
      const filteredAudit = success.data.filter(item => item.id === engagement[0].audit_engagement);
      console.log(filteredAudit,'filteredAudit')
      console.log(allRisk,'allRisk ')
      const filteredResult = Audit_Department && allRisk.filter(risk => filteredAudit[0].department === risk.department_id)
      setRisk_Department(filteredResult);
    }).catch((err) => { })
  }

  useEffect(() => {
  
    try {
      audit_department()
    } catch (error) {
      // Handle error
    }
  }, [ engagement]);

  const Control = () =>{
    axios.get(API_URL + `/control/`).then((success) => {
     
      setAllControl(success.data)
    }).catch((err) => { })
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
     
    }).catch((err) => { })

  }

  useEffect(() => {
    department_data();
    try {
      const engagementData = engagement[0];
      let _current_department = Audit_Department.find(i => i.id === engagementData.audit_engagement)?.department;
      setDepartForCurrent(_current_department);
    } catch (error) {
      // Handle error
    }
  }, [Audit_Department, AllControl, engagement]);
  


  const [Datatableprogram,setDatatableprogram]=useState([])


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    Audit_program_attachment_data();
    Audit_program_engagement();
    Audit_program_data()
    audit_department()
    Control();
   
  }, []);

 

  const customBase64Uploader = async (event) => {
    let formData = new FormData();
    formData.append("file_name", file.name);
    formData.append("content", file);
    formData.append("auditprogram", params.id);
    const file = event.files[0];
  
    fetch(`${API_URL}/auditprogram_attachment/`, {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {});
  };
  const [totalSize, setTotalSize] = useState(0);

  const refUploader = useRef();
  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'd-none custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const setObservation = ()=>{
   
    let data = {our_observation_title:Our_observation_title, our_observation_description:Our_observation_description}
    let list  = Observation_Data?Observation_Data:[];
    list.push(data);
    setObservation_Data(list);
    setObservation_Popup(false);

  }
  const pdffile = (rowData) => {
    const handleDownload = () => {
      fetch(rowData.content)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, `${rowData.file_name}`); // Change 'file.pdf' to the desired filename
        })
        .catch((error) => {
         
        });
    };
 
  
    return (
      <div>
        <i className="pi pi-cloud-download" onClick={handleDownload} style={{ fontSize: '2rem' }}></i>
      </div>
    );
  };



  return (
    <CRow >
      <Toast ref={toast} />
      <CCol xs={12}>
        <CCard className="p-3 mb-2">
        <CHeader>
            <h3 className=''>Audit Program</h3>
         </CHeader>
          <CCardBody>
            <div className="mb-3">
              <CCol xs="auto">
                <form id="form-shower">
                  <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                  <CFormSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review' || ActiveUser.usertype == 'Department'} onChange={handlecategory} value={Category} className="mb-3" aria-label="Large select example" >
                    <option value="">Select</option>
                    <option value="Test of Control">Test of Control</option>
                    <option value="Others">Others</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid Category.</CFormFeedback>
                </form>
              </CCol>
            </div>
           
                <CForm onSubmit={(event) => postData(event)}>
                  <div className="mb-3">
                  </div>
                  <div className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="exampleFormControlInput1">Title Of Procedure</CFormLabel>
                      <CFormInput disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} onChange={handletitle_of_procedure}
                        value={Title_Of_Procedure}
                        type="text"
                        placeholder="Title Of Procedure"
                        
                      />
                      
                    </CCol>
                  </div>
                  <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Summary Of Procedure</CFormLabel>
                      <CFormTextarea disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} rows="6" onChange={handlesummary_of_producer}
                        value={Summary_Of_Procedure}
                        type="text"
                        placeholder="Summary Of Procedure"
                        
                      ></CFormTextarea>
                      
                    </CCol>
                  </div>
                  {(Audit_Department.length  > 0 ??false) && <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Related Risk </CFormLabel>
                      <MultiSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} placeholder='Select Risk' style={{ width: "100%" }} value={risk_tagging} display="chip" optionLabel="title" optionValue="id" 
                      options={Risk_Department}
                       onChange={(e) => { setRisk_tagging(e.value) }}  />
                    </CCol>
                  </div> }
                  {(Audit_Department.length > 0??false) && <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1"> Controls </CFormLabel>
                      {/* <MultiSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} placeholder='Select Controls' style={{ width: "100%" }} value={Controls} display="chip" optionLabel="description" optionValue="id" options={Audit_Department.length && AllControl.filter(i => Audit_Department[0]['department'] == i.departments )} onChange={(e) => { setControls(e.value) }}  /> */}
                      <MultiSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} placeholder='Select Controls' style={{ width: "100%" }} value={Controls} display="chip" optionLabel="description" optionValue="id"
                       options={Audit_Department.length && AllControl.filter(i =>  i.departments.includes(DepartForCurrent) )}
                        onChange={(e) => { setControls(e.value) }}  />
                    </CCol>
                  </div> }
                 
                  <div className="mb-3">
                    <CCol >
                      <CFormLabel htmlFor="exampleFormControlInput1">Design assessment result</CFormLabel>
                      <CFormSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} onChange={handledesign_assessment} value={Design_assessment_result} className="mb-3" aria-label="Large select example" >
                        <option>Select</option>
                        <option value="Effective">Effective </option>
                        <option value="In Effective">In Effective</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                  <div className="mb-3">
                    <CCol >
                      <CFormLabel htmlFor="exampleFormControlInput1">Operating assessment result</CFormLabel>
                      <CFormSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} onChange={handleoperating_assessment} value={Operating_assessment_result} className="mb-3" aria-label="Large select example" >
                        <option>Select</option>
                        <option value="Effective">Effective </option>
                        <option value="In Effective">In Effective</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                
                  <div className="mb-3">
                    <CCol >
                      <CFormLabel htmlFor="exampleFormControlInput1">Result of audit procedures</CFormLabel>
                      <CFormSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} onChange={handleresult_audit_proceder} value={Result_of_audit_procedures} className="mb-3" aria-label="Large select example" >
                        <option>Select</option>
                        <option value="Effective">Effective</option>
                        <option value="Ineffective">In effective</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                  {Result_of_audit_procedures == 'Ineffective' &&
                  <>
                    <div className="mb-3">
                      <CCol >
                        <CFormLabel htmlFor="exampleFormControlInput1">Level Of Importance</CFormLabel>
                        <CFormSelect disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'} onChange={handleissue} value={Issue} className="mb-3" aria-label="Large select example" >
                          <option>Select</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </CFormSelect>
                      </CCol>
                    </div>
                {/* <div className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Our Observation</CFormLabel>
                    <CFormTextarea disabled={approval_status == 'approved'} onChange={handleour_observation}
                      value={Our_Observation}
                      type="text"
                      placeholder="Our Observation"
                      
                    ></CFormTextarea>
                    
                  </CCol>
                </div> */}
                <Dialog header="Our Observation" visible={Observation_Popup} style={{ width: '50vw' }} onHide={() => setObservation_Popup(false)}>
                  <div setvisible={setObservation_Popup} ispopup={true}>
                    <div className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Title of Observation</CFormLabel>
                        <CFormInput disabled={approval_status == 'approved'} onChange={(e)=>setOur_observation_title(e.target.value)}
                          type="text"
                          placeholder="Title of Observation"
                          
                        />
                        
                      </CCol>
                    </div>
                    <div className="mb-3">
                  <CCol>

                    <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                    <CFormTextarea disabled={approval_status == 'approved'} onChange={(e)=>{ setOur_observation_description(e.target.value); }}
                      type="text" placeholder="Description" ></CFormTextarea>
                    
                  </CCol>
                </div>
                <div className='mb-3 d-flex justify-content-center'>
                <Button type='submit' onClick={() => setObservation()} style={{ background: "#64748B" }}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
              </div>
                  </div>
                </Dialog>
                <div className="mb-3 ">
                  <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Our Observation</CFormLabel>
                    <table style={{ border: '1px solid var(--cui-form-select-border-color, #b1b7c1) !important' }}>
                      <tr>
                        <th style={{'width':'25%'}}> Title of Observation </th>
                        <th>Description </th>
                      </tr>
                      
                        {Observation_Data.length > 0 && Observation_Data.map(i=>{
                          return(
                           
                            <tr key={i.our_observation_title}>
                            <td >{i.our_observation_title}</td>
                            <td >{i.our_observation_description}</td>
                            </tr>
                            
                          )
                        })}
                       
                     
                    </table>
                    <Button type="button" style={{ background: "#64748B" }} onClick={() => setObservation_Popup(true)} label="Add Observation" className="p-2 m-2"></Button>

                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Implications</CFormLabel>

                    <CFormTextarea disabled={approval_status == 'approved'} onChange={handleImplications}
                      value={Implications}
                      type="text"
                      placeholder="Implications"
                      
                    ></CFormTextarea>
                    
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Our Recommendation</CFormLabel>
                    <CFormTextarea disabled={approval_status == 'approved'} onChange={handleour_reputations}
                      value={Our_Reputation}
                      type="text"
                      placeholder="Our Recommendation"
                      
                    ></CFormTextarea>
                    
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Management Response/Action Plan</CFormLabel>
                    <CFormTextarea disabled={approval_status == 'approved'} onChange={handleaction_plan}
                      value={Action_Plan}
                      type="text"
                      placeholder="Management Response/Action Plan"
                      
                    ></CFormTextarea>
                    
                  </CCol>
                </div>
                <div className="mb-3">
                      <CCol xs="auto">
                        <CFormLabel htmlFor="exampleFormControlInput1">Agree Date of Action Plan</CFormLabel>
                        <ReactDatePicker
                         disabled={approval_status == 'Accepted and Closed' || approval_status=='Approved' || approval_status=='Sended for Review'  || ActiveUser.usertype == 'Department'}
                          className="date-picker"
                          dateFormat="dd/MM/yyyy"
                          showIcon
                          selected={Agree_date_action_plan}
                          onChange={(date)=>setAgree_date_action_plan(date)}
                          placeholderText="dd/mm/yyyy"
                          minDate={new Date() } 
                          isClearable
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                    />
                      </CCol>
                    </div>
                  
                   </>
                  }
                  <div className="mb-3">
                    <CCol xs="auto">
                      <label for="formFile" className="form-label">Work paper reference (supporting document) </label>
                      <FileUpload
                        uploadOptions={uploadOptions}
                        onError={onTemplateClear} onClear={onTemplateClear}
                        ref={refUploader} url={API_URL + "./upload"} multiple customUpload uploadHandler={customBase64Uploader}  />
                      <CFormFeedback invalid>Please provide a valid File.</CFormFeedback>
                    </CCol>
                  </div>
                </CForm>

                <div className="mb-3">
                  <CCol>
               <table>
                <tr>
                  <th>Attachment</th>
                  <th>Download</th>
                </tr>
                {Array.isArray(fileDATA) ? (
  fileDATA.map((item) => (
    <tr key={item.id}>
      <td>{item.file_name}</td>
      <td>{pdffile(item)}</td> 
    </tr>
  ))
) : (
  <tr>
    <td>{fileDATA.file_name}</td>
    <td>{pdffile(fileDATA)}</td> 
  </tr>
)}


               </table>
               </CCol>
                  </div>
                         
          </CCardBody>
          <div className='mb-3 d-flex justify-content-center'>
            { !(approval_status=='Approved') &&
              <Button type='submit' style={{ background: "#64748B" }} onClick={(event) => postData(event)} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
             }
             <span className="" style={{ float: "right" }}> <Link to={`/Audtdetails/${Audit_engagement}/`}><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Back</CButton></Link></span>
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default AuditProgram

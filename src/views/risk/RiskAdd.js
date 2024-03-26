import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
import moment from "moment";


const API_URL = getSecrets.API_URL
const token= getSecrets.token
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
  useNavigate,
  useParams
} from "react-router-dom";
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {riskPriorityAtom} from 'src/_state/riskPriorityAtom';
import {likehoodAtom} from 'src/_state/likehoodAtom';
import {impactAtom} from 'src/_state/impactAtom';
import { inherentRiskDeterminationAtom } from 'src/_state/inherentRiskDeterminationAtom';
import { controlAtom } from 'src/_state/controlAtom';
import { controlDeterminationAtom } from 'src/_state/controlDeterminationAtom';
import { residualRiskDeterminationAtom } from 'src/_state/residualRiskDeterminationAtom';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import ReactDatePicker from 'react-datepicker';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import { sub_functionAtom } from 'src/_state/sub_functionAtom';


function FormRisk(){
  const[Data,setData]=useState([]);
  let [riskPriority, setriskPriority] = useRecoilState(riskPriorityAtom);
  let [likehood, setlikehood] = useRecoilState(likehoodAtom);
  let [impact, setimpact] = useRecoilState(impactAtom);
  let [control] = useRecoilState(controlAtom);
  let [inherentRiskDetermination] = useRecoilState(inherentRiskDeterminationAtom);
  let [controlDetermination] = useRecoilState(controlDeterminationAtom);
  let [residualRiskDetermination] = useRecoilState(residualRiskDeterminationAtom);
  // dynamic data start
  const [rating_likehood_data,setrating_likehood_data]=useState([])
  const [control_rating_data,setcontrol_rating_data]=useState([])
  const [inherent_rating,setinherent_rating]=useState([])

  const routeParams = useParams();
  const navigate=useNavigate()

  // dynamic data end
const [status,setstatus]=useState("")
const [title,settitle] =useState("")
const [root_cause,setroot_cause]=useState("")
const [consequence,setconsequence]=useState("")
const [category,setcategory ]=useState("")
const [department,setdepartment]=useState("")
const [subDepartment,setsubDepartment]=useState("")
const [control_description,setcontrol_description]=useState("")
const [risk_owner,setrisk_owner]=useState("")
const [risk_champion,setrisk_champion] =useState("")
const [inherent_risk_rating_likehood,setinherent_risk_rating_likehood]=useState("")
const [inherent_risk_rating_impact,setinherent_risk_rating_impact]=useState("")
const [inherent_risk_rating_rating,setinherent_risk_rating_rating ]=useState("")
const [control_design_assessement,setcontrol_design_assessement]=useState("")
const [control_effectiveness_assessement,setcontrol_effectiveness_assessement ]=useState("")
const [overall_control_rating,setoverall_control_rating]=useState("")
const [residual_risk_scoring_likehood,setresidual_risk_scoring_likehood]=useState("")
const [residual_risk_scoring_impact,setresidual_risk_scoring_impact]=useState("")
const [residual_risk_scoring_score,setresidual_risk_scoring_score]=useState("")
const [residual_risk_rating_likehood,setresidual_risk_rating_likehood]=useState("")
const [residual_risk_rating_impact,setresidual_risk_rating_impact]=useState("")
const [residual_risk_rating_rating,setresidual_risk_rating_rating]=useState("")
const [risk_response,setrisk_response]=useState("") 
const [treatment_required,settreatment_required]=useState("no") 
const [action_plan,setaction_plan]=useState("")
const [action_plan_owner,setaction_plan_owner]=useState("")
const [implementation_date,setimplementation_date]=useState("")
const [File,setFile] = useState("")
const [Risk_Data,setRisk_Data]=useState([])
const [initial_data,setinitial_data]=useState([])
const [File_Name,setFile_Name] = useState('')
const ActiveUser = useRecoilValue(activeUserAtom);




// const params=useParams
    const handlestatus = (e)=>{
      setstatus(e.target.value)
    }
    const handletitle=(e)=>{
      settitle(e.target.value)
    }
    const handleroot_cause=(e)=>{
      setroot_cause(e.target.value)
    }
    const  handlecategory=(e)=>{
      setcategory(e.target.value)
    }

    const  handleSubDepartment=(e)=>{
      setsubDepartment(e.target.value)
    }

    
   const handlecontrol_description=(e)=>{
    setcontrol_description(e.target.value)
   }
    const handleimplementation_date=(e)=>{
      console.log(e);
      setimplementation_date(e)
      // setimplementation_date(e.target.value)
    }
    function handleEndDateBlur() {
      const currentDate = new Date();
      const enteredDate = new Date(Date.parse(start_date));
      const enddate = enteredDate(Date.parse(end_date));
  
      if (enteredDate < currentDate) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
        setEnd_Date("")
      }else  if (enddate < currentDate) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
        setEnd_Date("")
      }
    }
    const handlerisk_owner = (e)=>{
      setrisk_owner(e.target.value)
    }
    const  handlerisk_champion=(e)=>{
      setrisk_champion(e.target.value)
    }
    useEffect(() => {
      // action on update of movies
      fetch_rating();
      // fetch_residual_rating();
     
    }, [inherent_risk_rating_likehood, inherent_risk_rating_impact,residual_risk_rating_likehood,residual_risk_rating_impact,control_design_assessement,control_effectiveness_assessement]);

    useEffect(()=>{fetch_control_rating()}, [control_design_assessement, control_effectiveness_assessement]);

    useEffect(() => {
      fetch_residual_rating();
    }, [inherent_risk_rating_rating, overall_control_rating]);

    const  handleinherent_risk_rating_likehood=(e)=>{
      setinherent_risk_rating_likehood(e.target.value);     
    }
    
    const  handleinherent_risk_rating_impact = (e)=>{
      setinherent_risk_rating_impact(e.target.value,);
    }

    const  handlecontrol_effectiveness_assessement=(e)=>{
      setcontrol_effectiveness_assessement(e.target.value)
    }

    const handlecontrol_design_assessement =(e)=>{
      setcontrol_design_assessement(e.target.value)
    }
    const handlerisk_response=(e)=>{
      setrisk_response(e.target.value)
    }
    const handletreatment_required=(e)=>{
      settreatment_required(e.target.value);
      if(e.target.value == 'no'){
        setaction_plan("");
        setaction_plan_owner("");
        setimplementation_date("");
      }
         
    }
   const handlefile_attachment = (e) => {
    const file=e.target.files[0]
    setFile(file)
    setFile_Name(file.name?file.name:'')
   }
    const handleaction_plan=(e)=>{
      setaction_plan(e.target.value)
    }
    const handleaction_plan_owner=(e)=>{
      setaction_plan_owner(e.target.value)
    }

    const addNewRisk = (e) => {
          const formData = new FormData();
          formData.append("file", File);
          formData.append("status", status);
          formData.append("title", title);
          setsubDepartment
          formData.append("department_id", initial_data.department_id);
          formData.append("sub_department", subDepartment);
          formData.append("root_cause", root_cause);
          formData.append("consequence", consequence);
          formData.append("category", category);
          formData.append("function_owner", department);
          formData.append("risk_owner", risk_owner);
          formData.append("risk_champion", risk_champion);
          formData.append("inherent_risk_rating_likehood", inherent_risk_rating_likehood);
          formData.append("inherent_risk_rating_impact", inherent_risk_rating_impact);
          formData.append("inherent_risk_rating_rating", inherent_risk_rating_rating);
          formData.append("control_description", control_description);
          formData.append("control_design_assessement", control_design_assessement);
          formData.append("control_effectiveness_assessement", control_effectiveness_assessement);
          formData.append("overall_control_rating", overall_control_rating);
          formData.append("residual_risk_scoring_score", residual_risk_rating_rating);
          formData.append("risk_responses", risk_response);
          formData.append("treatment_required", treatment_required);
          formData.append("action_plan", action_plan);
          formData.append("action_plan_owner", action_plan_owner);
          formData.append("implementation_date", implementation_date);
          formData.append("file_name", File_Name);
          formData.append("review_status", initial_data.review_status);

    
          axios.post(API_URL + `/risk_register/department_id/${routeParams.id}`,formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
          })
          .then((success) => {
            postData(success.data.id);
          })
          .catch((error) => {
            console.log(error);
          });
    }
   
    const toast = useRef(null);

    let postData=(parent_id=null)=>{
        if (postData.length) {
          // Show an error message to the user
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
          return;
        }
        const formData = new FormData();
        formData.append("status", initial_data.status);
        formData.append("title", initial_data.title);
        formData.append("department_id", initial_data.department_id);
        formData.append("sub_department", subDepartment);
        formData.append("parent_id", parent_id||'');
        formData.append("root_cause", initial_data.root_cause);
        formData.append("consequence", initial_data.consequence);
        formData.append("category", initial_data.category);
        formData.append("function_owner", initial_data.department);
        formData.append("risk_owner", initial_data.risk_owner);
        formData.append("risk_champion", initial_data.risk_champion);
        formData.append("inherent_risk_rating_likehood", initial_data.inherent_risk_rating_likehood);
        formData.append("inherent_risk_rating_impact", initial_data.inherent_risk_rating_impact);
        formData.append("inherent_risk_rating_rating", initial_data.inherent_risk_rating_rating);
        formData.append("control_description", initial_data.control_description);
        formData.append("control_design_assessement", initial_data.control_design_assessement);
        formData.append("control_effectiveness_assessement", initial_data.control_effectiveness_assessement);
        formData.append("overall_control_rating", initial_data.overall_control_rating);
        formData.append("residual_risk_scoring_score", initial_data.residual_risk_scoring_score);
        formData.append("risk_responses", initial_data.risk_response);
        formData.append("treatment_required", initial_data.treatment_required);
        formData.append("action_plan", initial_data.action_plan);
        formData.append("action_plan_owner", initial_data.action_plan_owner);
        formData.append("implementation_date", initial_data.implementation_date);
        formData.append("file_name", initial_data.File_Name);
        formData.append("review_status", initial_data.review_status);

        axios.patch(API_URL+`/risk_register/${routeParams.id}/`,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
          
          }).then((success) => {
              setData(success)
              // navigate('/RiskAdd/'+parent_id ); 
              navigate('/Risk/'+initial_data.department_id ); 
              toast.current.show({ severity: 'success', summary: 'Success', detail: 'you have submitted', life: 3000 });
          //  setTimeout(()=>{navigate("/Risk/:id")},[1000])
            }).catch((err) => {
              toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
            })
         
      }
      // dynamic api start
      let likehood_data = ()=>{
        axios.get(API_URL+'/risk_matrix/').then((res) => {
        setrating_likehood_data(res.data)
          }).catch((err) => {
            // alert(err)
          })
      }

     
      const riskscore=residual_risk_scoring_likehood*residual_risk_scoring_impact;
     
      const fetch_rating=(e)=>{
       
        if(inherent_risk_rating_likehood && inherent_risk_rating_impact &&  inherent_risk_rating_likehood != 'Select' && inherent_risk_rating_impact != 'Select' ){
          let likehood =  inherent_risk_rating_likehood;
          let impact =  inherent_risk_rating_impact;
          let inherent_risk_rating = inherentRiskDetermination.filter(i => i.likehood == likehood && i.impact == impact).length ? inherentRiskDetermination.filter(i => i.likehood == likehood && i.impact == impact)[0]['score']:"";
          setinherent_risk_rating_rating(inherent_risk_rating);
          }else{
            setinherent_risk_rating_rating("")
          } 
      }
      const fetch_residual_rating=(e)=>{
  
        if(overall_control_rating && inherent_risk_rating_rating){
          
          let residula_risk_rating = residualRiskDetermination.filter(i => i.inherent == inherent_risk_rating_rating && i.control == overall_control_rating ).length ? residualRiskDetermination.filter(i => i.inherent == inherent_risk_rating_rating && i.control == overall_control_rating )[0]['score']:"";
            setresidual_risk_rating_rating(residula_risk_rating);
          }else{
            setresidual_risk_rating_rating("")

          }
      }
      const fetch_control_rating=(e)=>{
          if(control_design_assessement && control_effectiveness_assessement && control_design_assessement != 'Select' && control_effectiveness_assessement != 'Select')
        {
            let design = control_design_assessement;
            let effectiveness = control_effectiveness_assessement;
            
            let overall_control_rating = controlDetermination.filter(i=> i.design == design && i.effectiveness == effectiveness).length ? controlDetermination.filter(i=> i.design == design && i.effectiveness == effectiveness)[0]['overall_rating'] : "";
            setoverall_control_rating(overall_control_rating);
          }else{
            setoverall_control_rating("");
          }
      }
      const [Data1,setData1] =useState([])
      let department_data=()=>{
        var config = {
          method: 'get',
          url: API_URL+'/department/',
          headers: { 
            "Authorization":token
          }
        };
        axios(config)
        .then((res) => {
          setData1(res.data);
          // alert("Thankyou For Submit")
        }).catch((err) => {
        })
      }
      const [Datarisk,setDatarisk] =useState([])
      let risk_repo_data=()=>{
        var config = {
          method: 'get',
          url: API_URL+'/risk_repo/',
          headers: { 
            "Authorization":token
          }
        };
        axios(config)
        .then((res) => {
          setDatarisk(res.data);
        }).catch((err) => {
        })
      }

      async function risk_data(){
        let result=await fetch(API_URL+`/risk_register/${routeParams.id}/`);
        result=await result.json();
        setstatus(result.status)
        settitle(result.title);
        setroot_cause(result.root_cause);
        setcategory(result.category);
        setdepartment(result.function_owner);
        setsubDepartment(result.sub_department)
        setrisk_owner(result.risk_owner);
        setrisk_champion(result.risk_champion);
        setinherent_risk_rating_likehood(result.inherent_risk_rating_likehood);
        setinherent_risk_rating_impact(result.inherent_risk_rating_impact)
        setinherent_risk_rating_rating(result.inherent_risk_rating_rating);
        setcontrol_description(result.control_description);
        setcontrol_design_assessement(result.control_design_assessement);
        setcontrol_effectiveness_assessement(result.control_effectiveness_assessement);
        setoverall_control_rating(result.overall_control_rating);
        setresidual_risk_rating_rating(result.residual_risk_rating_rating);
        setrisk_response(result.risk_responses);
        setaction_plan(result.action_plan);
        setaction_plan_owner(result.action_plan_owner)
        setimplementation_date(result.implementation_date)
        settreatment_required(result.treatment_required)
        setRisk_Data(result)
        setinitial_data(result)
      }
      

      // dynamic api end
      useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate("/")
        }
        // likehood_data(),
        department_data()
       risk_repo_data()
       risk_data()
       }, [])


       useEffect(()=>{
        Sub_function(initial_data.department_id);
      },[department]);    
    
      const [SubFunctionListing, setSubFunctionListing] = useState([])
      let Sub_function = (selectedDepartment = '') => {
        axios.get(API_URL + `/subdepartment/?departments=${selectedDepartment}`)
          .then((res) => {
            setSubFunctionListing(res.data);
            console.log("Sub ===>", res.data)
          }).catch((err) => { })
      }

  return (
    <CRow>
      <Toast ref={toast} />
      <CCol className="" xs={12}> 
    
      <CCard className="p-3">
      <CCardHeader >
      {/* <span className="" style={{float:"right"}}> <Link to={`/Risk/${routeParams.id}`}><CButton  style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span> */}
          </CCardHeader>
          </CCard>
          </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={(event) => addNewRisk(event)}>
              <div className="mb-3">
                <CCol>
            <CFormLabel htmlFor="exampleFormControlInput1">Risk Status</CFormLabel>
              <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } value={status}  onChange={handlestatus} aria-label="Risk Status">
                <option>Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </CFormSelect>
              </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Risk Title</CFormLabel>
                  <CFormInput disabled={true} onChange={handletitle}
                  value={title}
                  name='title'
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="Risk Title"
                />
                 
                </CCol>
              </div>
              <div className="mb-3">
                <h6 className='text-center'>Risk Statement</h6>
              </div>
              <div className="mb-3">
                   <CCol > 
                <CFormLabel   htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } value={root_cause} onChange={handleroot_cause} id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                </CCol>
                </div>

                <div className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="exampleFormControlInput1">Sub Department</CFormLabel>
                      <CFormSelect disabled={Risk_Data.review_status === 'Accepted and Closed' || Risk_Data.review_status === 'Approved' || Risk_Data.review_status === 'Sended for Review'} value={subDepartment} onChange={handleSubDepartment}>
                        <option value="">Select</option>
                        {SubFunctionListing.map(i => (
                          <option key={i.name} value={i.name}>{i.name}</option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    </div>
 
              
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Risk category</CFormLabel>
                <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' }  value={category} onChange={handlecategory}  name='riskrespone' aria-label="Risk Status">
                  
                  <option>Select</option>
                  <option value="Governance">Governance</option>
                  <option value="Operational">Operational</option>
                  {/* <option value="Financial">Financial</option> */}
                  <option value="Legal & Regulatory">Legal & Regulatory</option>
                  <option value="Strategic">Strategic</option>
                  {/* <option value="Technology">Technology</option> */}
                  <option value="Commercial">Commercial</option>
               
                </CFormSelect>
             
                </CCol>
              </div>  
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Risk Owner</CFormLabel>
                  <CFormInput disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } onChange={handlerisk_owner} value={risk_owner}
                    name='riskowner'
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Risk Owner"
                  />
                </CCol>
              </div>

              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Risk Champion</CFormLabel>
                  <CFormInput disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } onChange={handlerisk_champion} value={risk_champion}
                  name='riskchampion'
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Risk Champion   "
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <h6 className='text-center'>Inherent Risk Rating</h6>
                </CCol>
              </div>
              <CCol>
              <CRow>
                   <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Likelihood</CFormLabel>

                    <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } onChange={handleinherent_risk_rating_likehood} name='likehood' value={inherent_risk_rating_likehood} aria-label="Risk Status">
                      <option>Select</option>
                      {likehood.map(i=>  <option key={i.name} value={i.name}>{i.name}</option>)}                
                    </CFormSelect>             
                  </CCol>

                 <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Impact</CFormLabel>
                    <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } onChange={handleinherent_risk_rating_impact} name='impact' value={inherent_risk_rating_impact} aria-label="Risk Status">
                      <option>Select</option>
                      {impact.map(i=>  <option key={i.name} value={i.name}>{i.name}</option>)}
                    </CFormSelect>
                  </CCol>

                 <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Rating</CFormLabel>
                    <p>{inherent_risk_rating_rating}</p>
                 </CCol>
              </CRow>
              </CCol>
              <div className="mb-4 mt-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Control Description</CFormLabel>
                  <br/>
                 <CFormTextarea disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } value={control_description} onChange={handlecontrol_description}  id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                </CCol>
              </div> 
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
      <CCard className="mb-4 ">
      <CCardBody>
          <CForm>
          <CRow>
            <CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Control Design Assessment</CFormLabel>
                <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } aria-label="Risk Status"  onChange={handlecontrol_design_assessement} value={control_design_assessement}>
                <option>Select</option>
                {
                    control.map((it)=>{ 
                      return(<option key={it.name} value={it.name}>{it.name}</option>)
                    })
                    }
  </CFormSelect>
                
              </div>  
              </CCol>
              <CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1" >Control Effectiveness Assessment</CFormLabel>
                <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' } aria-label="Risk Status"  onChange={handlecontrol_effectiveness_assessement} value={control_effectiveness_assessement}>
                <option>Select</option>
                {
                    control.map((it)=>{ 
                      return(<option key={it.name} value={it.name}>{it.name}</option>)
                    })
                    }
  </CFormSelect>
              </div> 
              </CCol>
              <CCol>
              <CFormLabel htmlFor="exampleFormControlInput1">Overall Control <br/> Rating</CFormLabel>
                
                <div className="mb-3 mt-2">
                  {overall_control_rating}    
                </div>

              </CCol>
             </CRow>
             
              <CRow> 
                  <CCol>
                  <div className="mb-3 mt-3">
                    <hr/>
                   <h6 >Residual Risk Rating:
                   <span className="m-3" style={{ color:"black", padding:10, textTransform: 'uppercase', fontWeight: 'bold', background: residual_risk_rating_rating? riskPriority.filter(i => i.rating == residual_risk_rating_rating )[0]['color'] || 'black' : ''}} >{residual_risk_rating_rating}</span>

                   </h6>
                   <hr/>
                  </div> 
                  </CCol>                                  
                  
              </CRow>
            
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Risk Responses</CFormLabel>
                <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed' || Risk_Data.review_status == 'Approved' || Risk_Data.review_status == 'Sended for Review' }  value={risk_response} onChange={handlerisk_response}  name='riskrespone' aria-label="Risk Status">
                <option>Select</option>
                <option value="1">Risk Acceptance</option>
                <option value="2">Risk Transfer</option>
                <option value="3">Risk Reduction</option>
                <option value="4">Risk Avoidance</option>
               
              </CFormSelect>
              </div> 
             
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Treatment Plan Required</CFormLabel>
                <CFormSelect disabled={Risk_Data.review_status == 'Accepted and Closed'}  value={treatment_required} onChange={handletreatment_required}  name='riskrespone' aria-label="Risk Status">
                <option>Select</option>
                <option value="Yes">Yes</option>             
                <option value="No">No</option>             
               
              </CFormSelect>
              </div> 
              {treatment_required == "Yes" && <> <div className="mb-3">
                <CFormLabel   htmlFor="exampleFormControlInput1">Action Plan</CFormLabel>
                 <CFormTextarea disabled={Risk_Data.review_status == 'Accepted and Closed'} onChange={handleaction_plan} value={action_plan}   rows="2"></CFormTextarea>
              </div>
               <div className="mb-3">
               <CFormLabel htmlFor="exampleFormControlInput1">Action Plan Owner</CFormLabel>
               <CFormInput disabled={Risk_Data.review_status == 'Accepted and Closed'} value={action_plan_owner } onChange={handleaction_plan_owner}
               name='actionplanowner'
                 type="text"
                 id="exampleFormControlInput2"
                 placeholder="Treatment Plan Owner"
               />
             </div>
             <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Implementation Date</CFormLabel>
                {/* <CFormInput  onChange={handleimplementation_date} value={implementation_date}
                  type="date"
                  id="exampleFormControlInput2"
                  placeholder="Implementation Date"
                /> */}
                
                <ReactDatePicker
  disabled={Risk_Data.review_status === 'Accepted and Closed'}
  className="date-picker"
  dateFormat="dd/MM/yyyy"
  showIcon
  selected={
    moment(implementation_date).isValid()
      ? new Date(Date.parse(implementation_date))
      : null
  }
  onChange={(date) => setimplementation_date(date)}
  isClearable
  placeholderText="dd/mm/yyyy"
  minDate={new Date()}
/>
              </div> 
              <div className="mb-3">
               <CFormLabel htmlFor="exampleFormControlInput1">File Attachment</CFormLabel>
               <CFormInput  onChange={handlefile_attachment}
                 type="file"
                 id="exampleFormControlInput2"
               />
             </div>
              </>
              }
             
             
             
            </CForm>
            </CCardBody>
      </CCard>
<CCardBody>
</CCardBody>
      </CCol>
      <div className='mb-3 d-flex justify-content-center'>
      <Button type='submit' style={{background:"#64748B"}} onClick={(event) => addNewRisk(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
              </div>
    </CRow>
  )
}

export default FormRisk

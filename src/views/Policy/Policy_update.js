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
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { getSecrets } from 'src/config';
import axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';
import { TabPanel, TabView } from 'primereact/tabview';
import Regulatory_Law from '../Regulatory_law/regulatry_law';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function PolicyUpdate(){
  const navigate=useNavigate()
    const params=useParams()
    const [Data1,setData1] =useState([])
    const [OptionSelect,setOptionSelect]=useState("select one or more options")
    const API_URL=getSecrets.API_URL
    const token=getSecrets.token()
    const [State,setState]=useState("Approved")
    const [Name,setName]=useState("")
    const [Departments,setDepartments]=useState("")
    const [Owner,setOwner]=useState("")
    const [Policy_Text,setPolicy_text]=useState("")
    const [File_Upload,setFile_Upload]=useState("")
    const [Approval_Date,setApproval_Date]=useState("")
    const [Policy_Edit,setPolicy_Edit]=useState("")
    const [File_Name,setFile_Name]=useState("")
    const [ReviewDate,setReviewDate] = useState("")

    const handlename=(e)=>{setName(e.target.value)}
    const handleowner=(e)=>{setOwner(e.target.value)}
    const handlepolicy_text=(e)=>{setPolicy_text(e.target.value)}
    const handlefile_name=(e)=>{setFile_Name(e.target.value)}
    const handleapproval_date=(e)=>{setApproval_Date(e.target.value)}
    const handlepolicy_edit=(e)=>{setPolicy_Edit(e.target.value)}
    let department_data=()=>{
      var config = {
        method: 'get',
        url: API_URL+'/department/',
        headers: { 
          "Authorization":token
        }
      };
        axios(config).then((res) => {
          setData1(res.data)
            }).catch((err) => {
            
            })
    }
       //popup
  const toast = useRef(null);

let postData=()=>{
  if (postData.length) {
    // Show an error message to the user
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
    return;
  }
  var reviewDate = new Date(ReviewDate);
  let _review_date = reviewDate.getFullYear() +"-"+(reviewDate.getMonth()+1)+"-"+ reviewDate.getDate();
  var aprovalDate = new Date(Approval_Date)
  let _aproval_date = aprovalDate.getFullYear() +"-"+(aprovalDate.getMonth()+1)+"-"+ aprovalDate.getDate();
    var formdata = new FormData();
    formdata.append("name", Name);
    formdata.append("policy_text", Policy_Text);
    formdata.append("owner", Owner);
    formdata.append("state", State);
    formdata.append("file_name", File_Name);
    formdata.append("file", File_Upload);
    formdata.append("date_approval", _aproval_date);
    formdata.append("policy_edit", Policy_Edit);
    formdata.append("review_date", _review_date);
    Departments.forEach(function(pk_value) {
      formdata.append("departments", pk_value);
    });
    
  axios.put(API_URL+`/policy/${params.id}/`, formdata, {
    headers: { 
      "Authorization":token,
    }
})
.then((response) => {
  toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
setTimeout(()=>{navigate("/policylist")},[1000])
})
.catch((error) => {
  toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
});
}
async function Policy_data(){
    let result=await fetch(API_URL+`/policy/${params.id}/`);
    result=await result.json();
    setName(result.name);
    setOwner(result.owner);
    setPolicy_text(result.policy_text)
    setFile_Name(result.file_name?result.file_name:'')
    setFile_Upload(result.file)
    setApproval_Date(new Date(Date.parse(result.date_approval)))
    setPolicy_Edit(result.policy_edit)
    setDepartments(result.departments)
    setReviewDate(new Date(Date.parse(result.review_date)));

   
  }
  function handleEndDateBlur() {
    const currentDate = new Date();
    const enteredDate = new Date(Date.parse(Approval_Date));
    const enddate = new Date (Date.parse(ReviewDate));
  
    if (enteredDate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    }else  if (enddate < currentDate) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a future date', life: 3000 });
      setEnd_Date("")
    }
  }
 
useEffect(() => {
    if(!localStorage.getItem('token')){
         navigate("/")
    }
department_data()
Policy_data()         
       }, [])
  return (
    <>
    <Toast ref={toast} />
     <CRow>
      <CCol>
      <CCard className="p-3">
      <CCardHeader >
      <h3  style={{fontWeight:400}}>Policy<span className="" style={{float:"right"}}> <Link to="/policylist"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
      </CCard>
      </CCol>
    </CRow>
    
    <CRow>
      <CCol xs={12}>
        <CCard className="p-3">
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput 
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
                     <MultiSelect filter key={Data1} placeholder={OptionSelect} style={{width:"100%"}} display="chip" optionLabel="name" optionValue="id" value={Departments}  options={Data1} onChange={(e)=>{setDepartments(e.target.value)}} itemTemplate={(option) =>  <div>{option.name}</div>}/>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Owner</CFormLabel>
                  <CFormInput 
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
                   <CFormTextarea onChange={handlepolicy_text}  value={Policy_Text}  rows="6"></CFormTextarea>
                   </CCol>
                   </div>
                   <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">File Name</CFormLabel>
                  <CFormInput 
                    onChange={handlefile_name}
                    value={File_Name}
                    type="text"
                    placeholder="File Name"
                  />
                </CCol>
              </div>
                   <div className='mb-3'>
                    <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">File Attachment</CFormLabel>
                  <CFormInput 
                    onChange={(e)=>setFile_Upload(e.target.files[0])}
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
            <Button type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
                    </div>
      </CCard>
<CCardBody>
</CCardBody>
      </CCol>
    </CRow>
    </>
  )
}
export default PolicyUpdate

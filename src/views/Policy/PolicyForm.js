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
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import MultiSelectTable from 'src/components/MultiSelectTable';

function Policy(){
  const navigate=useNavigate()
    const [Data1,setData1] =useState([])
    const [OptionSelect,setOptionSelect]=useState("Select one or more options")
    const API_URL=getSecrets.API_URL
    const token=getSecrets.token()
    const [State,setState]=useState("Draft")
    const [Name,setName]=useState("")
    const [Departments,setDepartments]=useState([])
    const [Owner,setOwner]=useState("")
    const [Policy_Text,setPolicy_text]=useState("")
    const [File_Upload,setFile_Upload]=useState("")
    const [Policy_Edit,setPolicy_Edit]=useState("")
    const [File_Name,setFile_Name]=useState("")
    const [ReviewDate, setReviewDate] = useState(null);
    const [ApprovalDate, setApprovalDate] = useState(null);
    const ActiveUser = useRecoilValue(activeUserAtom);

   
    
    const handlestate=(value)=>{
      setApproved(value)}
    const handlename=(e)=>{setName(e.target.value)}
    const handleowner=(e)=>{setOwner(e.target.value)}
    const handlepolicy_text=(e)=>{setPolicy_text(e.target.value)}
    const handlepolicy_edit=(e)=>{setPolicy_Edit(e.target.value)}
    const handlefile = (e)=>{
      const file = e.target.files[0];
      setFile_Upload(file)
      setFile_Name(file.name?file.name:'')
    }
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

  var reviewDate = new Date(ReviewDate);
  let _review_date = reviewDate.getFullYear() +"-"+(reviewDate.getMonth()+1)+"-"+ reviewDate.getDate();
  var aprovalDate = new Date(ApprovalDate)
  let _aproval_date = aprovalDate.getFullYear() +"-"+(aprovalDate.getMonth()+1)+"-"+ aprovalDate.getDate();
    var formdata = new FormData();
    formdata.append("file", File_Upload);
    formdata.append("name", Name);
    formdata.append("owner", Owner);
    formdata.append("state", State);
    formdata.append("policy_text", Policy_Text);
    formdata.append("file_name", File_Name);
    formdata.append("file", File_Upload);
    formdata.append("date_approval", _aproval_date);
    formdata.append("policy_edit", Policy_Edit);
    formdata.append("review_date", _review_date);
    Departments.forEach(function(pk_value) {
      formdata.append("departments", pk_value);
    });
    
  axios.post(API_URL+'/policy/', formdata, {
    headers: { 
      "Authorization":token,
    }
})
.then((response) => {
  if(response ){
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
    setTimeout(()=>{
      navigate("/policylist")
    },[1000])
  }
})
.catch((error) => {
  toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
});
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
       }, [])
       const handleReviewDateChange = (date) => {
        setReviewDate(date);
    
        // Check if approval date is set and is before the selected review date
        if (ApprovalDate && date < ApprovalDate) {
          setApprovalDate(date); // Set approval date to the selected review date
        }
      };
    
      const handleApprovalDateChange = (date) => {
        // Check if review date is set and is after the selected approval date
        if (ReviewDate && date > ReviewDate) {
          setReviewDate(date); // Set review date to the selected approval date
        }
    
        setApprovalDate(date);
      };
    
  return (
    <>
    <Toast ref={toast} />
     <CRow>
      <CCol>
      <CCard className="p-3">
      <CCardHeader >
      <h3  style={{fontWeight:400}}>Policy Repository<span className="" style={{float:"right"}}> <Link to="/policylist"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
      </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs={12}>
        <CCard className="p-3">
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <CCol>
          </CCol>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput 
                  required="required"
                    onChange={handlename}
                    type="text"
                    name='name'
                    placeholder="Name"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                     <MultiSelect filter value={Departments} key={Data1} placeholder={OptionSelect} style={{width:"100%"}} display="chip" optionLabel="name" optionValue="id" options={Data1.filter(i => {
                            if(ActiveUser.is_superuser){
                              return true
                            } else{

                              JSON.parse(ActiveUser.department).includes(i.id); 
                            }
                             
                             } )}  onChange={(e)=>{setDepartments(e.target.value)}} itemTemplate={(option) =>  <div>{option.name}</div>}/>
                    {/* <MultiSelectTable /> */}
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Owner</CFormLabel>
                  <CFormInput 
                    onChange={handleowner}
                    type="text"
                    placeholder="Owner"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                  <CCol >
                   <CFormLabel htmlFor="exampleFormControlInput1">Comment</CFormLabel>
                   <CFormTextarea onChange={handlepolicy_text} type='file' name='discription'  id="exampleFormControlTextarea1" rows="6"></CFormTextarea>
                   </CCol>
                   </div>
                   <div className='mb-3'>
                    <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">File Attachment</CFormLabel>
                  <CFormInput 
                    onChange={handlefile}
                    type="file"
                    name='name'
                    placeholder="Name"
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
                      selected={ApprovalDate}
                      onChange={handleApprovalDateChange}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
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
                      onChange={handleReviewDateChange}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                      minDate={ApprovalDate}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    </CCol>
                    </div>
                   
                  
                    {/* <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Policy Edit</CFormLabel>
                  <CFormInput 
                    onChange={handlepolicy_edit}
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
export default Policy

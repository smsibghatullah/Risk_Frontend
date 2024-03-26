import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
import { MultiSelect } from 'primereact/multiselect';

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
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'

var  DepartmentAdd = (prop) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [ Name,setName] =useState([])
  const [ slug,setslug] =useState("")
  const [Data,setData] =useState([])
  const navigate=useNavigate();
  var toDisable = prop.toDisable.map(i=>i.name);
  const handleName = (e) =>{
    setName(e.value)
    if (e.value === "") {
      setIsValid(false);
      setErrorMessage("Name field cannot be empty.");
  } else {
      setIsValid(true);
      setErrorMessage('');
      setName(e.value)
  }
  }
  const handleslug = (e) =>{
    setslug(e.target.value)
    if (e.target.value === "") {
        setIsValid(false);
        setErrorMessage("Name field cannot be empty.");
    } else {
        setIsValid(true);
        setErrorMessage('');
        setName(e.target.value)
    }
  }
  //popup
  const toast = useRef(null);

  const predefineDepartments = [
    {name:'Investment Management', items:['Investment Management', 'Business Development', 'Brokerage', 'Investment Banking', 'Operations', 'Finance / Treasury', 'Budgeting & Control', 'Legal', 'IT', 'Human Resource', 'Strategy','Risk' , 'Internal Audit', 'Administration','Compliance']},
    {name:'Finance Company', items:['Business Development', 'Customer Care', 'Product Development', 'Credit Function', 'Operations', 'Finance / Treasury', 'Budgeting & Control', 'Legal', 'IT', 'Human Resource', 'Strategy','Risk' , 'Internal Audit', 'Administration','Compliance']},
    {name:'Trading', items:['Sales', 'After Sales', 'Warehouse', 'Procurement', 'Operations', 'Finance / Treasury', 'Budgeting & Control', 'Legal', 'IT', 'Human Resource', 'Strategy','Risk' , 'Internal Audit', 'Administration','Compliance']},
    {name:'Services', items:['Business Development', 'Customer care', 'Operations', 'Finance / Treasury', 'Budgeting & Control', 'Legal', 'IT', 'Human Resource', 'Strategy','Risk' ,'Internal Audit', 'Administration','Compliance']},
    {name:'Manufacturing', items:[ 'Production', 'Sales', 'Procurement', 'Customer Care', 'Warehouse / Inventory' , 'Operations', 'Finance / Treasury', 'Budgeting & Control', 'Legal', 'IT', 'Human Resource', 'Risk Strategy', 'Internal Audit', 'Administration','Compliance']},
    {name:'Real Estate', items:['Development', 'Management/Maintenance', 'Investment Evaluation', 'Operations', 'Finance / Treasury', 'Budgeting & Control', 'Legal', 'IT', 'Human Resource', 'Strategy','Risk' , 'Internal Audit', 'Administration','Compliance']},
  ]


let postData=()=>{
  console.log(Name,slug)
  Name.forEach(item=>{
      axios.post(API_URL+'/department/',{
        name: item,
        slug: item
      }).then((success) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
          setData(success)
          if(!prop.ispopup){
            setTimeout(()=>{navigate("/Department")},[1000])
          }else{ 
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully updated', life: 3000 });
            setTimeout(()=>{prop.setVisible(false)},[1000])
           }
        }).catch((err) => {
          toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
        })
  });
   
  }

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
  }, [])

  return (
    <CRow>
       <Toast ref={toast} />
      <CCol className="" xs={12}> 
      {!prop.ispopup &&  <CCard className="p-3">
       
      <CCardHeader >
            <h3  style={{fontWeight:400}}> Department<span className="" style={{float:"right"}}> <Link to="/Department"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
         
          </CCard> }
          </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
         
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <div className="mb-3">
                <CCol xs="auto">
                  {/* <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel> */}
                  {/* <CFormInput onChange={handleName} 
                    type="text"
                    placeholder="Name"
                    className={isValid ? '' : 'is-invalid'}
                    required
                  /> */}
                   <div className="mb-3">
                {/* <CFormLabel htmlFor="exampleFormControlInput1">Select Department </CFormLabel>
                <CFormSelect  value={Name} onChange={handleName} name='riskrespone' aria-label="Risk Status">
                    <option>Select</option>
                    {
                      predefineDepartments.filter(f=>f.name == prop.industrySelected)[0]['items'].map(i=>  
                        <option value={i}>{i}</option>
                      )
                    }
                 
               
                </CFormSelect> */}
                <MultiSelect style={{width:'100%'}} display="chip" value={Name} onChange={handleName} options={predefineDepartments.filter(f=>f.name == prop.industrySelected)[0]['items'].filter(i=>{ 
                  return toDisable.findIndex(str => str == i) == -1  
                  
                  })}   placeholder="Select Department" maxSelectedLabels={3} className="w-full md:w-20rem" />
              </div> 
                   <CFormFeedback invalid>Please provide a valid Department.</CFormFeedback>
                </CCol>
              </div>
              
              
            </CForm>
            </CCardBody>

      <div className='mb-3 d-flex justify-content-center'>
      <Button type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
             </div>
      </CCard>
      </CCol>
    </CRow>
  )
}

export default DepartmentAdd

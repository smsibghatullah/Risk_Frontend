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
import { Toast } from 'primereact/toast';
import { MultiSelect } from 'primereact/multiselect';
import { getSecrets } from 'src/config';
import axios from 'axios';
import PolicyService from 'src/services/policy.service';

function Control_Objective_Form(){
  const navigate=useNavigate();
    const [Data1,setData1] =useState([])
    const [OptionSelect, setOptionSelect] = useState("select one or more options")
    const [policy_data, setpolicy_data] = useState([])
    const [Policy,setPolicy] = useState("")
    const API_URL=getSecrets.API_URL
    const token=getSecrets.token
    const [Discription,setDiscription]=useState("")
    const [Responsible_Person,setResponsible_Person]=useState("")
    const [Frequency,setFrequency]=useState("")
    const [Category,setCategory]=useState("")
    const [Title,setTitle] = useState("")

    const handletitle =(e)=>{setTitle(e.target.value)}
    const handlediscription=(e)=>{setDiscription(e.target.value)}
    const handleresponsible_person=(e)=>{setResponsible_Person(e.target.value)}
    const handlefrequency=(e)=>{setFrequency(e.target.value)}
    const handlecategory=(e)=>{setCategory(e.target.value)}
   
  //popup
  const toast = useRef(null);

  let postData=()=>{
    if (postData.length) {
      // Show an error message to the user
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      return;
    }
        axios.post(API_URL+'/controlobjective/',{
          title:Title,
          description: Discription,
          responsible_person: Responsible_Person,
          policy:Policy,
          frequency: Frequency || 1,
          category: Category
        }).then((success) => {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
            setData1(success)
            setTimeout(()=>{navigate("/Control_Objective_List")},[1000])
          }).catch((err) => {
            toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
          })
      }
 
      let policy_DATA =  (search = "") => {
        let api = new PolicyService;
        api.getAllPolicy(search).then((res) => { setpolicy_data(res.data); }).catch((err) => { });
      }
useEffect(() => {
    if(!localStorage.getItem('token')){
         navigate("/")
    }
    policy_DATA()
       }, [])
     
      
  return (
    <>
    <Toast ref={toast} />
    <CRow>
      <CCol xs={12}>
        <CCard className="p-3">
        <CCardHeader >
          <h3  style={{fontWeight:400}}>Control Objective<span className="" style={{float:"right"}}>
           <Link to="/Control_Objective_List">
           <CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
            <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput 
                  required
                    onChange={handletitle}
                    type="text"
                    name='Title'
                    placeholder="Title"
                  />
                </CCol>
              </div>
            <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                  <CFormInput 
                  required
                    onChange={handlediscription}
                    type="text"
                    name='description'
                    placeholder="Discription"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Responsible person</CFormLabel>
                  <CFormInput 
                  required
                    onChange={handleresponsible_person}
                    type="text"
                    name='name'
                    placeholder="Responsible person"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                        <CCol xs="auto">
                          <CFormLabel htmlFor="exampleFormControlInput1">Policy</CFormLabel>
                          <MultiSelect filter required pattern="[a-zA-Z0-9]+" key={policy_data} placeholder={OptionSelect} style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id" value={Policy} options={policy_data} onChange={(e) => { setPolicy(e.target.value) }} itemTemplate={(option) => <div>{option.name}</div>} />
                        </CCol>
                      </div>
              {/* <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Frequency</CFormLabel>
                  <CFormInput 
                    onChange={handlefrequency}
                    type="number"
                    placeholder="Frequency"
                  />
                </CCol>
              </div> */}
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                  <CFormSelect  onChange={handlecategory} aria-label="Default select example" >
                      <option>Select</option>
                      <option value="Operational">Operational</option>
                      <option value='Governance'>Governance</option>
                      <option value='Compliance'>Compliance</option>
                   </CFormSelect>
                </CCol>
              </div>
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
export default Control_Objective_Form

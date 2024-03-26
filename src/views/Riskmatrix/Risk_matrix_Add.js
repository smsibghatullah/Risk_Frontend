import {useState,React,useEffect,useRef} from 'react'
import { getSecrets } from "src/config";
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
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const API_URL = getSecrets.API_URL
function RiskMatrix(){
  const [ Likehood,setLikehood] =useState("")
  const [ Impact,setImpact] =useState("")
  const [Data,setData] =useState([])
  const [ Combine,setCombine] =useState("")
  const [ Score,setScore] =useState("")
  const [ Likehood_rate,setLikehood_rate] =useState("")
  const [ Impact_rate,setImpact_rate] =useState("")
  const [ Score_rate,setScore_rate] =useState("")


  const navigate=useNavigate();
  const handleLikehood = (e) =>{
    setLikehood(e.target.value)
  }
  const handleimpact = (e) =>{
    setImpact(e.target.value)
  }
  const handlecombine = (e) =>{
    setCombine(e.target.value)
  }
  const handlescore = (e) =>{
    setScore(e.target.value)
  }
  const handleilikehood_rate = (e) =>{
    setLikehood_rate(e.target.value)
  }
  const handleimpact_rate = (e) =>{
    setImpact_rate(e.target.value)
  }
  const handlescore_rate = (e) =>{
    setScore_rate(e.target.value)
  }

  //popup
  const toast = useRef(null);

let postData=()=>{
  if (postData.length) {
    // Show an error message to the user
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have accepted', life: 3000 });
    return;
  }
  console.log(Likehood,Impact,Combine,Score,Likehood_rate,Impact_rate,Score_rate)
    axios.post(API_URL+'/risk_matrix/',{
      likehood: Likehood,
      impact: Impact,
      combine:Combine,
      score:Score,
      likehood_rate:Likehood_rate,
      impact_rate:Impact_rate,
      score_rate:Score_rate
    }).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have accepted', life: 3000 });
        setData(success)
      }).catch((err) => {
        toast.current.show({ severity: 'error', summary: '', detail: 'Fill All Fields', life: 3000 });
      })
  }
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
    
  }, [])

  return (
    <CRow>
      <Toast ref={toast} />
      <CCol xs={12} className=""> 
     
      <CCard className="p-3">
      <CCardHeader >
      <h3  className=''>Risk Matrix<span className="" style={{float:"right"}}> <Link to="/Riskmatrix"><CButton style={{background:"#64748B",width:100,padding:10}}>Back</CButton></Link></span></h3>
          </CCardHeader>
          </CCard>
          </CCol>
          
      <CCol xs={12}>
        <CCard className="mb-4">
         
          <CCardBody>
            <CForm onSubmit={(event) => postData(event)}>
              <div className="mb-3">
              </div>
              <div className="mb-3">
                <CCol xs="auto">
               <CFormLabel htmlFor="exampleFormControlInput1">Likelihood</CFormLabel>
                   <CFormSelect onKeyPress={(e) => e.key === 'Enter' ? postData() : null}   value={Likehood} onChange={handleLikehood}  name='riskrespone' aria-label="Risk Status">
                  <option>Select</option>
                  <option  value="C">C</option>
                  <option  value="H">H</option>
                  <option  value="M">M</option>
                  <option  value="V">V</option>
                  <option  value="L">L</option>
              </CFormSelect>
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Impact</CFormLabel>
                  <CFormSelect  onKeyPress={(e) => e.key === 'Enter' ? postData() : null}   value={Impact} onChange={handleimpact}  name='riskrespone' aria-label="Risk Status">
                     <option>Select</option>
                     <option  value="C">C</option>
                <option  value="H">H</option>
                <option  value="M">M</option>
                <option  value="V">V</option>
                <option  value="L">L</option>
               
              </CFormSelect>
                </CCol>
              </div>

              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Combine</CFormLabel>
                  <CFormInput 
                  value={Combine}
                  onKeyPress={(e) => e.key === 'Enter' ? postData() : null} 
                  onChange={handlecombine}
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Combine    "
                  />
                  
                </CCol>
              </div>

              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Score</CFormLabel>
                  <CFormInput 
                  value={Score}
                  onKeyPress={(e) => e.key === 'Enter' ? postData() : null} 
                  onChange={handlescore}
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Score    "
                  />
                </CCol>
              </div>

              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Likehood Rate</CFormLabel>
                  <CFormInput 
                  value={Likehood_rate}
                  onKeyPress={(e) => e.key === 'Enter' ? postData() : null} 
                  onChange={handleilikehood_rate}
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Likehood Rate    "
                  />
                </CCol>
              </div>

              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Impact Rate</CFormLabel>
                  <CFormInput 
                  value={Impact_rate}
                  onKeyPress={(e) => e.key === 'Enter' ? postData() : null} 
                  onChange={handleimpact_rate}
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Impact Rate    "
                  />
                </CCol>
              </div>

              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Score Rate</CFormLabel>
                  <CFormInput 
                  value={Score_rate}
                  onKeyPress={(e) => e.key === 'Enter' ? postData() : null} 
                  onChange={handlescore_rate}
                    type="text"
                    id="p1asdjh ajksdh asjkhd asjkdha jkshd kasdh"
                    placeholder="Score Rate   "
                  />
                </CCol>
              </div>
            </CForm>
            </CCardBody>
            <div className='mb-3 d-flex justify-content-center'>
            <Button onKeyPress={(e) => e.key === 'Enter' ? postData() : null}  type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
              </div>
      </CCard>
      </CCol>
    </CRow>
  )
}

export default RiskMatrix

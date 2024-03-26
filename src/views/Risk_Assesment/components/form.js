import {useState,React,useEffect,useRef} from 'react'
import axios from 'axios';
import { getSecrets } from "src/config";
import { CCol, CRow,  CForm, CFormLabel,  CFormInput, CFormTextarea, CFormSelect } from '@coreui/react'
const API_URL = getSecrets.API_URL
const token = getSecrets.token()
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'

import RiskAssessmentService from 'src/services/RiskAssessment.service';
import { useSetRecoilState } from 'recoil';
import { departmentAtom } from 'src/_state/departmentAtom';

const RisAssesmentkForm = (props) => {
   
    const [ Id,setId] = useState("")

    const [ Department,setDepartment] = useState("")
    const handledepartment = (e) => { console.log("handledepartment",e.target.value); setDepartment(e.target.value) }    
   
    const [ Discription,setDiscription] = useState("")
    const handlediscription = (e) =>{ setDiscription(e.target.value) }

    const [ Category,setCategory] = useState("")
    const handleCategory = (e) =>{ setCategory(e.target.value) }

   
    const [ PreviousAssessment,setPreviousAssessment] = useState("")
    const handlePreviousAssessment = (e) =>{ setPreviousAssessment(e.target.value) }

    const [ DateofAssessment,setDateofAssessment] = useState("")
    const handleDateofAssessment = (e) =>{ setDateofAssessment(e.target.value) }

    const [ KRIReporting,setKRIReporting] = useState("")
    const handleKRIReporting = (e) =>{ setKRIReporting(e.target.value) }

    const [ KeyRiskIndicators,setKeyRiskIndicators] = useState("")
    const handleKeyRiskIndicators = (e) =>{ setKeyRiskIndicators(e.target.value) }

    const [ RiskAppetite,setRiskAppetite] = useState("")
    const handleRiskAppetite = (e) =>{ setRiskAppetite(e.target.value) }

    const [ RiskAppetiteStatement,setRiskAppetiteStatement] = useState("")
    const handleRiskAppetiteStatement = (e) =>{ setRiskAppetiteStatement(e.target.value) }

   
    const setGlobalDepartments = useSetRecoilState(departmentAtom);


    const [Departments,setDepartments] =useState([])
    let department_data=()=>{ 
      var config = {
        method: 'get',
        url: API_URL+'/department/',
        headers: { 
          'Authorization': token 
        },
      };
      axios(config).then((res) => { setGlobalDepartments(res.data); setDepartments(res.data); }).catch((err) => { })}  
  
    useEffect(() => {  department_data()  }, [])
 //popup
 const toast = useRef(null);

    let postData=()=>{
      if (postData.length) {
        // Show an error message to the user
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
        return;
      }
      const api = new  RiskAssessmentService();
      let data = {                    
                    "category":Category,
                    "risk_appetite_statement":RiskAppetiteStatement,
                    "description":Discription,
                    "responisble_department_id":Department,
                    "key_risk_indicators":KeyRiskIndicators,
                    "date_of_assessment":DateofAssessment,
                    "risk_appetite":RiskAppetite,
                    "kri_reporting":KRIReporting,
                    "previous_assessment":PreviousAssessment,
                  }
        if(props.UpdateData.id){
            data.id = props.UpdateData.id;
            api.updateRiskAssessment(data.id, data).then(res => {
              props.refreshDataTable();  
              toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
    
            }).catch(err => {
              toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
    
            });       

        }else{

            api.createRiskAssessment(data).then(res => {
              props.refreshDataTable();  
              toast.current.show({ severity: 'success', summary: 'Success', detail: '', life: 3000 });
    
            }).catch(err => {
              toast.current.show({ severity: 'info', summary: '', detail: 'Fill all the fields', life: 3000 });
    
            });          

        }
            
     
        }

       const setFromData=(data)=>{

          setCategory(data.category || ''),
          setRiskAppetiteStatement(data.risk_appetite_statement || ''),
          setDiscription(data.description || ''),
          setDepartment(data.responisble_department_id || ''),
          setKeyRiskIndicators(data.key_risk_indicators || ''),
          setDateofAssessment(data.date_of_assessment || ''),
          setRiskAppetite(data.risk_appetite || ''),
          setKRIReporting(data.kri_reporting || ''),
          setPreviousAssessment(data.previous_assessment || '')
        }

        useEffect(()=>{
          // console.log("UpdateData in Form => ", props.UpdateData);
          setFromData(props.UpdateData);
        }, [props.UpdateData])

    return(
      <>
      <Toast ref={toast} />
        <CForm onSubmit={(event) => postData(event)}>
        <CRow>
             
                          
             <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                    <CFormInput value={Category} onChange={handleCategory} />
             </CCol>

             <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Risk Appetite Statement</CFormLabel>
                    <CFormInput value={RiskAppetiteStatement} onChange={handleRiskAppetiteStatement}  />
            </CCol>
            <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                    <CFormInput value={Discription} onChange={handlediscription}  />
            </CCol>

             <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Responsible Department</CFormLabel>
                    <CFormSelect className='' onChange={handledepartment} aria-label="Default select example"  >
                          <option>Select</option>
                          {
                          Departments.map((item)=>{ 
                          return( <option key={item.id} value={item.id}>{item.name}</option> );
                              })
                          }
                    </CFormSelect>
             </CCol>
             </CRow>
                          <br/>
             <CRow>
             <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Key Risk Indicators</CFormLabel>
                    <CFormInput value={KeyRiskIndicators} onChange={handleKeyRiskIndicators} />
            </CCol>
           
           
            <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Risk Appetite</CFormLabel>
                    <CFormInput value={RiskAppetite} onChange={handleRiskAppetite} />
            </CCol>
            <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Date of Assessment</CFormLabel>
                    <CFormInput type='date' value={DateofAssessment} onChange={handleDateofAssessment} />
            </CCol>
            <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">KRI Reporting</CFormLabel>
                    <CFormInput value={KRIReporting} onChange={handleKRIReporting} />
            </CCol>
      
            </CRow>
                          <br/>
            <CRow>
            <CCol > 
                    <CFormLabel htmlFor="exampleFormControlInput1">Previous Assessment</CFormLabel>
                    <CFormInput value={PreviousAssessment} onChange={handlePreviousAssessment} />
            </CCol>
                      
          
        </CRow>
        </CForm>
        <CCol>
             <div className='mb-3 mt-4 d-flex justify-content-center'>
             <Button type='submit' style={{background:"#64748B"}} onClick={(event) => postData(event)}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
         </div>
             </CCol>
        </>
     )
}

export default RisAssesmentkForm;
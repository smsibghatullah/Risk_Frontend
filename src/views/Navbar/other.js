import {useState,React,useEffect} from 'react'
import { getSecrets } from "src/config";


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
} from '@coreui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import axios from 'axios';

function Other(){
    const[Show,setShow]=useState(true)
    const[ShowScop,setShowScop]=useState(true)
    const[Awaiting_Approval,setAwaiting_Approval]=useState(true)
    const[Title_control,setTitle_control]=useState(true)
    const[Other,setOther]=useState(true)
    const[Title,setTitle]=useState("")
    const[TitleData,setTitleData]=useState("")
    const[Category,setCategory]=useState("")
    const[Title_Of_Procedure,setTitle_Of_Procedure]=useState("")
    const[Summary_Of_Procedure,setSummary_Of_Procedure]=useState("")
    const[Risk_Control,setRisk_Control]=useState("")
    const [Work_Paper_Reffrence,setWork_Paper_Reffrence] =useState("")
    const[Design_assessment_result,setDesign_assessment_result]=useState("")
    const[Operating_assessment_result,setOperating_assessment_result]=useState("")
    const[Result_of_audit_procedures,setResult_of_audit_procedures]=useState("")
    const[Name,setName]=useState("")
    const[Assigned_To,setAssigned_To]=useState("")
    const[Discription,setDiscription]=useState("")
    const[Objectives,setObjectives]=useState("")
    const[File,setFile]=useState("")
    const[Data1,setData1]=useState([])
    const[Data,setData]=useState([])
    const API_URL = getSecrets.API_URL
    const [visible, setVisible] = useState(false)
    const navigate=useNavigate();
      const handlename=(e)=>{
      setName(e.target.value)
      }
      const handleassigned_to=(e)=>{
      setAssigned_To(e.target.value)
      }
      const handlediscription=(e)=>{
      setDiscription(e.target.value)
      }
      const handleobjectives=(e)=>{
      setObjectives(e.target.value)
      }
      const handleCategory=(e)=>{
        setCategory(e.target.value)
      }
      const handletitle_of_procedure=(e)=>{
        setTitle_Of_Procedure(e.target.value)
      }
      const handlesummary_of_producer=(e)=>{
          setSummary_Of_Procedure(e.target.value)
      }
      const handlerisk_control=(e)=>{
          setRisk_Control(e.target.value)
      }
      const handlework_paper=(e)=>{
        setWork_Paper_Reffrence(e.target.File[0])
      }
      const handledesign_assessment=(e)=>{
        setDesign_assessment_result(e.target.value)
      }
      const handleoperating_assessment=(e)=>{
        setOperating_assessment_result(e.target.value)
      }
      const handleresult_audit_proceder=(e)=>{
        setResult_of_audit_procedures(e.target.value)
      }
      // const handlefile_name=(e)=>{
      //   setFile(e.target.value)
      // }
  console.log(params)
  let getdata = ()=>{
      axios.get(API_URL+`/auditengagement/${params.id}/`).then((res) => {
      console.log(res)
      setData(res.data)
         console.log(setData)
        }).catch((err) => {
        })
    }
    let  get_Data=()=>{
      axios.get(API_URL+`/auditengagement/`).then((res) => {
        console.log(res)
        setTitleData(res.data)
          
          }).catch((err) => {
          })
    }
   let postData=()=>{
       axios.patch(API_URL+`/auditengagement/${params.id}/`,{
           category:Category,
           title_of_procedure:Title_Of_Procedure,
           summary_of_procedure:Summary_Of_Procedure,
           design_assessment_result:Design_assessment_result,
           operating_assessment_result:Operating_assessment_result,
           audit_process_result:Result_of_audit_procedures
        }).then((success) => {
           console.log(success);
           setData1(success)
        }).catch((err) => {
           
        })
        var formdata = new FormData();
        formdata.append("content", Work_Paper_Reffrence);
        formdata.append("file_name", File);
        formdata.append("ticket",Title );
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8000/auditengagement_attachment/", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error'))
     }
    
    
     useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate("/")
      }
    postData()
    getdata()
    setAwaiting_Approval()
    setShow()
    get_Data()
    setTitle_control()
   
    }, []) 

  return (
    <CForm >
            
            <div className="mb-3">
            <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormSelect onChange={(e)=>setTitle(e.target.value)}  aria-label="Risk Status" >
                <option>Select</option>
                {
TitleData.length > 0 && TitleData.map((item)=>{ return(
                <option  value={item.id}>{item.name}</option>
              
                )
              })
              }
              </CFormSelect>
                </CCol>
            </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
                  <CFormInput onChange={handletitle_of_procedure}
                    type="text"
                    placeholder="Title Of Procedure"
                  />
                </CCol>
            </div>
              <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Source Of Procedure</CFormLabel>
                <CFormInput onChange={handletitle_of_procedure}
                    type="text"
                    placeholder="Title Of Procedure"
                  />
                  </CCol>
            </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Work Performed</CFormLabel>
                  <CFormInput 
                    type="text"
                    placeholder="Summary Of Procedure"
                  />
                </CCol>
            </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Tagging To Risk / Control </CFormLabel>
                  <CFormSelect  onChange={handlerisk_control}  aria-label="Default select example" >
                      <option>Select</option>
                  
                   </CFormSelect>
                </CCol>
            </div>
              <div className="mb-3">
              <CCol >
                   <CFormLabel htmlFor="exampleFormControlInput1">Results Of The Procedure</CFormLabel>
                   <CFormSelect  onChange={handleresult_audit_proceder} className="mb-3" aria-label="Large select example">
                  <option>Select</option>
                  <option value="Effective">satisfactory</option>
                  <option value="noneffective">non-satisfactory</option>
                </CFormSelect>
                   </CCol>
                  </div>
                  <div className="mb-3">
                <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">File Name</CFormLabel>
                <CFormInput onChange={(e)=>setFile(e.target.value)}
                    type="text"
                    placeholder="File Name"
                  />
                  </CCol>
            </div>
                   <div className="mb-3">
                <CCol xs="auto">
               <label for="formFile" class="form-label">Attachment Of Work Paper </label>
               <CFormInput
               type='file'
               onChange={(e)=>setWork_Paper_Reffrence(e.target.files[0])}
               multiple
               />
                </CCol>
                   </div>  
            </CForm>
            
  )
}

export default Other

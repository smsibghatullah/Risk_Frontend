import {useState,React,useEffect,useRef} from 'react'
import axios from 'axios';
import { getSecrets } from "src/config";
import { CCol, CRow,  CButton, CForm, CFormLabel,  CFormInput, CFormTextarea, CFormSelect ,CFormFeedback} from '@coreui/react'
const API_URL = getSecrets.API_URL
const token=getSecrets.token
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { useRecoilState, useRecoilValue } from 'recoil';
import { departmentAtom } from 'src/_state/departmentAtom';
import { MultiSelect } from 'primereact/multiselect';
import UsersService from 'src/services/users.service';
import { InputText } from 'primereact/inputtext';
import CompanySetupService from 'src/services/Companysetup.service';
import { Dropdown } from 'primereact/dropdown';


const UserForm = (props) => {
  const  _departmentAtom = useRecoilValue(departmentAtom)
    const [CompanyDomain,setCompanyDomain] = useState([])
    const [Data,setData] =useState([])
    const [PermissionsList, setPermissionsList] = useState([]);

    const [ FormSubmitStautus,setFormSubmitStautus] =useState(false)

    const [ FirstName,setFirstName] =useState("")
    const [ ErrorFirstName,setErrorFirstName] =useState("")
    const handleFirstName = (e) =>{ setFirstName(e.target.value) }

    const [ LastName,setLastName] =useState("")
    const [ ErrorLastName,setErrorLastName] =useState("")
    const handleLastName = (e) =>{ setLastName(e.target.value) }

    const [ Email,setEmail] =useState("")
    const [ ErrorEmail,setErrorEmail] =useState("")
    const handleEmail = (e) =>{ setEmail(e.target.value) ;
    }

    const [ UserName,setUserName] =useState("")
    const [ ErrorUserName,setErrorUserName] =useState("")
    const handleUserName = (e) =>{ setUserName(e.target.value) }   

    const [ Password,setPassword] =useState("")
    const [ ErrorPassword,setErrorPassword] =useState("")
    const handlePassword = (e) =>{ setPassword(e.target.value) }

    const [ ConfirmPassword,setConfirmPassword] =useState("")
    const [ ErrorConfirmPassword,setErrorConfirmPassword] =useState("")
    const handleConfirmPassword = (e) =>{ setConfirmPassword(e.target.value) }

    const [ Permission,setPermission] =useState([])
    const [ Department,setDepartment] =useState([])
    const [ UserTypes,setUserTypes] = useState([{id:'Head', name:'Head'}, {id:'Basic', name:"Basic"}, {id:'Department', name:"Department"}]) 
    const [ SelectedUserTypes,setSelectedUserTypes] = useState()
    const [ ErrorPermission,setErrorPermission] =useState("")
    const handlePermission = (e) =>{ 
      setPermission(e)
     }

  const getGroups = ()=>{
    const api = new UsersService;
    api.getAllGroups().then(res =>{

      setPermissionsList(res.data);

    }).catch(error => {})
  }
  let company_data=(search = "")=>{ 
    let api = new CompanySetupService;
    api.getAllCompany(search).then((res) => { setCompanyDomain(res.data[0]['company_domain']); }).catch((err) => { });
    }
  useEffect(()=>{
    console.log("setDepartment", props.userData.department ?JSON.parse(props.userData.department): [] )
    setFirstName(props.userData.first_name)
    setLastName(props.userData.last_name)
    setEmail(props.userData.email)
    setSelectedUserTypes(props.userData.usertype??"")
    setUserName(props.userData.username)    
    setDepartment(props.userData.department ?JSON.parse(props.userData.department): [])    
    props.userData.groups ? setPermission(props.userData.groups.map(i=>i.id)) : '';

    }, [props.userData]);

  useEffect(()=>{
    getGroups();
    company_data()
  }, []);

 //popup
 const toast = useRef(null);
 const [isValid, setIsValid] = useState(true);
 const [errorMessage, setErrorMessage] = useState('');
 const [Match_Password,setMatch_Password] = useState(false)
 const [CurrentUser,setCurrentUser] = useState({})

 const createUser=(data)=>{
  setFormSubmitStautus(true);
  FirstName? '' : setErrorFirstName("first name is required");
  if(!FirstName && !LastName && !Email &&  !UserName && !Password && !ConfirmPassword ){
    toast.current.show({ severity: 'warn', summary: 'Warn', detail: 'Plz fill all fields', life: 3000 });
  }
  let domain = CompanyDomain;
  let email = Email;
  let useremail;
  if (CompanyDomain && Email) {
   useremail =`${email}@${domain}`;
  }
  let formData = {
                  first_name:FirstName,
                  last_name:LastName,
                  groups:Permission,
                  department: (SelectedUserTypes == 'Head' || SelectedUserTypes == 'Basic' )? JSON.stringify(_departmentAtom.map(i=>i.id)) :JSON.stringify(Department),
                  email:useremail, 
                  username:UserName, 
                  password:Password,
                  usertype:SelectedUserTypes
                }
     setCurrentUser(formData);
  let api = new UsersService;
  if(props.userData.id){

    formData['id'] = props.userData.id
    api.updateUser(formData)
    .then(res=>{
     
      props.refresh();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
    }).catch(error=>{
      console.log("error : ", error)
      if(error.code == "ERR_BAD_REQUEST"){
        toast.current.show({ severity: 'warn', summary: 'Warn', detail: 'Plz check All fields', life: 3000 });
          setIsValid(false);
          setErrorMessage("Name field cannot be empty.");
   
      } else {
        setIsValid(true);
        setErrorMessage('');
        setPermission(e.target.value)
    }
    })

  }else{

    api.createUser(formData)
    .then(res=>{
      let user = {};
      user = res.data.user;
      console.log("===>", user);
      updateCreatedUser(user);
      // props.refresh();
    }).catch(error=>{
      console.log("error : ", error)
      if(error.code == "ERR_BAD_REQUEST"){
          setIsValid(false);
          setErrorMessage("Email field cannot be empty.");
      } else {
        setIsValid(true);
        setErrorMessage('');
        setPermission(e.target.value)
    }
    })

  }
 
 }

 const updateCreatedUser = (data)=>{
  FirstName? '' : setErrorFirstName("first name is required");
  if(!FirstName && !LastName && !Email &&  !UserName && !Password && !ConfirmPassword ){
    toast.current.show({ severity: 'warn', summary: 'Warn', detail: 'Plz fill all fields', life: 3000 });
  }
  let domain = CompanyDomain;
  let email = Email;
  let useremail;
  if (CompanyDomain && Email) {
   useremail =`${email}@${domain}`;
  }
  let formData = {
    id : data.id,
    first_name:FirstName,
    last_name:LastName,
    groups:Permission,
    department: (SelectedUserTypes == 'Head' || SelectedUserTypes == 'Basic' )? JSON.stringify(_departmentAtom.map(i=>i.id)) :JSON.stringify(Department),
    email:useremail, 
    username:UserName, 
    password:Password,
    usertype:SelectedUserTypes
  }

  let api = new UsersService;
  console.log("udapte ====>", data, formData);
  formData['id']= data.id
    api.updateUser(formData)
    .then(res=>{
     
      props.refresh();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
    }).catch(error=>{
      console.log("error : ", error)
      if(error.code == "ERR_BAD_REQUEST"){
        toast.current.show({ severity: 'warn', summary: 'Warn', detail: 'Plz check All fields', life: 3000 });
          setIsValid(false);
          setErrorMessage("Name field cannot be empty.");
   
      } else {
        setIsValid(true);
        setErrorMessage('');
        setPermission(e.target.value)
    }
    })

 }

 const countryTemplate = (option) => {
  let  str = option.name.replaceAll("_", " ")
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return (
      <div className="flex align-items-center">
          <div>{str}</div>
      </div>
    );
  };

  const handleUserType = (val)=>{
    setSelectedUserTypes(val);
    
    setDepartment("");
  }
   

    return(
      <>
      <Toast ref={toast} />
        <CForm onSubmit={(event) => createUser(event)}>
        <CRow>
             
               <CCol className='mb-3'> 
                  <CFormLabel htmlFor="exampleFormControlInput1">First Name</CFormLabel>
                  <CFormInput required className='' value={FirstName} onChange={handleFirstName}  type="text"  placeholder="First Name"  />
               </CCol>

               <CCol className='mb-3'> 
                  <CFormLabel htmlFor="exampleFormControlInput1">Last Name</CFormLabel>
                  <CFormInput required className='' value={LastName} onChange={handleLastName}  type="text"  placeholder="Last Name"  />
               </CCol>
              
           
               <CCol className='mb-3'> 
                  <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                  <div style={{display:'flex',flexDirection:'row',width:'100%',borderRadius:20}}>
                  <InputText style={{width:'100%'}} type='text'  value={Email} onChange={handleEmail} placeholder="email" disabled={props.userData.id} required/>
                  <span className="p-inputgroup-addon " style={{width:'50%'}}>@{CompanyDomain}</span>
                  </div>
                  {/* <CFormInput disabled={props.userData.id} required typeof='email' className={isValid ? '' : 'is-invalid'}  value={Email} onChange={handleEmail}   placeholder="Email"  />
                  <CFormFeedback invalid>Please provide a valid Email.</CFormFeedback> */}
               </CCol>
           
        </CRow>
        <CRow>
                  <CCol className='mb-3'> 
                      <CFormLabel htmlFor="exampleFormControlInput1">Username</CFormLabel>
                      <CFormInput disabled={props.userData.id} required className='' value={UserName} onChange={handleUserName}  type="text"  placeholder="Username"  />
                  </CCol>

                  <CCol> 
                      <CFormLabel htmlFor="exampleFormControlInput1">Password</CFormLabel>
                      <CFormInput required={!props.userData.id} className={Match_Password ? '' : 'Match_Password'} value={Password} onChange={handlePassword}  type="password"  placeholder="Password"  />
                      <CFormFeedback invalid>passwords don't match.</CFormFeedback>
                  </CCol>

                  <CCol> 
                      <CFormLabel htmlFor="exampleFormControlInput1">Comfirm Password</CFormLabel>
                      <CFormInput required={ !props.userData.id ||ConfirmPassword !== Password} className={Match_Password ? '' : 'Match_Password'} value={ConfirmPassword} onChange={handleConfirmPassword}  type="password"  placeholder="Comfirm Password"  />
                      <CFormFeedback invalid>passwords don't match.</CFormFeedback>
                  </CCol>

                 
        </CRow>
        <CRow>
              
              <CCol className='mb-3'>
                <CFormLabel>User Type</CFormLabel>
                <CFormSelect 
                
                 onChange={(e)=>{setSelectedUserTypes(e.target.value)}} value={SelectedUserTypes} className="mb-3" aria-label="Select User Type" >
                    <option value="">Select</option>
                    {UserTypes.map(i=>  <option value={i.name}>{i.name}</option>)}
                </CFormSelect>
              </CCol>

        </CRow>
        <CRow>
              
              <CCol className='mb-3'>
               <CFormLabel>Department</CFormLabel>
               <MultiSelect  disabled={SelectedUserTypes != "Department"?true:false} filter itemTemplate={countryTemplate}  placeholder="Department" style={{width:"100%"}} display="chip" optionLabel="name" optionValue="id" value={Department}  options={_departmentAtom} onChange={(e)=>{setDepartment(e.value)}} />
             
              </CCol>

        </CRow>
        <CRow>
              
              <CCol>
               <CFormLabel htmlFor="exampleFormControlInput1">Permissions</CFormLabel>
               <MultiSelect filter itemTemplate={countryTemplate}  placeholder="Permissions" style={{width:"100%"}} display="chip" optionLabel="name" optionValue="id" value={Permission}  options={PermissionsList} onChange={(e)=>{handlePermission(e.value)}} />
              </CCol>

        </CRow>
        <CCol>
             <div className='mb-3 mt-4 d-flex justify-content-center'>
                <Button type='submit' style={{background:"#64748B"}}  icon="pi pi-check" label="Confirm" className="mr-2"></Button>
             </div>
             </CCol>
        </CForm>
        
        </>
     )
}

export default UserForm;
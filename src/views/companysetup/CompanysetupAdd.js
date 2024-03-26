import React, { useState, useEffect, useRef } from 'react'
import { getSecrets } from "src/config";
import { TieredMenu } from 'primereact/tieredmenu';
import { Dialog } from 'primereact/dialog';
import "./company.css"
const API_URL = getSecrets.API_URL
const token = getSecrets.token();
import {
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CContainer,
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
import { DefaultValue, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeCompanyAtom } from 'src/_state/activeCompanyAtom';
import DepartmentAdd from '../Department/DepartmentAdd';
import Department from '../Department/Department';
import Sub_Add_Function from '../Sub_Function/sub_Function_Add';
import SubdepartmentService from 'src/services/Subdepartment.service';
import Departmentedit from '../Department/department.edit';
import Sub_edit_Function from '../Sub_Function/sub_function_edit';
import 'primeicons/primeicons.css';
import { Tooltip } from 'primereact/tooltip';
import { globalEventAtom } from 'src/_state/globalEventAtom';
import SubDepartmentList from './components/SubDepartmentList';


const CompanysetupAdd
  = () => {
    const navigate = useNavigate()
    const [OptionSelect, setOptionSelect] = useState("select one or more options")
    const [Name, setName] = useState("")
    const [industry, setindustry] = useState("")
    const [Departments, setDepartments] = useState([])
    const [business_type, setbusiness_type] = useState("")
    const [activeCompany, setactiveCompany] = useRecoilState(activeCompanyAtom)
    const [SelectDepartmentEdit, setSelectDepartmentEdit] = useState(false)
    const [SelectSubDepartmentEdit, setSelectSubDepartmentEdit] = useState(false)
    const [Company_Domain,setCompany_Domain] = useState("")
    const [Slide, setSlide] = useState(0)

    const menu = useRef(null);
    const [ItemData, setItemData] = useState({});
    const items =  [
        
        {
            label: 'Delete Department',
            // icon: 'pi pi-fw pi-power-off',
            command:(e)=>{ 
              delete_record(ItemData.id);
              console.log("==> Delete Department", ItemData) 
            }
        },
        {
          label: 'Add Sub Department',
          // icon: 'pi pi-fw pi-power-off',
          command:()=>{ 
            setSelectedDepartment(ItemData.id); 
            setVisibldSubDepartment(true);
            // console.log("==> Add Sub Department") 
          }
         },
         {
          label: 'Edit Sub Departments',
          // icon: 'pi pi-fw pi-power-off',
          command:()=>{       
            setSelectedDepartment(ItemData.id) 
            setVisibldSubDepList(true);    
            console.log(" ==> Show Sub Departments in popup") 
          }
         }
    ];

    const menuSub = useRef(null);
    const [ItemSubData, setItemSubData] = useState({});
    const itemsSub =  [        
        {
            label: 'Delete',
            // icon: 'pi pi-fw pi-power-off',
            command:(e)=>{ 
              delete_subdepartment(ItemSubData.id)
            }
        }       
    ];



    const handleName = (e) => {
      setName(e.target.value)
    }
    const handleindustry = (e) => {
      setindustry(e.target.value)
    }
    const handlecompanydomain = (e) => {
      setCompany_Domain(e.target.value)
    }
    const handlebusiness_type = (e) => {
      setbusiness_type(e.target.value)
    }
    const toast = useRef(null);
    const [Data1, setData1] = useState([])


    useEffect(() => { updateFormData() }, [activeCompany]);
    useEffect(() => { fetch_sub_deparments() }, [Data1])
    useEffect(() => { department_data() }, [SelectDepartmentEdit]);

    const updateFormData = () => {

      if (activeCompany && Object.keys(activeCompany).includes('name')) {
            Object.keys(activeCompany).includes('name') ? setName(activeCompany['name'] || '') : "";
            activeCompany['departments'] ? setDepartments(activeCompany['departments']) : "";
            Object.keys(activeCompany).includes('name') ? setindustry(activeCompany['industry']) : "";
            Object.keys(activeCompany).includes('name') ? setbusiness_type(activeCompany['business_type']) : "";
            Object.keys(activeCompany).includes('name') ? setCompany_Domain(activeCompany['company_domain']) : "";
      }

    }

    const setGlobalEvent = useSetRecoilState(globalEventAtom)
    let department_data = () => {

      var config = {
        method: 'get',
        url: API_URL + '/department/',
        headers: {
          "Authorization": token
        }
      };
      axios(config).then((res) => {
        setData1(res.data);

      }).catch((err) => {

      })
    }

    let delete_record = (id) => {
      axios.delete(API_URL + `/department/${id}/`).then((res) => {
        department_data();
        
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
      }).catch((err) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Failed to delete record' });
      })
    }

    let delete_subdepartment = (id) => {
      axios.delete(API_URL + `/subdepartment/${id}/`).then((res) => {
        fetch_sub_deparments();
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
      }).catch((err) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Failed to delete record' });
      })
    }

    const submitData = async () => {

      if (activeCompany.id) {
        axios.patch(API_URL + `/companysetup/${activeCompany.id}/`, {
          name: Name,
          industry: industry,
          company_domain:Company_Domain,
          departments: Data1.map(i => i.id),
          business_type: business_type
        }).then((success) => {
          setactiveCompany(success.data);
          department_data();
          setTimeout(() => {
            setGlobalEvent({ eventName: 'updatedepartment', message: '', data: {} })
          }, 2000);

          toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully updated', life: 3000 });
        }).catch((err) => {
          toast.current.show({ severity: 'info', summary: '', detail: 'Update all fields ', life: 3000 });
        })
      } else {
        axios.post(API_URL + '/companysetup/', {
          name: Name,
          industry: industry,
          company_domain:Company_Domain,
          departments: Data1.map(i => i.id),
          business_type: business_type
        }).then((success) => {
          department_data();
          setTimeout(() => {
            setGlobalEvent({ eventName: 'updatedepartment', message: '', data: {} })
          }, 2000);
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
        }).catch((err) => {
          toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 });
        })
      }
    };

    useEffect(() => {
      if (!localStorage.getItem('token')) { navigate("/") }
          department_data();

    }, []);
    //  ===============================================================Add Department Start
    const [Visible, setVisible] = useState(false);
    useEffect(() => { if (!Visible) { department_data(); } }, [Visible])
    //  ===============================================================Add Department Ends

    //  ===============================================================Add Sub-Department Start
    const [VisibldSubDepList, setVisibldSubDepList] = useState(false);
    const [VisibldSubDepartment, setVisibldSubDepartment] = useState(false);
    const [SelectedDepartment, setSelectedDepartment] = useState(false);
    const [SelectDepartmentlist, setSelectDepartmentlist] = useState(false)
    //  ===============================================================Add Sub-Department Ends

    const [SubDep, setSubDep] = useState([]);
    let fetch_sub_deparments = () => {
      let api = new SubdepartmentService; api.getAllSubdepartment().then((res) => { setSubDep(res.data); }).catch((err) => { });
    }
    useEffect(() => {
      if (!VisibldSubDepartment) {
        fetch_sub_deparments();
      }
    }, [VisibldSubDepartment, SelectSubDepartmentEdit, VisibldSubDepList]);
    const op = useRef(null);

    return (
      <>
        <Dialog header="Sub Department" visible={VisibldSubDepList} style={{ width: '50vw' }} onHide={() => setVisibldSubDepList(false)}>
          <SubDepartmentList sud_departments={SubDep} department_id={SelectedDepartment} setVisible={setVisibldSubDepList} ispopup={true} />
        </Dialog>
        <Dialog header="Department" visible={Visible}  style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <DepartmentAdd industrySelected={industry} toDisable={Data1} setVisible={setVisible} ispopup={true} ></DepartmentAdd>
        </Dialog>
        <Dialog header="Sub Department" visible={VisibldSubDepartment} style={{ width: '50vw' }} onHide={() => setVisibldSubDepartment(false)}>
          <Sub_Add_Function department={SelectedDepartment} setVisible={setVisibldSubDepartment} ispopup={true} ></Sub_Add_Function>
        </Dialog>
        <Dialog header="Department" visible={SelectDepartmentlist} style={{ width: '50vw' }} onHide={() => setSelectDepartmentlist(false)}>
          <Department setVisible={setSelectDepartmentlist} ispopup={true} />
        </Dialog>
        <Dialog header="Sub Department" visible={SelectSubDepartmentEdit} style={{ width: '50vw' }} onHide={() => setSelectSubDepartmentEdit(false)}>
          <Sub_edit_Function id={SelectedDepartment} setVisible={setSelectSubDepartmentEdit} ispopup={true} />
        </Dialog>
        <Dialog header="Department" visible={SelectDepartmentEdit} style={{ width: '50vw' }} onHide={() => setSelectDepartmentEdit(false)}>
          <Departmentedit id={SelectedDepartment} setVisible={setSelectDepartmentEdit} ispopup={true} />
        </Dialog>
        <CRow >
          <Toast ref={toast} />
          <ConfirmPopup />
          <CCol className="mb-4" xs={12}>

            <CCard className="p-3">
              <CCardHeader>
                <h3 style={{ fontWeight: 400 }}>Company Setup <span className="" style={{ float: "right" }}>
                </span></h3>
              </CCardHeader>
              <CCardBody>
                <CForm  >

                  <div className="mb-3">
                    <CCol xs="auto">
                      <CFormLabel htmlFor="exampleFormControlInput1">Company Name</CFormLabel>
                      <CFormInput value={Name} onChange={handleName}
                        type="text"
                        placeholder="Company Name"
                      />
                    </CCol>
                  </div>
                 
                  <div className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="exampleFormControlInput1">Company Industry</CFormLabel>
                      <CFormSelect value={industry} onChange={handleindustry} className="mb-3" aria-label="Large select example">
                        <option>Select Company</option>
                        <option value="Investment Management">Investment Management</option>
                        <option value="Finance Company">Finance Company</option>
                        <option value="Trading">Trading</option>
                        <option value="Services">Services</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Real Estate">Real Estate</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                  <div className="mb-5">
                    <CCol>
                      <CFormLabel>Company Domain</CFormLabel>
                      <CFormInput required disabled={activeCompany.id} value={Company_Domain} onChange={handlecompanydomain} type='email' placeholder='Company Domain'/>
                    </CCol>
                  </div>
                  <div className="mb-3 ">
                    <CCol>
                      <table>
                        <tr>
                          <th>Departments</th>
                          <th>Sub Departments</th>
                          <th></th>

                        </tr>

                        {Data1.map(i =>
                          <>
                            <tr >

                              <td>

                                {i.name}
                               
                              </td >
                              <td>
                              {SubDep.filter(f => f.department == i.id).map((s)=> {
                              return(
                                <>
                                  {s.name}
                                  <TieredMenu model={itemsSub} popup ref={menuSub} breakpoint="767px" />
                                   <br />
                                </>
                              )
                          })}
                                
                              </td>
                              <td>
                               
                                <TieredMenu model={items} popup ref={menu} breakpoint="767px" />

                                    <i className="custom-target-icon pi pi-ellipsis-v p-text-secondary p-overlay-badge"
                                    
                                      onClick={(e) => {setItemData(i);menu.current.toggle(e)}}
                                      // onClick={() => { setSelectedDepartment(s.id); setSelectedDepartment(s.id); setSelectSubDepartmentEdit(true) }}
                                      style={{ fontSize: '1rem', fontWeight: 'bold', color: "#64748B", backgroundColor: "white", padding: 10, cursor: 'pointer', borderRadius: 50 }}>
                                    </i>
                              </td>
                            </tr>
                           
                          </>
                        )}
                        <tr>
                              <td className='p-3' >
                                <span onClick={() => setVisible(true)} style={{ fontSize: '1rem', color: "white", backgroundColor: "#64748B", fontWeight: "bold", border: '1px solid #64748B', padding: 13, cursor: 'pointer', borderRadius: 5 }}>
                                {/* <Button  style={{ background: "#64748B" }} label="Add Department" className="mr-2"></Button> */}
                                <Tooltip target=".custom-target-icon" />
                                <i className="custom-target-icon pi pi-plus p-text-secondary p-overlay-badge"
                                  data-pr-tooltip="Add Department"
                                  data-pr-position="right"
                                  data-pr-at="right+5 top"
                                  data-pr-my="left center-2"
                                  
                                  style={{color:'white'}}
                                 >
                                </i>&nbsp;Department
                                </span>
                              </td>
                              <td> </td>
                              <td> </td>
                        </tr>
                      </table>
                    </CCol>
                  </div>
                </CForm>
              </CCardBody>
              <div className='mb-3 d-flex justify-content-center'>
                <Button type='submit' style={{ background: "#64748B" }} onClick={submitData} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
              </div>
            </CCard>
          </CCol>

        </CRow>
      </>
    )
  }
export default CompanysetupAdd

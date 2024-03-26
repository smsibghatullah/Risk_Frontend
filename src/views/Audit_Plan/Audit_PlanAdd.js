import { useState, React, useEffect, useRef } from 'react'
import { getSecrets } from "src/config";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { TabView, TabPanel } from 'primereact/tabview';
const API_URL = getSecrets.API_URL
const token = getSecrets.token()
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
import { MultiSelect } from 'primereact/multiselect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useNavigate,
  json
} from "react-router-dom";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { departmentAtom } from 'src/_state/departmentAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import jsPDF from 'jspdf';
import ReactDatePicker from 'react-datepicker';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import { globalEventAtom } from 'src/_state/globalEventAtom';

function Audit_Plan_Add() {
  let navigate = useNavigate()
  const ActiveUser = useRecoilValue(activeUserAtom);

  const params = useParams()
  const [OptionSelect, setOptionSelect] = useState("Select one or more options")
  const [Data, setData] = useState([])
  const [Id, setId] = useState("")
  const [Title, setTitle] = useState("")
  const [start_date, setStart_Date] = useState("")
  const [end_date, setEnd_Date] = useState("")
  const [Department, setDepartment] = useState([])
  const [DepartmentList, setDepartmentList] = useState([])
  const [Sub_Function, setSub_Function] = useState([])
  const [State, setState] = useState("Approved")
  const [Approved_commit, setApproved_Commit] = useState("")
  const alldepartmentList = useRecoilValue(departmentAtom) || [];
  const [activeIndex, setActiveIndex] = useState(0);
  // const setGlobatEvent = useSetRecoilState(globalEventAtom);

  const reportTemplateRef = useRef(null);

	const handleGeneratePdf = () => {
		const doc = new jsPDF({
			orientation: 'landscape',
	unit: 'in',
	format: [4, 2],
		});

		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');

		doc.html(reportTemplateRef.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
	};

  function generatePDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    const marginLeft = 20; // Left margin
  
    // Set "Dated: dd-mm-yyyy"
    const currentDate = new Date();
    const formattedDate =
      currentDate.getDate().toString().padStart(2, '0') +
      '-' +
      (currentDate.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      currentDate.getFullYear();
  
    var startDate = new Date(start_date);
    let _start_date =
      startDate.getDate().toString().padStart(2, '0') +
      '-' +
      (startDate.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      startDate.getFullYear();
    var endDate = new Date(end_date);
    let _end_date =
      endDate.getDate().toString().padStart(2, '0') +
      '-' +
      (endDate.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      endDate.getFullYear();
  
    doc.setFont('Trebuchet MS', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(0);
    doc.text('Audit Plan', pageWidth / 2, 20, {
      align: 'center',
    });
  
    doc.setFont('Trebuchet MS', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Dated: ' + formattedDate, pageWidth - marginLeft, 15, {
      align: 'right',
    });
  
    doc.setFont('Trebuchet MS', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Audit Plan: ' + Title, marginLeft, 40, {
      align: 'left',
    });
    doc.text('Start Date: ' + _start_date, marginLeft, 50, {
      align: 'left',
    });
    doc.text('End Date: ' + _end_date, marginLeft, 60, {
      align: 'left',
    });
  
    var startX = marginLeft;
    var startY = 75;
    var tableHeaders = ['Department', 'Proposed Schedule', 'Allocated Manager', 'Sub Functions'];
    var columnWidth = (pageWidth - marginLeft * 2) / tableHeaders.length;
    var rowHeight = 15; // Increased row height to avoid overlapping
    var cellPadding = 2;
  
    doc.setFillColor(100, 116, 139); // Set fill color [100, 116, 139]
    doc.setTextColor(255); // Set text color to white
    doc.setFont('Trebuchet MS', 'bold');
    doc.setFontSize(12);
  
    // Draw table header
    doc.rect(startX, startY, pageWidth - marginLeft * 2, rowHeight, 'F');
    for (let i = 0; i < tableHeaders.length; i++) {
      doc.text(tableHeaders[i], startX  + columnWidth / 2, startY + cellPadding + rowHeight / 2, { align: 'center' });
      doc.rect(startX, startY, columnWidth, rowHeight, 'S');
      startX += columnWidth;
    }
    startX = marginLeft;
    startY += rowHeight;
  
    Department.forEach((department, index) => {
      doc.setTextColor(0);
      doc.setFont('Trebuchet MS', 'normal');
      doc.setFontSize(12);
  
      const departmentName = alldepartmentList.find((i) => i.id === department)?.name || '';
      const proposedSchedule = getDepartmentItem(department, 'proposed_schedule') || '';
      const allocatedManager = getDepartmentItem(department, 'allocated_manager') || '';
      const subFunctions = (getDepartmentItem(department, 'sub_department') || []).map((i) => i.name).join("\n");
  
      doc.text(departmentName, startX + cellPadding, startY + cellPadding + rowHeight / 2);
      doc.rect(startX, startY, columnWidth, rowHeight, 'S');
      startX += columnWidth;
  
      doc.text(proposedSchedule, startX + cellPadding, startY + cellPadding + rowHeight / 2);
      doc.rect(startX, startY, columnWidth, rowHeight, 'S');
      startX += columnWidth;
  
      doc.text(allocatedManager, startX + cellPadding, startY + cellPadding + rowHeight / 2);
      doc.rect(startX, startY, columnWidth, rowHeight, 'S');
      startX += columnWidth;
  
      doc.text(subFunctions, startX + cellPadding, startY + cellPadding + rowHeight / 2);
      doc.rect(startX, startY, columnWidth, rowHeight, 'S');
      startX += columnWidth;
      
  
      startY += rowHeight;
      startX = marginLeft;
    });
  
    doc.save('Audit Plan.pdf');
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  const handleTabChange = (event) => {
    setActiveIndex(event.index);
  }
  const handletitle = (e) => {
    setTitle(e.target.value)
  }
  const handlestart_date = (e) => {
    setStart_Date(e.target.value)
  }
  const handleend_date = (e) => {
    setEnd_Date(e.target.value)
  }
  const handleapprovecommit = (e) => {
    setApproved_Commit(e.target.value)
  }



  const toast = useRef(null);

  let postData = () => {
    // if (!localStorage.getItem('token')) { navigate("/") }
    var startDate = new Date(start_date);
    let _start_date = startDate.getFullYear() +"-"+(startDate.getMonth()+1)+"-"+ startDate.getDate();
    var endDate = new Date(end_date)
    let _end_date = endDate.getFullYear() +"-"+(endDate.getMonth()+1)+"-"+ endDate.getDate();
    var formdata = new FormData();
    formdata.append("title", Title.trim());
    formdata.append("start_date", _start_date);
    formdata.append("end_date", _end_date);
    formdata.append("departments", JSON.stringify(SelectedDepartment));
    if(ActiveUser.is_superuser || ActiveUser.usertype == 'Head'){

      formdata.append("state", 'Approved');
    }

    
    axios.post(API_URL + '/annualplan/',formdata).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      setData(success)
      // setGlobatEvent({eventName:'refreshAuditPlan', search:""});
      setTimeout(() => { navigate("/Audit_Plan") }, [1000])
    }).catch((err) => { toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the fields', life: 3000 }); })
  }

  const [Data2, setData2] = useState([])
  let Sub_function = (selectedDepartment = '') => {
    axios.get(API_URL + `/subdepartment/?departments=${selectedDepartment}`)
      .then((res) => {
        setData2(res.data);
      }).catch((err) => { })
  }

  const fetchDepartments = () => {
    var config = {
      method: 'get',
      url: API_URL + '/department/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      setDepartmentList(res.data);
      if (params.id) { Data_View(); }
    }).catch((err) => {

    })
  }
  function handleEndDateBlur() {
    const currentDate = new Date();
    const enteredDate = new Date(Date.parse(start_date));
    const endDate = new Date(Date.parse(end_date));
  
    if (enteredDate < currentDate) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a future date',
        life: 3000
      });
      setEnd_Date("");
    } else if (endDate < currentDate) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a future date',
        life: 3000
      });
      setEnd_Date("");
    }
  }
  

  useEffect(() => {
    Sub_function();
    fetchDepartments();
  }, [])

  const [SelectedDepartment, setSelectedDepartment] = useState([])

  const updateSchedule = (department_id, proposed_schedule = null, allocated_manager = null, sub_department = null) => {
    let _datacount = SelectedDepartment.filter(i => i.department_id == department_id) || [];
    let final = []
    let _scope = {};

    if (_datacount.length > 0) {
      let _data = _datacount[0];
      _scope.department_id = department_id ?? _data.department_id
      _scope.proposed_schedule = proposed_schedule ?? _data.proposed_schedule
      _scope.allocated_manager = allocated_manager ?? _data.allocated_manager
      _scope.sub_department = sub_department ?? _data.sub_department

    } else {
      _scope.department_id = department_id
      _scope.proposed_schedule = proposed_schedule
      _scope.allocated_manager = allocated_manager
      _scope.sub_department = sub_department

    }

    let did_match = false;
    final = SelectedDepartment.map(i => {
      if (i.department_id == department_id) {
        did_match = true
        i.department_id = _scope.department_id
        i.proposed_schedule = _scope.proposed_schedule
        i.allocated_manager = _scope.allocated_manager
        i.sub_department = _scope.sub_department
      }
      return i
    });

    if (!did_match) final.push(_scope)
    setSelectedDepartment(final);
  }
  
  const getDepartmentItem = (department_id, item) => {
    if (SelectedDepartment.length > 0 && SelectedDepartment.filter(i => i.department_id == department_id).length > 0)
      return SelectedDepartment.filter(i => i.department_id == department_id)[0][item] ?? "";
  }

  async function Data_View() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
      headers: myHeaders,
    };
    let result = await fetch(API_URL + `/annualplan/${params.id}/`, requestOptions);
    result = await result.json();
    let _dep = JSON.parse(result.departments)
    let depart = _dep.map(i => i.department_id)
    setSelectedDepartment(_dep)
    setId(result.id);
    setTitle(result.title);
    setStart_Date(new Date(Date.parse(result.start_date)))
    setEnd_Date(new Date(Date.parse(result.end_date)))
    setDepartment(depart);
    setState(result.state)
    setApproved_Commit(result.approved_commit)
  }

  let update_Data = () => {
    var startDate = new Date(start_date);
    let _start_date = startDate.getFullYear() +"-"+(startDate.getMonth()+1)+"-"+ startDate.getDate();
    var endDate = new Date(end_date)
    let _end_date = endDate.getFullYear() +"-"+(endDate.getMonth()+1)+"-"+ endDate.getDate();

    var config = {
      method: 'put',
      url: API_URL + `/annualplan/${params.id}/`,
      headers: {
        "Authorization": token
      },
      data: {
        title: Title,
        start_date: _start_date,
        end_date: _end_date,
        state: "Comment for Changes",
        approved_commit: Approved_commit,
        departments: JSON.stringify(SelectedDepartment),
        subdepartments: Sub_Function
      }
    };
    axios(config).then((success) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have submitted', life: 3000 });
      setData(success)
      setTimeout(() => { navigate("/Audit_Plan") }, [1000])
    }).catch((err) => { toast.current.show({ severity: 'error', summary: '', detail: 'Fill all the field', life: 3000 }); })
  }

  const handleStartDateChange = (date) => {
    setStart_Date(date);

    // Check if end date is set and is before the selected start date
    if (end_date && date > end_date) {
      setEnd_Date(date); // Set end date to the selected start date
    }
  };

  const handleEndDateChange = (date) => {
    // Check if start date is set and is after the selected end date
    if (start_date && date < start_date) {
      setStart_Date(date); // Set start date to the selected end date
    }

    setEnd_Date(date);
  };

  const updateORCreate = (event)=>{
    
    if(params.id) { 
      update_Data(event);
    }else{ 
      postData(event);
    } 
  }

  return (
    <CRow>
     
     
      <Toast ref={toast} />
      <CCol   xs={12}>
        <CCard className="p-3">
          <CCardHeader >
            <h3 className='' style={{fontWeight:400}}>Risk Based Internal Audit Plans<span className="" style={{ float: "right" }}> {State == "Approved" &&
            <CButton onClick={()=>{State == "Approved" ?generatePDF():""}} style={{ background: "#64748B", width: 100, padding: 10 }}>PDF</CButton>} <Link to="/Audit_Plan"><CButton style={{ background: "#64748B", width: 100, padding: 10 }}>Back</CButton></Link></span></h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={(event) => { updateORCreate()  }}>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title </CFormLabel>
                  <CFormInput   required disabled={State == "Approved"  ? params.id : ""} value={Title} onChange={handletitle}
                    type="text"
                    placeholder="Title"
                  />
                </CCol>
              </div>
              <div className="mb-3">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Start Date</CFormLabel>
                    <ReactDatePicker
                          disabled={State == "Approved"  ? params.id : ""}
                          className="date-picker"
                          dateFormat="dd/MM/yyyy"
                          showIcon
                          selected={start_date}
                          onChange={handleStartDateChange}
                          onBlur={handleEndDateBlur}
                          isClearable
                          placeholderText="dd/mm/yyyy"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                    />

                </CCol>
              </div>
              
              <div className="mb-3">
                      <CCol xs="auto">
                        <CFormLabel htmlFor="exampleFormControlInput1">End Date</CFormLabel>
                        <ReactDatePicker
                          disabled={State == "Approved"  ? params.id : ""}
                          className="date-picker"
                          dateFormat="dd/MM/yyyy"
                          showIcon
                          selected={end_date}
                          onChange={handleEndDateChange}
                          placeholderText="dd/mm/yyyy"
                          minDate={start_date } 
                          onBlur={handleEndDateBlur}
                          isClearable
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                    />
                      </CCol>
                    </div>
              <div className="mb-5">
                <CCol xs="auto">
                  <CFormLabel htmlFor="exampleFormControlInput1">Scope</CFormLabel>
                  <MultiSelect disabled={State == "Approved"  ? params.id : ""} filter key={DepartmentList} placeholder={OptionSelect}
                    style={{ width: "100%" }} display="chip" optionLabel="name" optionValue="id"
                    value={Department} options={DepartmentList} onChange={(e) => {
                      let depart = e.target.value
                      setDepartment(depart);
                      Sub_function(depart.map(i => i).toString());
                    }} />
                </CCol>
              </div>

              {Department.length > 0 &&
                <div className="card m-3">
                  <CCol xs="auto">
                    <TabView scrollable activeIndex={activeIndex} onTabChange={handleTabChange}>
                      {Department.length && Department.map((department, index) => {
                        return (
                          <TabPanel key={department} header={alldepartmentList.filter(i => i.id == department)[0]?.name} style={{ marginTop: '20px' }}>
                            <div>

                              <div>

                                <div className="mb-3">
                                  <CCol xs="auto">

                                    <CFormLabel htmlFor="exampleFormControlInput1">Proposed Schedule of {alldepartmentList.filter(i => i.id == department)[0]?.name}</CFormLabel>
                                    <CFormSelect required disabled={State == "Approved"  ? params.id : ""} value={getDepartmentItem(department, "proposed_schedule")} onChange={(e) => {
                                            updateSchedule(department, e.target.value, null, null)
                                          }} aria-label="Risk Status" >
                                      <option>Select</option>
                                      <option value="Q1">Q1</option>
                                      <option value="Q2">Q2</option>
                                      <option value="Q3">Q3</option>
                                      <option value="Q4">Q4</option>
                                    </CFormSelect>
                                  </CCol>
                                </div>

                                <div className="mb-3">
                                  <CCol xs="auto">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Allocated Manager of {alldepartmentList.filter(i => i.id == department)[0]?.name}</CFormLabel>
                                    <CFormInput disabled={State == "Approved"  ? params.id : ""} value={getDepartmentItem(department, "allocated_manager")} onChange={(e) => {
                                      updateSchedule(department, null, e.target.value, null)
                                    }}
                                      type="text"
                                      placeholder="Allocated Manager"
                                    />
                                  </CCol>
                                </div>

                                <div>
                                  <CCol>
                                    <CFormLabel htmlFor="exampleFormControlInput1">Sub Functions </CFormLabel>
                                    <MultiSelect disabled={State == "Approved"  ? params.id : ""} style={{ width: '100%' }} value={getDepartmentItem(department, "sub_department")} onChange={(e) => {
                                      updateSchedule(department, null, null, e.target.value)
                                    }} options={Data2.filter(i=> i.department == department)} optionLabel="name" display="chip" placeholder="Select SubFunctions" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                  </CCol>
                                </div>

                              </div>

                            </div>
                          </TabPanel>
                        );
                      })}
                    </TabView>
                  </CCol>
                </div>
              }
              {( State == "Comment for Changes" || State === "Send For Approval" || State === "Approved" || State === "Draft") &&
                <div>
                  <CCol style={{display:'none'}}>
                    <CFormLabel>Comment For Approval</CFormLabel>
                    <CFormTextarea value={Approved_commit} disabled={State == "Approved"  ? params.id : ""} onChange={handleapprovecommit} rows={4}></CFormTextarea>
                  </CCol>
                </div>
              }
            </CForm>
          </CCardBody>
          <div className='mb-3 d-flex justify-content-center'>
            <Button type='submit' disabled={State == "Approved"  ? params.id : ""} style={{ background: State == "Send For Approval" ? "green" : "#64748B" }} onClick={(event) => { updateORCreate();  }} icon="pi pi-check" label={"Confirm"} className="mr-2"></Button>
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Audit_Plan_Add

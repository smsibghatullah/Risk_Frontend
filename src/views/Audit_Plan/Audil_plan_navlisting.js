import { React, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { getSecrets } from "src/config";
import { CCol, CRow } from "@coreui/react";
import { useNavigate, useParams } from "react-router";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Tooltip } from "primereact/tooltip";
import { activeUserAtom } from "src/_state/activeUserAtom";
import { AuditplanAtom } from "src/_state/AuditplanAtom";

const API_URL = getSecrets.API_URL
const token = getSecrets.token()

function Audit_Plan_Nav() {
  const params = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAudit, setselectedAudit] = useState(null);
  const [Data1, setData1] = useState([]);
  const [Audit, setAudit] = useState([]);
  const navigate = useNavigate();
  const globatEvent = useRecoilValue(globalEventAtom);
  const ActiveUser = useRecoilValue(activeUserAtom);
  const setAuditPlan = useSetRecoilState(AuditplanAtom);
  const AuditPlan = useRecoilValue(AuditplanAtom) || [];



  useEffect(()=>{
   
    // console.log("==> : Audit_Data", ActiveUser.department);
    // console.log("Data1 :", Data1[0].departments ? JSON.parse(Data1[0].departments) : "" );
  }, [Data1])

  useEffect(()=>{
    switch(globatEvent.eventName) {
      case 'refreshAuditPlan':
        Audit_Data();
        Audit_engagements()
          // code block
          break;
      default:
        // code block
    }
  }, [globatEvent]);

  let Audit_Data = () => {
    var config = {
      method: 'get',
      url: API_URL + '/annualplan/',
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => {
      console.log("Audit Plans ==>", res.data);
      let approvedStatePlans = res.data.filter(plan => plan.state === 'Approved' );
      // approvedStatePlans = approvedStatePlans.map(i=> {i.departments = JSON.parse(i.departments).map(i=>i.department_id); return i;});
      console.log("approvedStatePlans ==>", approvedStatePlans)
      setData1(approvedStatePlans); 
      setAuditPlan(res.data);
    }).catch((err) => { })
  }

  let Audit_engagements = (annual_plan_id) => {
    var config = {
      method: 'get',
      url: API_URL+'/auditengagement/',
      headers: { 
        "Authorization": token
      }
    };
    axios(config).then((res) => { 
      setAudit(res.data)
    }).catch((err) => {})
  }
  
  useEffect(() => {
    
    Audit_Data();
    Audit_engagements()

   
  }, [])

  const handle_engagements = (Audit_id = null, e) => {
    setselectedAudit(Audit_id);
    if(ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic'){

      navigate(`/Audtdetails/${Audit_id}/`);

    }else if(ActiveUser.usertype == 'Department'){
      
      navigate(`/AuditPrograms/${Audit_id}/`);

    }
  }

  // const sortedItems = AuditPlan.sort((a, b) => b.id - a.id);
  const sortedItems = AuditPlan.filter(plan => plan.state === 'Approved' );

  const handle_Audit = (Audit_id = null, e) => {
    setSelectedOption(Audit_id);
    navigate('/audit/'+Audit_id+'/');    
  }

  return (
    <>
      <CRow>
        <div>
          <CCol>
            {sortedItems.filter(i=> ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic' || true ).map((item) => { 
              return (
                <>
                {ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic' ? 
                <>
                <span className='risk'>
                    <option
                      key={item.id}
                      className={`mb-3 ${selectedOption === item.id ? "selected" : ""}`}
                      style={{ cursor: "pointer", color: "white", marginLeft: 48,padding:3 }}
                      onClick={(e) => handle_Audit(item.id, e)}
                      selected={item.id === selectedOption}
                    >
                      {item.title}
                    </option>   
                  </span>
                  
                  {Audit.filter(e => ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic' 
                  // || JSON.parse(ActiveUser.department).includes(e.department)
                   )
                  .filter(appr => appr.state == 'Approved')
                  .map(i => {
                    return (
                      <> 
                        {item.id == i.annual_plan  && 
                        <span className='risk'>
                            <option
                              key={i.id}
                              onClick={(e) => handle_engagements(i.id, e)}
                              className={`mb-3 ${selectedAudit === i.id ? "selected" : ""}`}
                              style={{ marginLeft: 70, cursor: "pointer", whiteSpace: 'break-spaces',padding:3 }}
                              selected={item.id === selectedAudit}
                              >
                              {(i.name).split("/")[1]}
                            </option>
                          </span>
                        }
                      </>
                    )
                  })}   
                  </> : <>
                  {Audit.filter(e => ActiveUser.is_superuser || ActiveUser.usertype == 'Head' || ActiveUser.usertype == 'Basic' || JSON.parse(ActiveUser.department).includes(e.department) )
                    .filter(appr => appr.state == 'Approved')
                  .map(i => {
                    return (
                      <> 
                        {item.id == i.annual_plan  && 
                        <span className='risk'>
                            <option
                              key={i.id}
                              onClick={(e) => handle_engagements(i.id, e)}
                              className={`mb-3 ${selectedAudit === i.id ? "selected" : ""}`}
                              style={{ marginLeft: 70, cursor: "pointer", whiteSpace: 'break-spaces',padding:3 }}
                              selected={item.id === selectedAudit}
                              >
                              {i.name}
                            </option>
                          </span>
                        }
                      </>
                    )
                  })}   
                  </>
                }   
                </>        
              );
            })}
          </CCol>
        </div> 
      </CRow>
    </>
  )
}

export default Audit_Plan_Nav;

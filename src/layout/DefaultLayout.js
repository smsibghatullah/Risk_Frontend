import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getSecrets } from 'src/config';
import RegulatorylawService from 'src/services/Regulatory_law.services';
import RiskRegisterService from 'src/services/Riskregister.service';
import { activeUserAtom } from 'src/_state/activeUserAtom';
import { departmentAtom } from 'src/_state/departmentAtom';

import { globalEventAtom } from 'src/_state/globalEventAtom';
import { regulatoryLawAtom } from 'src/_state/regulatoryLawAtom';
import { riskAtom } from 'src/_state/riskAtom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import axios from 'axios';
import PolicyService from 'src/services/policy.service';
import { policyAtom } from 'src/_state/policyAtoms';
import ControlObjectiveService from 'src/services/control_objective.service';
import { controlobjectiveAtom } from 'src/_state/Control_objectiveAtom';
import AuditplanService from 'src/services/Auditplan.service';
import { AuditplanAtom } from 'src/_state/AuditplanAtom';
import SubdepartmentService from 'src/services/Subdepartment.service';
import { sub_functionAtom } from 'src/_state/sub_functionAtom';
import { create_controlAtom } from 'src/_state/create_controlAtom';
import ControlsService from 'src/services/control.service'
import AuditengagementService from 'src/services/Auditengagement.service';
import { auditAtom } from 'src/_state/auditAtom';

const API_URL = getSecrets.API_URL
const token = getSecrets.token()



const DefaultLayout = () => {
  const setActiveUser = useSetRecoilState(activeUserAtom);
  const setRiskList = useSetRecoilState(riskAtom);
  const setauditList = useSetRecoilState(auditAtom);
  const setControlList = useRecoilState(create_controlAtom)
  const setRequlatoryLaw = useSetRecoilState(regulatoryLawAtom);
  const setAuditPlan = useSetRecoilState(AuditplanAtom);
  const setPolicy = useSetRecoilState(policyAtom)
  const setcontrolobjective = useSetRecoilState(controlobjectiveAtom)
  const setsub_department = useSetRecoilState(sub_functionAtom)
  const globatEvent = useRecoilValue(globalEventAtom); 



  let refreshRisk=()=>{ 
    let api = new RiskRegisterService; 
    api.getAllRisk().then((res) => {  setRiskList(res.data); }).catch((err) => { });
  }

  let refreshaudit=()=>{ 
    let api = new AuditengagementService; 
    api.getAllAuditEngagement().then((res) => {  setauditList(res.data); }).catch((err) => { });
  }

  let refreshCreatecontrol=()=>{ 
    let api = new  ControlsService;
    api.getAllControl().then((res) => {  setControlList(res.data);}).catch((err) => { });
  }

  let refreshRegulatoryLaw=(search = "")=>{ 
    let api = new RegulatorylawService;
    api.getAllregulatorylaw(search).then((res) => {
      setRequlatoryLaw(res.data);
    }).catch((err) => { });
    }

    let refreshAuditPlan=(search = "")=>{ 
      let api = new AuditplanService
      api.getAllAuditplan(search).then((res) => {
        setAuditPlan(res.data);
      }).catch((err) => { });
      }

    let refreshPolicies=()=>{ 
      let api = new PolicyService; 
      api.getAllPolicy().then((res) => {  setPolicy(res.data); }).catch((err) => { });
    }

    let refreshControl=()=>{ 
      let api = new ControlObjectiveService; 
      api.getAllControlobjective().then((res) => {  setcontrolobjective(res.data); }).catch((err) => { });
    }
    let refreshSub_Department=()=>{ 
      let api = new SubdepartmentService; 
      api.getAllSubdepartment().then((res) => {  setsub_department(res.data); }).catch((err) => { });
    }

    const setGlobalDepartments = useSetRecoilState(departmentAtom);

    let department_data=()=>{ 
      var config = {
        method: 'get',
        url: API_URL+'/department/',
        headers: { 
          'Authorization': token 
        },
      };
    axios(config).then((res) => { setGlobalDepartments(res.data); }).catch((err) => { })}  
  

  useEffect(()=>{

    console.log("=========================== App Starting ========================================");
    let useState = JSON.parse(localStorage.getItem('user'));
    setActiveUser(useState);
    refreshRisk();
    refreshCreatecontrol();
    department_data();
    refreshPolicies();
    refreshControl();
    refreshRegulatoryLaw()
    refreshaudit()
    // refreshAuditPlan()
  }, []);


  useEffect(()=>{
    switch(globatEvent.eventName) {
      case 'refreshRisk':
        refreshRisk();
        break;
        case 'refreshaudit':
          refreshaudit();
        break;
        case 'refreshCreatecontrol':
          refreshCreatecontrol();
          break;
      case 'refreshPolicies':
        refreshPolicies();
          break;
          case 'refreshControl':
            refreshControl();
          break;
      case 'refreshRegulatoryLaw':
        refreshRegulatoryLaw(globatEvent.search);
        // code block
        break;
      case 'refreshSub_Department':
          refreshSub_Department(globatEvent.search);
          // code block
          break;
      case 'refreshAuditPlan':
          // refreshAuditPlan(globatEvent.search);
          // code block
          break;
      default:
        // code block
    }
  }, [globatEvent]);

  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-0 mx-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

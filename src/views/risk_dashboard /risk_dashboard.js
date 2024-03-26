import {React, useEffect, useState} from 'react'
import { TabView, TabPanel } from 'primereact/tabview';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
  CNav,
  CNavItem,CNavLink
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import HeatMap from 'src/components/HeatMap';
import Body from './components/body';
import { riskAtom } from 'src/_state/riskAtom';
import RiskRegisterService from 'src/services/Riskregister.service';
import { useRecoilState } from 'recoil';
import { riskDashboardAtom } from 'src/_state/riskDashboardAtom';

const RiskDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [riskList, setRiskList] = useRecoilState(riskAtom); 
  const [riskDashboard, setRiskDashboard] = useRecoilState(riskDashboardAtom)
  var inherent_risk = { very_high_risk:100, high_inherent_risk: 22 };
  var residual_risk = { very_high_risk:7, high_inherent_risk: 9 };
 
  let get_data=(search = "")=>{ 
    let api = new RiskRegisterService; 
    api.getAllRisk().then((res) => { setRiskList(res.data); }).catch((err) => { });
  }

  const extractCategories =()=>{
   let cat = []
    riskList.map(i => { !cat.includes(i.category) && i.category ? cat.push(i.category): ""; return i });
    setCategories(cat);
  }

  useEffect(()=>{ extractCategories(); }, [riskList]);

  useEffect(()=>{ get_data(); }, []);
  const changeActiveIndex =(index)=>{
   
    setRiskDashboard(i => {
      const data = {...i};
      data['activeIndex'] = index;
     
      return  data;      
    });
   
  }


  return (
    <>
     <Body data={inherent_risk} categories={categories} />
    {/* <TabView activeIndex={riskDashboard.activeIndex} onTabChange={(e) => changeActiveIndex(e.index) }>

        <TabPanel header="Inherent Risks">
          
        </TabPanel>
        <TabPanel header="Residual Risks">
            <Body data={residual_risk} categories={categories} />
        </TabPanel>
      
    </TabView> */}
 
            
    </>
  )
}

export default RiskDashboard

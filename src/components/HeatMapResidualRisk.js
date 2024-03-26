import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { OverlayPanel } from 'primereact/overlaypanel';
import {riskPriorityAtom} from '../_state/riskPriorityAtom';
import {likehoodAtom} from '../_state/likehoodAtom';
import {impactAtom} from '../_state/impactAtom';
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
} from '@coreui/react'

// routes config
import routes from '../routes'
import { useRecoilState } from 'recoil';
import { riskAtom } from 'src/_state/riskAtom';
import { riskDashboardAtom } from 'src/_state/riskDashboardAtom';

const HeatMapResidualRisk = () => {
  let [riskPriority, setriskPriority] = useRecoilState(riskPriorityAtom);
  let [likehood, setlikehood] = useRecoilState(likehoodAtom);
  let [impact, setimpact] = useRecoilState(impactAtom);
  const [riskList, setRiskList] = useRecoilState(riskAtom);
  const [riskDashboard, setRiskDashboard] = useRecoilState(riskDashboardAtom)
  const navigate=useNavigate(); 
  var op;

  const gridColor = (score)=> riskPriority.length ? riskPriority.filter(i => score == i.rating   )[0]['color'] : 'red';
  const getCount = (overall_control_rating, inherent_risk_rating_rating, residual_risk_scoring_score)=>  riskList.filter( i=> i.status == 'active' && i.overall_control_rating == overall_control_rating && i.inherent_risk_rating_rating == inherent_risk_rating_rating && i.residual_risk_scoring_score == residual_risk_scoring_score ).length ||  0;
  const tdStyle = (score) => {
    return {color:'white',fontWeight:'bold', textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, backgroundColor:gridColor(score)};
  }

  const routeToGrid = (inherent_risk_rating_rating, overall_control_rating, residual_risk_scoring_score, HeatMapType) => {
    navigate(`/RiskListing/${inherent_risk_rating_rating}/${overall_control_rating}/${residual_risk_scoring_score}/${HeatMapType}`);
  }
const [inherent_risk_rating, setinherent_risk_rating] = useState([]);
  useEffect(()=>{
   let inherent_risk_rating = [...riskPriority];
    inherent_risk_rating.sort((a, b) => a['priority'] - b['priority']);
    setinherent_risk_rating(inherent_risk_rating);
    
  },[])

  return (<>
    <OverlayPanel ref={(el) => op = el}  dismissable breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '450px'}}>
    {/* // Content */}
   
    </OverlayPanel>
    <CCol  sm={6} lg={6}>
    <CCard >
                 
                 <CCardBody>
   <table className='m-d-block' style={{width:'100%'}}>
   <tbody>
    <tr><td colSpan={2} style={{fontWeight:'bold'}}><h3>Residual Risks</h3></td></tr>
    <tr>
      <td style={{width:'10%',fontWeight:'bold'}}>Control Rating</td>
      <td style={{width:'100%'}}> 
                
               
                 <table style={{width:'100%'}}>
                  <tbody>
                   
                    <tr>
                      <td style={{fontWeight:'bold',textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} >Absent</td>
                      <td onClick={()=>routeToGrid('Absent', 'Low',      'Medium', 'Residual')} style={tdStyle('Medium')} > {getCount('Absent', 'Low','Medium')}</td>
                      <td onClick={()=>routeToGrid('Absent', 'Medium',   'High', 'Residual')} style={tdStyle('High')} > {getCount('Absent', 'Medium','High')}</td>
                      <td onClick={()=>routeToGrid('Absent', 'High',     'High', 'Residual')} style={tdStyle('High')} > {getCount('Absent', 'High','High')}</td>
                      <td onClick={()=>routeToGrid('Absent', 'Critical', 'Critical', 'Residual')} style={tdStyle('Critical')} > {getCount('Absent', 'Critical', 'Critical')}</td>
                    </tr>
                    <tr>
                      <td style={{fontWeight:'bold',textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} >Fair</td>
                      <td onClick={()=>routeToGrid('Fair', 'Low',      'Low', 'Residual')} style={tdStyle('Low')} > {getCount('Fair', 'Low','Low')}</td>
                      <td onClick={()=>routeToGrid('Fair', 'Medium',   'Medium', 'Residual')} style={tdStyle('Medium')} > {getCount('Fair', 'Medium','Medium')}</td>
                      <td onClick={()=>routeToGrid('Fair', 'High',     'High', 'Residual')} style={tdStyle('High')} > {getCount('Fair', 'High','High')}</td>
                      <td onClick={()=>routeToGrid('Fair', 'Critical', 'High', 'Residual')} style={tdStyle('High')} > {getCount('Fair', 'Critical','High')}</td>
                    </tr>
                    <tr>
                      <td style={{fontWeight:'bold',textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} >Good</td>
                      <td onClick={()=>routeToGrid('Good', 'Low',       'Low', 'Residual')} style={tdStyle('Low')} > {getCount('Good', 'Low','Low')}</td>
                      <td onClick={()=>routeToGrid('Good', 'Medium',    'Low', 'Residual')} style={tdStyle('Low')} > {getCount('Good', 'Medium','Low')}</td>
                      <td onClick={()=>routeToGrid('Good', 'High',      'Medium', 'Residual')} style={tdStyle('Medium')} > {getCount('Good', 'High','Medium')}</td>
                      <td onClick={()=>routeToGrid('Good', 'Critical',  'High', 'Residual')} style={tdStyle('High')} > {getCount('Good', 'Critical','High')}</td>
                    </tr>
                    <tr>
                      <td style={{fontWeight:'bold',textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} >Excelent</td>
                      <td onClick={()=>routeToGrid('Excelent', 'Low',       'Low', 'Residual')} style={tdStyle('Low')} > {getCount('Excelent', 'Low','Low')}</td>
                      <td onClick={()=>routeToGrid('Excelent', 'Medium',    'Low', 'Residual')} style={tdStyle('Low')} > {getCount('Excelent', 'Medium','Low')}</td>
                      <td onClick={()=>routeToGrid('Excelent', 'High',      'Low', 'Residual')} style={tdStyle('Low')} > {getCount('Excelent', 'High','Low')}</td>
                      <td onClick={()=>routeToGrid('Excelent', 'Critical',  'Medium', 'Residual')} style={tdStyle('Medium')} > {getCount('Excelent', 'Critical','Medium')}</td>
                    </tr>

                    <tr>
                      <td style={{fontWeight:'bold',textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} ></td>

                      {inherent_risk_rating.map(
                        impact =>  <td key={impact.priority} style={{fontWeight:'bold',textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} >{impact.rating}</td>
                      )}

                     </tr>
                    </tbody>
                 </table>
     
                
               </td>
    </tr>
    <tr><td style={{textAlign: "center", textAlignVertical: 'center',fontWeight:'bold'}} colSpan={2}>Inherent Risk Rating</td></tr>

    </tbody>
   </table>
   </CCardBody>               
               </CCard>
    </CCol>
    </>
  )
}

export default React.memo(HeatMapResidualRisk)

import React, { Suspense } from 'react'
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

const HeatMap = () => {
  let [riskPriority, setriskPriority] = useRecoilState(riskPriorityAtom);
  let [likehood, setlikehood] = useRecoilState(likehoodAtom);
  let [impact, setimpact] = useRecoilState(impactAtom);
  const [riskList, setRiskList] = useRecoilState(riskAtom);
  const [riskDashboard, setRiskDashboard] = useRecoilState(riskDashboardAtom)
  const navigate=useNavigate(); 
  var op;

  const gridColor = (score)=> riskPriority.length ? riskPriority.filter(i => score == i.rating   )[0]['color'] : 'red';
  const getCount = (inherent_risk_rating_likehood, inherent_risk_rating_impact, inherent_risk_rating_rating)=>  riskList.filter( i=> i.status == 'active' && i.inherent_risk_rating_likehood == inherent_risk_rating_likehood && i.inherent_risk_rating_impact == inherent_risk_rating_impact && i.inherent_risk_rating_rating == inherent_risk_rating_rating ).length ||  0;
  const tdStyle = (score) => {
    return {color:'white',fontWeight:'bold', textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, backgroundColor:gridColor(score)};
  }

  const routeToGrid = (inherent_risk_rating_rating, overall_control_rating, residual_risk_scoring_score, HeatMapType) => {
    navigate(`/RiskListing/${inherent_risk_rating_rating}/${overall_control_rating}/${residual_risk_scoring_score}/${HeatMapType}`);
  }

  return (<>
    <OverlayPanel ref={(el) => op = el}  dismissable breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '450px'}}>
    {/* // Content */}
    </OverlayPanel>
    <CCol  sm={6} lg={6}>
    <CCard >
                 
                 <CCardBody>
   <table className='m-d-block' style={{width:'100%'}}>
   <tbody>
    <tr><td colSpan={2}><h3>Inherent Risk</h3></td></tr>
    <tr>
      <td style={{width:'10%',fontWeight:'bold'}}>Likehood</td>
      <td style={{width:'100%'}}> 
                
               
                 <table style={{width:'100%'}}>
                  <tbody>
                   
                    <tr>
                    <td style={{textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80,fontWeight:'bold' }} >{likehood[0].name}</td>
                      <td onClick={()=>routeToGrid('Almost Certain', 'Low','Medium', 'Inherent')} style={tdStyle('Medium')} > {getCount('Almost Certain', 'Low','Medium')}</td>
                      <td onClick={()=>routeToGrid('Almost Certain', 'Medium','High', 'Inherent')} style={tdStyle('High')} > {getCount('Almost Certain', 'Medium','High')}</td>
                      <td onClick={()=>routeToGrid('Almost Certain', 'Major','High', 'Inherent')} style={tdStyle('High')} > {getCount('Almost Certain', 'Major','High')}</td>
                      <td onClick={()=>routeToGrid('Almost Certain', 'Severe', 'Critical', 'Inherent')} style={tdStyle('Critical')} > {getCount('Almost Certain', 'Severe', 'Critical')}</td>
                    </tr>
                    <tr>
                    <td style={{textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80,fontWeight:'bold' }} >{likehood[1].name}</td>
                      <td onClick={()=>routeToGrid('Likely', 'Low','Low', 'Inherent')} style={tdStyle('Low')} > {getCount('Likely', 'Low','Low')}</td>
                      <td onClick={()=>routeToGrid('Likely', 'Medium','Medium', 'Inherent')} style={tdStyle('Medium')} > {getCount('Likely', 'Medium','Medium')}</td>
                      <td onClick={()=>routeToGrid('Likely', 'Major','High', 'Inherent')} style={tdStyle('High')} > {getCount('Likely', 'Major','High')}</td>
                      <td onClick={()=>routeToGrid('Likely', 'Severe','High', 'Inherent')} style={tdStyle('High')} > {getCount('Likely', 'Severe','High')}</td>
                    </tr>
                    <tr>
                      <td style={{textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80,fontWeight:'bold' }} >{likehood[2].name}</td>
                      <td onClick={()=>routeToGrid('Possible', 'Low','Low', 'Inherent')} style={tdStyle('Low')} > {getCount('Possible', 'Low','Low')}</td>
                      <td onClick={()=>routeToGrid('Possible', 'Medium','Low', 'Inherent')} style={tdStyle('Low')} > {getCount('Possible', 'Medium','Low')}</td>
                      <td onClick={()=>routeToGrid('Possible', 'Major','Medium', 'Inherent')} style={tdStyle('Medium')} > {getCount('Possible', 'Major','Medium')}</td>
                      <td onClick={()=>routeToGrid('Possible', 'Severe','High', 'Inherent')} style={tdStyle('High')} > {getCount('Possible', 'Severe','High')}</td>
                    </tr>
                    <tr>
                     <td style={{textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80,fontWeight:'bold' }} >{likehood[3].name}</td>
                      <td onClick={()=>routeToGrid('Rare', 'Low','Low', 'Inherent')} style={tdStyle('Low')} > {getCount('Rare', 'Low','Low')}</td>
                      <td onClick={()=>routeToGrid('Rare', 'Medium','Low', 'Inherent')} style={tdStyle('Low')} > {getCount('Rare', 'Medium','Low')}</td>
                      <td onClick={()=>routeToGrid('Rare', 'Major','Low', 'Inherent')} style={tdStyle('Medium')} > {getCount('Rare', 'Major','Low')}</td>
                      <td onClick={()=>routeToGrid('Rare', 'Severe','Medium', 'Inherent')} style={tdStyle('Medium')} > {getCount('Rare', 'Severe','Medium')}</td>
                    </tr>

                    <tr>
                      <td style={{textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80, }} ></td>

                      {impact.map(
                        impact =>  <td key={impact.priority} style={{textAlign: "center", padding:15, textAlignVertical: 'center',border: '1px solid white',height:80, width:80,fontWeight:'bold' }} >{impact.name}</td>
                      )}

                     </tr>
                    </tbody>
                 </table>
     
                
               </td>
    </tr>
    <tr>
      <td style={{textAlign: "center", textAlignVertical: 'center',fontWeight:'bold',}} colSpan={2}>Impact</td>
      </tr>

    </tbody>
   </table>
   </CCardBody>               
               </CCard>
    </CCol>
    </>
  )
}

export default React.memo(HeatMap)

import React, { Suspense, useEffect, useState } from 'react'
import Chart from "react-apexcharts";

import { 
  CCard,
  CCardBody,  
  CCol,
  CRow, 
} from '@coreui/react'
import {
  CFormSelect,

  CFormLabel,
  
} from '@coreui/react'
import HeatMap from 'src/components/HeatMap';
import RiskRegisterService from 'src/services/Riskregister.service';
import { useRecoilState, useRecoilValue } from 'recoil';
import { riskAtom } from 'src/_state/riskAtom';
import { riskDashboardAtom } from 'src/_state/riskDashboardAtom';
import { useRef } from 'react';
import HeatMapResidualRisk from 'src/components/HeatMapResidualRisk';
import { riskPriorityAtom } from 'src/_state/riskPriorityAtom';
import { departmentAtom } from 'src/_state/departmentAtom';
import { controlRatingAtom } from 'src/_state/controlRatingAtom';
import { categoriesAtom } from 'src/_state/categoriesAtom';



const Body = (prop) => {
  const [rerender, setRerender] = useState(true);
  const riskList = useRecoilValue(riskAtom).filter(f=>f.status == 'active');
  const departmentList = useRecoilValue(departmentAtom);
  const [SelectedDepartment, setSelectedDepartment ] = useState("");
  const handleSelectedDepartment = (e) =>{
    setSelectedDepartment(e.target.value)
  }

  const riskPriority = useRecoilValue(riskPriorityAtom);
  const [SelectedriskPriority, setSelectedriskPriority ] = useState("");
  const handleSelectedriskPriority = (e) =>{
    setSelectedriskPriority(e.target.value)
  }

  const ControlRating = useRecoilValue(controlRatingAtom)
  const [SelectedControlRatingAtom, setSelectedControlRatingAtom ] = useState("");
  const handleSelectedControlRatingAtom = (e) =>{
    setSelectedControlRatingAtom(e.target.value)
  }

  
  const riskDashboard = useRecoilValue(riskDashboardAtom)
  const [orientation, setOrientation] = useState(true);
  const [series, setSeries] = useState([
    {
      name: "Risk by Category",
      // data: prop.categories.map(c => riskList.filter(f=>f.category == c).length )
      data: []
    }
  ]);

  const [seriesfordepartments, setseriesfordepartments] = useState([
    {
      name: "Risk by Departmetns",
      // data: prop.categories.map(c => riskList.filter(f=>f.category == c).length )
      data: []
    }
  ]);

  const countRisk = (riskPriority, activeIndex) => {window.dispatchEvent(new Event('resize')); return riskList.filter(i => i.status == 'active' && i[riskDashboard.riskTypes[activeIndex]] == riskPriority).length || 0;}
  
  useEffect(()=>{
  }, []);

  useEffect(()=>{

    setTimeout(()=>{  

      ApexCharts.exec('riskbycat-bar', 'updateOptions', {
        colors: [riskPriority.filter(i=>i.rating ==SelectedriskPriority )[0]? riskPriority.filter(i=>i.rating ==SelectedriskPriority )[0]['color']:"#000000"],
      }); 

      ApexCharts.exec('riskbycat-bar', 'updateSeries', [{
        data: departmentList.map(c => riskList.filter(f=>f.department_id == c.id && f.residual_risk_scoring_score==SelectedriskPriority).length )
      }]);

    }, 200);

  }, [prop.categories, SelectedriskPriority, riskList]);

  useEffect(()=>{
    setTimeout(()=>{
      ApexCharts.exec('riskbydepart-bar', 'updateSeries', [{       
        data: riskPriority.map(c => riskList.filter(f => c.rating ==  f.residual_risk_scoring_score && SelectedDepartment == f.department_id ).length )
      }]);
    }, 200);

  }, [SelectedDepartment, riskList, prop.categories])

     
  const options = {
    chart: {
      id: "riskbycat-bar",
      animations: {
        speed: 1000,
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: !orientation
      }
    },
    xaxis: {
      categories: departmentList.map(i=>i.name)
    }
  };

  const optionsfordepartments = {
    colors : [function( value, seriesIndex, w ) {
     return riskPriority[value.dataPointIndex].color;             
    }],
    chart: {
      id: "riskbydepart-bar",
      animations: {
        speed: 1000,
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: !orientation
      }
    },
    xaxis: {
      categories: riskPriority.map(i=>i.rating)
    }
  };

  // ==================================Controll Rating===========================
  const [SelectedDepControlRating, setSelectedDepControlRating ] = useState("");
  const handleSelectedDepControlRating = (e) =>{ setSelectedDepControlRating(e.target.value) }
  const [seriesControllRating, setseriesControllRating] = useState([
    {
      name: "Risk by Departmetns",
      // data: prop.categories.map(c => riskList.filter(f=>f.category == c).length )
      data: []
    }
  ]);
  

  useEffect(()=>{

    setTimeout(()=>{
      ApexCharts.exec('controlRating-bar', 'updateSeries', [{
        data: ControlRating.map(c => riskList.filter(sf=> SelectedDepControlRating > 0? (SelectedDepControlRating == sf.department_id):true).filter(f=>f.overall_control_rating == c.name  ).length )
      }]);
    }, 200); 


  }, [ ControlRating, seriesControllRating, riskList, SelectedDepControlRating]);


  const optionsControllRating = {
    colors: ['#3e405b', '#3e405b', '#3e405b'],
    chart: {
      id: "controlRating-bar",
      animations: {
        speed: 1000,
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: !orientation
      }
    },
    xaxis: {
      categories: ControlRating.map(i=>i.name)
    }
  };

   // =============================== Risk Classification ===========================
   const categories = useRecoilValue(categoriesAtom);
   const [SelectedDepartmentRiskClassification, setSelectedDepartmentRiskClassification ] = useState("");
   const handleSelectedDepartmentRiskClassification = (e) =>{ setSelectedDepartmentRiskClassification(e.target.value) }
   
   const [seriesRiskClassification, setseriesRiskClassification] = useState([ { name: "Risk by Departmetns", data: [] } ]);

  useEffect(()=>{

    setTimeout(()=>{
      ApexCharts.exec('RiskClassification-bar', 'updateSeries', [{
        data: categories.map(c => riskList.filter(f=>f.department_id == SelectedDepartmentRiskClassification && c.name == f.category).length || 0 )
      }]);
    }, 200);


  }, [ ControlRating, seriesRiskClassification, riskList, SelectedDepartmentRiskClassification]);


  const optionsRiskClassification = {
    colors: ['#3e405b', '#3e405b', '#3e405b'],
    chart: {
      id: "RiskClassification-bar",
      animations: {
        speed: 1000,
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: !orientation
      }
    },
    xaxis: {
      categories: categories.map(i=>i.name)
    }
  };
   
  return (
    <>
    <CRow><CCol sm={12} lg={12} ><h4 className='text-center mb-3'>Inherent Risks</h4></CCol></CRow>
    <CRow>
    <CCol sm={6} lg={3}>
          <CCard>              
            <CCardBody>
            Critical 
              <h3 style={{color:'red'}} className='center'>{countRisk('Critical', 0)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
    <CCol sm={6} lg={3}>
    <CCard>              
            <CCardBody>
            High
              <h3 style={{color:'orange'}} className='center'>{countRisk('High', 0)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
    <CCol sm={6} lg={3}>
    <CCard>              
            <CCardBody>
            Medium
              <h3 style={{color:'LightBrown'}} className='center'>{countRisk('Medium', 0)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
    <CCol sm={6} lg={3}>
    <CCard>              
            <CCardBody>
            Low
              <h3 style={{color:'LightBlue'}} className='center'>{countRisk('Low', 0)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
   
  </CRow>

  <CRow><CCol sm={12} lg={12}><h4 className='text-center mb-3 mt-3'>Residual Risks</h4></CCol></CRow>
    <CRow>
    <CCol sm={6} lg={3}>
          <CCard>              
            <CCardBody>
            Critical 
              <h3 style={{color:'red'}} className='center'>{countRisk('Critical', 1)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
    <CCol sm={6} lg={3}>
    <CCard>              
            <CCardBody>
            High
              <h3 style={{color:'orange'}} className='center'>{countRisk('High', 1)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
    <CCol sm={6} lg={3}>
    <CCard>              
            <CCardBody>
            Medium
              <h3 style={{color:'LightBrown'}} className='center'>{countRisk('Medium', 1)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
    <CCol sm={6} lg={3}>
    <CCard>              
            <CCardBody>
            Low
              <h3 style={{color:'LightBlue'}} className='center'>{countRisk('Low', 1)}</h3>
            </CCardBody>               
          </CCard>
    </CCol>
   
  </CRow>

  <br></br>

  <CRow>
    {<HeatMap key="0"/>}
  
   
    <CCol sm={5} lg={5}>
          <CCard >              
            <CCardBody>
            <CRow>
            <CCol sm={9} lg={9}><h3> Risk By Category</h3></CCol>
            <CCol sm={3} lg={3}>

                <CFormSelect value={SelectedriskPriority} onChange={handleSelectedriskPriority}  className="mb-3" aria-label="Large select example">
                  <option value=" "> Select </option>
                  {riskPriority.map(i =>{ return <option key={i.priority} value={i.rating}>{i.rating}</option>})}
                                   
                </CFormSelect>

            </CCol>
            </CRow>
             
            
             { <Chart options={options} type="bar" series={series} width="100%" height='450px' /> }

            </CCardBody>               
          </CCard>
    </CCol> 
    </CRow>

    <CRow >
        {<HeatMapResidualRisk key="1"/>} 
        <CCol sm={5} lg={5}>
        <CCard >              
          <CCardBody>
          <CRow>
          <CCol sm={9} lg={9}><h3> Risk By Departments</h3></CCol>
          <CCol sm={3} lg={3}>

              <CFormSelect value={SelectedDepartment} onChange={handleSelectedDepartment}  className="mb-3" aria-label="Large select example">
                 <option value=" "> Select </option>
                {departmentList.map(i =>{ return <option key={i.name} value={i.id}>{i.name}</option>})}
                                  
              </CFormSelect>

          </CCol>
          </CRow>
            
          
            { <Chart options={optionsfordepartments} type="bar" series={seriesfordepartments} width="100%" height='450px' /> }

          </CCardBody>               
        </CCard>
        </CCol> 
    </CRow>

    <CRow>
      
        

        <CCol sm={7} lg={7}>
              <CCard >              
                <CCardBody>
                <CRow>
                <CCol sm={9} lg={9}><h3> Risk Classification </h3></CCol>
                <CCol sm={3} lg={3}>

                    <CFormSelect value={SelectedDepartmentRiskClassification} onChange={handleSelectedDepartmentRiskClassification}  className="mb-3" aria-label="Large select example">
                      <option value=" "> Select </option>
                      {departmentList.map(i =>{ return <option key={i.name} value={i.id}>{i.name}</option>})}
                                        
                    </CFormSelect>

                </CCol>
                </CRow>
                  
                
                  { <Chart  options={optionsRiskClassification} type="bar" series={seriesRiskClassification} width="100%" height='400px' /> }

                </CCardBody>               
              </CCard>
        </CCol> 

        <CCol sm={5} lg={5}>
            <CCard >              
              <CCardBody>

              <CRow>
              <CCol sm={9} lg={9}><h3> Control Rating </h3></CCol>
              <CCol sm={3} lg={3}>

                    <CFormSelect value={SelectedDepControlRating} onChange={handleSelectedDepControlRating}  className="mb-3" aria-label="Large select example">
                      <option value=" "> Select </option>
                      {departmentList.map(i =>{ return <option key={i.name} value={i.id}>{i.name}</option>})}
                                        
                    </CFormSelect>

                </CCol>
            
              </CRow>                
              
                { <Chart  options={optionsControllRating} type="bar" series={seriesControllRating} width="100%" height='400px' /> }

              </CCardBody>               
            </CCard>
        </CCol> 

    </CRow>

        <br />

    
</>
    
  )
}

export default React.memo(Body)

import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";

import {
  CCard,
  CCardBody,
  CCol,
  CButton
} from '@coreui/react'
import {
  BrowserRouter as Router,
   Link,
  useNavigate,
  useParams
} from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { getSecrets } from "src/config";

const API_URL = getSecrets.API_URL
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import AuditengagementService from "src/services/Auditengagement.service";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { globalEventAtom } from "src/_state/globalEventAtom";
import { Toast } from 'primereact/toast';
import { activeUserAtom } from "src/_state/activeUserAtom";
import {Comment} from "src/views/widgets/Comment";

import 'src/scss/style.scss'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

function AuditReport() {
  const params =useParams()
  const navigate = useNavigate();
  const setGlobalEvent = useSetRecoilState(globalEventAtom);
// checkbox functionalty start
  const toast = useRef(null);
  const [Engagement, setEngagement] = useState({});
  const [EngagementPrograms, setEngagementPrograms] = useState([]);
  const [EPObservations, setEPObservations] = useState([]);
  const [CompanyName, setCompanyName] = useState("Seagull Financial Consultants")



  // ========================================================
  const options = {
    bar: {
      horizontal: false,
      borderRadius: 10,
      columnWidth: '25%' // Set the width of the bars
    },
    colors: [
      function(value, seriesIndex, w) {
        if (value.dataPointIndex == 0) {
          return "#f8432b";
        } else if (value.dataPointIndex == 1) {
          return "#ffc000";
        } else if (value.dataPointIndex == 2) {
          return "#008000";
        }
      }
    ],
    chart: {
      id: "basic-bar"
    },
    plotOptions: {
      bar: {
        columnWidth: '50%', // Adjust the width of the bars here
      },
    },
    xaxis: {
      categories: ['High', 'Medium', 'Low'],
      style: {
        colors: ['#ffffff', '#ffffff', '#ffffff'],
      },
      axisBorder: {
        color: '#ffffff'
      },
      labels: {
        style: {
          colors: '#ffffff',
          fontWeight: 'bold',
          fontSize: '20px'
        }
      }
    },
    yaxis: {
      forceNiceScale: true,
      labels: {
        formatter: function (value) {
          return (value);
        }
      }
    }
  };
  
 
  
 const series = [
    {
      name: "series-1",
      data: [0, 0, 0]
    }
  ]

  useEffect(()=>{
    let low = EngagementPrograms.filter(i=>(i.control_issue=="Low" && i.audit_process_result == "Ineffective"))
    .reduce(function (accumulator, curValue) {
      return accumulator + curValue.our_observation.length
    
    }, 0);
    console.log("Low ===> ", low)
    let medium =  EngagementPrograms.filter(i=>(i.control_issue=="Medium" && i.audit_process_result == "Ineffective"))
    .reduce(function (accumulator, curValue) {
      return accumulator + curValue.our_observation.length
    
    }, 0);
    let high =  EngagementPrograms.filter(i=>(i.control_issue=="High" && i.audit_process_result == "Ineffective"))
    .reduce(function (accumulator, curValue) {
      return accumulator + curValue.our_observation.length
    
    }, 0);

    console.log("Graph Count ===> ", high, medium, low);

    setTimeout(()=>{
      ApexCharts.exec('basic-bar', 'updateSeries', [{       
        data: [high, medium, low]
      }]);
    }, 200);
  }, [EngagementPrograms]);

  // ========================================================

  let getdata = ()=>{
      console.log("Engagement ID",params.engagement_id);
        
        axios.get(API_URL+`/auditengagement/${params.engagement_id}/`).then((res) => {
          setEngagement(res.data);
       console.log("Engagement ===> ", res.data);

      }).catch((err) => {  })
  }

  let get_programs_data = ()=>{
    console.log("Engagement ID",params.engagement_id);
    let _our_observation = []

      axios.get(API_URL+`/audit_program/audit_engagement/${params.engagement_id}`).then((res) => {
        setEngagementPrograms(res.data.map(i=>{ 
          try {
            i.our_observation = JSON.parse(i.our_observation);
           
        } catch(e) {
          i.our_observation = [];
            // return i 
        }
        i.our_observation.length? _our_observation.push(...i.our_observation):''; 
        return i 
        
        }));
        setEPObservations(_our_observation);
     
    }).catch((err) => {  })
}
async function company_data(){
  let result=await fetch(API_URL+`/companysetup/`);
  result=await result.json();
  setCompanyName(result[0].name);
}
  useEffect(()=>{
    getdata(); get_programs_data()
    console.log("Param ==> ", );
    company_data();
        setTimeout(() => {
          if(document.URL.toString().includes('Audit_engagement_report_print'))
          window.print();
        }, 3000);
  }, []);

  useEffect(()=>{   

    console.log("EngagementPrograms ==> ", EngagementPrograms);
     
  }, [EngagementPrograms]);


  const renderHeader = () => {
    return (
      <body style={{margin:'50px'}}>
      <div className="flex justify-content-between">
      <br/><br/><br/><br/><br/><br/>
         <div style={{width: '100%',}}>
           <span className="mb-3">
              <h1 style={{ marginLeft: '30%',  marginRight: '30%', color:'#22228d', fontFamily: 'Trebuchet MS',fontSize:'40px',fontWeight:'bold' }}>{CompanyName}<span className="" style={{ float: "right" }}>
                         
              </span></h1>
            </span>
            <br/>
          
            <br/>
            <span className="mb-3">
              <h1 style={{ marginLeft: '30%',  marginRight: '30%', color:'#2f602f', fontFamily: 'Trebuchet MS',fontSize:'40px',fontWeight:'bold' }}>Internal Audit Observations<span className="" style={{ float: "right" }}>
             
              
              </span></h1>
            </span>
           
            <br/>
            <span className="mb-3">
              <h1 style={{  marginLeft: '30%',  marginRight: '30%', color:'#2f602f', fontFamily: 'Trebuchet MS',fontSize:'40px',fontWeight:'bold' }}>Department / Function<span className="" style={{ float: "right" }}>
                           
              </span></h1>
            </span>
            <br/><br/><br/>
         </div>
<hr ></hr>
         <h2 style={{ color:'#22228d', fontFamily: 'Trebuchet MS',fontSize:'25px',fontWeight:'bold' }}>1. Scope</h2>
         <div className="mx-5">

         <p style={{fontFamily: 'Trebuchet MS',fontSize:'20px'}}>{Engagement.description}</p>
         </div>

         <h2 style={{ color:'#22228d', fontFamily: 'Trebuchet MS',fontSize:'30px',fontWeight:'bold' }}>2. Summary of Findings</h2>
         <p style={{fontFamily: 'Trebuchet MS',fontSize:'20px'}}>A summary of the observations noted during the course of the audit engagement is mentioned in the chart below:</p>
         <div className="mx-8 my-8" style={{ padding: '30px', textAlign: 'center', margin: '0 auto' ,backgroundColor:'#3c4b64',width:'70%'}}>
       <center>
        <Chart options={options} type="bar" series={series} width="70%" height="450px" />
        </center>
      </div>
<br/>

           <div>
           
           <table style={{borderCollapse:'collapse', border: "1px solid black",  width:"100%"}}>
            <tbody style={{borderCollapse:'collapse', border: "1px solid black"}}>
              <tr style={{borderCollapse:'collapse', border: "1px solid black"}}><td style={{backgroundColor:'red', color:'white', textAlign:'center',fontWeight:'bold',fontFamily: 'Trebuchet MS'}}>High</td><td style={{fontFamily: 'Trebuchet MS',fontSize:'20px'}}>&nbsp;&nbsp;Corrective action to be implemented as a matter of urgency</td></tr>
              <tr style={{borderCollapse:'collapse', border: "1px solid black"}}><td style={{backgroundColor:'#ffc000', color:'white', textAlign:'center',fontWeight:'bold',fontFamily: 'Trebuchet MS'}}>Medium</td><td style={{fontFamily: 'Trebuchet MS',fontSize:'20px'}}>&nbsp;&nbsp;Corrective action to be implemented as a matter of priority.</td></tr>
              <tr style={{borderCollapse:'collapse', border: "1px solid black"}}><td style={{backgroundColor:'green', color:'white', textAlign:'center',fontWeight:'bold',fontFamily: 'Trebuchet MS'}}>Low</td><td style={{fontFamily: 'Trebuchet MS',fontSize:'20px'}}>&nbsp;&nbsp;Action to be taken to address weakness within a reasonable agreed time frame.</td></tr>
            </tbody>
        </table>
           </div>
<hr></hr>
           <table style={{borderCollapse:'collapse', border: "1px solid black",  width:"100%"}}>
           <tbody style={{borderCollapse:'collapse', border: "1px solid black"}}>
                <tr style={{borderCollapse:'collapse', border: "1px solid black",backgroundColor:'#3c4b64',color:'white'}}> 
                      <td style={{borderCollapse:'collapse', border: "1px solid black",textAlign:'center',fontFamily: 'Trebuchet MS',fontWeight:'bold'}} >S.No</td> 
                       <td style={{borderCollapse:'collapse', border: "1px solid black", padding:"10px",textAlign:'center',fontFamily: 'Trebuchet MS',fontWeight:'bold'}}>Observations</td> 
                       <td style={{borderCollapse:'collapse', border: "1px solid black", padding:"10px",textAlign:'center',fontFamily: 'Trebuchet MS',fontWeight:'bold'}}>Description</td> 
                       <td style={{borderCollapse:'collapse', border: "1px solid black", padding:"10px",textAlign:'center',fontFamily: 'Trebuchet MS',fontWeight:'bold'}}>Level of Importance</td>
                  </tr>
                  {
  EngagementPrograms.map((eng, index) => (
    eng.our_observation.map((obs, innerIndex) => (
      <tr key={`${index}-${innerIndex}`} style={{ borderCollapse: 'collapse', border: "1px solid black" }}>
        <td style={{ borderCollapse: 'collapse', border: "1px solid black", padding: "10px", fontFamily: 'Trebuchet MS', fontSize: '15px' }}>{index * eng.our_observation.length + innerIndex + 1}</td>
        <td style={{ borderCollapse: 'collapse', border: "1px solid black", padding: "10px", fontFamily: 'Trebuchet MS', fontSize: '15px' }}>{obs.our_observation_title}</td>
        <td style={{ borderCollapse: 'collapse', border: "1px solid black", padding: "10px", fontFamily: 'Trebuchet MS', fontSize: '15px' }}>{obs.our_observation_description}</td>
        <td style={{ borderCollapse: 'collapse', border: "1px solid black", padding: "10px", fontFamily: 'Trebuchet MS', fontSize: '15px' }}>{eng.control_issue}</td>
      </tr>
    ))
  ))
}




            </tbody>
            </table>

            <div className="mt-5">

              <div>

                <h1 style={{color:'#22228d', fontFamily: 'Trebuchet MS',fontSize:'30px',fontWeight:'bold' }}>3. Details of Findings</h1>
                {EngagementPrograms.map(pro => {
                  return(
                    <div style={{pageBreakAfter: 'always', margin: '0.5cm'}}>
                      <hr></hr>
                    <h2 style={{ fontFamily: 'Trebuchet MS',fontSize:'25px',fontWeight:'bold' }}>Title:</h2>
                    <p style={{ fontFamily: 'Trebuchet MS',fontSize:'20px'}}>{pro.name}</p>
                    <div>
                          <h2 style={{ fontFamily: 'Trebuchet MS',fontSize:'20px',fontWeight:'bold' }}>Our observation:</h2>
                            <p style={{ fontFamily: 'Trebuchet MS',fontSize:'20px'}}>{pro.title_of_procedure}</p>
                    </div>
                    <div>
                            <h2 style={{ fontFamily: 'Trebuchet MS',fontSize:'20px',fontWeight:'bold' }}>Our recommendation:</h2>
                            <p style={{ fontFamily: 'Trebuchet MS',fontSize:'20px', }}>{pro.our_reputation}</p>
                    </div>

                    <div>
                            <h2 style={{ fontFamily: 'Trebuchet MS',fontSize:'20px',fontWeight:'bold' }}>Management Response :</h2>
                            <p style={{ fontFamily: 'Trebuchet MS',fontSize:'20px' }}>{pro.action_plan}</p>
                    </div>

              </div>
             
                  )
                })  }
              

              </div>

            
              
           </div>
               
      </div>
      </body>
    )
  }

  const header = renderHeader();

  let get_data = (search = "") => {
    let api = new AuditengagementService;
    api.getAllAuditEngagement(search).then((res) => { 
    const approvedStatePlans = res.data.filter(plan => plan.annual_plan == params.id);
    setDataTableList(approvedStatePlans); }).catch((err) => { });
  }
  useEffect(()=>{get_data()}, [params])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
    }
    get_data();
    setGlobalEvent({ eventName: 'refreshRisk', message: '', data: {} })
  }, [])

 
  return (
    <>
     
      <CCol xs={12}>
        <ConfirmDialog />
          <Toast ref={toast} />
            <CCard className="mb-4">
                  <CCardBody>
                        {header}
                  </CCardBody>
            </CCard>
      </CCol>
    </>

  )
}
export default AuditReport;
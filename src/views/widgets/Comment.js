import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
} from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import {
 
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton
} from '@coreui/react'
import axios from 'axios';
import { getSecrets } from "src/config";
import { useRecoilValue } from 'recoil'
import { activeUserAtom } from 'src/_state/activeUserAtom'

const API_URL = getSecrets.API_URL


export const Comment = (prop) => {
  const ActiveUser = useRecoilValue(activeUserAtom);

  const [Comment, setComment] = useState("");
  const [CommentList, setCommentList] = useState([]);
  const handleComment = (e) => {
    setComment(e.target.value)
  }
  const get_comments = (e)=>{
    console.log(" ======> ", prop.docId, prop.belogTo)
    axios.get(API_URL+'/comment?docId='+prop.docId+"&belogTo="+prop.belogTo).then((success) => {  
       console.log("===> ", success);
       setCommentList(success.data);

      }).catch((err) => {    })
 
  }

  const saveComment = ()=>{
   
    axios.post(API_URL+'/comment',{
     
      "belogTo": prop.belogTo,
      "docId": prop.docId,
      "comment": Comment
    }).then((success) => {  
        prop.processed_function()

      }).catch((err) => {    })
  
   
  }

  useEffect(()=>{
    get_comments();
  }, []);

  return (
    <CCard className="mb-4">
      {CommentList.map(i=>
        <><CCardBody>
      {i.comment}
      </CCardBody>
      <hr /></>
        )}
      {(CommentList.length == 0) && <h3>No Comments Found</h3>}

     
      {(ActiveUser.is_superuser || ActiveUser.usertype == 'Head') && 
      <CCardBody>
                 <textarea onChange={handleComment} rows="4" style={{'width':'100%'}}></textarea>
      </CCardBody>
      }
        {(ActiveUser.is_superuser || ActiveUser.usertype == 'Head') && 
      <CCardFooter>
         <CButton onClick={()=>{saveComment()}}  style={{'float': 'right', background:"#64748B",width:200,padding:10,marginRight:10}}>Proceed</CButton>
      </CCardFooter>
        }



    </CCard>
  )
}



import { useState, React, useEffect, useRef, Component } from 'react'
import { getSecrets } from "src/config";
const token = getSecrets.token()
const API_URL = getSecrets.API_URL
import { Image } from 'primereact/image';
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
  CNavItem,
} from '@coreui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import axios from 'axios';
import { TabPanel, TabView } from 'primereact/tabview';
import { useRecoilValue } from 'recoil';
import { selectedPolicyAtom } from 'src/_state/selectedPolicyAtom';
import PolicyFormView from './Policy_form_view';
import ControL_Policy_view from './control_objective_policy';
import Control_objective_Policy_view from './control_objective_policy';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag


function Policy_view(prop) {
  const [imageUrl, setImageUrl] = useState(null);
  const [Data3, setData3] = useState([])
  const params = useParams()
  const icon = (<i className="pi pi-check"></i>)

  let law_data = () => {
    var config = {
      method: 'get',
      url: API_URL + `/regulatory_laws/policy/?policyId=${selectedPolicy.id}`,
      headers: {
        "Authorization": token
      }
    };
    axios(config).then((res) => { ; setData3(res.data); }).catch((err) => { })
  }
  useEffect(() => {
    fetch(API_URL + `/policy/${selectedPolicy.id}/`)
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.file);
      });
  }, []);
  useEffect(() => {
    law_data()
  }, []);

  const selectedPolicy = useRecoilValue(selectedPolicyAtom);

  return (
    <>
      <PolicyFormView delegate={prop}/>
      <CRow className='mt-4'>
        <div className="mb-3">
          <CCol>
            <TabView>
              <TabPanel header='Control Objective'>
                <Control_objective_Policy_view />
              </TabPanel>
              <TabPanel header='Regulatory Law'>
                <CRow className="mt-4">
                  <CCol className="mb-4" xs={12}>
                    <ConfirmDialog />
                    <CCard className="mb-4">
                      <CCardBody>
                        <DataTable value={Data3} showGridlines responsiveLayout="scroll" size="small" >
                          <Column alignHeader={'center'} field="name" header="Name" sortable></Column>
                          <Column alignHeader={'center'} field="owner" header="Owner" ></Column>
                          <Column alignHeader={'center'} field="state" header="State" ></Column>
                        </DataTable>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </TabPanel>
              {/* <TabPanel header='Policy Image'>
                <>
                  {imageUrl && <Image src={imageUrl} alt="Image" preview width="250" />}
                </>
              </TabPanel> */}
            </TabView>
          </CCol>
        </div>
      </CRow>
    </>
  )
}

export default Policy_view

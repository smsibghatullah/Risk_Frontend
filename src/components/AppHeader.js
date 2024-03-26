import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { sidebarAtom } from 'src/_state/sidebarAtom'
import { useRecoilState } from 'recoil'
import 'primeicons/primeicons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

        

const AppHeader = () => {
  const navigate=useNavigate()
  const [state, setSideBarState] = useRecoilState(sidebarAtom);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => { setSideBarState(state)}
          }
        >
          {/* <CIcon icon={cilMenu} size="lg" /> */}
        </CHeaderToggler>
        
        <CHeaderBrand className="mx-auto d-md-none" to="/">
        
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink> */}
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
           <CNavItem style={{marginTop:5}}>
          <div  style={{cursor:'pointer'}}>
          <span style={{display:'flex',flexDirection:"row"}}>
          {/* <Tooltip target=".Help" mouseTrack mouseTrackRight={10} />
            <div className='mx-2 Help' data-pr-tooltip="Help">
            <FontAwesomeIcon style={{ fontSize: '1.5rem',color:'rgb(100, 116, 139)'}} icon={faCircleQuestion} />
          </div> */}
          <Tooltip target=".logouticon" mouseTrack mouseTrackRight={10}  />
          <div className="logouticon" onClick={logout} data-pr-tooltip="Logout">
                <FontAwesomeIcon style={{ fontSize: '2rem',color:'rgb(100, 116, 139)'}} icon={faCircleUser} />
              </div>
            </span>

         </div>
        
         
         
          </CNavItem> 
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader

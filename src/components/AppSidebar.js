import React, { useEffect, useState } from 'react'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { sidebarAtom } from 'src/_state/sidebarAtom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import "./logo.css"
import { activeUserAtom } from 'src/_state/activeUserAtom'
import { activeCompanyAtom } from 'src/_state/activeCompanyAtom'

const AppSidebar = () => {
  let [userNavigation, setUserNavigation] = useState([]);
  const [state] = useRecoilState(sidebarAtom);
  const ActiveUser = useRecoilValue(activeUserAtom);

  useEffect(()=>{
    if(ActiveUser){

      if(ActiveUser.is_superuser){
        setUserNavigation(navigation);   
        
      }else{
        // let userGroups = ActiveUser.groups.map(i => i.name) || []
        // let filterNavigation = navigation.filter( n => userGroups.includes(n.key)  )
        // setUserNavigation(filterNavigation)
        // ============================Taha Khan staring work========================
        let userGroups = ActiveUser.groups.map(i => i.name) || []
          let _allowGroups = [];
          navigation.forEach(element => {
            let _group = {...element};
            let _items = [];
            if(element.items){
              element.items.forEach(item =>{ if(userGroups.includes(item.key)){ _items.push(item);}  });
            _group['items'] = _items;
            if(_items.length > 0){ _allowGroups.push(_group); }

            }
         
          });
          setUserNavigation(_allowGroups)
        }
      }


  }, [ActiveUser]);

  return (
    <CSidebar
      position="fixed"
      // unfoldable={!state}
      // visible={state}
      
    >

      <CSidebarBrand className="d-none d-md-flex justify-content-center align-item-center" to="/" style={{backgroundColor:'white',height:'133px'}}>

        <p className="nav-link" ><img style={{height:'42px',
    marginTop:'23px'}} width='240px' className="logo_png " src={require("../assets/images/avatars/GR-CONNECT.png")} /></p>
       
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={userNavigation}/>
        </SimpleBar>
      </CSidebarNav>
    
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

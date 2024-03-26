import { CNavGroup, CNavItem, CNavTitle} from '@coreui/react'
import Audit_Plan_Nav from './views/Audit_Plan/Audil_plan_navlisting'
import getdepartment from './views/Department/component/department_get_data'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/Home',
    icon: <i className="pi pi-home" style={{ fontSize: '1.5rem',marginRight:20,color:'white' }}></i>,
    key: 'home'
  },
  {
    component: CNavGroup,
    name: 'Company',
    key: 'company',
    icon: <i className="pi pi-sliders-h" style={{ fontSize: '1.5rem',marginRight:20,color:'hotpink' }}></i>,
    items: [
      {
        component: CNavItem,
        name: 'Company Setup',
        to: `/company-setupAdd`,
        key: 'company_setup'
      },
      {
        component: CNavItem,
        name: 'User Management',
        to: '/User_Management',
        key: 'user_management'
      },
    
    ]
  },
  {
    component: CNavGroup,
    name: 'Enterprise Risk Management',
    icon: <i className="pi  pi-cog" style={{ fontSize: '1.5rem',marginRight:20 ,color:'Red'}}></i>,
    items: [
      {
        component: CNavItem,
        name: 'Risk Dashboard',
        to: '/RiskDashboard',
        key: 'risk_dashoboard'
      },
      {
        component: CNavGroup,
        name: 'Risk Register',
        key: 'risk_register',
        items: [
          {
            component: getdepartment,
            to: '/Risk',
          }
        ]
      },
      // {
      //   component: CNavItem,
      //   name: 'Risk Assessment',
      //   to: '/Risk_Assesment',
      //   key: 'risk_assesment'
      // },
    ]
  },
  {
    component: CNavGroup,
    name: 'Internal Audit Management',
    key: 'Audit',
    icon: <i className="pi pi-file" style={{ fontSize: '1.5rem',marginRight:20,color:'green' }}></i>,
    items: [
      {
        component: CNavItem,
        name: 'Audit Plan',
        to: '/Audit_plan',
        key: 'audit_plan',
        // items: [
        //   {
        //     component: Audit_Plan_Nav,
        //     to: '/Risk',
        //   }]
      },
      // {
      //   component:CNavTitle,
      //   icon: <i className="pi" style={{ fontSize: '1.5rem',marginRight:50,color:'green' }}></i>,
      //   name:'Audit Engagements'
        
      // },
      {
        component: CNavItem,
        name: '',
        
        key: 'audit_plan',
        items: [
          {
            component: Audit_Plan_Nav,
            to: '/Risk',
          }
        ]
      },
      
     

    ]
  },
  {
    component: CNavGroup,
    name: 'Policy and Regulatory Compliance',
    key: 'policy',
    icon: <i className="pi pi-file-edit" style={{ fontSize: '1.5rem',marginRight:20,color:'yellow' }}></i>,
    items: [
      {
        component: CNavItem,
        name: 'Policy Repository',
        to: '/policylist',
        key: 'policy_list'
      },
      // {
      //   component: CNavItem,
      //   name: 'Policy Dashboard',
      //   to: '/policydashboard',
      //   key: 'policy_dashboard'
      // },
      {
        component: CNavItem,
        name: 'Regulatory Law',
        to: '/regulatrylawlist',
        key: 'regulatry_law'
      },
      {
        component: CNavItem,
        name: 'Control Objective',
        to: '/Control_Objective_List',
        key: 'control_objective'
      },
      {
        component: CNavItem,
        name: 'Controls',
        to: '/Control_List',
        key: 'control_list'
      },
    ]
  },
  // {
  //   component: CNavGroup,
  //   name: 'Repository',
  //   key: 'Repo',
  //   icon: <i className="pi pi-share-alt" style={{ fontSize: '1.5rem',marginRight:20,color:'orange' }}></i>,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Risk Repository',
  //       to: '/Risk_Repository',
  //       key: 'risk_repository'
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Audit Program Repo',
  //       to: '/Audit_Program_Repo',
  //       key: 'audit_program_repo'
  //     },
  //   ]
  // },
]
export default _nav


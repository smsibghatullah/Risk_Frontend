import React from 'react'
import Formaudit from './views/Audit_Engagement/audit'
import AuditAdd from './views/Audit_Engagement/AuditAdd'
import AuditProgram from './views/Audit_Engagement/Audit_Program'
import Audit_View from './views/Audit_Plan/Auditview'
import Audit_Plan from './views/Audit_Plan/Audit_Plan'
import Audit_Plan_Add from './views/Audit_Plan/Audit_PlanAdd'
import CompanysetupForm from './views/companysetup/Companysetup'
import Company_setup_edit from './views/companysetup/companysetup_edit'
import Company_setup_view from './views/companysetup/company_view'
import Control_Objective_Update from './views/control_objective/control_objectiveupdate'
import Control_Objective_Form from './views/control_objective/Control_Objective_Form'
import Control_Objective_List from './views/control_objective/Control_Objective_List'
import Control_Form from './views/create_control/Control_Form'
import Control_List from './views/create_control/Control_List'
import Control_Update from './views/create_control/Control_update'
import Department from './views/Department/Department'
import Departmentedit from './views/Department/department.edit'
import DepartmentAdd from './views/Department/DepartmentAdd'
import DepartmentView from './views/Department/Departmentview'
import Scop from './views/Department/Scop'
import NaVbar from './views/Navbar/navbar'
import Login from './views/pages/login/Login'
import Policy from './views/Policy/PolicyForm'
import PolicyList from './views/Policy/PolicyListing'
import PolicyUpdate from './views/Policy/Policy_update'
import Regulatory_Law from './views/Regulatory_law/regulatry_law'
import Risklist from './views/risk/Risk'
import RiskDataList from './views/risk/RiskDataList'
import RiskMatrix from './views/Riskmatrix/Risk_matrix'
import RiskmatrixAdd from './views/Riskmatrix/Risk_matrix_Add'
import RiskUpdate from './views/Risk_Repository/components/Risk_update'
import RiskView from './views/Risk_Repository/components/Risk_view'
import Risk_Repository from './views/Risk_Repository/Risk_Repository'
import Sub_Function from './views/Sub_Function/Sub_Function'
import Sub_Add_Function from './views/Sub_Function/sub_Function_Add'
import Sub_edit_Function from './views/Sub_Function/sub_function_edit'
import Regulatory_Law_List from './views/Regulatory_law/regulatory_law_list'
import Regulatory_Law_update from './views/Regulatory_law/regulatory_law_update'
import Audit_Program_Repo from './views/Audit_Engagement/Component_Audit_Repo/Audit_Program_Repo_List'
import User_Management from './views/user_management/User_Management'
import PolicyDashboard from './views/Policy_Dashboard/Dashboard'
import CommonHome from './views/Home/home'
import Audit_Program_repo_Update from './views/Audit_Engagement/Component_Audit_Repo/Audit_program_repo_update'
import RiskAssesment from './views/Risk_Assesment/risk_assesment'
import Forgot_Password from './views/pages/login/Forget_Password'
import Audit_Program_List from './views/Audit_Engagement/Component_Audit_Repo/Audit_program_list'

import AuditReport from './views/Audit_Engagement/Audit_Report'
import Reset_Password from './views/pages/login/Reset_Password'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const RiskDashboard = React.lazy(() => import('./views/risk_dashboard /risk_dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const FormRisk = React.lazy(() => import('./views/risk/RiskAdd'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))
const CompanysetupAdd = React.lazy(() => import('./views/companysetup/CompanysetupAdd'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Data = React.lazy(() => import('./views/Apis/Data'))
const Details = React.lazy(() => import('./views/Apis/Details'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  
  { path: '/', name: 'Login', element: Login },
  { path: '/Forgot_Password', name: 'Forgot Password', element: Forgot_Password },
  // { path: '/Reset_Password', name: 'Reset Password', element: Reset_Password },
  { path: '/Audit_engagement_report/:engagement_id', name: 'Audit Engagement Report', element: AuditReport },
  { path: '/Home', element: CommonHome , name: 'CommonHome' },
  { path: '/RiskDashboard/', exact: false, name: 'Home' },
  { path: '/Risk_Assesment/', name: 'Risk_Assesment', element: RiskAssesment },
  { path: '/User_Management/', name: 'User_Management', element: User_Management },
  { path: '/Risk/:department_id?', name: 'Risk', element: Risklist },
  { path: '/RiskListing/:param_one/:param_two/:param_three/:param_four', name: 'RiskListing', element: RiskDataList },
  { path: '/Risk_Repository', name: 'RiskRepository', element: Risk_Repository },
  { path: '/Risk_Repositryview/:id', name: 'Risk Repositry ', element: RiskView },
  { path: '/Risk_Repositryupdate/:id', name: 'Risk Repositry ', element: RiskUpdate },
  { path: '/RiskDashboard', name: 'RiskDashboard', element: RiskDashboard },
  { path: '/Riskmatrix', name: 'Risk Matrix', element: RiskMatrix },
  { path: '/policydashboard', name: 'Policy Dashboard', element: PolicyDashboard },
  { path: '/RiskmatrixAdd', name: 'Risk Matrix Add', element: RiskmatrixAdd },
  { path: '/Data', name: 'Data', element: Data},
  { path: '/Audit_program/:id', name: 'Audit Program', element: AuditProgram},
  { path: '/Details', name: 'Details', element: Details},
  { path: '/RiskAdd/:id', name: 'Risk ', element: FormRisk },
  { path: '/Audtdetails/:id', name: 'Tab Bar ', element:NaVbar  },
  { path: '/AuditPrograms/:id', name: 'Tab Bar ', element: Audit_Program_List },
  { path: '/audit/:id', name: 'Audit', element: Formaudit },
  { path: '/AudtAdd/:id', name: 'Audit ', element: AuditAdd },
  { path: '/Department', name: 'Department', element: Department},
  { path: '/Scope/:id', name: 'Scope', element: Scop},
  { path: '/Departmentview/:id', name: 'Department ', element: DepartmentView},
  { path: '/DepartmentAdd', name: 'Department ', element: DepartmentAdd},
  { path: '/updatedepartment/:id', name: 'Update Department', element: Departmentedit },
  { path: '/company-setup', name: 'Company Setup', element: CompanysetupForm },
  { path: '/company-setupAdd', name: 'Company Setup ', element: CompanysetupAdd },
  { path: '/company-setupview/:id', name: 'Company Setup ', element: Company_setup_view },
  { path: '/company_setup_edit/:id', name: 'Company Setup Edit', element: Company_setup_edit },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Audit_Plan', name: 'Audit Plan', element: Audit_Plan },
  { path: '/Audit_Plan_Add/:id?', name: 'Audit Plan ', element: Audit_Plan_Add },
  { path: '/Sub_Function', name: 'Sub Function', element: Sub_Function},
  { path: '/Sub_Add_Function', name: 'Sub  Function', element:Sub_Add_Function },

  { path: '/Sub_edit_Function/:id', name: 'Sub Function Update', element:Sub_edit_Function },
  
  { path: '/regulatrylaw', name: 'Regulatory Law', element: Regulatory_Law },
  { path: '/regulatrylawupdate/:id', name: 'Regulatory Law', element: Regulatory_Law_update },
  { path: '/regulatrylawlist', name: 'Regulatory Law', element: Regulatory_Law_List },
  { path: '/Audit/:id', name: 'Audit', element: Audit_View },
  { path: '/policy', name: 'Policy', element: Policy },
  { path: '/policyupdate/:id', name: 'Policy', element: PolicyUpdate },
  { path: '/policylist', name: 'Policy', element: PolicyList },
  { path: '/Control_Objective_List', name: 'Control Objective ', element: Control_Objective_List },
  { path: '/Control_Objective_Form', name: 'Control Objective ', element: Control_Objective_Form },
  { path: '/Control_Objective_update/:id', name: 'Control Objective ', element: Control_Objective_Update},
  { path: '/Control_List', name: 'Controls', element: Control_List },
  { path: '/Control_Form', name: 'Controls', element: Control_Form },
  { path: '/Control_Update/:id', name: 'Controls', element: Control_Update },
  { path: '/Audit_Program_Repo', name: 'Audit Program Repo', element: Audit_Program_Repo },
  { path: '/Audit_Program_Repo_update/:id', name: 'Audit Program Repo', element: Audit_Program_repo_Update },

  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]
RiskMatrix
export default routes

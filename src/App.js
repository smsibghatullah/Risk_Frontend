import React, { Component, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
import Forgot_Password from './views/pages/login/Forget_Password';
import Reset_Password from './views/pages/login/Reset_Password';
import AuditReport from './views/Audit_Engagement/Audit_Report'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/Forgot_Password" name="Forget" element={<Forgot_Password />} />
            <Route exact path="/Reset_Password/:token" name="Forget" element={<Reset_Password />} />
            <Route exact path='/Audit_engagement_report_print/:engagement_id' name="print_report" element={<AuditReport />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/page404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App

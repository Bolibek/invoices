import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'
import NotFound from './pages/NotFoud/NotFound.jsx'
import InvoiceItemPage from './pages/InvoiceItemPage/InvoiceItemPage.jsx'
import {bgColor} from './constants'

const SignedUser = () => (
  <div
    className={`App font-spartan font-medium h-screen w-screen flex  bg-[${bgColor}]`}
  >
    <InvoiceRoutes />
  </div>
)

const InvoiceRoutes = () => (
  <>
    <Sidebar />
    <div className="mr-[6.5rem]">
      <Routes className="mr-[6.5rem]">
        <Route path="/" element={<Homepage />} />
        <Route path="/invoice/:invoiceId" element={<InvoiceItemPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </>
)

export default SignedUser

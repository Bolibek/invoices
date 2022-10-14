import Modal from 'react-modal/lib/components/Modal'
import {Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'
import NotFound from './pages/NotFoud/NotFound.jsx'
import InvoiceItemPage from './pages/InvoiceItemPage/InvoiceItemPage.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Profile from './pages/Profile.jsx'

Modal.setAppElement('#main')

function App() {
  return (
    <div
      className={`App relative flex flex-row font-spartan font-medium h-full w-full`}
    >
      <Sidebar />
      <div className=" mx-auto">
        <InvoiceRoutes />
      </div>
    </div>
  )
}
const InvoiceRoutes = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  return (
    <Routes>
      {isLoggedIn !== false ? (
        <>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceItemPage />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          {['/', '/signup'].map((path, index) => (
            <Route path={path} element={<SignUp />} key={index} />
          ))}
          <Route path="/signin" element={<SignIn />} />
        </>
      )}
    </Routes>
  )
}

export default App

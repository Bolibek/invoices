import {Fragment} from 'react'
import {useSelector} from 'react-redux'
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
    <div className={`App font-spartan font-medium h-screen w-screen flex`}>
      <Sidebar />
      <div className=" w-[6.5rem]"></div>
      <div className=" mx-auto">
        <InvoiceRoutes />
      </div>
    </div>
  )
}
const InvoiceRoutes = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  // const {isLoggedIn} = useSelector(state => state.invoice)
  console.log(isLoggedIn)
  return (
    <Fragment>
      {isLoggedIn !== false ? (
        <div className=" mx-auto">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/invoice/:invoiceId" element={<InvoiceItemPage />} />
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        <div className="">
          <Routes>
            {['/', '/signup'].map((path, index) => (
              <Route path={path} element={<SignUp />} key={index} />
            ))}
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      )}
    </Fragment>
  )
}

export default App

import {Link, useNavigate} from 'react-router-dom'
import avatar from '../assets/image-avatar.jpg'
import logo from '../assets/logo.svg'
import moon from '../assets/icon-moon.svg'

const Sidebar = () => {
  const userId = JSON.parse(localStorage.getItem('userId'))
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const navigate = useNavigate()

  return (
    <div className="w-[6.5rem] fixed z-30 flex flex-wrap content-between h-[100vh] rounded-r-3xl bg-[#373B53]">
      <div className="w-full h-[6.5rem] bg-purple rounded-tr-3xl flex justify-center items-center">
        <Link to={'/'}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="w-full flex-col flex rounded-br-3xl justify-center items-center">
        <div className="mb-8">
          <img src={moon} alt="img" />
        </div>
        {isLoggedIn === true ? (
          <>
            <div className="rounded-br-3xl border-t flex py-6 px-8 justify-center items-center">
              <Link to={`./user/${userId}`}>
                <img
                  src={avatar}
                  className="w-10 h-10 rounded-full"
                  alt="logo"
                />
              </Link>
            </div>

            <div
              onClick={() => {
                localStorage.setItem('isLoggedIn', JSON.stringify(false))
                localStorage.removeItem('userId')
                localStorage.removeItem('jwt')
                window.location.reload(false)
                navigate('/')
              }}
              className="text-white"
            >
              <Link to={'/signup'}>Sign Out</Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
export default Sidebar

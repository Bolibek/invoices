import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function SignIn() {
  const [logEmail, setLogEmail] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const navigate = useNavigate()

  const handle = async e => {
    try {
      fetch('https://invoice-api-5h9l.onrender.com/signinuser', {
        // fetch('http://localhost:8080/signinuser', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: logEmail,
          password: logPassword,
        }),
      })
        .then(res => res.json())
        .then(data => {
          data && localStorage.setItem('jwt', data.token)
          data && localStorage.setItem('userId', JSON.stringify(data.userId))
          data && localStorage.setItem('isLoggedIn', JSON.stringify(true))
          data && navigate('/')
          data && window.location.reload(false)
        })
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  }
  return (
    <div className=" ml-[6.5rem] font-mono h-[23rem] mt-10  mx-auto flex justify-center px-6 flex-col w-[27.8rem] bg-[#ffffff] p-5 rounded-lg">
      <h2 className="pt-16 text-2xl text-center">Sign in!</h2>
      <div className="px-8 pt-6 pb-8 mb-4 w-[25rem] rounded">
        <label htmlFor="email" className="my-5">
          Email
        </label>
        <input
          id="email"
          value={logEmail}
          onChange={e => setLogEmail(e.target.value)}
          className={
            'w-full mt-1 mb-4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          }
        />

        <label htmlFor="password" className="my-5">
          Password
        </label>
        <input
          id="password"
          type={'password'}
          value={logPassword}
          onChange={e => setLogPassword(e.target.value)}
          className={
            'w-full mt-1 mb-2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          }
        />

        <div className="mb-6 text-center">
          <button
            className="w-full text-lg px-4 py-2 text-[#ffffff] font-bold bg-purple bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={e => {
              e.preventDefault()
              handle()
            }}
          >
            Sign in
          </button>
        </div>
        <hr className="mb-3 border-t" />
        <div className="text-center">
          <Link
            className="inline-block text-sm text-[#0195ff] align-baseline hover:text-blue-800"
            to="/signup"
          >
            No an account yet? Sign up!
          </Link>
        </div>
      </div>
    </div>
  )
}

import {Link, useNavigate} from 'react-router-dom'
import {useAddUserMutation} from '../services/invoiceApi'
import FormInput from '../components/FormInputs/FormInput.jsx'

export default function SignUp() {
  const navigate = useNavigate()
  const [addUser] = useAddUserMutation()
  const handle = async e => {
    e.preventDefault()
    try {
      await addUser({
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
      })
      navigate('/signin')
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  }
  return (
    <div className="ml-[6.5rem] font-mono mt-10 mx-auto flex justify-center px-6 h-[31rem] flex-col w-[27.8rem] lg:w-7/12 bg-[#ffffff] p-5 rounded-lg lg:rounded-l-none">
      <h2 className="pt-2 text-2xl text-center">Create an Account!</h2>
      <form onSubmit={handle} className="px-8 w-[25rem] rounded flex flex-col">
        <FormInput
          inputValue={''}
          labelText={'First Name'}
          inputType={'text'}
          className={
            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          }
          isRegInput={true}
        />
        <FormInput
          inputValue={''}
          labelText={'Last Name'}
          inputType={'text'}
          className={
            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          }
          isRegInput={true}
        />
        <FormInput
          inputValue={''}
          labelText={'Email'}
          inputType={'email'}
          className={
            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          }
          isRegInput={true}
        />
        <FormInput
          inputValue={''}
          labelText={'Password'}
          inputType={'password'}
          className={
            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          }
          isRegInput={true}
        />
        <div className="mb-6  text-center">
          <button
            className="w-full m-auto text-lg px-4 py-2 text-[#ffffff] font-bold bg-purple bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
        <hr className="mb-3 border-t" />
        <div className="text-center">
          <Link
            className="inline-block text-sm text-[#0195ff] align-baseline hover:text-blue-800"
            to="/signin"
          >
            Already have an account? Sign in!
          </Link>
        </div>
      </form>
    </div>
  )
}

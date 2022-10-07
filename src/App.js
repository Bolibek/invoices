import React, {useState} from 'react'
import Modal from 'react-modal/lib/components/Modal'
import SignedUser from './SignedUser.jsx'
import UnsignedUser from './UnsignedUser.jsx'

Modal.setAppElement('#main')

function App() {
  // ! Bunga tegmay turasiz hozircha
  // eslint-disable-next-line no-unused-vars
  const [isSigned, setIsSigned] = useState(true)

  return isSigned ? <SignedUser /> : <UnsignedUser />
}

export default App

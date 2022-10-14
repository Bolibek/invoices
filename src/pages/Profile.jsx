import {useState, useRef, useEffect} from 'react'
import Button from '../components/Button/Button.jsx'
import avatar from '../assets/image-avatar.jpg'
import {useMyProfileQuery} from '../services/invoiceApi'

export default function Profile() {
  const [openWindow, setOpenWindow] = useState(false)
  const [myBackgroundImage, setMyBackgroundImage] = useState(null)
  const [myProfileImage, setMyProfileImage] = useState(null)
  // eslint-disable-next-line
  const [error, setError] = useState(null)
  const buttonsRef = useRef(null)
  const userId = JSON.parse(localStorage.getItem('userId'))
  const {data = {}, isLoading} = useMyProfileQuery(userId)
  const {firstName, lastName, email, backgroundImage, profileImage} = data
  const [myFirstName, setMyFirstName] = useState(firstName)
  const [myLastName, setMyLastName] = useState(lastName)
  useEffect(() => {
    if (data) {
      setMyFirstName(firstName)
      setMyLastName(lastName)
    }
    // eslint-disable-next-line
  }, [])
  const handle = () => {
    const urlArr = []
    try {
      const newData = {
        ...data,
        firstName: myFirstName,
        lastName: myLastName,
      }

      if (myProfileImage && myBackgroundImage) {
        const bgData = new FormData()
        const imageArr = [myBackgroundImage, myProfileImage]
        imageArr.forEach((item, index) => {
          bgData.append('file', item)
          bgData.append('upload_preset', 'invoice')
          bgData.append('cloud_name', 'bolibekjnfjenfjnfjnfpjnfjnfenkjfwjf')
          fetch(
            'https://api.cloudinary.com/v1_1/bolibekjnfjenfjnfjnfpjnfjnfenkjfwjf/image/upload',
            {
              method: 'post',
              body: bgData,
            },
          )
            .then(res => res.json())
            .then(imgData => {
              urlArr.push(imgData.url)
              index === 1 &&
                fetch(`http://localhost:8080/user/${userId}`, {
                  method: 'put',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bekki ${localStorage.getItem('jwt')}`,
                  },
                  body: JSON.stringify({
                    ...newData,
                    backgroundImage: urlArr[0],
                    profileImage: urlArr[1],
                  }),
                })
                  .then(res => res.json())
                  .then(result => {
                    result && window.location.reload(false)
                  })
            })
        })
      }
    } catch (err) {
      setError(err)
    }
  }
  function BottomModal() {
    return (
      <div className="flex justify-between w-[30rem] ml-1">
        <Button
          onClick={() => setOpenWindow(false)}
          buttonKind={'cancel'}
          type={'button'}
        />
        <Button
          buttonKind={'saveChanges'}
          type={'submit'}
          className={'ml-2'}
          onClick={e => {
            e.preventDefault()
            handle()
          }}
        />
      </div>
    )
  }
  return (
    <div className=" flex flex-col mx-auto">
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <div className="">
          {openWindow && (
            <div className="absolute left-0 bg-white w-[1100px] rounded-r-3xl h-full overflow-y-scroll scroll-smooth scroll-mr-8 scroll-pr-3.5">
              <div>
                <div className="pr-14 pl-40 pt-14 pb-16 z-50">
                  <h1 className="font-bold">{'Edit Profile'}</h1>
                  <label htmlFor="firstname" className="my-5">
                    Firstname
                  </label>
                  <input
                    id="firstname"
                    value={myFirstName || firstName}
                    onChange={e => setMyFirstName(e.target.value)}
                    className={
                      'w-full mt-1 mb-4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    }
                  />
                  <label htmlFor="lastname" className="my-5">
                    Lastname
                  </label>
                  <input
                    id="lastname"
                    value={myLastName || lastName}
                    onChange={e => setMyLastName(e.target.value)}
                    className={
                      'w-full mt-1 mb-4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    }
                  />
                  <label htmlFor="background-image" className="my-5">
                    Background Image
                  </label>
                  <input
                    id="background-image"
                    type="file"
                    onChange={e => setMyBackgroundImage(e.target.files[0])}
                    className={
                      'w-full mt-1 mb-4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    }
                  />
                  <label htmlFor="profile-image" className="my-5">
                    Profile Image
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    onChange={e => setMyProfileImage(e.target.files[0])}
                    className={
                      'w-full mt-1 mb-4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    }
                    multiple
                  />
                </div>
                <div
                  ref={buttonsRef}
                  className="mt-2.5 shadow-[0_-60px_70px_-15px_rgba(0,0,0,0.1)] bg-white py-8 pr-14 pl-40 rounded-br-[20px] rounded-tr-[20px] flex sticky bottom-0 justify-between"
                >
                  <BottomModal />
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 shadow bg-white h-[28rem]">
            {/* PROFILE HEADER */}
            <div>
              <div
                className=" w-full flex justify-center"
                style={{height: '348px'}}
              >
                <div className="flex flex-col">
                  <div
                    className={`md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg bg-gradient-to-b from-gray-100 to-purple`}
                    style={{width: '940px', height: '348px'}}
                  >
                    {backgroundImage && (
                      <img
                        src={backgroundImage}
                        alt="Bg"
                        width="940px"
                        height="350px"
                        className="h-[14.5rem]"
                      />
                    )}

                    <div
                      className={`${
                        backgroundImage ? 'mt-[-7rem] ' : 'mt-[7.5rem]'
                      } ml-[16.2rem]`}
                    >
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="profile"
                          className="rounded-full  border-4 border-white w-40 h-40"
                          style={{width: '168px', height: '168px'}}
                        />
                      ) : (
                        <img
                          src={avatar}
                          alt="profile"
                          className="rounded-full  border-4 border-white w-40 h-40"
                          style={{width: '168px', height: '168px'}}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-col mt-5 mb-3.5">
                <h1 className="text-center font-bold text-3xl">
                  {myFirstName || firstName} {myLastName || lastName}
                </h1>
                <div>{email}</div>
                <hr className="full flex self              -center w-2/3 mt-2" />
              </div>
              <div className="w-full flex justify-center my-5">
                <button
                  className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold"
                  onClick={() => setOpenWindow(true)}
                >
                  <i className="bx bx-edit-alt mr-2 text-xl"></i>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

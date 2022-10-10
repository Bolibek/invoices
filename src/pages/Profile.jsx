import {useMyProfileQuery} from '../services/invoiceApi'

export default function Profile() {
  const userId = JSON.parse(localStorage.getItem('userId'))
  const {data = {}, isLoading} = useMyProfileQuery(userId)
  const {firstName, lastName, email} = data
  return (
    <div>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <div>
          <h1>My Profile</h1>
          <div>
            <h2>
              {firstName} {lastName}
            </h2>
            <div>{email}</div>
          </div>
        </div>
      )}
    </div>
  )
}

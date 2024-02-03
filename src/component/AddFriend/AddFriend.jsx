import { React, useEffect, useState, useContext, useMemo} from 'react'
import User from '../User/User'
import UserActionsBar from '../UserActionsBar/UserActionsBar'
import UserService from '../../api/UserService'
import { UserInfoContext } from '../../context/UserInfoContext'
import { NotificationContext } from '../../context/NotificationContext'
import AdditionalOpportunityContext from '../../context/AdditionalOpportunityContext'

import './AddFriend.css'
import { FriendContext } from '../../context/FriendContext'

const AddFriend = () => {
  const [friendName, setFriendName] = useState('')
  const [selectedFriend, setSelectedFriend] = useState(null)

	const {userInfo, setUserInfo} = useContext(UserInfoContext)
	const {notification, setNotification} = useContext(NotificationContext)
  const [id, setId] = useContext(AdditionalOpportunityContext);

  const [friends, setFriends] = useContext(FriendContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    setNotification('Успешно получили список пользователей')

    // setUsers(
    // [
    //   {
    //     id: 1,
    //     login: "Vlad Balashov",
    //     latitude: 54.847260,
    //     longitude: 83.092349
    //   },
    //   {
    //     id: 2,
    //     login: "Stanislav Khomchenko",
    //     latitude: 55.015268,
    //     longitude: 82.889042
    //   }
    // ]
    // )


  }, [])

  // const curFriends = useMemo(() => {
  //   return [...users].filter(user => !friends.includes(user))
  // }, [friends])

  // useEffect(() => {
  //   setUsers([...users].filter(user => !friends.includes(user)))
  // }, [friends])

  // useEffect(() => {
  //   const newUsers = UserService.getUsers(userInfo.login)

  //   newUsers.then(
  //     newUsers => {
  //       if (!newUsers) {
  //         setNotification('Ошибка при получении списка пользователей')
  //       }
  //       else {
  //         setNotification('Успешно получили список пользователей')
  //         setUsers(newUsers)
  //       }
  //     }
  //   )

  //   return setUsers([])
  // }, [])

  const handleClickToUser = (user) => {
    setSelectedFriend(user)
  }

  return (
    <div className="add-frined-container" onClick={() => setId(-1)}>
      <div className="add-friend" onClick={e => e.stopPropagation()}>
        <input className="friend-name-input"
          type="text"
          value={friendName}
          placeholder='Поиск друга'
          onChange={e => setFriendName(e.target.value)}
        />

        <div className="all-users">
          <div className="users-container">
            {
              friends 
                .map(user =>
                  <User
                    key={user.login}
                    user={user}
                    handleClickToUser={handleClickToUser}
                  />
              )
            }
          </div>
        </div>

        <UserActionsBar selectedUserLogin={selectedFriend} users={users} setUsers={setUsers} />
      </div>
    </div>
  )
}

export default AddFriend

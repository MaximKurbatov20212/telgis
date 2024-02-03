import { React, useState, useEffect, useContext } from 'react'
import UserService from '../../api/UserService'
import { UserInfoContext } from '../../context/UserInfoContext'
import './UserActionsBar.css'
import { NotificationContext } from '../../context/NotificationContext'
import { FriendContext } from '../../context/FriendContext'


const UserActionsBar = ({ selectedUserLogin, users, setUsers }) => {
	const { userInfo, setUserInfo } = useContext(UserInfoContext)
	const { notification, setNotification } = useContext(NotificationContext)
  const [friends, setFriends] = useContext(FriendContext)

  // useEffect(() => {
  //   getFriendConfirmation();
  // }, [])


  // const getFriendConfirmation = async () => {
  //   const data = await UserService.getFriendConfirmation()

  //   if (data) {
  //     data.isFriend ?
  //       setNotification(`Пользователь ${data.login} теперь у вас в друзьях`)
  //       :
  //       setNotification(`Пользователь ${data.login} отклонил вашу заявку в друзья`)
  //   }
  //   else {
  //     setNotification(`Пользователь ${data.login} отклонил вашу заявку в друзья`)
  //   }
  //   getFriendConfirmation();
  // }

  const actions = [
    {
      id: 1,
      name: 'Добавить друга' 
    },
    // {
    //   id: 2,
    //   name: 'Удалить друга' 
    // }
  ]

  // const handleClick = async () => {
  //   const res = await UserService.postFriendRequest(userInfo.login, selectedUserLogin)

  //   if (res) {
  //     setNotification(`Заявка в друзья отправлена пользователю ${selectedUserLogin}`)
  //   }
  //   else {
  //     setNotification('Ошибка при отправке заявки в друзья')
  //   }
  // }

  const handleClick = () => {
    setNotification(`Заявка в друзья отправлена пользователю ${selectedUserLogin.login}`)

    setTimeout(
      () => {
        setNotification(`Пользователь ${selectedUserLogin.login} принял вашу заявку`);
        setFriends([...friends, selectedUserLogin])
      }
      , 3000)
  }

  return (
    <div className='user-actions-container'>
      {
      actions.map(action => {
        return (
          <div className="action-container" key={action.id} onClick={() => handleClick(action)} >
            <span className='action'>{action.name}</span>
          </div>
        )
      })
      }
    </div>
  )
}

export default UserActionsBar
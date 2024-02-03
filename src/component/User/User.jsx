import { React, useState, useContext } from 'react'
import Emma from '../../images/Emma.jpg'
import './User.css'
import { FriendContext } from '../../context/FriendContext'

const User = ({user, handleClickToUser}) => {
  const [isSelected, setIsSelected] = useState(false)
  const [friends, setFriends] = useContext(FriendContext)

  return (
    <div onClick={() => {setIsSelected(!isSelected)}}>

      <div 
        className={`user-info-container ${isSelected ? ' selected' : ' noselected'}`}
        onClick={() => handleClickToUser(user) }
      >
        <img src={Emma} alt="avatar" className='user-image'/>

        <span className='user-name'> <b> { user.login } </b> </span> 

      </div>
    </div>
  )
}

export default User

import axios from "axios";

export default class UserService {
  static base_url = "http://localhost:8080/api/user"

  // static async getUsersFromChat(chatId) {
  //   const users = await axios.get(`${this.base_url}/chats/` + chatId)
  //   return users
  // }

  // static async getFriendsByUserId(userId) {
  //   return axios.get("friends/" + userId)
  //     .then(res => console.log(res))
  //     .catch(e => console.log(e))
  // }

  static async getFriendsLocation(login) {
    try {
      const res = await axios.post(`${this.base_url}/location`, { login })

      if (res.status === 200) {
        return res
      }

      console.log("Error: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

  static async postNewUser(login, password) {
    try {
      const res = await axios.post(
        `${this.base_url}/registration`,
        { login, password },
      )

      if (res.status === 200) {
        return res
      }

      console.log("Error: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

  static async postRegisterUser(login, password) {
    try {
      const res = await axios.post(`${this.base_url}/auth`, { login, password })
      
      console.log(res)

      if (res.status === 200) {
        return res.data
      }

      console.log("Error: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

  static async postUserLocationByUserId(login, latitude, longitude) {
    try {
      const res = await axios.put(`${this.base_url}/update/${login}`, {latitude, longitude});
       
      if (res.status === 200) {
        return res.data
      }

      console.log("Не удалось отправить свою локацию: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

  static async postFriendRequest(myLogin, friendLogin) {
    try {
      const res = await axios.post(`${this.base_url}/friends/add/${friendLogin}`, { myLogin })

      if (res.status === 200) {
        return res.data
      }

      console.log("Не удалось отправить заявку в друзья: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

  static async getFriendConfirmation() {
    try {
      const res = await axios.get(`${this.base_url}/friends/confirm/`)

      if (res.status === 200) {
        return res.data
      }

      console.log("Ошибка при получении ответа от друга: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

  static async postFriendInvitation(userId, frinedId) {
    return await axios.post("http://localhost/users");
  }

  static async getUsers(login) {
    try {
      const res = await axios.get(`${this.base_url}/friends/${login}`)

      if (res.status === 200) {
        return res.data
      }

      console.log("Ошибка при получении друзей: " + res.status + res.statusText)
      return null
    }

    catch(e) {
      console.log(e)
      return null
    }
  }

}

import { urlAuth } from "./utils"

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
}

export const register = async ({ password, email }) => {
  const res = await fetch(`${urlAuth}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  return checkResponse(res)
}

export const authorize = async ({ password, email }) => {
  const res = await fetch(`${urlAuth}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  return checkResponse(res)
}

export const checkToken = async (token) => {
  const res = await fetch(`${urlAuth}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return checkResponse(res)
}

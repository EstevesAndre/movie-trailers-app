import Axios from 'axios'

import { REACT_APP_API_URL } from '@/config'
// import { useNotificationStore } from '@/hooks/useNotificationStore'

export const axios = Axios.create({
  baseURL: REACT_APP_API_URL,
})

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.log(message)
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // })

    // return Promise.reject(error)
  }
)
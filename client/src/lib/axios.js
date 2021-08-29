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
  () => {
    // const message = error.response?.data?.message || error.message

    // return {
    //   status: error?.response?.status,
    //   isError: true,
    //   isSuccess: false,
    //   isLoading: false,
    //   message: message
    // }
    // return error
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // })

    // return Promise.reject(error)
  }
)
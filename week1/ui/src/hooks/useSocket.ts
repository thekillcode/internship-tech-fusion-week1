// src/hooks/useSocket.ts
import { useEffect, useCallback, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Slide, toast } from 'react-toastify'
import { useAppDispatch } from '@/store/hooks'
import { setSocketId } from '@/store/generalSlice'
import { getBaseUrl } from '@/lib/utils'

interface NotificationData {
  message: string
  sender: string
  timestamp: string
  user_id: string
}

export const useSocket = () => {
  const dispatch = useAppDispatch()
  const [socket, setSocket] = useState<Socket | null>(null)

  const connect = useCallback(() => {
    const newSocket = io(getBaseUrl(8000), {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      withCredentials: true,
      autoConnect: true,
    })

    newSocket.on('connect', () => {
      dispatch(setSocketId(newSocket.id!))
      console.log('Socket connected:', newSocket.id)
    })

    newSocket.on('disconnect', () => {
      dispatch(setSocketId(null))
      console.log('Socket disconnected')
    })

    newSocket.on('notification', (data: NotificationData) => {
      toast.info(`${data.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
        toastId: "global-notification",
        updateId: "global-notification",
      })
      console.log('Notification received:', data)
    })

    setSocket(newSocket)
    return newSocket
  }, [])

  const disconnect = useCallback(() => {
    socket?.disconnect()
    setSocket(null)
  }, [socket])

  useEffect(() => {
    const socketInstance = connect()
    return () => {
      socketInstance.disconnect()
    }
  }, [connect])

  return {
    socket,
    connect,
    disconnect,
  }
}
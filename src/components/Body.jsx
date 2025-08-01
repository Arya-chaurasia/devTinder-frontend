import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true
      })
      dispatch(addUser(res.data))
    } catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      console.error(err, "error")
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <div className="fixed w-full z-30">
        <Navbar />
      </div>
      {/* <main className="flex-grow px-4 py-6 max-w-screen-lg mx-auto"> */}
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-5xl mx-auto py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Body

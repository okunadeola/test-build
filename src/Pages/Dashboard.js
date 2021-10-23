import React from 'react'
import Header from '../components/Header'
import './Dashboard.css'
import Table from '../components/Table'
import Request from '../components/Request'
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react'

const Dashboard = () => {

  const [loggedin, setLoggedin] = useState(localStorage.getItem("loan"))


  // guard
  const push = () => {
    if (!loggedin) {
      alert("unathorized")
      history.push("/login")
    }
  }

  useEffect(() => {
    push()
  }, [])

  const history = useHistory()

  return (
    <div className="wrapper">
      <Header />
      <Table />
      <Request />
    </div>
  )
}

export default Dashboard

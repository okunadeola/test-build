import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../credit.PNG'
import loading from '../loading.gif'
import QRCode from 'qrcode'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'



const Qrcode = () => {
  const [code, setCode] = useState('')

  // fetching user from redux store
  const user = useSelector(state => state.userData.user)

  const history = useHistory()

  const loggedin = () => {
    history.push("/login")
  }

  useEffect(() => {
    send()
  }, [])


  // api setup
  const send = async () => {
    if (user) {

      // headers setup
      const API = axios.create({ baseURL: 'https://whatsapp.creditclan.com/api/sender/generate/qr' });
      API.interceptors.request.use((req) => {
        req.headers.common['x-api-key'] = "dsfhfjkdsfhdjkf"
        return req;
      });
      const body = {
        "phone": user.phone
      }
      const { data } = await API.post("/", body)
      if (data.status === true) {
        return QRCode.toDataURL(data.data.qrcode).then(setCode)
      }
    }
  }






  return (
    <div className="wrappers">
      <div className="imgContainer">
        <div className="image">
          <img className="img" src={logo} alt="" />
        </div>
      </div>

      <div className="contentContainer">
        <div className="logoContainer">
          <div className="imgRound"><img className="logo" src={logo} alt="logo" /></div>
        </div>
        {code ? (
          <div>
            <img src={code} alt="qrcode" />

            <br /> <br />
            <p id="a" onClick={loggedin}>Log in</p>
          </div>
        ) :

          (
            <div>
              <img src={loading} alt="qrcode" />
            </div>
          )}

      </div>

    </div>
  )
}

export default Qrcode

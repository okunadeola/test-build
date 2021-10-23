import React, { Fragment, useState } from 'react'
import './Login.css'
import image from '../side2.png'
import logo from '../credit.PNG'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setData } from '../actions/userData';
import { useHistory } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"


// validation setup
const myValidation = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address").required("This field is required"),
  password: Yup.string().min(8, "minimum of 8 characters").required("This field is required"),

})


const Login = () => {
  let [inp] = useState([{ type: "email", name: "email", label: "Email" }, { type: "password", name: "password" }])

  const myFunc = (values, { resetForm, ...allTheValues }) => {
    send(values)
    resetForm()
  }

  // form initial data
  const myObj = {
    email: "",
    password: ""
  }

  const dispatch = useDispatch()
  const history = useHistory()

 
// api and route setup
  const send = async (loginInfo) => {
    const { data } = await axios.post("https://api-collections.creditclan.com/api/v2/account/login", loginInfo)

    if (data.status === true) {
      const { data } = await axios.post("https://api-collections.creditclan.com/api/v2/account/dashboard")
      localStorage.setItem("loan", 'true')
      dispatch(setData(data.loans));
      history.push("/dashboard")
    } else {
      localStorage.setItem("loan", 'false')
    }
  }

  const register = () => {
    history.push('/')
  }


  // password switch setup
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="wrappers">
      <div className="imgContainer">
        <div className="image">
          <img className="img" src={image} alt="" />
        </div>
        <div className="textContainer">
          <span>Welcome! sign up into your dashboard <br /> to manage your customers, users and Whatsapp chats</span>
        </div>
      </div>

      <div className="contentContainer">
        <div className="logoContainer">
          <div className="imgRound"><img className="logo" src={logo} alt="logo" /></div>
        </div>
        <span className="signin">Sign in</span>
        <div className="formContainer">

        
          <Formik initialValues={myObj}
            validationSchema={myValidation}
            onSubmit={myFunc}>
            {({ values, touched, ...errors }) => (
              <Form className="form">
                {inp.map((val, i) => (
                  <Fragment key={i}>
                    {val.name === "password" ? (
                      <div className="form-group">
                        <label className="label" htmlFor="">Password</label>
                        <div className="inputWrap">
                          <Field className="input" placeholder={val.name} name={val.name} type={showPassword ? 'text' : 'password'} />
                          <div id="showPassword" onClick={handleShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </div>
                        </div>
                        <div className="errorMessage">
                          <ErrorMessage name={val.name} />
                        </div>
                      </div>
                    ) : (
                      <div className="form-group">
                        <div>
                          <label className="label" htmlFor={val.name}>{val.label}</label>
                          <Field className="input" placeholder={val.name} name={val.name} type={val.type} />
                          <div className="errorMessage">
                            <ErrorMessage name={val.name} />
                          </div>
                        </div>
                      </div>
                    )}


                  </Fragment>
                ))}
                    <p id="a">Forgot Password?</p>
                    <button className="button" style={{ backgroundColor: "purpleLight" }} type="submit">Signin</button> <br /><br />
                    <div className="">
                      <span className='info'>Dont have an account <a id="a" onClick={register}> Sign up</a></span>
                    </div>

              </Form>
            )}
          </Formik>


        </div>
      </div>

    </div >
  )
}

export default Login












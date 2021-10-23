
import React, { Fragment, useState } from 'react'
import './Login.css'
import './Register.css'
import image from '../side2.png'
import logo from '../credit.PNG'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { setUser } from '../actions/userData'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"


// validation setup
const myValidation = Yup.object().shape({
  phone: Yup.string().min(11, "minimum is 11").max(11, "maximum of 11").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "please enter a valid number").required("This field is required"),

  email: Yup.string().email("Please enter a valid email address").required("This field is required"),
  password: Yup.string().min(8, "minimum of 8 characters").required("This field is required"),
  fullname: Yup.string().min(8, "minimum of 8 characters").required("This field is required")

})         


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [radio, setRadio] = useState("")
  let [inp] = useState([{ type: "email", name: "email", label: "Email" }, { type: "text", name: "phone", label: "Phone" }, { type: "radio", name: "account" }, { type: "text", name: "fullname", label: "Fullname" }, { type: "password", name: "password" }])


  const handleShowPassword = () => setShowPassword(!showPassword);

// form submittion handle
  const submitForm = (values, { resetForm, ...allTheValues }) => {
    if (radio) {
      if (radio === "Individual") {
        values.account = "Individual"
      } else {
        values.account = "Business"
      }
      send(values)
      resetForm()
    } else {
      alert("all field must be filled")
    }

  }

  // form initial values
  const formObj = {
    phone: "",
    account: '',
    fullname: "",
    email: "",
    password: ""
  }


  const toggleRadio = (val) => {
    if (val === 1) {
      setRadio("Individual")
    } else {
      setRadio("Business")
    }
  }


  const history = useHistory()
  const dispatch = useDispatch()


// api and route handle
  const send = async (info) => {
    const { data } = await axios.post("https://api-collections.creditclan.com/api/v2/account/register", info)
    dispatch(setUser(info));

    if (data.status === true) {
      history.push('/qr')
    }
  }


  const login = () => {
    history.push('/login')
  }


  return (
    <div className="wrappers">
      <div className="imgContainer">
        <div className="image">
          <img className="img" src={image} alt="" />
        </div>
      </div>

      <div className="contentContainer">
        <div className="logoContainer">
          <div className="imgRound"><img className="logo" src={logo} alt="logo" /></div>
        </div>
        <div className="formContainer">
          <Formik initialValues={formObj}
            validationSchema={myValidation}
            onSubmit={submitForm}>
            {({ values, touched, ...errors }) => (
              <Form className="form">
                {inp.map((val, i) => (
                  <Fragment key={i}>
                    {val.name !== "account" && val.name !== "password" ? (
                      <div className="form-group">
                        <div>
                          <label className="label" htmlFor={val.name}>{val.label}</label>
                          <Field className="input" placeholder={val.name} name={val.name} type={val.type} />
                          <div className="errorMessage">
                              <ErrorMessage name={val.name} />
                            </div>
                        </div>
                      </div>
                    ) : (
                      <div>
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
                            <label className="label" htmlFor="">Account type</label>
                            <div className="radio">
                              <input name="rad" type="radio" onClick={() => toggleRadio(1)} />
                              <label className="label lb" >Individual</label>
                              <input className="radioMargin" onClick={() => toggleRadio(2)} name="rad" type="radio" />
                              <label className="label lb" >Business</label>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </Fragment>
                )
                )}
                <button className="button" style={{ backgroundColor: "blue" }} type="submit">Creat account</button>
                <div className="footer">
                  <span className='info'><a id="a" onClick={login}>Sign in</a> to your account</span>
                </div>

              </Form>
            )}

          </Formik>

        </div>
      </div>

    </div>
  )
}

export default Register
















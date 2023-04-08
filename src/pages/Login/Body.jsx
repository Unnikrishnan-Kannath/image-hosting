import "./Body.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link , useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth, logIn } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Body() {
  const [inputGroup,setInputGroup] =useState({});
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);
  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    logIn(inputGroup.email, inputGroup.password);
  }
  const handleChange = (name,e) =>{
    const input = {};
    input[name] = e.target.value;
    setInputGroup({...inputGroup,...input})
  }
  return (
    <div className="body_main_wrapper">
      <div className="login_main_wrapper">
        <h2>Log in</h2>
        <Form className="form_main_wrapper" onSubmit={onSubmit}>
          <Form.Group className="mb-12" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control
              className="form_control"
              type="email"
              placeholder="Enter email"
              onChange={(e) => handleChange("email",e)}
            />
          </Form.Group>

          <Form.Group className="mb-12" controlId="formBasicPassword">
            {/* <Form.Label></Form.Label> */}
            <Form.Control
              className="form_control"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange("password",e)}
            />
          </Form.Group>
          <Button
            className="form_control_button"
            variant="primary"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      </div>
      <div className="login_sub_area">
        <div className="form_control_text_area">New? <Link to='/sign-up'>Create an account</Link></div>
      </div>
    </div>
  );
}

export default Body;

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { auth, signUp } from "../../firebase";
import Button from "react-bootstrap/Button";
import { useAuthState } from "react-firebase-hooks/auth";

function Body() {
  const [inputGroup, setInputGroup] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const handleChange = (name, e) => {
    const input = {};
    input[name] = e.target.value;
    setInputGroup({ ...inputGroup, ...input });
  };
  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    signUp(inputGroup.name, inputGroup.email, inputGroup.password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);
  return (
    <div className="body_main_wrapper">
      <div className="login_main_wrapper" style={{ marginTop: "7rem" }}>
        <h2>sign up</h2>
        <Form className="form_main_wrapper" onSubmit={onSubmit}>
          <Form.Group className="mb-12" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control
              className="form_control"
              type="email"
              placeholder="Enter email"
              onChange={(e) => handleChange("email", e)}
            />
          </Form.Group>
          <Form.Group className="mb-12" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control
              className="form_control"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => handleChange("name", e)}
            />
          </Form.Group>

          <Form.Group className="mb-12" controlId="formBasicPassword">
            {/* <Form.Label></Form.Label> */}
            <Form.Control
              className="form_control"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange("password", e)}
            />
          </Form.Group>
          <Form.Group className="mb-12" controlId="formBasicPassword">
            {/* <Form.Label></Form.Label> */}
            <Form.Control
              className="form_control"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => handleChange("confirm", e)}
            />
          </Form.Group>
          <Button
            disabled={
              !(inputGroup.password && inputGroup.confirm) ||
              inputGroup.password !== inputGroup.confirm
            }
            className={
              !(inputGroup.password && inputGroup.confirm)
                ? "form_control_button_disabled"
                : inputGroup.password !== inputGroup.confirm
                ? "form_control_button_disabled"
                : "form_control_button"
            }
            variant="primary"
            type="submit"
          >
            Sign-up
          </Button>
        </Form>
      </div>
      <div className="login_sub_area">
        <div className="form_control_text_area">
          Already have an account?? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Body;

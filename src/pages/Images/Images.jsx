import React from "react";
import Header from "../Login/Header";
import Body from "./Body";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase";

function Images() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header page="images" />
      <Body />
      <div className="button-bottom-left">
      <Button
          style={{ backgroundColor: "#007bff" }}
          onClick={() => navigate("/home")}
        >
          Upload
        </Button>
      </div>
    </>
  );
}

export default Images;

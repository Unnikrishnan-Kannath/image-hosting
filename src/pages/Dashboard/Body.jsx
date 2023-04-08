import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import BlockUpload from "../../components/BlockUpload";
import "./Body.css";
import { withImageContext } from "../../components/Context";

function Body(props) {
  const [upload, setUpload] = useState(null);
  const [buttonActive, setButtonActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const navigate = useNavigate();
  const onLogOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const uploadImage = () => {
    if (upload) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", upload);
      formData.append("upload_preset", "fqhpimf7");
      formData.append("api_key", "757132437719538");
      const options = {
        method: "POST",
        body: formData,
      };
      return fetch(
        "https://api.Cloudinary.com/v1_1/:dj9jn7jgf/image/upload",
        options
      )
        .then((res) => res.json())
        .then((res) => {
          alert("image added successfully");
          props.ctx_image.update([...props.ctx_image.images, res.secure_url]);
          setUploadUrl(res.secure_url);
          setUpload(null);
          setButtonActive(true);
          setUploading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleChange = (file) => {
    setUpload(file);
    setButtonActive(false);
  };
  return (
    <div className="body_main_wrapper">
      <div className="dashboard_block_upload">
        <BlockUpload value={upload} onChange={handleChange} />
        <div className="dashboard_buttons">
          <Button disabled={buttonActive || uploading} onClick={uploadImage}>
            {uploading ? <span>Uploading...</span> : "Upload"}
          </Button>
        </div>
      </div>
      <div className="button-bottom-right">
        <Button
          style={
            props.ctx_image.images.length > 0
              ? { backgroundColor: "#007bff" }
              : { backgroundColor: "none" }
          }
          disabled={!props.ctx_image.images.length > 0}
          onClick={() => {
            props.ctx_image.images.length > 0 && navigate("/images");
          }}
        >
          Images
        </Button>
      </div>
      <div className="button-bottom-left">
        <Button style={{ backgroundColor: "#007bff" }} onClick={onLogOut}>
          Log-Out
        </Button>
      </div>
    </div>
  );
}

export default withImageContext(Body);

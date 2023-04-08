import React, { useState, useEffect, useRef } from 'react';
import { withImageContext } from "../../components/Context";
import { Dropdown, Modal } from "react-bootstrap";

function Body(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const modalRef = useRef(null);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };
  return (
    <>
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button onClick={handleCloseModal}>Close</button>
            <img
              src={selectedImage}
              alt="Selected Image"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {props.ctx_image.images.map((image, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
              maxWidth: "35%",
            }}
          >
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ maxWidth: "100%", height: "20rem" }}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default withImageContext(Body);

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./BlockUpload.css";

function BlockUpload(props) {
  const [inputGroup, setInputGroup] = useState(null);
    useEffect(() => {
      setInputGroup(props.value);
    }, [props.value]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    onDrop: useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      props.onChange(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setInputGroup(reader.result);
      };
      reader.readAsDataURL(file);
    }, []),
  });
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setInputGroup({});
    props.onChange(false);
  };
  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      {inputGroup ? (
        <>
        <img src={inputGroup} alt="Preview" style={{ maxWidth: "100%" , maxHeight:"50%" }} />
        <p>preview</p>
        <button style={{background:"red",color:"white",border:"none",borderRadius:"2px"}} onClick={(e) => handleRemove(e)}>Remove</button>
        </>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default BlockUpload;

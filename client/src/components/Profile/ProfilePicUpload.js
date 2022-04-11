import { Box } from "@mui/material";
import React, { useRef } from "react";
import logoAddImage from "../../assets/logo_add_image.svg";
import useStyles from "./styles";
import axios from "axios";

const ProfilePicUpload = ({ image, setImage }) => {
  const classes = useStyles();

  const imgInputBtn = useRef();

  const imageChangeHandler = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "huwen6ob");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/drvdgcaqf/image/upload`,
        formData
      );
      console.log("imgResp", response);
      setImage(response.data.secure_url);
    } catch (error) {
      console.log("imgErr", error.response);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <img
        src={!image ? logoAddImage : image}
        // src={resume?.image ? resume.image : logo}
        alt="profilePic"
        className={classes.profilePic}
        onClick={() => imgInputBtn.current.click()}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={imgInputBtn}
        onChange={imageChangeHandler}
      />
    </Box>
  );
};

export default ProfilePicUpload;

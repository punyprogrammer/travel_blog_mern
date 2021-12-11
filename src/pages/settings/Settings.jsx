import React, { useContext, useState } from "react";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../contexts/Context";
import axios from "axios";
import { projectStorage } from "../../firebaseConfig";
import firebase from "firebase";
const PF = "https://amar-blog.herokuapp.com/images/";
const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    const fileName = file.name + Date.now();
    const uploadTask = projectStorage.ref(`images/${fileName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        projectStorage
          .ref("images")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setUploading(false);
          });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const newUser = {
      userId: user._id,
      username,
      email,
      password,
      profilePic: url,
    };
    try {
      const res = await axios.put(
        "https://amar-blog.herokuapp.com/api/users/" + user._id,
        newUser
      );
      // alert('Account details updated!!')
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : `${user.profilePic}`}
            />
            <label htmlFor="fileInput">
              <i class="settingsPPIcon fas fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <button className="uploadButton" disabled={uploading} onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
            )}
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;

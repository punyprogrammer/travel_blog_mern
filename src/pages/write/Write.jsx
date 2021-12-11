import React, { useState, useContext } from "react";
import { Context } from "../../contexts/Context";
import "./write.css";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { projectStorage } from "../../firebaseConfig";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [published, setPublished] = useState(false);
  const [newpost, setNewpost] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const { user } = useContext(Context);
  const history = useLocation();
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
    const newPost = {
      title,
      desc,
      username: user.username,
      photo: url,
    };

    try {
      const res = await axios.post(
        "https://amar-blog.herokuapp.com/api/posts",
        newPost
      );
      setNewpost(res.data);
      setPublished(true);
    } catch (error) {}
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}

      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus-circle"></i>
            {file && (
              <button
                className="uploadBtn"
                disabled={uploading}
                onClick={handleUpload}
              >
                {uploading ? "Uploading" : "Upload"}
              </button>
            )}
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story here"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="submitStory" type="submit">
          Publish
        </button>
        {newpost && (
          <Link to={`/post/${newpost._id}`}>
            <span className="submitStory">Click here to view you story</span>
          </Link>
        )}
      </form>
    </div>
  );
};

export default Write;

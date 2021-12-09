import React, { useState, useContext } from "react";
import { Context } from "../../contexts/Context";
import "./write.css";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [published, setPublished] = useState(false);
  const [newpost, setNewpost] = useState(null);

  const { user } = useContext(Context);
  const history = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://amar-blog.herokuapp.com/api/upload", data);
      } catch (error) {}
    }
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

import React, { useState, useEffect, useContext } from "react";
import "./singlepost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/Context";

const SinglePost = () => {
  //for update state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const PF = "https://amar-blog.herokuapp.com/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  //useEffect for fetching apis
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `https://amar-blog.herokuapp.com/api/posts/${path}`
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchPost();
  }, [path]);
  //Delete handler
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://amar-blog.herokuapp.com/api/posts/${path}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/");
    } catch (error) {}
  };
  //update handler
  const handleUpdate = async () => {
    try {
      await axios.put(`https://amar-blog.herokuapp.com/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
            autoFocus
          ></input>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {user && post.username === user.username && (
              <span className="singlePostEditContainer">
                <i
                  className="singlePostIcon fas fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>

                <i
                  className="singlePostIcon fas fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </span>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <Link className="link" to={`/?user=${post.username}`}>
            <span className="singlePostAuthor">
              <b>Author:</b> {post.username}
            </span>
          </Link>
          <span className="singlePostDate">
            <b>Posted:</b> {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;

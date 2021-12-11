import "./post.css";
import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  console.log(PF + post.photo);
  return (
    <div className="post">
      {post.photo && <img src={post.photo} alt="" className="postImg" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <div className="postDesc">{post.desc};</div>
      </div>
    </div>
  );
};

export default Post;

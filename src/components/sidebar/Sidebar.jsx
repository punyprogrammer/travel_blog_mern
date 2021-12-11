import "./sidebar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'multipart/form-data',
  },
};
export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get(
        "https://amar-blog.herokuapp.com/api/categories"
      );
      setCats(res.data);
    };
    fetchCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://scontent.fccu7-1.fna.fbcdn.net/v/t39.30808-6/212249924_1602060433332864_6480031273719062145_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=hYtCPHDrnpYAX_lIIR6&_nc_ht=scontent.fccu7-1.fna&oh=14709951c488a3139f36da9341596cde&oe=61B6FCFB"
          alt=""
          className="sidebarImg"
        />
        <p className="sidebarText">
          Hi,I am Amardeep a final year undergrad.I love playing blues and
          aspire to witness the aurora borealis some day.
        </p>
      </div>
      <div className="sidebarItem">
        {/* <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <li className="sidebarListItem">
              <Link className="link" to={`/?cat=${cat.name}`}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">FOLLOW US</div>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          <i className="sidebarIcon fa-brands fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}

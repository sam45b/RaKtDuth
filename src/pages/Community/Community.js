import "./Community.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scoreImg from "../../pages/Profile/high-score.png";
import blog from "./Blog.png";

export default function Community() {
  return (
    <div className="post-body">
      <div className="cummunity-heading">
        <h1 className="heading"> 🎉 Welcome to Our Community! </h1>
      </div>

      <div className="title">
        <p>
          Join us in sharing stories, experiences, and updates. Engage with
          others through our Leaderboard and explore our latest articles. Feel
          free to participate, comment, and connect with fellow members.
        </p>
      </div>

      <hr />

      <div className="stats">
        <Link to="/community/leaderboard" className="stat score">
          <div className="info">
            <h1>Leaderboard</h1>
            <img src={scoreImg} alt="img" />
          </div>
        </Link>

        <Link to="/community/blogs" className="stat donations">
          <div className="info">
            <h1>Blogs</h1>
            <img src={blog} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
}

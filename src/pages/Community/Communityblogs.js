import OnlineUsers from "./OnlineUsers";
import "./Community.css";

import { useCollection } from "../../hooks/useCollection";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import React from "react";

export default function Communityblogs() {
  const { error, documents } = useCollection("communityPosts", null, [
    "createdAt",
    "desc",
  ]);

  return (
    <>
      <div>
        <h1 className="heading">📝 Latest Articles and Insights</h1>
      </div>

      <div className="title">
        <p>
          Dive into our latest articles and gain valuable insights on various
          topics. From tips and guides to inspiring stories, there's something
          for everyone. Stay informed and be part of the conversation!
        </p>
      </div>

      <hr />

      <div>
        {!documents && <div className="loading">Loading blogs.....</div>}

        {documents &&
          documents.map((blog) => (
            <div className="blog" key={blog.title}>
              <Link to={`/community/blogs/${blog.id}`}>
                <div className="title">
                  <h1>{blog.title}</h1>
                </div>

                <div className="blog-date">
                  <p> date: {blog.date}</p>
                </div>

                <div className="blog-body">
                  <article>
                    {blog.body.substring(0, 500)}
                    <span>......Readmore</span>
                  </article>
                </div>

                <div className="createdAt">
                  <p>
                    {formatDistanceToNow(blog.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

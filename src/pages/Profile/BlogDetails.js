import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import "./BlogDetails.css"
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function BlogDetails() {
  const { user } = useAuthContext();
  const { id, bid } = useParams();
  const { document, error } = useDocument('users', id);
  const { deleteDocument, updateDocument } = useFirestore("users"); // useFirestore without specifying collection
  const { deleteDocument:deleteBlog } = useFirestore("AllBlogs"); // useFirestore without specifying collection

  const history = useHistory();

  if (!document) {
    return <div className='loading'>Loading.....</div>;
  }

  if (!document.blogs || document.blogs.length === 0) {
    return <div className='loading'>Blog not found</div>;
  }

  // Find the specific blog post by ID (bid) within the blogs array
  const blog = document.blogs.find((blog) => blog.id === Number(bid));

  if (!blog) {
    return <div className='loading'>Blog not found</div>;
  }

  const createdAtDate = blog.createdAt?.toDate(); // Convert createdAt to Date object

  const handleDelete = async () => {
    try {
      // Delete the blog post from 'AllBlogs' collection
      await deleteDocument(bid);

      // await deleteBlog();

      // Update the user's document to remove the deleted blog from blogs array
      const updatedBlogs = document.blogs.filter((b) => b.id !== Number(bid));
      const updatedUser = { ...document, blogs: updatedBlogs };

      await updateDocument( id, updatedUser);

      // Redirect user to their blog list after successful deletion
      history.push(`/profile/${user.uid}/blogs`);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="blog-body">
      
      
      <div className="blog">
      <button className='btn' onClick={handleDelete}>delete</button>

        <div className="title">
          <h1>{blog.title}</h1>
        </div>

        <div className='blog-image'>
          <img src={blog.thumbnailUrl} alt="" />
        </div>

        <div className="blog-date">
          <p>Date: {blog.date}</p>
        </div>

        <div className="blog-body">
          <article>{blog.body}</article>
        </div>

        <div className="createdAt">
          {createdAtDate && (
            <p>
              {formatDistanceToNow(createdAtDate, {
                addSuffix: true,
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PostComments from './PostComments';
import "./PostDetails.css"
export default function PostDetails() {
  const { pid } = useParams();
  const { document, error } = useDocument('communityPosts', pid);

  return (
    <>
      {!document && <div className='loading'>Loading.....</div>}

        <div className="blog-body">


      {document && (
        <div className="blog" key={document.title}>

          <div className="title">
            <h1>{document.title}</h1>
          </div>

          <div className='blog-image'>
                <img src={document.thumbnailUrl} alt="" />
        </div>

          <div className="blog-date">
            <p> date: {document.date}</p>
          </div>

          <div className="blog-body">
            <article>{document.body}</article>
          </div>

          <div className="createdAt">
            <p>
              {formatDistanceToNow(document.createdAt.toDate(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}
    </div>

    {document && <div className="comment-section">
      <PostComments post = {document} />
    </div>}
    </>


  );
}

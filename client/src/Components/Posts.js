import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../Features/PostSlice";
import moment from "moment";
import { likePost } from "../Features/PostSlice";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const {user} = useSelector((state) => state.users);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: user._id,
    };
  
  dispatch(likePost(postData));
  navigate("/");
  };

  return (
    <div className="postsContainer">
      <table className="table table-striped">
        <thead></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.email}</td>
              <td>
                <p> {moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes.count})
                </p>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
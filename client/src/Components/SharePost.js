import {Button,Col,Container,Row,Input} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePost } from "../Features/PostSlice";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.users) 

  const handlePost = async () => {
    if (!postMsg.trim()) {
      dispatch(savePost(postData)); 
      setpostMsg(""); 
      alert("Post message is required.");
      return;
    }

    const postData = {
      postMsg: postMsg,
      email: user.email,
    };

    dispatch(savePost(postData));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={(e) => setpostMsg(e.target.value)}
          />
          <h1></h1>
          <Button onClick={handlePost}> PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;

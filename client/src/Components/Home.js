import Posts from "./Posts";
import SharePosts from "./SharePost";
import User from "./User";
import { Row, Col, Container } from "reactstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLogin } = useSelector(state => state.users)
    const navigate = useNavigate()
    useEffect(() => {
      if (!isLogin) { navigate("/login") }
    },[isLogin])

  return (
    <Container>
      <Row>
        <Col md={3}>
          <User />
        </Col>
        <Col md={9}>
          <SharePosts />
        </Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={9}>
          <Posts />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
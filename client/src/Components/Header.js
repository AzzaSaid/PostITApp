import { Navbar, Nav, NavItem, Container } from "reactstrap";
import logo from "../Images/logo-t.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout())
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  }

  return (
    <Container>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
              <img src={logo} className="logo" alt=""/>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
          <Link onClick={handleLogout}>Logout</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
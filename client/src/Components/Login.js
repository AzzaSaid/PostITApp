import { Button,Container,Row,Col } from "reactstrap";
import { useState, useEffect  } from "react";
import { loginSchemaValidation } from "../Validations/LoginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
  
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const { user, status, isLogin, msg}  = useSelector((state) => state.users);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm ({
      resolver: yupResolver(loginSchemaValidation),
    });
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const onSubmit = () => {
        const userData = {
            email: email,
            password: password,   
        };
        dispatch(login(userData))
    };

    useEffect(() => { 
        if (isLogin) 
           navigate("/")
        else 
           navigate("/login")
      },[isLogin]);    
  
    return (
      <Container fluid>
        <Row className="formrow">
          <Col className="columndiv1" lg="6">
            {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
            <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="appTitle"></div>
              <section className="form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email..."
                    {...register("email", {
                      onChange: (e) => setemail(e.target.value),
                    })}
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password..."
                    {...register("password", {
                      onChange: (e) => setpassword(e.target.value),
                    })}
                  />
                  <p className="error">{errors.password?.message}</p>
                </div>
                <Button type='submit' color="primary" className="button">
                  Sign In
                </Button>
              </section>
            </form>
          </Col>
          <Col className="columndiv2" lg="6"></Col>
        </Row>
        <Row>
          <div>
            <h1> </h1>
            <h3>Server Response</h3>
            <h4>{msg}</h4>
          </div>
        </Row>
      </Container>
    );
  };
  
  export default Login;
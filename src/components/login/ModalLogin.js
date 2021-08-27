import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Modal,
  Segment,
} from "semantic-ui-react";
import "./ModalLogin.css";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
// import { actions as menuActions } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators as userAction } from "../../redux/reducers/user";

function ModalLogin(props) {
  // const { setIsSignedIn } = props;

  //    [변수명, setter함수]
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);

  console.log(user);

  //    [쿠키값, 쿠키setter, 쿠키삭제]          = 쿠키 초기값
  const [cookies, setCookie, removeCookie] = useCookies([""]);
  // yarn add universal-cookie로 대체할지 고민

  // login 관련 테스트
  const login = () => {
    axios({
      method: "POST",
      // url: "https://cafe-wiki-spring.herokuapp.com/login",
      url: "http://localhost:8080/login",
      data: {
        email: email,
        pswd: pswd,
      },
      // responseType: "type",
    }).then((res) => {
      // cookie에 token 저장
      const jwt = res.data.resultData;
      setCookie("jwt", jwt, { path: "/" });

      // token에서 userInfo 추출
      const decodedJwt = jwt_decode(jwt);
      const userInfo = decodedJwt.userInfo;

      // dispatch(menuActions.setUser(userInfo)); // redux에 userInfo 저장 - redux test

      // localstorage 등 중에 userInfo 저장
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // setIsSignedIn
      // setIsSignedIn(true);

      // setIsSignedInRedux
      dispatch(userAction.setLogin(true));

      // 닫기
      setOpen(false);

      // window.location.reload();
    });
  };

  const handleInputId = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPswd = (e) => {
    setPswd(e.target.value);
  };

  return (
    <Modal
      className="modal-login"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="login-box">Login</Button>}
    >
      <Modal.Content>
        <Modal.Description>
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column>
              <Header as="h2" textAlign="center">
                로그인
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={email}
                    onChange={handleInputId}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={pswd}
                    onChange={handleInputPswd}
                  />

                  <Button fluid size="large" onClick={login}>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Link to="/join" onClick={() => setOpen(false)}>
                Join Us !
              </Link>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button className="btn" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalLogin;

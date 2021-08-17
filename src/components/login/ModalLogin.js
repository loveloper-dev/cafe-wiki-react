import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./ModalLogin.css";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { actions as userActions } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";

function ModalLogin() {
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
      console.log("userInfo", userInfo);

      // localstorage 등 중에 userInfo 저장
      dispatch(userActions.setUser(userInfo)); // redux에 userInfo 저장
    });
  };

  const handleInputId = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPswd = (e) => {
    console.log(e.target.value);
    setPswd(e.target.value);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="login-box">Login</Button>}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content image>
        {/*<Image size="medium" src="/images/avatar/large/rachel.png" wrapped />*/}
        <Modal.Description>
          {/*<label>ID</label>*/}
          <input type="text" value={email} onChange={handleInputId} />
          {/*<label>PW</label>*/}
          <input type="text" value={pswd} onChange={handleInputPswd} />
          {/*<Button content="Login" onClick={() => setOpen(false)} positive />*/}
          <Button content="Login" onClick={login} positive />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalLogin;

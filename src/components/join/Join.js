import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Input, Checkbox, Button } from "semantic-ui-react";
import axios from "axios";
import "./Join.css";
import Loading from "../loading/Loading";
import { ReactComponent as Coffee } from "../SearchBox/coffee-cup-svg_1.svg";
import { Link } from "react-router-dom";

const options = [
  { key: "@douzone.com", text: "@douzone.com", value: "@douzone.com" },
  { key: "@naver.com", text: "@naver.com", value: "@naver.com" },
  { key: "@gmail.com", text: "@gmail.com", value: "@gmail.com" },
  { key: "@nate.com", text: "@nate.com", value: "@nate.com" },
];

const SujiCheckBox = ({ item, handleCheck }) => {
  const { label, value, checked } = item;

  return (
    <Checkbox
      {...item}
      onChange={() => {
        handleCheck(value);
      }}
    />
  );
};

function Join({ history }) {
  const [isLoading, setLoading] = useState(true);

  const [checkedList, setCheckedList] = useState([]);

  const [userInfo, setUserInfo] = useState({
    user_email_id: "",
    user_email_address: options[0].value,
    user_pswd: "",
    user_nm: "",
    user_allergy: "",
  });

  const handleChangeUserInfo = (key) => (e, data) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: data.value,
    }));
  };

  // 알러지 테이블에서 정보 출력하여 체크박스 리스트 만듦
  useEffect(() => {
    axios({
      method: "GET",
      // url: "https://cafe-wiki-spring.herokuapp.com/allergies",
      url: `http://localhost:8080/allergies`,
    }).then((res) => {
      const allergyList = res.data.resultData.map((allergy) => {
        const newAllergy = { ...allergy, checked: false };
        return newAllergy;
      });

      setCheckedList(allergyList);
      setLoading(false); // 다시 렌더 돌면서 return 안에 있는걸 그림
    });
  }, []);

  const handleCheck = (changedValue) => {
    const newCheckList = checkedList.map((check) => {
      const { value, checked } = check;

      if (changedValue === value) {
        return {
          ...check,
          checked: !checked,
        };
      } else return check;
    });

    setCheckedList(newCheckList);

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      user_allergy: newCheckList
        .filter((check) => check.checked)
        .map((check) => check.value)
        .join(","),
    }));
  };

  const checkElements = useMemo(() => {
    return checkedList.map((check) => {
      return (
        <SujiCheckBox
          key={check.value}
          item={check}
          handleCheck={handleCheck}
        />
      );
    });
  }, [checkedList]);

  const join = () => {
    axios({
      method: "POST",
      // url: "https://cafe-wiki-spring.herokuapp.com/join",
      url: "http://localhost:8080/join",
      data: userInfo,
    }).then((res) => {
      console.log("[Join] join res: ", res);
      if (res.data.resultCode === 200) {
        alert(res.data.resultMsg + "\r\n메인화면으로 이동합니다.");
        history.push("/");
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <form className="join">
      <div className="join-header-wrap">
        <Coffee height="6rem" />
        <h2 className="txt-brown">회원가입</h2>
      </div>
      <div className="join-contents-wrap">
        <div className="mg-bt-2">
          <label className="txt-brown">E-mail</label>
          <Input
            className="join-email-wrap"
            label={
              <Dropdown
                defaultValue="@douzone.com"
                onChange={handleChangeUserInfo("user_email_address")}
                options={options}
              />
            }
            labelPosition="right"
            onChange={handleChangeUserInfo("user_email_id")}
          />
        </div>

        <div className="mg-bt-2">
          <label className="txt-brown">비밀번호</label>
          <Input type="password" onChange={handleChangeUserInfo("user_pswd")} />
        </div>

        <div className="mg-bt-2">
          <label className="txt-brown">닉네임</label>
          <Input onChange={handleChangeUserInfo("user_nm")} />
        </div>

        <div className="mg-bt-2 user-allergy-wrap">
          <label className="txt-brown user-allergy-title">
            알레르기 해당사항
          </label>
          <div>{checkElements}</div>
        </div>
      </div>

      <div className="join-btn-wrap">
        <Button size="large" className="btn-join" type="button" onClick={join}>
          회원가입
        </Button>
        <Button size="large" className="btn-cancel" type="button">
          <Link to="/">취소</Link>
        </Button>
      </div>
    </form>
  );
}

export default Join;

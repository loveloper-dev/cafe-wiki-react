import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Input, Checkbox, Button } from "semantic-ui-react";
import axios from "axios";

const options = [
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
      // responseType: "type",
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
        .join("@"),
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
      // responseType: "type",
    }).then((res) => {
      console.log("[Join] join res: ", res);
      if (res.data.resultCode === 200) {
        alert(res.data.resultMsg);
        history.push("/");
      }
    });
  };

  if (isLoading) {
    return null;
  }
  return (
    <form className="join">
      <Input
        label={
          <Dropdown
            defaultValue="@naver.com"
            onChange={handleChangeUserInfo("user_email_address")}
            options={options}
          />
        }
        labelPosition="right"
        placeholder="E-mail"
        onChange={handleChangeUserInfo("user_email_id")}
      />
      <br />
      <Input
        placeholder="비밀번호"
        type="password"
        onChange={handleChangeUserInfo("user_pswd")}
      />
      <br />
      <Input placeholder="닉네임" onChange={handleChangeUserInfo("user_nm")} />
      <br />
      <div className="user-allergy-wrap">{checkElements}</div>

      <Button type="button" onClick={join}>
        회원가입
      </Button>
    </form>
  );
}

export default Join;

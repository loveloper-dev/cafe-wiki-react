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

  // const [userEmailId, setUserEmailId] = useState("");

  // const [userEmailAddress, setUserEmailAddress] = useState(options[0].value);

  // const handleUserEmail = (key) => (e, data) => {
  //   if (key === "user_email_id") {
  //     setUserEmailId(data.value);
  //   } else {
  //     setUserEmailAddress(data.value);
  //   }
  //   // console.log("userInfo", userInfo);
  //   // console.log("[Join] handleMergeUserEmail key: ", key);
  //   // console.log("[Join] handleMergeUserEmail e: ", e);
  //   // console.log("[Join] handleMergeUserEmail data: ", data.value);
  // };

  const [userInfo, setUserInfo] = useState({
    user_email_id: "",
    user_email_address: options[0].value,
    user_pswd: "",
    user_nm: "",
    user_allergy: "",
  });
  // console.log("userInfo", userInfo);

  const handleChangeUserInfo = (key) => (e, data) => {
    // console.log("[Join] handleChangeUserInfo key: ", key);
    // const value = e.target.value;
    // console.log("[Join] handleChangeUserInfo value: ", value);
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
      // console.log("[Join] res.data.resultData: ", res.data.resultData);
      const allergyList = res.data.resultData.map((allergy) => {
        const newAllergy = { ...allergy, checked: false };
        return newAllergy;
      });
      // console.log("[Join] allergyList: ", allergyList);
      setCheckedList(allergyList);
      setLoading(false); // 다시 렌더 돌면서 return 안에 있는걸 그림
    });
  }, []);

  // // userInfo가 바뀌었을 때만 변화생김
  // useEffect(() => {
  //   return () => {
  //     console.log("[Join] userInfo 변화");
  //   };
  // }, [userInfo]);

  // user가 check한 알러지 항목
  // const userAllergyList = checkedList
  //   .filter((check) => check.checked)
  //   .map((check) => check.value);

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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BoxShadow, TextBox } from "../_component/shared";
import { COLOR } from "../_component/theme";
import {
  listenToAuthChangeAdmin,
  currentUser,
  listenToAuthChange,
  loginAdmin,
} from "../_service/firebaseAuth";
const PageWrap = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const LoginBox = styled(BoxShadow)`
  margin: auto;
  width: 80%;
  max-width: 300px;

  padding: 15px;
  border-radius: 15px;

  background-color: ${COLOR.white};
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Continue = styled.div`
  padding: 7px;
  color: ${COLOR.white};
  font-weight: bold;
  border-radius: 5px;
  background-color: rgb(24, 120, 242);
  margin-top: 10px;
  cursor: pointer;
`;
const Desc = styled.div`
  font-size: 11px;
`;
export default (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const effect = async () => {
      if (currentUser?.uid === "3tWQbD6oKxQDPoNsX9UyXkp7Mop2") {
        history.push("/admin");
      } else {
        //receiveRedirectResult();
        listenToAuthChangeAdmin(() => (window.location = "/admin"));
      }
    };
    effect();
  }, []);
  return (
    <PageWrap>
      <LoginBox>
        <Logo>Influence Commu</Logo>
        <Desc>
          สวัสดี GM กรอกข้อมูลต่อไปนี้เพื่อใช้อำนาจที่ท่านมี
          <br /> With great power there must also come great responsibility
        </Desc>
        <TextBox
          style={{ width: "100%", marginTop: 10 }}
          placeholder="อีเมลล์พิเศษ"
          value={username}
          onChange={(e) => setUsername(e.target.value)}></TextBox>
        <TextBox
          style={{ width: "100%", marginTop: 10 }}
          placeholder="รหัสผ่านพิเศษ"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></TextBox>
        <Continue onClick={() => loginAdmin(username, password)}>
          ดำเนินการต่อ
        </Continue>
      </LoginBox>
    </PageWrap>
  );
};

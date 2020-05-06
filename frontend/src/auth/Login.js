import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BoxShadow, TextBox } from "../_component/shared";
import { COLOR } from "../_component/theme";
import {
  loginFB,
  receiveRedirectResult,
  listenToAuthChange,
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

const ContinueWithFB = styled.div`
  padding: 10px;
  color: ${COLOR.white};
  font-weight: bold;
  border-radius: 10px;
  background-color: rgb(24, 120, 242);
  margin-top: 10px;
  cursor: pointer;
`;
const Desc = styled.div`
  font-size: 11px;
`;
export default (props) => {
  const history = useHistory();
  useEffect(() => {
    const effect = async () => {
      receiveRedirectResult(() => history.push("/user"));
      const user = await listenToAuthChange();
      if (user) {
        history.push("/user");
      } else {
        receiveRedirectResult();
      }
    };
    effect();
  }, []);
  return (
    <PageWrap>
      <LoginBox>
        <Logo>Influence Commu</Logo>
        <Desc>
          นครแห่งความรุ่งเรือง ทว่าภายใต้หน้ากากของแสงเรืองรอง
          เงามืดของทั้งสามตระกูลนั้นกำลังก่อตัว หรือบางที
          ดวงอาทิตย์ก็มีได้เพียงดวงเดียว
        </Desc>
        <ContinueWithFB onClick={() => loginFB(() => history.push("/user"))}>
          ดำเนินการต่อด้วย Facebook
        </ContinueWithFB>
      </LoginBox>
    </PageWrap>
  );
};

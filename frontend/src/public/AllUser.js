import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BoxShadow, TextBox } from "../_component/shared";
import { COLOR } from "../_component/theme";
import { getPublicUserData } from "../_service/firebaseDB";
const PageWrap = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const DataShowBoxContainer = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 80%;
  max-width: 400px;
`;
const DataShowBox = styled(BoxShadow)`
  padding: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR.white};
  margin-bottom: 15px;
`;
export default (props) => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getPublicUserData((d) => {
      setUsers(d);
      console.log(d);
    });
  });
  return (
    <PageWrap>
      <DataShowBoxContainer>
        {users.map((user) => (
          <DataShowBox>
            <div>
              <b>{user.name}</b>

              <div style={{ fontSize: 13 }}>{user.status}</div>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}>
              <div style={{ fontSize: 13 }}>
                <b>อายุ</b>
                <div>
                  {user?.metaData.find((meta) => meta.key === "อายุ").value}
                </div>
              </div>
              <div style={{ fontSize: 13 }}>
                <b>เงิน</b>
                <div>
                  {user?.metaData.find((meta) => meta.key === "เงิน").value}
                </div>
              </div>
              <div style={{ fontSize: 13 }}>
                <b>เกียรติยศ</b>
                <div>
                  {
                    user?.metaData.find((meta) => meta.key === "เกียรติยศ")
                      .value
                  }
                </div>
              </div>
            </div>
          </DataShowBox>
        ))}
      </DataShowBoxContainer>
    </PageWrap>
  );
};

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BoxShadow, RunNumber } from "./_component/shared";
import { COLOR } from "./_component/theme";
import { listenToAuthChange, Logout } from "./_service/firebaseAuth";
import { getRealtimeData, refreshData } from "./_service/firebaseDB";
const PageWrap = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const DataShowBoxContainer = styled.div`
  margin: auto;
  width: 80%;
  max-width: 400px;
`;
const DataShowBox = styled(BoxShadow)`
  padding: 15px;
  border-radius: 15px;

  background-color: ${COLOR.white};
  margin-bottom: 15px;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

const LogoutButton = styled.div`
  padding: 10px;
  color: ${COLOR.white};
  font-weight: bold;
  border-radius: 10px;
  background-color: ${COLOR.red};
  margin-top: 10px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  margin-bottom: 10px;
`;

const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: contain;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const NameContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;
const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: 5px;
`;
export default (props) => {
  const history = useHistory();
  const [profileImg, setProfileImg] = useState("");
  const [serverProfile, setServerProfile] = useState({
    name: "กำลังโหลด...",
    status: "กำลังโหลด...",
    metaData: [],
  });
  useEffect(() => {
    const effect = async () => {
      const user = await listenToAuthChange();
      if (user) {
        setProfileImg(user.photoURL);
        getRealtimeData((data) => {
          console.log("profile", data);
          setServerProfile(data);
        }, user.uid);
        await refreshData();
      } else {
        history.push("/auth/login");
      }
    };
    effect();
  }, []);
  return (
    <PageWrap>
      <DataShowBoxContainer>
        <DataShowBox>
          <ProfileContainer>
            <div>
              <ProfileImg src={profileImg} />
            </div>
            <NameContainer>
              <div style={{ fontWeight: "bold" }}>
                {serverProfile.name ||
                  "บัญชีของคุณไม่มีข้อมูล ต้องรอ GM มากรอกข้อมูลคุณ"}
              </div>
              <div style={{ fontSize: 13 }}>{serverProfile.status}</div>
            </NameContainer>
          </ProfileContainer>
        </DataShowBox>
        <DataShowBox>
          {serverProfile.metaData ? (
            serverProfile?.metaData.map((data, key) => (
              <DataRow key={key}>
                <div style={{ fontWeight: "bold" }}>{data.key}</div>
                <div>
                  {data.type === "NUMBER" ? (
                    <RunNumber count={data.value} />
                  ) : (
                    <>{data.value}</>
                  )}
                </div>
              </DataRow>
            ))
          ) : (
            <></>
          )}
        </DataShowBox>
      </DataShowBoxContainer>
      <LogoutButton
        onClick={() => Logout().then(() => history.push("/auth/login"))}>
        ออกจากระบบ
      </LogoutButton>
    </PageWrap>
  );
};

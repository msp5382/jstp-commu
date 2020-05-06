import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BoxShadow, UserBox } from "./_component/shared";
import { COLOR } from "./_component/theme";
import { listenToAuthChange, Logout } from "./_service/firebaseAuth";
import { getAdminData } from "./_service/firebaseDB";

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
  position: absolute;
  bottom: 0;
`;

export default (props) => {
  const [users, setUser] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const effect = async () => {
      const user = await listenToAuthChange();
      if (user) {
        getAdminData((user) => {
          console.log(user);
          setUser(user);
        });
      } else {
        history.push("/auth/adminLogin");
      }
    };
    effect();
  }, []);
  return (
    <div className="container mt-3">
      {users.map((user) => (
        <UserBox user={user}></UserBox>
      ))}

      <LogoutButton
        onClick={() => Logout().then(() => history.push("/auth/adminLogin"))}>
        ออกจากระบบ
      </LogoutButton>
    </div>
  );
};

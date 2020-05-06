import React, { useState } from "react";
import styled from "styled-components";
import { BoxShadow, TextBox } from "../index";
import { COLOR } from "../../theme";

const DataShowBox = styled(BoxShadow)`
  padding: 15px;
  border-radius: 15px;

  background-color: ${COLOR.white};
  margin-bottom: 15px;
  width: fit-content;
`;
const EditRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const NumEdit = styled(TextBox)`
  min-height: 18px;
  font-size: 0.7rem;
`;

const UserPhoto = styled.img`
  object-fit: contain;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;
const EditableData = ({ placeholder, type, onChange, value }) => (
  <EditRow>
    <div
      style={{
        fontSize: 13,
        marginRight: 10,
        marginTop: 4,
        fontWeight: "bold",
      }}>
      {placeholder}
    </div>
    <NumEdit
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      type={type}
    />
  </EditRow>
);

const ArrayOrNull = (arr) => {
  console.log(arr);
  if (arr === undefined || arr === null) {
    return [];
  } else {
    return arr;
  }
};
export default ({ user, onSave }) => {
  const [newUserData, setNewUserData] = useState(user);
  const [userMetaData, setNewUserMetaData] = useState(user.metaData || []);
  let _user = {
    metaData: [
      {
        key: "อายุ",
        type: "NUMBER",
        value: 89,
      },
    ],
  };
  const setUserData = (e) => {
    setNewUserData({
      [e.target.name]: e.target.value,
      ...newUserData,
    });
  };
  const setUserMetaData = (e) => {
    console.log(e.target.value);
    const existData = userMetaData.find(
      (metaData) => metaData.key === e.target.placeholder
    );
    if (existData) {
      setNewUserMetaData([
        ...userMetaData.filter(
          (metaData) => metaData.key !== e.target.placeholder
        ),
        {
          key: e.target.placeholder,
          type: e.target.type.toUpperCase(),
          value: e.target.value,
        },
      ]);
    } else {
      setNewUserMetaData(
        userMetaData.concat({
          key: e.target.placeholder,
          type: e.target.type.toUpperCase(),
          value: e.target.value,
        })
      );
    }
  };
  const findMetaData = (key) => {
    return userMetaData.find((meta) => meta.key === key)?.value;
  };
  return (
    <DataShowBox>
      <div className="d-flex mb-2">
        <UserPhoto src={user.photo}></UserPhoto>
        <div>
          <div style={{ fontWeight: "bold" }}>
            {user.name || "ยังไม่ได้ตั้ง"}
          </div>
          <div style={{ fontSize: 12 }}>
            {user.status || "ยังไม่ได้ตั้งสถานภาพ"}
          </div>
          <div style={{ fontSize: 12 }}>{user.realName}</div>
        </div>
      </div>

      <EditableData
        onChange={setUserData}
        value={newUserData.status}
        name="status"
        type="text"
        placeholder="สถานภาพ"
      />
      <EditableData
        onChange={setUserMetaData}
        //value={findMetaData("อายุ")}
        name="age"
        type="number"
        placeholder="อายุ"
      />
      <EditableData
        onChange={setUserMetaData}
        value={findMetaData("เกียรติยศ")}
        name="honor"
        type="number"
        placeholder="เกียรติยศ"
      />
      <EditableData
        onChange={setUserMetaData}
        value={findMetaData("เงิน")}
        name="money"
        type="number"
        placeholder="เงิน"
      />
      {newUserData != user ? <div>บันทึก</div> : <></>}
    </DataShowBox>
  );
};

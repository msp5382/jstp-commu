import React, { useState, useRef } from "react";
import styled from "styled-components";
import { BoxShadow, TextBox } from "../index";
import { COLOR } from "../../theme";
import { saveUserDB } from "../../../_service/firebaseDB";
import { v4 } from "uuid";
const DataShowBox = styled(BoxShadow)`
  padding: 15px;
  border-radius: 15px;

  background-color: ${COLOR.white};
  margin-bottom: 15px;
  width: fit-content;

  margin: 5px;
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
const EditableData = ({ placeholder, type, onChange, value, name }) => (
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
      name={name}
    />
  </EditRow>
);

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  justify-content: center;
  display: flex;
  z-index: 9;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.div`
  margin: auto;
  max-width: 400px;
  width: 80%;
  z-index: 10;
  border-radius: 10px;
  padding: 10px;
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.grey};
  max-height: 80%;
  overflow-y: scroll;
`;
const SaveButton = styled.div`
  padding: 3px;
  border-radius: 5px;
  background-color: ${COLOR.bluegreen};
  color: ${COLOR.white};
  font-size: 13px;
  font-weight: "bold";
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
`;
const ItemContainer = styled.div`
  border: 1px solid ${COLOR.grey};
  padding: 10px;
  margin-top: 5px;
`;
export default ({ user, onSave }) => {
  const [isModalShow, showModal] = useState(false);
  const [newUserData, setNewUserData] = useState(user);
  const [userMetaData, setNewUserMetaData] = useState(user.metaData || []);
  const [isLoading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const setUserData = (e) => {
    console.log("set", e.target.value);
    setNewUserData({
      [e.target.name]: e.target.value,
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

  const setUserItem = ({ key, value, itemType, itemId }) => {
    const existData = userMetaData.find(
      (metaData) => metaData.itemId !== itemId
    );
    if (existData) {
      setNewUserMetaData([
        ...userMetaData.filter((metaData) => metaData.itemId !== itemId),
        {
          ...userMetaData.find((metaData) => metaData.itemId !== itemId),
          key: key,
          type: "ITEM",
          itemType: itemType,
          value: value,
          itemId: itemId,
        },
      ]);
    } else {
      setNewUserMetaData(
        userMetaData.concat({
          key: key,
          type: "ITEM",
          itemType: itemType,
          value: value,
          itemId: itemId,
        })
      );
    }
  };

  const findMetaData = (key) => {
    return userMetaData.find((meta) => meta.key === key)?.value;
  };
  const saveData = async () => {
    setLoading(true);
    console.log({
      ...newUserData,
      metaData: userMetaData,
    });
    await saveUserDB(
      {
        ...newUserData,
        metaData: userMetaData,
      },
      user.id
    );
    setLoading(false);
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
        value={newUserData["name"]}
        name="name"
        type="text"
        placeholder="ชื่อ"
      />
      <EditableData
        onChange={setUserData}
        value={newUserData["status"]}
        name="status"
        type="text"
        placeholder="สถานภาพ"
      />
      <EditableData
        onChange={setUserData}
        value={newUserData["family"]}
        name="family"
        type="text"
        placeholder="ตระกูล"
      />
      <EditableData
        onChange={setUserMetaData}
        value={findMetaData("อายุ")}
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
      {isModalShow ? (
        <Modal
          ref={modalRef}
          onClick={(e) => {
            if (e.target === modalRef.current) {
              showModal(false);
            }
          }}>
          <ModalContent>
            <div className="d-flex justify-content-between">
              <div>
                แก้ไขไอเทมของ <b>{user.name || "ยังไม่ได้ตั้ง"}</b>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => showModal(false)}>
                <b>{"<ปิด>"}</b>
              </div>
            </div>
            {userMetaData
              .filter((meta) => meta.type === "ITEM")
              .map((item, i) => (
                <ItemContainer key={item.itemId}>
                  <EditableData
                    onChange={(e) =>
                      setUserItem({
                        ...item,
                        itemId: item.itemId,
                        key: e.target.value,
                      })
                    }
                    value={item.key}
                    type="item"
                    placeholder="ไอเทม"
                  />
                  <EditableData
                    onChange={(e) =>
                      setUserItem({
                        ...item,
                        itemId: item.itemId,
                        itemType: e.target.value,
                      })
                    }
                    value={item?.itemType}
                    type="item"
                    placeholder="ชนิด"
                  />
                  <EditableData
                    onChange={(e) =>
                      setUserItem({
                        ...item,
                        itemId: item.itemId,
                        value: e.target.value,
                      })
                    }
                    value={item.value}
                    type="item"
                    placeholder="จำนวน"
                  />
                </ItemContainer>
              ))}
            <div
              style={{ cursor: "pointer", marginTop: 5 }}
              onClick={() => {
                setUserItem({
                  itemId: v4(),
                });
              }}>
              <b>{"<เพิ่มไอเทม>"}</b>
            </div>
          </ModalContent>
        </Modal>
      ) : (
        <></>
      )}
      <div className="d-flex justify-content-end">
        <SaveButton onClick={showModal}>แก้ไขไอเทม</SaveButton>

        <SaveButton onClick={saveData}>
          {isLoading ? "...กำลังบันทึก" : "บันทึก"}
        </SaveButton>
      </div>
    </DataShowBox>
  );
};

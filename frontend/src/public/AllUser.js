import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BoxShadow, TextBox } from "../_component/shared";
import { COLOR } from "../_component/theme";
const PageWrap = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
export default (props) => {
  const history = useHistory();
  useEffect(() => {});
  return <PageWrap>AllUser</PageWrap>;
};

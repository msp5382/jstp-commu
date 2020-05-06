import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../theme";
export default (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    (() => {
      if (count < props.count || 0) {
        setTimeout(() => setCount(count + 1), 10);
      }
    })();
  });
  return <>{count}</>;
};

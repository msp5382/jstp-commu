import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../theme";
export default (props) => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const oldCount = prevCountRef.current;
  console.log(oldCount);
  (() => {
    if (oldCount) {
      if (count != props.count || 0) {
        if (props.count > oldCount) {
          setTimeout(() => setCount(count + 1), 10);
        } else if (props.count === "1") {
          setCount(1);
        } else {
          setTimeout(() => setCount(count - 1), 10);
        }
      }
    } else {
      if (count != props.count || 0) {
        if (props.count > 0) {
          setTimeout(() => setCount(count + 1), 10);
        } else if (props.count === "1") {
          setCount(1);
        } else {
          setTimeout(() => setCount(count - 1), 10);
        }
      }
    }
  })();
  return <>{count}</>;
};

import React from "react";
import styled from "styled-components";
export default styled.div`
  box-shadow: ${(props) =>
    props.small
      ? `box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;`
      : `0 .5rem 1rem rgba(0,0,0,.15)!important`};
`;

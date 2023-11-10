import React from "react";
import styled from "styled-components";

const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  background: rgb(213, 213, 213);
`;

function Line() {
    return(
        <StyledLine/>
    );
}

export default Line;
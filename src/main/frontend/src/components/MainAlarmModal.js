import React from "react";
import styled from "styled-components";
import Line from "../common/Line";
import {Link} from "react-router-dom";
import NavContent from "./NavContent";
const ModalWrapper = styled.div`
  width: 300px;
  height: 400px;
  position: absolute;
  background: #ffffff;
  top: 57px;
  right: 0px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  height: 30%;
  background: #eef1fe;
  padding-left: 20px;
  box-sizing: border-box;
  position: relative;
`;
const Name = styled.h3`
    font-size: 20px;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  font-size: 20px;
  padding: 10px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledText = styled.p`
  font-size: 12px;
  color: #757575;
  margin-left: 150px;
`;
const NavItem = styled.a`
  padding: 10px;
  box-sizing: border-box;
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid #dedede;
  }

  &:hover {
    background: #efefef;
  }

\`                                                        ;
`;
const MainModalAlarm =({count, userInfo, onClose})=> {
    return (
        <ModalWrapper>
            <Header>
                <Name>{userInfo.userName}</Name>
                <CloseBtn onClick={onClose}>x</CloseBtn>
            </Header>
            <Line/>
            <ModalContent>
                <NavItem href="">알림<StyledText>읽지 않은 알림 {count}개</StyledText></NavItem>
                <NavItem href="">회원정보 수정</NavItem>

            </ModalContent>
        </ModalWrapper>
    );
}
export default MainModalAlarm;
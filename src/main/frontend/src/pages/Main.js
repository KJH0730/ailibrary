// pages/Home.js
import React from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import ChatArea from "../components/ChatArea";
import MainBookList from '../components/MainBookList';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: black;
`;

const ContentArea = styled.div`
  margin-top: 160px;
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

function Main() {

    return (
        <Wrapper>
            <Header/>
            <ContentArea>
                <ChatArea/>
                <MainBookList/>
            </ContentArea>
        </Wrapper>
    );
}

export default Main;

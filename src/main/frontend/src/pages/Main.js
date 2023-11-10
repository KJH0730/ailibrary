// pages/Home.js
import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import Header from "../components/Header";
import ChatBotComponent from "../components/ChatBotComponent";
import SliderComponent from "../components/BookSlider";
import MainSlider from "../components/MainSlider";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const ContentArea = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
`;
const ImageArea = styled.div`
margin-top: 138px;
width: 100%;
height: 500px;
background: green;
overflow: hidden;
`;
function Main() {
    const [topBooks, setTopBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    useEffect(() => {
        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const [topResponse, newResponse, favoriteResponse] = await Promise.all([
                    fetch("http://localhost:8080/book/top"),
                    fetch("http://localhost:8080/book/new"),
                    fetch("http://localhost:8080/book/favorite"),
                ]);

                if (!topResponse.ok || !newResponse.ok || !favoriteResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const topData = await topResponse.json();
                const newData = await newResponse.json();
                const favoriteData = await favoriteResponse.json();


                setTopBooks(topData);
                setNewBooks(newData);
                setFavoriteBooks(favoriteData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, []);

    return (
        <Wrapper>
            <Header/>
            <ImageArea>
                <MainSlider books={topBooks}/>
            </ImageArea>
            <ContentArea>
                <SliderComponent title="오늘 도서관의 TOP 10 도서!!" books={topBooks} showRank={true}/>
                <SliderComponent title="따끈따끈한 새로 들어온 도서들!" books={newBooks} showRank={false}/>
                <SliderComponent title="이번주 사서 추천 도서들!" books={favoriteBooks} showRank={false}/>
                <ChatBotComponent/>
            </ContentArea>
        </Wrapper>
    );
}

export default Main;

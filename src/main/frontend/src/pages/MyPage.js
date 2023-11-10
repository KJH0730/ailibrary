import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import MyProfile from "../components/MyProfile";
import SliderComponent from "../components/BookSliderV2";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #000000;
`;
const ContentArea = styled.div`
  width: 100%;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function MyPage() {
    const [loanBooks, setLoanBooks] = useState([]);
    const [likeBooks, setLikeBooks] = useState([]);
    const [reserveBooks, setReserveBooks] = useState([]);

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userId = userInfo.userId;
    const userStuId = userInfo.userStuId;
    useEffect(() => {

        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const [loanResponse, likeResponse, reserveResponse] = await Promise.all([
                    fetch(`http://localhost:8080/book/loaning?userStuId=${userStuId}`),
                    fetch(`http://localhost:8080/book/likeBooklist?userId=${userId}`),
                    fetch(`http://localhost:8080/book/reserving?userStuId=${userStuId}`),
                ]);

                if (!loanResponse.ok || !likeResponse.ok || !reserveResponse.ok ) {
                    throw new Error("Network response was not ok");
                }

                const loanData = await loanResponse.json();
                const likeData = await likeResponse.json();
                const reserveData = await reserveResponse.json();

                setLoanBooks(loanData);
                setLikeBooks(likeData);
                setReserveBooks(reserveData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, [userId]);


    return (
        <Wrapper>
            <Header/>
            <ContentArea>
                <MyProfile/>
                <SliderComponent
                    title="대출 중인 도서"
                    books={loanBooks}
                    showRank={false}
                    showReturnDate={true}
                    targetPath={"/loanbooks"}
                />
                <SliderComponent
                    title="찜한 도서"
                    books={likeBooks}
                />
                <SliderComponent
                    title="예약 도서"
                    books={reserveBooks}
                    targetPath={"/reservebooks"}
                />
            </ContentArea>
        </Wrapper>
    );
}

export default MyPage;

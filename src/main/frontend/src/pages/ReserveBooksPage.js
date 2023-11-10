import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookFrame from "../components/BookFrame";
import Button from "../common/Button";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const Title = styled.p`
  text-align: left;
  color: #000000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const ContentWrapper = styled.div`
  width: 1000px;
  margin-top: 150px;
`;
const ContentArea = styled.div`
  width: 100%;
  min-height: 400px;
  background: white;
  border-radius: 10px;
  border: 0.5px solid #cccccc;
  padding-top: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
  
`;
const SelectAllLabel = styled.label`
  font-size: 16px;
  margin-left: 800px;
  height: 20px;
  padding: 1px;
  margin-right: 20px;
`;

const CancelBtn = styled.button`
  background: transparent;
  color: #755dff;
  border: none;
  font-size: 16px;
`;
const StyledInput = styled.input`
  position: relative;
  top: -120px;
`;
const BookArea = styled.div`
  display: flex;
  margin-right: 30px;
`;

function ReserveBooksPage() {
    const navigate = useNavigate();
    const [reserveBooks, setReserveBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userStuId = userInfo.userStuId;
    const selection = (bookId, bookTitle, selected) => {
        if (selected) {
            setSelectedBooks([...selectedBooks, {bookId, bookTitle}]);
        } else {
            setSelectedBooks(selectedBooks.filter((book) => book.bookId !== bookId));
        }
        if (selectAll && !selected) {
            setSelectAll(false);
        }
    };
    useEffect(() => {

        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userStuId=${userStuId}`);

                if (!reserveResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const reserveData = await reserveResponse.json();

                setReserveBooks(reserveData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, [userStuId]);
    const handleCancelReservation = async () => {
        if (selectedBooks.length === 0) {
            return;
        }

        const bookIds = selectedBooks.map((book) => book.bookId);
        const bookTitles = selectedBooks.map((book) => book.bookTitle);

        const requestBody = {
            bookId: bookIds,
            bookTitle: bookTitles,
            userStuId: userStuId
        };

        const fetchData = async () => {
            try {
                const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userStuId=${userStuId}`);

                if (!reserveResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const reserveData = await reserveResponse.json();

                setReserveBooks(reserveData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };


        try {
            const response = await fetch('http://localhost:8080/book/Reserving', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            fetchData();
            setSelectedBooks([]);
            toast.success("예약이 취소되었습니다");

        } catch (error) {
            console.error("Error canceling reservation: ", error);
            toast.error("예약 취소 중 오류가 발생했습니다.");
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedBooks([]);
        } else {
            const allBookData = reserveBooks.map((book) => ({bookId: book.bookId, bookTitle: book.bookTitle}));
            setSelectedBooks(allBookData);
        }
        setSelectAll(!selectAll);
    };
    const wrapperStyle = {
        width: "180px",
        height: "270px",
        position: "relative",
        marginRight: "-20px",
        transition: "transform 0.3s ease"
    };

    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <Title>예약 내역 조회/삭제</Title>
                <SelectAllLabel>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    전체 선택
                </SelectAllLabel>
                <CancelBtn onClick={handleCancelReservation}>예약 취소</CancelBtn>
                <ContentArea>
                    {reserveBooks.map((book, index) => (
                        <BookArea key={index}>
                            <StyledInput type="checkbox"
                                         checked={selectedBooks.some(selectedBook => selectedBook.bookId === book.bookId)}
                                         onChange={() => selection(book.bookId, book.bookTitle, !selectedBooks.some(selectedBook => selectedBook.bookId === book.bookId))}/>
                            <BookFrame
                                book={book}
                                showTitle={true}
                                showRank={false}
                                showReturnDate={false}
                                showRezDate={true}
                                wrapper={wrapperStyle}/>
                        </BookArea>
                    ))}
                    <ToastContainer style={{ position: "absolute", top: "300px" }}/>
                </ContentArea>
            </ContentWrapper>
            <Button onClick={() => {
                navigate(-1);
            }}>뒤로가기</Button>
        </Wrapper>
    );
}

export default ReserveBooksPage;

import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const BookWrapper = styled.div`
  position: relative;
  width: 180px; /* 책 컴포넌트의 너비 설정 */
  height: 270px;
  margin-right: -20px;
  transition: transform 0.3s ease; /* 마우스 오버시 애니메이션 효과 */

  &:hover {
    transform: scale(1.05); /* 마우스 오버시 확대 효과 */
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
`;

const BookTitle = styled.p`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 2px;
  white-space: nowrap; /* 줄 바꿈 방지 */
  overflow: hidden; /* 내용이 넘칠 때 숨김 처리 */
  text-overflow: ellipsis; /* 넘친 내용에 "..." 표시 */
`;
const ReturnDate = styled.p`
  color: red;
  font-size: 15px;
  font-weight: 600;
`;
const LoaningBookFrame = ({ book, showReturnDate }) => {
    return (
        <Link to={`/book-detail/${book.bookId}`} style={{ textDecoration: "none" }}> {/* 각 책에 대한 고유한 URL로 연결 */}
            <BookWrapper>
                <BookImage src={book.bookImage} alt={book.bookTitle} />
                <BookTitle>{book.bookTitle}</BookTitle>
                {showReturnDate && (
                    <ReturnDate>반납 날짜 : {book.returnDate}</ReturnDate>
                )}
            </BookWrapper>
        </Link>
    );
};



export default LoaningBookFrame;
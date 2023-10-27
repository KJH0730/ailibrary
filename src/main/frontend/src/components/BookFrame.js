import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const BookWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 270px;
  margin-right: -20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
  position: relative; // 상대적 위치 설정
`;

const BookTitle = styled.p`
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookRank = styled.p`
  font-family: 'RixInooAriDuriR';
  color: rgb(0, 28, 70);
  font-size: 80px;
  font-weight: 700;
  position: absolute;
  top: -85px;
  left: -55px;
  z-index: 1;
  font-style: italic;
`;
const ReturnDate = styled.p`
  color: red;
  font-size: 15px;
  font-weight: 600;
`;
const BookFrame = ({ book, rank, showRank, showReturnDate }) => {
    return (
        <Link to={`/book-detail/${book.bookId}`}
              style={{ textDecoration: "none"}}>
            <BookWrapper>
                {showRank &&
                    <BookRank>{rank}</BookRank>
                }
                <BookImage src={book.bookImage} alt={book.bookTitle} />
                <BookTitle>{book.bookTitle}</BookTitle>
                {showReturnDate && (
                    <ReturnDate>반납 {book.returnDate}</ReturnDate>
                )}
            </BookWrapper>
        </Link>
    );
};

export default BookFrame;

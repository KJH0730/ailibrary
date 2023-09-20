import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
    `;

const BookImage = styled.img`
      width: 100%;
      height: auto;
      border-radius: 5px;
      box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
    `;

const BookTitle = styled.p`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 2px;
`;

function SearchResults() {
  const { keyword } = useParams(); // URL에서 키워드 파라미터 가져오기
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    // 검색 결과를 가져오는 API 호출 (예: 서버로 요청)
    fetch(`http://localhost:8080/book/search?keyword=${keyword}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
        setError(null); // 성공 시 에러 상태 초기화
      })
      .catch((error) => {
        console.error('Error searching books: ', error);
        setError(error); // 에러 발생 시 에러 상태 설정
      });
  }, [keyword]); // keyword가 변경될 때마다 useEffect가 실행

  if (error) {
    return <div>Error: {error.message}</div>; // 에러가 있을 경우 에러 메시지 표시
  }

  return (
  <Wrapper>
    <Header/>
    <div>
      <h2>검색 결과 페이지</h2>
      <p>검색어: {keyword}</p>
      <ul>
        {searchResults.map((book) => (
          <li>
            <BookImage src={book.bookImage} alt={book.bookTitle} />
            <BookTitle>{book.bookTitle}</BookTitle>
          </li>
        ))}
      </ul>
    </div>
    </Wrapper>
  );
}

export default SearchResults;
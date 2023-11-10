import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styled from "styled-components";
import Header from "../components/Header";
import BookFrame from "../components/BookFrame";


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  color: #000000;
`;

const ContentWrapper = styled.div`
  width: 1000px;
  margin-top: 160px;
`;
const Title = styled.h2`
  margin: 50px 0;
`;
const Keyword = styled.span`
  color: #1d5d90;
`;
const BookList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  padding: 0;
`;
const BookItem = styled.li`
  margin-right: 20px; /* 검색 결과들 간의 간격을 조절 */
`;

function SearchResults() {
    const {keyword} = useParams(); // URL에서 키워드 파라미터 가져오기
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
                <Title><Keyword>'{keyword}'</Keyword> 에 대한 검색 결과</Title>
                <BookList>
                    {searchResults.map((book) => (
                        <BookItem key={book.bookId}>
                            <BookFrame
                                book={book}
                                showTitle={true}
                                wrapper={wrapperStyle}
                            />
                        </BookItem>
                    ))}
                </BookList>
            </ContentWrapper>
        </Wrapper>
    );
}

export default SearchResults;

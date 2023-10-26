import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  flex-direction: row;
`;

const Logo = styled.img`
  width: 200px;
  height: 77px;
  margin-left: 30px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 400px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  opacity: 0.699999988079071;
  background: rgba(255, 255, 255, 0.65);
`;

const SearchInput = styled.input`
  margin-left: 18px;
  border: none;
  outline: none;
  width: 100%;
  font-size: 15px;
  color: #000000;
  background: transparent;
  z-index: 1;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

function SearchArea() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate(); // history 객체를 가져옴

    const handleSearch = () => {
        if (searchText.trim() !== "") {
            // 검색어가 비어 있지 않으면 클라이언트에서 검색어로 서버 API를 호출
            navigate(`/results/${searchText}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (searchText.trim() !== "") {
                // 검색어가 비어 있지 않으면 검색을 실행
                handleSearch();
            }
        }
    };

    return (
        <Wrapper>
            <Link to="/">
                <Logo src={`${process.env.PUBLIC_URL}/assets/LogoWhite.png`} alt="로고"/>
            </Link>
            <SearchBar>
                <SearchInput
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <SearchButton onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} style={{fontSize: '15px'}}/>
                </SearchButton>
            </SearchBar>
        </Wrapper>
    );
}

export default SearchArea;

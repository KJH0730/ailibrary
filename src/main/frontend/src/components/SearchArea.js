import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: row;
`;

const Logo = styled.img`
  width: 170px;
  height: 77px;
  margin-right: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 500px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 120px;
  border: 1.7px solid #1859cb;
  opacity: 0.699999988079071;
  background: #FFFBFB;
`;

const SearchInput = styled.input`
  margin-left: 18px;
  border: none;
  outline: none;
  width: 100%;
  font-size: 15px;
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
        // 클라이언트에서 검색어로 서버 API를 호출
        navigate(`/results/${searchText}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Wrapper>
            <Link to="/">
                <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="로고"/>
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

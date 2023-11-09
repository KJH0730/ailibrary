// Slider.js
import React from "react";
import {useNavigate} from "react-router-dom";
import BookFrame from "../components/BookFrame";
import styled from "styled-components";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrowImage from "../assets/right-arrow.png";
import leftArrowImage from "../assets/left-arrow.png";

const Container = styled.div`
  width: 80%;
  overflow-x: hidden;
`;
const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
  width: 94%;
`;
const CustomSlider = styled(Slider)`
  
  .slick-prev {
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
    left: 15px;
    width: 45px;
    height: 45px;
  }

  .slick-next {
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
    right: 130px;
    width: 45px;
    height: 45px;
  }

  &:hover {
    .slick-prev,
    .slick-next {
      opacity: 1;
    }
  }

  .slick-list {
    width: 100%;
    margin-left: 20px;
  }
  .slick-track {
    display: inline;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const StyledDiv = styled.div`
  padding-top: 10px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const AllButton = styled.button`
  width: 6%;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  &:hover {
    color: #5856d6;
  }
`;

function SliderComponentV2({title, books, showRank, showRezDate, showReturnDate, targetPath}) {
    const Navigate = useNavigate();
    const slideCount = Math.min(books.length, 6); // 슬라이드 개수를 데이터 개수 또는 최대 6 중 작은 값으로 설정
    const wrapperStyle = {
        width: "180px",
        height: "270px",
        position: "relative",
        marginRight: "-20px",
        transition: "transform 0.3s ease"
    };

    const settings = {
        rows: 1,
        slidesPerRow:1,
        dots: false,
        infinite: false,
        speed: 800,
        arrows: true,
        autoplay: false,
        slidesToShow: 5, // 슬라이드 개수로 설정
        slidesToScroll: 5, // 슬라이드 개수로 설정
        centerMode: false, // centerMode를 false로 설정
        prevArrow: <img src={leftArrowImage} alt="Previous"/>,
        nextArrow: <img src={rightArrowImage} alt="Next"/>,
    };
    const onClickAllBtn = () => {
        if (targetPath === "/loanbooks") {
            Navigate(targetPath);
        } else {
            console.log('실행 안 됨');
        }
    };

    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <AllButton onClick={onClickAllBtn}>
                    전체보기
                </AllButton>
            </Header>
            <CustomSlider {...settings}>
                {books.map((book, index) => (
                    <StyledDiv key={index}>
                        <BookFrame
                            book={book}
                            showTitle={true}
                            showRezDate={showRezDate}
                            showReturnDate={showReturnDate}
                            wrapper={wrapperStyle}
                        />
                    </StyledDiv>
                ))}
            </CustomSlider>
        </Container>
    );
}

export default SliderComponentV2;
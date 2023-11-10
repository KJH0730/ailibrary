import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrowImage from "../assets/right-arrow.png";
import leftArrowImage from "../assets/left-arrow.png";

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  filter: blur(12px) brightness(0.8);
`;

const CustomSlider = styled(Slider)`

`;
const BookFrame = styled.img`
  width: 250px;
  height: 350px;
  border-radius: 10px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
  z-index: 5;
  position: absolute;
  top: 90px;
  left: 100px;
`;
const BookInform = styled.p`
  text-align: left;
  font-size: 20px;
  position: absolute;
  top: 363px;
  left: 380px;
  color: white;
  width: 300px;
  height: 100px;
`;
const BookRank = styled.p`
  position: absolute;
  top: 10px;
  left: 100px;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
const BookTitle = styled.h2`
  font-size: 25px;
  position: absolute;
  top: 300px;
  left: 380px;
  color: white;
`;
const StyledDiv = styled.div`
  position: relative;
`;

const MainSlider = ({books}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        arrows: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: true,
        prevArrow: <img src={leftArrowImage} alt="Previous"/>,
        nextArrow: <img src={rightArrowImage} alt="Next"/>,
    };

    return (
        <CustomSlider {...settings}>
            {books.map((book, index) => (
                <StyledDiv key={index}>
                    <BackImage src={book.bookImage} alt={book.bookTitle}/>
                    <BookFrame src={book.bookImage}/>
                    <BookTitle>{book.bookTitle}</BookTitle>
                    <BookInform>돈 시간 운명으로부터 완전한 자유를 얻는 7단계 인생 공략집</BookInform>
                    <BookRank>오늘의 영화 순위 {index + 1}위</BookRank>
                </StyledDiv>
            ))}
        </CustomSlider>
    );
};

export default MainSlider;

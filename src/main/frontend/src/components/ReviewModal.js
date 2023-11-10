import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {darken} from "polished";
const ModalOverlay = styled.div`
  margin-top: 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: black;
`;

const ModalContent = styled.div`
  width: 500px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  position: relative;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  justify-content: space-between; /* 오른쪽 정렬을 위한 설정 */
`;
const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  margin-right: 15px;
`;
const ModalTitle = styled.p`
  font-size: 17px;
  padding-left: 15px;
  font-weight: 700;
`;
const ConfirmBtn = styled.button`
  justify-content: center;
  background: #A5B3FF;
  color: #FFF;
  border: none;
  border-radius: 5px;
  width: 80%;
  height: 40px;
  margin-bottom: 10px;

  &:hover {
    background: ${(props) =>
            props.backgroundColor
                    ? darken(0.1, props.backgroundColor) // 어둡게 만드는 함수를 적용
                    : "#123456"};
  }
`;
const ContentArea = styled.div`
  margin: 5px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookInfoArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-items: flex-start;
`;
const BookImage = styled.img`
  width: 130px;
  height: auto;
  margin-right: 20px;
`;

const BookTitle = styled.h3`
  font-size: 17px;
  margin: 10px 0;
`;
const ReviewInput = styled.textarea`
  width: 90%;
  min-height: 100px;
  margin: 20px 0;
  resize: none;
  border-radius: 10px;
  border: 1.5px solid #d3d3d3;
  padding: 10px;
`;

function ReviewModal({ isOpen, onClose, bookInfo, updateReviews }) {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    const userStuId = userInfo ? userInfo.userStuId : null;
    const userId = userInfo ? userInfo.userId : null;

    const [review, setReview] = useState("");

    const handleReviewSubmit = async () => {
        if (!review || review.length < 10) {
            // 리뷰가 10자 미만이거나 비어있을 때 알림 메시지 표시
            alert("10자 이상 리뷰를 입력해주세요");
            return;
        }

        try {
            const reviewData = {
                userStuId: userStuId,
                userId: userId,
                bookId: bookInfo.bookId,
                review: review,
                reviewDate: new Date().toISOString(), // reviewDate 추가
            };

            const response = await axios.post("http://localhost:8080/review/save", reviewData);

            if (response.status === 200) {
                // 성공한 경우
                alert("리뷰 등록이 완료되었습니다.");
                onClose();
                window.location.reload();
            } else {
                // 서버 응답은 성공하지만 다른 상태 코드를 받은 경우
                alert("서버 응답이 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            // 오류 발생한 경우
            console.error("리뷰 저장 중 오류 발생: ", error);
            alert("리뷰 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>리뷰 작성</ModalTitle>
                    <CloseButton onClick={onClose}>X</CloseButton>
                </ModalHeader>
                <ContentArea>
                    <BookInfoArea>
                        <BookImage src={bookInfo.bookImage} alt="책" />
                        <BookTitle>{bookInfo.bookTitle}</BookTitle>
                    </BookInfoArea>
                    <ReviewInput
                        type="text"
                        value={review}
                        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 중지
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="내용을 10자 이상 입력해주세요"
                    />
                </ContentArea>
                <ConfirmBtn onClick={handleReviewSubmit}>등록</ConfirmBtn>
            </ModalContent>
        </ModalOverlay>
    );
}

export default ReviewModal;
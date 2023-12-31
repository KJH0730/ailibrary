import React, {useState, useEffect} from "react";
import styled, {css} from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservePos from "../assets/reserve_pos.png";
import ReserveIm from "../assets/reserve_im.png";
import BookReservationModal from "../components/BookReservationModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  margin-left: 30px;
  height: 70px;
  cursor: pointer;
`;

const Reserve = styled.img`
  margin-bottom: -10px;
`;

const Text = styled.p`
  padding: 0;
  font-size: 13px;
  font-family: Inter;
  font-weight: 800;

  ${(props) =>
    props.reservationStatus === "예약 가능" &&
    css`
            color: #27ff00;
          `}

  ${props =>
    (props.reservationStatus === "예약 불가" ||
        props.reservationStatus === "예약 중" ||
        props.reservationStatus === "대출 중") &&
    css`
            color: #ff0000;
          `}
`;

const ReserveButton = () => {
    const { bookId } = useParams();
    const [reservationStatus, setReservationStatus] = useState("예약 가능");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        setUserInfo(parsedUserInfo);
    }, []);

    useEffect(() => {
        if (userInfo) {
            const userStuId = userInfo.userStuId;
            axios.get(`http://localhost:8080/book/reserve?bookId=${bookId}&userStuId=${userStuId}`)
                .then((response) => {
                    const reservationStatus = response.data;
                    setReservationStatus(reservationStatus);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [userInfo, bookId]);

    useEffect(() => {
        // 모달에서 예약이 완료될 때 실행되는 코드
        if (reservationStatus === "예약 불가") {
            // 여기서 서버로부터 reservationStatus를 새로 받아옵니다.
            const userStuId = userInfo.userStuId;
            axios.get(`http://localhost:8080/book/reserve?bookId=${bookId}&userStuId=${userStuId}`)
                .then((response) => {
                    const newReservationStatus = response.data;
                    setReservationStatus(newReservationStatus);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [userInfo, bookId, reservationStatus]);
    const handleButtonClick = () => {
        if (!userInfo) {
            alert("로그인이 필요합니다");
            return;
        }
        if (reservationStatus !== "예약 가능") {
            alert("예약이 불가한 도서입니다.");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleReservationComplete = () => {
        // 모달에서 예약이 완료되었을 때 실행되는 함수
        setIsModalOpen(false); // 모달 닫기
        // 여기서 부모 컴포넌트에 예약이 완료되었음을 전달하여 상태를 갱신합니다.
        setReservationStatus("예약 중"); // 예약 중 상태로 변경 예시
    };

        let imageSource;
        let buttonText;

        if (reservationStatus === "예약 가능") {
            imageSource = ReservePos;
            buttonText = "예약 가능";
        } else if (reservationStatus === "예약 중") {
            imageSource = ReserveIm;
            buttonText = "예약 중";
        } else if (reservationStatus === "예약 불가") {
            imageSource = ReserveIm;
            buttonText = "예약 불가";
        } else if (reservationStatus === "대출 중") {
            imageSource = ReserveIm;
            buttonText = "예약 불가";
        }

        return (
            <>
                <Wrapper onClick={handleButtonClick}>
                    <Reserve src={imageSource}/>
                    <Text reservationStatus={reservationStatus}>{buttonText}</Text>
                </Wrapper>
                <BookReservationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onReservationComplete={handleReservationComplete} // 모달에서 예약 완료 시 실행되는 함수
                />
            </>
        );
    }
;

export default ReserveButton;
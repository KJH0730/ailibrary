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

const ReserveButton = ({ bookId }) => {
        const [reservationStatus, setReservationStatus] = useState("예약 가능");
        const [isModalOpen, setIsModalOpen] = useState(false);

        const storedUserInfo = localStorage.getItem("userInfo");
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        const userId = userInfo.userId;
        const userStuId = userInfo.userStuId;

        useEffect(() => {
            // 서버에서 예약 상태를 가져오는 요청
            axios.get(`http://localhost:8080/book/reserve?bookId=${bookId}&userStuId=${userStuId}`)
                .then((response) => {
                    const reservationStatus = response.data;
                    setReservationStatus(reservationStatus); // 예약 상태를 업데이트
                })
                .catch((error) => {
                    console.error(error);
                });

        }, [bookId, userStuId, reservationStatus]);

        const handleButtonClick = () => {
            if(!userInfo) {
                alert("로그인이 필요합니다");
                return;
            }else{
                setIsModalOpen(true);
            }

            if (reservationStatus === "예약 가능") { //예약 할 수 있는 상태
                setIsModalOpen(true);
            }  else { // 예약이 되어있어서 할 수 없는 상태
                alert("예약이 불가한 도서입니다.")
            }
        };


        const closeModal = () => {
            setIsModalOpen(false);
            setReservationStatus('예약 중');
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
                />
            </>
        );
    }
;

export default ReserveButton;
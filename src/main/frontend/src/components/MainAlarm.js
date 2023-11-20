import React, {useState, useEffect} from "react";
import styled from "styled-components";
import userImage from "../assets/user.png";
import axios from "axios";
import MainAlarmModal from "./MainAlarmModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 55px;
  cursor: pointer;
  position: relative; /* 상위 요소를 상대적으로 위치 지정 */
`;
const UserImage = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 50%;

  &:hover {
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.42);
  }
`;
const Count = styled.div`
  text-align: center;
  font-size: 13px;
  line-height: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8494ff;
  position: absolute;
  z-index: 1;
  border: 3px solid white;
  top: -2px;
  right: -3px;
  color: white;
  font-weight: bold;
`;
const MainAlarm = () => {
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem("userInfo");
//    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
//    const userStuId = userInfo.userStuId;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

//    const NotificationCount = () => {
//        axios
//            .post("http://localhost:8080/notification/count", userStuId, {
//                headers: {
//                    'Authorization': storedToken,
//                    'Content-Type': 'application/json'
//                }
//            })
//            .then((response) => {
//                setCount(response.data);
//            })
//            .catch((error) => {
//                console.error("Error", error);
//            });
//    };
//    useEffect(() => {
//        NotificationCount();
//    }, []);
    return (
        <Wrapper>
            <UserImage src={userImage} onClick = {openModal}/>


        </Wrapper>
    );
}
export default MainAlarm;
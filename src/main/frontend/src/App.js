import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import FacilityReservation from './pages/FacilityReservation';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BooksByType from "./pages/BooksByType";
import MyPage from "./pages/MyPage";
import BookDetail from "./pages/BookDetail";
import SearchResult from "./pages/SearchResult";
import Notice from "./pages/Notice";
import AllAlarm from "./pages/AllAlarm";
import LoanBooksPage from "./pages/LoanBooksPage";
import NoticeWritePage from "./pages/NoticeWritePage";
import NoticeViewPage from "./pages/NoticeViewPage";
import ReserveBooksPage from "./pages/ReserveBooksPage";
function App() {
    // const [closingWindow, setClosingWindow] = useState(false);
    //
    // // 브라우저 종료 시 토큰을 삭제하는 함수
    // function clearTokens() {
    //     if (closingWindow) {
    //         localStorage.removeItem("userInfo");
    //         localStorage.removeItem("token");
    //     }
    // }
    //
    // useEffect(() => {
    //     // 브라우저가 종료되기 전에 토큰을 삭제하도록 이벤트 핸들러 등록
    //     window.addEventListener("beforeunload", () => {
    //         setClosingWindow(true); // 브라우저를 닫을 때만 closingWindow를 true로 설정
    //         clearTokens(); // 토큰 삭제 함수 호출
    //     });
    //
    //     // 사용자의 마우스가 window 안에 있다면 토큰 삭제 방지
    //     window.addEventListener("mouseenter", () => {
    //         setClosingWindow(false);
    //     });
    //
    //     // 사용자가 ALT+TAB 키를 눌러 창을 변경할 때 토큰 삭제 방지
    //     window.addEventListener("keydown", (e) => {
    //         if (e.altKey && e.key === "Tab") {
    //             setClosingWindow(false);
    //         }
    //     });
    //
    //     // 사용자가 F5, CTRL+F5, CTRL+R 키를 누를 때 토큰 삭제 방지
    //     window.addEventListener("keydown", (e) => {
    //         if ((e.key === "F5" || (e.ctrlKey && e.key === "r")) && !e.repeat) {
    //             setClosingWindow(false);
    //         }
    //     });
    //
    //     // a 링크를 클릭할 때 토큰 삭제 방지
    //     document.addEventListener("click", (e) => {
    //         if (e.target.tagName === "A") {
    //             setClosingWindow(false);
    //         }
    //     });
    //
    //     // 버튼을 클릭하여 다른 페이지로 이동할 때 토큰 삭제 방지
    //     document.addEventListener("click", (e) => {
    //         if (e.target.tagName === "BUTTON") {
    //             setClosingWindow(false);
    //         }
    //     });
    //
    //     // form을 submit할 때 토큰 삭제 방지
    //     document.addEventListener("submit", () => {
    //         setClosingWindow(false);
    //     });
    //
    //     // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    //     return () => {
    //         window.removeEventListener("beforeunload", () => {
    //         });
    //         window.removeEventListener("mouseenter", () => {
    //         });
    //         window.removeEventListener("keydown", () => {
    //         });
    //         window.removeEventListener("keydown", () => {
    //         });
    //         document.removeEventListener("click", () => {
    //         });
    //         document.removeEventListener("click", () => {
    //         });
    //         document.removeEventListener("submit", () => {
    //         });
    //     };
    // }, []);
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/facility-reservation" element={<FacilityReservation/>}/>
                    <Route path="/bookbytype" element={<BooksByType/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/mypage" element={<MyPage />}/>
                    <Route path="/loanbooks" element={<LoanBooksPage/>} />
                    <Route path="/reservebooks" element={<ReserveBooksPage/>} />
                    <Route path="/book-detail/:bookId" element={<BookDetail/>}/>
                    <Route path="/results/:keyword" element={<SearchResult/>}/>
                    <Route path="/notice" element={<Notice/>}/>
                    <Route path="/allalarm" element={<AllAlarm/>}/>
                    <Route path="/notice-write" element={<NoticeWritePage/>}/>
                    <Route path="/notice/:id" element={<NoticeViewPage/>} />
                </Routes>
            </Router>
    );
}

export default App;

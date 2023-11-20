package com.lib.ailibrary.domain.notification;

import com.lib.ailibrary.domain.book.*;
import com.lib.ailibrary.domain.notification.sms.MessageDTO;
import com.lib.ailibrary.domain.notification.sms.SmsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.lib.ailibrary.domain.room.RoomReserveResponse;
import com.lib.ailibrary.domain.room.RoomService;
import com.lib.ailibrary.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
@RequiredArgsConstructor
public class ReserveNotificationScheduler {

    private final UserService userService;
    private final SmsService smsService;

    private final RoomService roomService;
    private final NotificationService notificationService;

    private final BookLoanService bookLoanService;
    private final BookReserveService bookReserveService;
    private final BookService bookService;


    @Scheduled(cron = "0 0 8 * * MON-FRI") // 매일 오전 8시에 실행,  fixedRate = 600000 (10분마다) cron = "0 0 8 * * MON-FRI"
    public void sendNotifications() throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        LocalDate today = LocalDate.now();
        List<RoomReserveResponse> reservations = roomService.findAllReserveToday(today);


        Map<Long, List<RoomReserveResponse>> userReservationsMap = new HashMap<>();

        for (RoomReserveResponse reservation : reservations) {
            Long userStuId = reservation.getUserStuId();

            if (userReservationsMap.containsKey(userStuId)) {
                List<RoomReserveResponse> userReservations = userReservationsMap.get(userStuId);
                userReservations.add(reservation);
            } else {
                List<RoomReserveResponse> userReservations = new ArrayList<>();
                userReservations.add(reservation);
                userReservationsMap.put(userStuId, userReservations);
            }
        }

        for (Map.Entry<Long, List<RoomReserveResponse>> entry : userReservationsMap.entrySet()) {
            Long userStuId = entry.getKey();
            List<RoomReserveResponse> userReservations = entry.getValue();
            String userPnum = userService.findPnumById(userStuId);

            StringBuilder notificationContent = new StringBuilder();

            for (RoomReserveResponse reservation : userReservations) {
                String roomName = getRoomName(reservation.getRoomId());
                String roomFloor = getRoomFloor(reservation.getRoomId());

                notificationContent.append(roomFloor).append(" ").append(roomName).append(" 예약: ").append(reservation.getRezTime()).append("\n");
            }

            NotificationRequest params = new NotificationRequest();
            params.setUserStuId(userStuId);
            params.setNotiContent("금일 예약된 내용입니다.\n" + notificationContent.toString());
            params.setNotiTime(LocalDateTime.now());

            notificationService.saveNotification(params);


            /*// SMS 전송 코드
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setTo(userPnum);
            messageDTO.setContent(params.getNotiContent());

            smsService.sendSms(messageDTO);*/
        }
    }

    private String getRoomName(int roomId) {
        String[] roomNames = {"","1번 스터디룸", "2번 스터디룸", "3번 스터디룸", "1번 스터디룸", "2번 스터디룸", "3번 스터디룸",
                "1번 스터디룸", "2번스터디룸", "3번 스터디룸", "4번 스터디룸", "1번 스터디룸", "2번 스터디룸", "3번 스터디룸",
                "오디토리움", "VR룸"};
        return roomNames[roomId];
    }

    private String getRoomFloor(int roomId) {
        String[] roomFloors = {"","2층", "2층", "2층", "3층", "3층", "3층", "4층", "4층", "4층", "4층", "5층", "5층", "5층", "5층", "5층"};
        return roomFloors[roomId];
    }

    //********반납날짜 하루 전 웹페이지에 알림 띄우기(수정 필요)*******
    @Scheduled(fixedRate = 60000000)
    public void checkBookLoan() {
        List<BookLoanResponse> responses = bookLoanService.findLoanAll();
        LocalDate currentDate = LocalDate.now();
        for(BookLoanResponse response : responses) {
            LocalDate returnDate = response.getReturnDate();
            int bookId = response.getBookId();
            String bookTitle = bookService.reserveBookTitle(bookId);
            long daysDifference = currentDate.until(returnDate, ChronoUnit.DAYS);
            if(daysDifference == 1) {
                NotificationRequest params = new NotificationRequest();
                params.setUserStuId(response.getUserStuId());
                params.setNotiTime(LocalDateTime.now());
                params.setNotiContent("["+bookTitle+"] " +response.getReturnDate()+ " 까지 반납해주세요.");
                notificationService.saveNotification(params);

                //String userPnum = userService.findPnumById(response.getUserStuId());
                // SMS 전송 코드
                /*MessageDTO messageDTO = new MessageDTO();
                messageDTO.setTo(userPnum);
                messageDTO.setContent(params.getNotiContent());

                smsService.sendSms(messageDTO);*/
            }
        }
    }

    //예약 유효기간 날짜 하루 전 웹페이지 알림 띄우기(수정 필요)
    @Scheduled(cron = "0 0 8 * * MON-FRI")
    public void checkBookReserve() {
        List<BookReserveResponse> responses = bookReserveService.findAllRez();
        LocalDate currentDate = LocalDate.now();
        for(BookReserveResponse response : responses) {
            LocalDate returnDate = response.getBookRezDate();
            int bookId = response.getBookId();
            String bookTitle = bookService.reserveBookTitle(bookId);
            long daysDifference = currentDate.until(returnDate, ChronoUnit.DAYS);

            if(daysDifference == 1) {
                NotificationRequest params = new NotificationRequest();
                params.setUserStuId(response.getUserStuId());
                params.setNotiTime(LocalDateTime.now());
                params.setNotiContent("["+bookTitle+"] " +response.getBookRezDate()+ " 까지 대출해주세요. 예약 유효날짜가 지나면 예약은 자동 취소됩니다.");
                notificationService.saveNotification(params);

                //String userPnum = userService.findPnumById(response.getUserStuId);
                // SMS 전송 코드
                /*MessageDTO messageDTO = new MessageDTO();
                messageDTO.setTo(userPnum);
                messageDTO.setContent(params.getNotiContent());

                smsService.sendSms(messageDTO);*/
            }
        }
    }
}





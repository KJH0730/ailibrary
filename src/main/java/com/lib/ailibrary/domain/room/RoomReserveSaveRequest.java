package com.lib.ailibrary.domain.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RoomReserveSaveRequest {

    private Long rezId;         // PK
    private int rezPeopleNum;   // 시설 사용인원

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate rezDate;       // 예약 날짜

    private String rezTime;     // 예약 시간
    private int roomId;         // 시설번호
    private int userStuId;   // 예약자 학번
    private String userName;    // 예약자 성명
}
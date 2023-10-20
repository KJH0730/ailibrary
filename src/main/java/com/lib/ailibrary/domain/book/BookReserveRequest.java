package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookReserveRequest {
    private int bookRezId;
    private String userId;
    private Long userStuId;
    private int bookId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookRezDate;
}

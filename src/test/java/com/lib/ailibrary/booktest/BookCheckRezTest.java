/*
package com.lib.ailibrary.booktest;

import com.lib.ailibrary.domain.book.BookReserveMapper;
import com.lib.ailibrary.domain.book.BookReserveRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class BookCheckRezTest {

    @Autowired
    BookReserveMapper bookReserveMapper;

    @Test
    void checkAndSave() {
        BookReserveRequest params = new BookReserveRequest();
        params.setUserId("green");
        params.setBookId(3);
        params.setBookRezDate(LocalDate.now());

        int checkId = params.getBookId();

        if(bookReserveMapper.checkBookRez(checkId) != null) {
            System.out.println("예약 중");
        } else {
            bookReserveMapper.save(params);
            System.out.println("성공");
        }
    }

    @Test
    void checkReserve() {

    }

}
*/

package com.lib.ailibrary;

import com.lib.ailibrary.user.UserRequest;
import com.lib.ailibrary.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    void 회원가입() {
        UserRequest params = new UserRequest();
        params.setUserStuId(12345);
        params.setUserName("ddd");
        params.setUserMajor("ㅎㅎ");
        params.setUserEmail("111");
        params.setUserPnum("2222");
        params.setUserId("123123");
        params.setUserPw("2141341");
        params.setUserGrade("213123");

        userService.join(params);
    }
}
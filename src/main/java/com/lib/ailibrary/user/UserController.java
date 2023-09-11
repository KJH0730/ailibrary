package com.lib.ailibrary.user;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/user")
    @ResponseBody
    public int joinMember(@RequestBody final UserRequest params) {
        return userService.join(params);
    }

    // 회원 상세정보 조회
    @GetMapping("/user/{userId}")
    @ResponseBody
    public UserResponse findUserByUserId(@PathVariable final String userId) {
        return userService.findUserByUserId(userId);
    }

    // 회원 정보 수정
    @PatchMapping("/user/{userStuId}")
    @ResponseBody
    public int updateUser(@PathVariable final int userStuId, @RequestBody final UserRequest params) {
        return userService.updateUser(params);
    }

    // 회원 정보 삭제 (회원 탈퇴)
    @DeleteMapping("/user/{id}")
    @ResponseBody
    public int deleteUserByUserStuId (final int userStuId) {
        return userService.deleteUserByUserStuId(userStuId);
    }

    // 회원 수 카운팅 (ID 중복 체크)
    @GetMapping("/user-count")
    @ResponseBody
    public int countUserByUserId(@RequestParam final String userId) {
        return userService.countUserByUserId(userId);
    }

    // 로그인
    @PostMapping("/login")
    @ResponseBody
    public UserResponse login(HttpServletRequest request) {

        // 1. 회원 정보 조회
        String userid = request.getParameter("userId");
        String userPw = request.getParameter("userPw");
        UserResponse user = userService.login(userid, userPw);

        // 2. 세션에 회원 정보 저장 & 세션 유지 시가 설정
        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("loginUser", user);
            session.setMaxInactiveInterval(60 * 30);
        }

        return user;
    }

    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return ""; // 미완성
    }
}
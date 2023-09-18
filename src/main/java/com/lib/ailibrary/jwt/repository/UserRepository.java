package com.lib.ailibrary.jwt.repository;

import com.lib.ailibrary.jwt.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 유저이름으로 유저 정보를 가져오는 메서드 추가
    Optional<User> findByUsername(String username);

    Optional<User> findOneWithAuthoritiesByUsername(String username);
}

package com.lib.ailibrary.jwt.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_authority")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthority {

    @EmbeddedId
    private UserAuthorityId id;
}

package com.lib.ailibrary.domain.room;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoomSearchResponse {
        private int roomId;
        private int roomFloor;
        private String roomName;
        private String image;

}

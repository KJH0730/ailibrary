package com.lib.ailibrary.domain.notification.sms;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SmsRequest {
    String type;
    String contentType;
    String countryCode;
    String from;
    String content;
    List<MessageDTO> messages;
}
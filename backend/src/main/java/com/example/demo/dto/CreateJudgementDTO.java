package com.example.demo.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateJudgementDTO {
    private String text;
    private String id;
    private String html;
}
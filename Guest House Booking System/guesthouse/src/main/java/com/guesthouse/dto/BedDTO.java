package com.guesthouse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BedDTO {
    private Long id;

    @NotBlank(message = "Bed number is required")
    private String bedNumber;

    @NotNull(message = "Status is required")
    private String status;

    @NotNull(message = "Room ID is required")
    private Long roomId;
}
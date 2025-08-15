package com.saintroche.clients.models.dto;

public record ClientDto(
        Long id,
        String firstName,
        String lastName,
        String email,
        String role,
        Boolean active
) {}

package com.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

public class ProductDTO {

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Product name is required")
        private String name;

        private String description;

        @NotNull @Positive(message = "Price must be positive")
        private Double price;

        @NotNull @Min(0)
        private Integer stock;

        private String imageUrl;

        private Long categoryId;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private Double price;
        private Integer stock;
        private String imageUrl;
        private String categoryName;
    }
}

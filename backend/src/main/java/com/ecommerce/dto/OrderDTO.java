package com.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ItemRequest {
        @NotNull private Long productId;
        @NotNull @Min(1) private Integer quantity;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Shipping address is required")
        private String shippingAddress;

        @NotNull @Size(min = 1)
        private List<ItemRequest> items;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Response {
        private Long id;
        private String customerName;
        private List<OrderItemResponse> items;
        private Double totalAmount;
        private String status;
        private String shippingAddress;
        private LocalDateTime createdAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private Double price;
    }
}

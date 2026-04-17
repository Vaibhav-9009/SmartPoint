package com.ecommerce.service;

import com.ecommerce.dto.OrderDTO.*;
import com.ecommerce.entity.*;
import com.ecommerce.exception.*;
import com.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Response placeOrder(String email, Request req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<OrderItem> items = req.getItems().stream().map(itemReq -> {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + itemReq.getProductId()));
            if (product.getStock() < itemReq.getQuantity())
                throw new BadRequestException("Insufficient stock for: " + product.getName());
            product.setStock(product.getStock() - itemReq.getQuantity());
            productRepository.save(product);
            return OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .price(product.getPrice())
                    .build();
        }).collect(Collectors.toList());

        double total = items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();

        Order order = Order.builder()
                .user(user)
                .items(items)
                .totalAmount(total)
                .shippingAddress(req.getShippingAddress())
                .status(Order.OrderStatus.PENDING)
                .build();

        items.forEach(i -> i.setOrder(order));
        return toResponse(orderRepository.save(order));
    }

    public List<Response> getMyOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserId(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<Response> getAllOrders() {
        return orderRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public Response updateStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
        order.setStatus(Order.OrderStatus.valueOf(status.toUpperCase()));
        return toResponse(orderRepository.save(order));
    }

    private Response toResponse(Order o) {
        List<OrderItemResponse> items = o.getItems().stream().map(i ->
                OrderItemResponse.builder()
                        .productId(i.getProduct().getId())
                        .productName(i.getProduct().getName())
                        .quantity(i.getQuantity())
                        .price(i.getPrice())
                        .build()
        ).collect(Collectors.toList());

        return Response.builder()
                .id(o.getId())
                .customerName(o.getUser().getName())
                .items(items)
                .totalAmount(o.getTotalAmount())
                .status(o.getStatus().name())
                .shippingAddress(o.getShippingAddress())
                .createdAt(o.getCreatedAt())
                .build();
    }
}

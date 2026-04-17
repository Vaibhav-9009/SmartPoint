package com.ecommerce.service;

import com.ecommerce.dto.ProductDTO.*;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductService productService;

    private Product sampleProduct;
    private Category sampleCategory;

    @BeforeEach
    void setUp() {
        sampleCategory = Category.builder().id(1L).name("Laptops").build();

        sampleProduct = Product.builder()
                .id(100L)
                .name("Gaming Laptop")
                .price(1500.0)
                .stock(10)
                .category(sampleCategory)
                .build();
    }

    @Test
    void getAllProducts_EmptyList() {
        when(productRepository.findAll()).thenReturn(List.of());
        List<Response> res = productService.getAllProducts();
        assertTrue(res.isEmpty());
    }

    @Test
    void getProductById_Success() {
        when(productRepository.findById(100L)).thenReturn(Optional.of(sampleProduct));

        Response res = productService.getProductById(100L);

        assertNotNull(res);
        assertEquals("Gaming Laptop", res.getName());
        assertEquals(1500.0, res.getPrice());
        assertEquals("Laptops", res.getCategoryName());
    }

    @Test
    void getProductById_NotFound() {
        when(productRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(999L));
    }

    @Test
    void createProduct_SuccessWithoutCategory() {
        Request req = new Request();
        req.setName("Mouse");
        req.setPrice(25.0);
        req.setStock(50);
        // no category

        Product savedProduct = Product.builder().id(101L).name("Mouse").price(25.0).stock(50).build();
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        Response res = productService.createProduct(req);
        
        assertNotNull(res);
        assertEquals("Mouse", res.getName());
        assertNull(res.getCategoryName());
    }

    @Test
    void createProduct_WithCategorySuccess() {
        Request req = new Request();
        req.setName("MacBook");
        req.setPrice(1200.0);
        req.setStock(5);
        req.setCategoryId(1L);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(sampleCategory));
        
        Product savedProduct = Product.builder().id(102L).name("MacBook").price(1200.0).stock(5).category(sampleCategory).build();
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        Response res = productService.createProduct(req);
        
        assertNotNull(res);
        assertEquals("Laptops", res.getCategoryName());
    }
}

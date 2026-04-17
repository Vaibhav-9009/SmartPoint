package com.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.ecommerce.entity.*;
import com.ecommerce.repository.*;

@SpringBootApplication
public class EcommerceApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(UserRepository userRepo, CategoryRepository catRepo, ProductRepository prodRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepo.count() == 0) {
                User admin = User.builder().name("Admin").email("admin@test.com")
                    .password(passwordEncoder.encode("admin123")).role(User.Role.ADMIN).build();
                userRepo.save(admin);
            }
            if (catRepo.count() == 0) {
                Category tech = Category.builder().name("Tech").description("Gadgets & Laptops").build();
                Category fashion = Category.builder().name("Fashion").description("Clothing & Apparel").build();
                Category footwear = Category.builder().name("Footwears").description("Shoes & Sneakers").build();
                Category appliances = Category.builder().name("Appliances").description("Home & Kitchen Appliances").build();
                
                catRepo.save(tech);
                catRepo.save(fashion);
                catRepo.save(footwear);
                catRepo.save(appliances);

                prodRepo.save(Product.builder().name("Gaming Laptop").description("RTX 4080 | 32GB RAM | 1TB NVMe").price(169999.0).stock(10).category(tech).imageUrl("https://images.unsplash.com/photo-1593640408182-31c70c8268f5").build());
                prodRepo.save(Product.builder().name("Wireless Headphones").description("Noise Cancelling Wireless Audio").price(12999.0).stock(50).category(tech).imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e").build());
                prodRepo.save(Product.builder().name("Designer Leather Jacket").description("Premium 100% Genuine Leather").price(5999.0).stock(15).category(fashion).imageUrl("https://images.unsplash.com/photo-1551028719-00167b16eac5").build());
                prodRepo.save(Product.builder().name("Summer Dress").description("Lightweight Floral Pattern").price(1499.0).stock(30).category(fashion).imageUrl("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446").build());
                prodRepo.save(Product.builder().name("Sports Sneakers").description("Ultra Comfort Running Shoes").price(3499.0).stock(45).category(footwear).imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff").build());
                prodRepo.save(Product.builder().name("Smart Coffee Maker").description("Wifi Enabled Espresso Machine").price(15499.0).stock(12).category(appliances).imageUrl("https://images.unsplash.com/photo-1517048676732-d65bc937f952").build());
                prodRepo.save(Product.builder().name("Air Purifier").description("HEPA Filter for 1000 sq ft").price(12999.0).stock(20).category(appliances).imageUrl("https://images.unsplash.com/photo-1581427909376-79cf0214a1fa").build());
            }
        };
    }
}

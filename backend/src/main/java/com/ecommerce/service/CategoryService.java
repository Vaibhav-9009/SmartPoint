package com.ecommerce.service;

import com.ecommerce.entity.Category;
import com.ecommerce.exception.*;
import com.ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAll() { return categoryRepository.findAll(); }

    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
    }

    public Category create(Category category) {
        if (categoryRepository.existsByName(category.getName()))
            throw new BadRequestException("Category already exists: " + category.getName());
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category updated) {
        Category existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        return categoryRepository.save(existing);
    }

    public void delete(Long id) {
        if (!categoryRepository.existsById(id))
            throw new ResourceNotFoundException("Category not found: " + id);
        categoryRepository.deleteById(id);
    }
}

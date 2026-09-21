package com.college.disasterrelief.repository;

import com.college.disasterrelief.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByCategoryIgnoreCase(String category);

    @Query("select r from Resource r where r.quantity < r.minimumRequired")
    List<Resource> findLowStock();
}

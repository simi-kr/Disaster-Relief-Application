package com.college.disasterrelief.repository;

import com.college.disasterrelief.model.ResourceTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceTransactionRepository extends JpaRepository<ResourceTransaction, Long> {
    List<ResourceTransaction> findByResourceId(Long resourceId);
    List<ResourceTransaction> findByRequestId(Long requestId);
}

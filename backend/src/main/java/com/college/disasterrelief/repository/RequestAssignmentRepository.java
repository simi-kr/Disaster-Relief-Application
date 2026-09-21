package com.college.disasterrelief.repository;

import com.college.disasterrelief.model.RequestAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestAssignmentRepository extends JpaRepository<RequestAssignment, Long> {
    List<RequestAssignment> findByRequestId(Long requestId);
}

package com.college.disasterrelief.repository;

import com.college.disasterrelief.model.Disaster;
import com.college.disasterrelief.model.enums.DisasterStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DisasterRepository extends JpaRepository<Disaster, Long> {
    List<Disaster> findByStatus(DisasterStatus status);
}

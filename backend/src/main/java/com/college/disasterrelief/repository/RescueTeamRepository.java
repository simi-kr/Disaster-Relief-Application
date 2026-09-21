package com.college.disasterrelief.repository;

import com.college.disasterrelief.model.RescueTeam;
import com.college.disasterrelief.model.enums.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RescueTeamRepository extends JpaRepository<RescueTeam, Long> {
    List<RescueTeam> findByAvailability(Availability availability);
}

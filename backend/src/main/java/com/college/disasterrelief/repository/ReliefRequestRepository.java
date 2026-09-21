package com.college.disasterrelief.repository;

import com.college.disasterrelief.model.ReliefRequest;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.model.enums.RequestStatus;
import com.college.disasterrelief.model.enums.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReliefRequestRepository extends JpaRepository<ReliefRequest, Long> {

    List<ReliefRequest> findByCitizen(User citizen);

    List<ReliefRequest> findByStatus(RequestStatus status);

    List<ReliefRequest> findByCitizenIdAndRequestTypeAndDisasterIdAndCreatedAtAfter(
            Long citizenId, RequestType requestType, Long disasterId, LocalDateTime after);

    List<ReliefRequest> findByCitizenIdAndRequestTypeAndDisasterIsNullAndCreatedAtAfter(
            Long citizenId, RequestType requestType, LocalDateTime after);

    long countByStatus(RequestStatus status);
}

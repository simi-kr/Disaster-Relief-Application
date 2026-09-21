package com.college.disasterrelief.model;

import com.college.disasterrelief.model.enums.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("RESCUE_TEAM")
@NoArgsConstructor
public class RescueTeamMember extends User {

    @Override
    public Role getRole() {
        return Role.RESCUE_TEAM;
    }

    @Override
    public String getDashboardSummary() {
        return "Rescue team dashboard: view dispatch assignments and update mission status.";
    }
}

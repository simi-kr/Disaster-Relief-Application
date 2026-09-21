package com.college.disasterrelief.model;

import com.college.disasterrelief.model.enums.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("CITIZEN")
@NoArgsConstructor
public class Citizen extends User {

    @Override
    public Role getRole() {
        return Role.CITIZEN;
    }

    @Override
    public String getDashboardSummary() {
        return "Citizen dashboard: submit relief requests, track their status, and view nearby relief centers.";
    }
}

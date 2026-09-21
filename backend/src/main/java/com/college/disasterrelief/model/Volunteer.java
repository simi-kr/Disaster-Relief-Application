package com.college.disasterrelief.model;

import com.college.disasterrelief.model.enums.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("VOLUNTEER")
@NoArgsConstructor
public class Volunteer extends User {

    @Override
    public Role getRole() {
        return Role.VOLUNTEER;
    }

    @Override
    public String getDashboardSummary() {
        return "Volunteer dashboard: view assigned relief requests and update your availability.";
    }
}

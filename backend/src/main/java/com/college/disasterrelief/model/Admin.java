package com.college.disasterrelief.model;

import com.college.disasterrelief.model.enums.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ADMIN")
@NoArgsConstructor
public class Admin extends User {

    @Override
    public Role getRole() {
        return Role.ADMIN;
    }

    @Override
    public String getDashboardSummary() {
        return "Admin dashboard: aggregate system-wide relief operation statistics and manage all modules.";
    }
}

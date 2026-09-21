package com.college.disasterrelief.model.enums;

public enum Priority {
    CRITICAL(4), HIGH(3), MEDIUM(2), LOW(1);

    private final int score;

    Priority(int score) {
        this.score = score;
    }

    public int getScore() {
        return score;
    }
}

package com.college.disasterrelief.exception;

import org.springframework.http.HttpStatus;

public abstract class AppException extends RuntimeException {

    protected AppException(String message) {
        super(message);
    }

    public abstract HttpStatus getStatus();
}

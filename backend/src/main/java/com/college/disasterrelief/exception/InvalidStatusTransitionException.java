package com.college.disasterrelief.exception;

import org.springframework.http.HttpStatus;

public class InvalidStatusTransitionException extends AppException {

    public InvalidStatusTransitionException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}

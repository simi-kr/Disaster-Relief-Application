package com.college.disasterrelief.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedActionException extends AppException {

    public UnauthorizedActionException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.FORBIDDEN;
    }
}

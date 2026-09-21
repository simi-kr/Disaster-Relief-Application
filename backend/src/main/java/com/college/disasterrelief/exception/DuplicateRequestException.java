package com.college.disasterrelief.exception;

import org.springframework.http.HttpStatus;

public class DuplicateRequestException extends AppException {

    public DuplicateRequestException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.CONFLICT;
    }
}

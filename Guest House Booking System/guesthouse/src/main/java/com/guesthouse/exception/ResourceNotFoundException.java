package com.guesthouse.exception;

/**
 * Custom exception thrown when a requested resource (like User, Room, Booking) is not found.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

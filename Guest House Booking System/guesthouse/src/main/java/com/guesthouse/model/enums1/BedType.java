package com.guesthouse.model.enums1;

public enum BedType {
    SINGLE("Single Bed"),
    DOUBLE("Double Bed"),
    QUEEN("Queen Bed"),
    KING("King Bed");

    private final String displayName;

    BedType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
} 
package com.CoffeShopApplication.model;

public enum DrinkType {
    COLD_BREW(1),
    ESPRESSO(2),
    AMERICANO(2),
    CAPPUCCINO(4),
    LATTE(4),
    MOCHA(6);

    private final int prepTime;

    DrinkType(int prepTime) {
        this.prepTime = prepTime;
    }

    public int getPrepTime() {
        return prepTime;
    }
}


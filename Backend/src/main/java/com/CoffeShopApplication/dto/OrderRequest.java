package com.CoffeShopApplication.dto;
import com.CoffeShopApplication.model.DrinkType;
import lombok.Data;

@Data
public class OrderRequest {
    private DrinkType type;
    private boolean regular;
}


package com.CoffeShopApplication.Repository;

import com.CoffeShopApplication.model.Barista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaristaRepository extends JpaRepository<Barista, Long> {
}

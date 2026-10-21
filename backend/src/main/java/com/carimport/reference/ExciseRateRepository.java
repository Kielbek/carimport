package com.carimport.reference;

import com.carimport.domain.FuelType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExciseRateRepository extends JpaRepository<ExciseRate, Long> {

    List<ExciseRate> findByCountryCodeAndFuelType(String countryCode, FuelType fuelType);
}

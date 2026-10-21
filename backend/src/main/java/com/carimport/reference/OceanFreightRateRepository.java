package com.carimport.reference;

import com.carimport.domain.ShippingMethod;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OceanFreightRateRepository extends JpaRepository<OceanFreightRate, Long> {

    Optional<OceanFreightRate> findByDeparturePortAndEuPortCodeAndMethodAndSizeClass(
            String departurePort, String euPortCode, ShippingMethod method,
            OceanFreightRate.SizeClass sizeClass);
}

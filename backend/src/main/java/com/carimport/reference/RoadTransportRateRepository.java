package com.carimport.reference;

import com.carimport.domain.DeliveryMode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadTransportRateRepository extends JpaRepository<RoadTransportRate, Long> {

    Optional<RoadTransportRate> findByCountryCodeAndMode(String countryCode, DeliveryMode mode);
}

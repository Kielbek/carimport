package com.carimport.reference;

import com.carimport.domain.OriginCountry;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InlandTransportRateRepository extends JpaRepository<InlandTransportRate, Long> {

    List<InlandTransportRate> findByOriginCountryAndPickupZoneIn(OriginCountry origin,
                                                                          Collection<String> zones);
}

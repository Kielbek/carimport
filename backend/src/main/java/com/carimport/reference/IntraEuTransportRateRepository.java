package com.carimport.reference;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IntraEuTransportRateRepository extends JpaRepository<IntraEuTransportRate, Long> {

    Optional<IntraEuTransportRate> findByEuPortCodeAndDestinationCountry(String euPortCode,
                                                                                  String destinationCountry);
}

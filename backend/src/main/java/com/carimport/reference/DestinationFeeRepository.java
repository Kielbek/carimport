package com.carimport.reference;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinationFeeRepository extends JpaRepository<DestinationFee, Long> {

    List<DestinationFee> findByDestinationCountry(String destinationCountry);
}

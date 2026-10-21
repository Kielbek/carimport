package com.carimport.reference;

import com.carimport.domain.OriginCountry;
import com.carimport.domain.VehicleCondition;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConditionSurchargeRepository extends JpaRepository<ConditionSurcharge, Long> {

    List<ConditionSurcharge> findByOriginCountryAndCondition(OriginCountry originCountry,
                                                                      VehicleCondition condition);
}

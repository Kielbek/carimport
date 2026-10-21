package com.carimport.reference;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EuCountryTaxProfileRepository extends JpaRepository<EuCountryTaxProfile, Long> {

    List<EuCountryTaxProfile> findByCountryCodeOrderByValidFromDesc(String countryCode);
}

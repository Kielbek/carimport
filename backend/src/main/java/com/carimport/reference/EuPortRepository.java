package com.carimport.reference;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EuPortRepository extends JpaRepository<EuPort, String> {

    List<EuPort> findByActiveTrueOrderByName();
}

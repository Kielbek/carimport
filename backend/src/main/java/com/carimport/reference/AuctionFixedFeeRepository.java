package com.carimport.reference;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.OriginCountry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionFixedFeeRepository extends JpaRepository<AuctionFixedFee, Long> {

    List<AuctionFixedFee> findByAuctionHouseAndOriginCountry(AuctionHouse auctionHouse,
                                                                      OriginCountry originCountry);
}

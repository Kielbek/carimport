package com.carimport.reference;

import com.carimport.domain.AuctionHouse;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionFeeTierRepository extends JpaRepository<AuctionFeeTier, Long> {

    List<AuctionFeeTier> findByAuctionHouse(AuctionHouse auctionHouse);
}

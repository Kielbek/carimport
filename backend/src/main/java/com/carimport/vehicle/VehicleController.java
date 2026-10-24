package com.carimport.vehicle;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Fill the vehicle step from a VIN. */
@RestController
@RequestMapping("/api/v1/vehicle")
public class VehicleController {

    private final VinService vins;

    public VehicleController(VinService vins) {
        this.vins = vins;
    }

    @GetMapping("/vin/{vin}")
    public ResponseEntity<?> decode(@PathVariable String vin) {
        return vins.decode(vin)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> {
                    ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
                    problem.setProperty("messageKey", "vin.invalid");
                    return ResponseEntity.badRequest().body(problem);
                });
    }
}

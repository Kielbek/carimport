package com.carimport.euimport;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Free estimate for a car bought in another member state (rate-limited with the other quote endpoints). */
@RestController
@RequestMapping("/api/v1/quotes/eu")
public class EuImportController {

    private final EuImportService service;

    public EuImportController(EuImportService service) {
        this.service = service;
    }

    @PostMapping
    public EuImportResult calculate(@Valid @RequestBody EuImportRequest request) {
        return service.calculate(request);
    }
}

package com.carimport;

import com.carimport.fx.FxSyncJob;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarImportApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarImportApplication.class, args);
    }

    @Bean
    CommandLineRunner runOnStart(FxSyncJob fxSyncJob) {
        return args -> {
            try {
                fxSyncJob.sync();
                System.out.println(">>> Kursy walut zostały pomyślnie zsynchronizowane!");
            } catch (Exception e) {
                System.err.println(">>> Błąd synchronizacji kursów: " + e.getMessage());
            }
        };
    }
}

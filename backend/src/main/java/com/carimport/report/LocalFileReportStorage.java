package com.carimport.report;

import com.carimport.config.AppProperties;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.stereotype.Component;

@Component
public class LocalFileReportStorage implements ReportStorage {

    private final Path root;

    public LocalFileReportStorage(AppProperties props) {
        this.root = Path.of(props.report().storageDir());
    }

    @Override
    public String store(String key, byte[] pdf) {
        try {
            Path target = resolve(key);
            Files.createDirectories(target.getParent());
            Files.write(target, pdf);
            return key;
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Override
    public InputStream open(String key) {
        try {
            return Files.newInputStream(resolve(key));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private Path resolve(String key) {
        Path path = root.resolve(key).normalize();
        if (!path.startsWith(root.normalize())) {
            throw new IllegalArgumentException("Invalid storage key " + key);
        }
        return path;
    }
}

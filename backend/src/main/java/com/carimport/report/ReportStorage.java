package com.carimport.report;

import java.io.InputStream;

/** Blob storage for generated PDFs. Production: S3 / GCS with server-side encryption; dev: local filesystem. */
public interface ReportStorage {

    String store(String key, byte[] pdf);

    InputStream open(String key);
}

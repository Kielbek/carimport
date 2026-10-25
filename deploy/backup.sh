#!/bin/sh
# Daily backup of the database (pg_dump, custom format) and the generated reports into /backups (./backups on the
# host). One run at start-up, then every day at $BACKUP_TIME (UTC); files older than $BACKUP_KEEP_DAYS are removed.
# Copy ./backups off the server regularly (rsync, rclone, a storage box) - a backup on the same disk is not enough.
set -u
KEEP="${BACKUP_KEEP_DAYS:-14}"
AT="${BACKUP_TIME:-02:30}"

run() {
  ts=$(date -u +%Y%m%d-%H%M)
  if ! pg_dump -Fc -f "/backups/db-$ts.dump.part"; then
    rm -f "/backups/db-$ts.dump.part"
    echo "$(date -u +%FT%TZ) ERROR backup $ts: pg_dump failed"
    return 1
  fi
  mv "/backups/db-$ts.dump.part" "/backups/db-$ts.dump"
  tar -czf "/backups/reports-$ts.tar.gz" -C /data reports
  find /backups -maxdepth 1 \( -name 'db-*.dump' -o -name 'reports-*.tar.gz' \) -mtime +"$KEEP" -delete
  echo "$(date -u +%FT%TZ) INFO backup $ts done: db $(du -h "/backups/db-$ts.dump" | cut -f1)," \
       "reports $(du -h "/backups/reports-$ts.tar.gz" | cut -f1), dumps kept: $(ls /backups/db-*.dump | wc -l)"
}

until pg_isready -q; do sleep 2; done
run
last=$(date -u +%F)
while true; do
  if [ "$(date -u +%H:%M)" = "$AT" ] && [ "$(date -u +%F)" != "$last" ]; then
    run
    last=$(date -u +%F)
  fi
  sleep 20
done

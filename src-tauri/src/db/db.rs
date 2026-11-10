use libsql::Database;
use std::path::Path;

pub async fn init_local(local_path: impl AsRef<Path>) -> Result<Database, libsql::Error> {
    libsql::Builder::new_local(local_path).build().await
}

pub async fn init_embedded_replica(
    local_path: impl AsRef<Path>,
    remote_url: &str,
    auth_token: &str,
) -> Result<Database, libsql::Error> {
    // Build the embedded replica pointing to your Turso/libSQL backend
    let db = libsql::Builder::new_remote_replica(
        local_path,
        remote_url.to_owned(),
        auth_token.to_owned(),
    )
        .build()
        .await?;

    // Sync down the latest updates immediately on startup
    db.sync().await?;

    Ok(db)
}

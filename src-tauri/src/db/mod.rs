mod db;
pub mod model;

use libsql::Database;
use std::path::Path;

const SCHEMA: &str = include_str!("schema.sql");

pub async fn initialize(
    local_path: impl AsRef<Path>,
    remote_url: Option<&str>,
    auth_token: Option<&str>,
) -> Result<Database, libsql::Error> {
    let local_path = local_path.as_ref();
    let database = match (remote_url, auth_token) {
        (Some(url), Some(token)) if !url.is_empty() && !token.is_empty() => {
            match db::init_embedded_replica(local_path, url, token).await {
                Ok(database) => database,
                Err(error) => {
                    eprintln!("Embedded replica unavailable, using local database: {error}");
                    db::init_local(local_path).await?
                }
            }
        }
        _ => db::init_local(local_path).await?,
    };

    let connection = database.connect()?;
    connection.execute_batch(SCHEMA).await?;
    Ok(database)
}

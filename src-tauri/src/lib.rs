pub mod db;
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Get the app's secure local data directory
            let app_dir = app
                .path()
                .app_data_dir()
                .expect("failed to get app data dir");
            std::fs::create_dir_all(&app_dir).ok();
            let db_path = app_dir.join("local.db");
            let db_path_str = db_path.to_str().unwrap().to_string();

            let remote_url = std::env::var("TURSO_DATABASE_URL").ok();
            let auth_token = std::env::var("TURSO_AUTH_TOKEN").ok();

            tauri::async_runtime::block_on(async move {
                match db::initialize(
                &db_path_str,
                remote_url.as_deref(),
                auth_token.as_deref(),
                )
                .await
                {
                Ok(database) => {
                    app.manage(database);
                }
                Err(error) => {
                    eprintln!("Database initialization failed: {error}");
                }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, close_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
fn close_app(window: tauri::Window) {
    let _ = window.close();
}

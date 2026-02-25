use lancedb::{connect, Connection, Table};

pub async fn init_vector_db() -> Result<Connection, lancedb::Error> {
    let uri = "data/guardian_vectors";
    let db = connect(uri).execute().await?;
    Ok(db)
}
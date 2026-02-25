// Example trait for your agents
pub trait HealthAgent {
    fn process_data(&self, data: String);
    fn generate_insight(&self) -> String;
}
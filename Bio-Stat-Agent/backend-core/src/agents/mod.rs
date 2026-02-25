use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct StatisticalHypothesis {
    pub null_hypothesis: String,
    pub alt_hypothesis: String,
    pub recommended_test: String,
    pub variables: Variables,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Variables {
    pub independent: String,
    pub dependent: String,
}

// Function to send research_goal to Python and return this struct
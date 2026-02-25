use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum ArmAction {
    Proceed,
    DivertToWaste,
    HoldForManualReview,
}

pub struct RoboticsControlAgent {
    pub line_speed: u32, // Items per minute
    pub is_active: bool,
}

impl RoboticsControlAgent {
    pub fn new() -> Self {
        Self {
            line_speed: 60,
            is_active: true,
        }
    }

    /// Decision engine: Links Inspection results to physical movement
    pub fn determine_action(&self, inspection_type: &str, confidence: f32) -> ArmAction {
        if inspection_type == "DefectDetected" {
            if confidence > 0.90 {
                return ArmAction::DivertToWaste;
            } else {
                return ArmAction::HoldForManualReview;
            }
        }
        ArmAction::Proceed
    }
}
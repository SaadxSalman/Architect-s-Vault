use enigo::*;

pub fn perform_action(action: &str) {
    let mut enigo = Enigo::new();
    match action {
        "shoot" => {
            enigo.mouse_click(MouseButton::Left);
        }
        "move_forward" => {
            enigo.key_down(Key::Layout('w'));
            // Logic to hold/release would go here
        }
        _ => {}
    }
}
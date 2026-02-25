use pyo3::prelude::*;

#[pyclass]
pub struct MoleculeSim {
    #[pyo3(get)]
    pub atom_count: usize,
}

#[pymethods]
impl MoleculeSim {
    #[new]
    fn new() -> Self {
        MoleculeSim { atom_count: 0 }
    }

    // This handles the "Action" from the RL Agent
    fn add_atom(&mut self, atom_type: String) -> PyResult<usize> {
        println!("Rust: Adding atom of type {}", atom_type);
        self.atom_count += 1;
        // Logic for valency and chemical validity goes here
        Ok(self.atom_count)
    }

    fn reset(&mut self) {
        self.atom_count = 0;
    }
}

#[pymodule]
fn pharma_sim(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<MoleculeSim>()?;
    Ok(())
}
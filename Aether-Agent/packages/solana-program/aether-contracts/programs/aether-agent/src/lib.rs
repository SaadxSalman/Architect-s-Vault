use anchor_lang::prelude::*;

declare_id!("G4sskGCCr4asC6Am8saezpvYJFhqR2aF79Q4625w3Pnd");

#[program]
pub mod aether_contracts {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

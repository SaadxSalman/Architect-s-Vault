use anchor_lang::prelude::*;

declare_id!("Your_Program_ID_Here");

#[program]
pub mod pharma_log {
    use super::*;
    pub fn log_candidate(ctx: Context<LogCandidate>, smiles: String, score: u64) -> Result<()> {
        let record = &mut ctx.accounts.candidate_record;
        record.smiles = smiles;
        record.score = score;
        Ok(())
    }
}

#[program]
pub mod pharma_log {
    use super::*;

    pub fn log_molecule(ctx: Context<LogMolecule>, smiles: String, reward_score: u64) -> Result<()> {
        let record = &mut ctx.accounts.molecule_record;
        record.smiles = smiles;
        record.reward_score = reward_score;
        record.timestamp = Clock::get()?.unix_timestamp;
        
        msg!("New Drug Candidate Logged: {} with score {}", record.smiles, reward_score);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct LogMolecule<'info> {
    #[account(init, payer = user, space = 8 + 128 + 8 + 8)] 
    pub molecule_record: Account<'info, MoleculeData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MoleculeData {
    pub smiles: String,      // Max ~100 chars
    pub reward_score: u64,   // Multiplied by 100 for precision
    pub timestamp: i64,
}
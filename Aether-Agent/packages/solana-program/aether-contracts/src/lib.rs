use anchor_lang::prelude::*;

declare_id!("YOUR_PROGRAM_ID_HERE");

#[program]
pub mod aether_contracts {
    use super::*;

    pub fn report_crisis(
        ctx: Context<ReportCrisis>, 
        crisis_type: String, 
        severity: u8
    ) -> Result<()> {
        let crisis_account = &mut ctx.accounts.crisis_account;
        crisis_account.authority = *ctx.accounts.authority.key;
        crisis_account.crisis_type = crisis_type;
        crisis_account.severity = severity;
        crisis_account.timestamp = Clock::get()?.unix_timestamp;
        
        msg!("Crisis Recorded: {} with severity {}", crisis_account.crisis_type, severity);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ReportCrisis<'info> {
    #[account(
        init, 
        payer = authority, 
        space = 8 + 32 + 64 + 1 + 8, // Discriminator + Pubkey + String + u8 + i64
        seeds = [b"crisis", authority.key().as_ref()], 
        bump
    )]
    pub crisis_account: Account<'info, CrisisAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct CrisisAccount {
    pub authority: Pubkey,
    pub crisis_type: String,
    pub severity: u8,
    pub timestamp: i64,
}
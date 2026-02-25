use anchor_lang::prelude::*;

declare_id!("Your_Program_ID_Here");

#[program]
pub mod gene_master {
    use super::*;

    // Initializes a new research query on the blockchain
    pub fn initialize_query(ctx: Context<InitializeQuery>, query_hash: [u8; 32]) -> Result<()> {
        let query_account = &mut ctx.accounts.query_account;
        query_account.researcher = *ctx.accounts.researcher.key;
        query_account.query_hash = query_hash;
        query_account.status = QueryStatus::Pending;
        Ok(())
    }

    // Called by the Validation Agent once statistical checks pass
    pub fn verify_result(ctx: Context<VerifyResult>, result_checksum: [u8; 32]) -> Result<()> {
        let query_account = &mut ctx.accounts.query_account;
        query_account.result_checksum = result_checksum;
        query_account.status = QueryStatus::Validated;
        Ok(())
    }
}

#[account]
pub struct QueryAccount {
    pub researcher: Pubkey,
    pub query_hash: [u8; 32],
    pub result_checksum: [u8; 32],
    pub status: QueryStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum QueryStatus {
    Pending,
    Computing,
    Validated,
}

#[derive(Accounts)]
pub struct InitializeQuery<'info> {
    #[account(init, payer = researcher, space = 8 + 32 + 32 + 32 + 1)]
    pub query_account: Account<'info, QueryAccount>,
    #[account(mut)]
    pub researcher: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyResult<'info> {
    #[account(mut)]
    pub query_account: Account<'info, QueryAccount>,
    pub validator_agent: Signer<'info>,
}
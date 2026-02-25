use anchor_lang::prelude::*;

declare_id!("Your_Program_ID_Here");

#[program]
pub mod geneledger_dao {
    use super::*;
    pub fn register_data(ctx: Context<RegisterData>, metadata_hash: String, price: u64) -> Result<()> {
        let data_account = &mut ctx.accounts.data_account;
        data_account.owner = *ctx.accounts.owner.key;
        data_account.metadata_hash = metadata_hash;
        data_account.price = price;
        Ok(())
    }
}

#[account]
pub struct DataRecord {
    pub owner: Pubkey,
    pub metadata_hash: String,
    pub price: u64,
}

#[derive(Accounts)]
pub struct RegisterData<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 64 + 8)]
    pub data_account: Account<'info, DataRecord>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
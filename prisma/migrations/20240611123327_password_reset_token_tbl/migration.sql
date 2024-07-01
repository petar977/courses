BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PasswordResetToken] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [PasswordResetToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PasswordResetToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [PasswordResetToken_email_token_key] UNIQUE NONCLUSTERED ([email],[token])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

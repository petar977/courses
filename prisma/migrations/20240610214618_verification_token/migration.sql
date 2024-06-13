BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [VerificationToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [VerificationToken_email_token_key] UNIQUE NONCLUSTERED ([email],[token])
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

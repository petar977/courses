BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [UserRoles_roleId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [UserRoles_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Users] ADD [isTwoFactorEnabled] BIT NOT NULL CONSTRAINT [Users_isTwoFactorEnabled_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[TwoFactorToken] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [TwoFactorToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [TwoFactorToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [TwoFactorToken_email_token_key] UNIQUE NONCLUSTERED ([email],[token])
);

-- CreateTable
CREATE TABLE [dbo].[TwoFactorConfirmation] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TwoFactorConfirmation_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [TwoFactorConfirmation_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserRoles] ADD CONSTRAINT [UserRoles_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRoles] ADD CONSTRAINT [UserRoles_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Roles]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TwoFactorConfirmation] ADD CONSTRAINT [TwoFactorConfirmation_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

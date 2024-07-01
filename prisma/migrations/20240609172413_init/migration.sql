BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserRoles] (
    [userId] NVARCHAR(1000) NOT NULL,
    [roleId] INT NOT NULL,
    CONSTRAINT [UserRoles_pkey] PRIMARY KEY CLUSTERED ([userId],[roleId])
);

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [role] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Roles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [email_verified] DATETIME2,
    [password] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Accounts] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [provider_account_id] NVARCHAR(1000) NOT NULL,
    [refresh_token] TEXT,
    [access_token] TEXT,
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] TEXT,
    [session_state] NVARCHAR(1000),
    CONSTRAINT [Accounts_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Accounts_provider_provider_account_id_key] UNIQUE NONCLUSTERED ([provider],[provider_account_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserRoles] ADD CONSTRAINT [UserRoles_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRoles] ADD CONSTRAINT [UserRoles_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Accounts] ADD CONSTRAINT [Accounts_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

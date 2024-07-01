BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] TEXT NOT NULL,
    [description] TEXT,
    [ImageUrl] TEXT,
    [price] FLOAT(53),
    [isPublished] BIT NOT NULL CONSTRAINT [Course_isPublished_df] DEFAULT 0,
    [userId] NVARCHAR(1000) NOT NULL,
    [categoryId] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Course_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Course_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Course_userId_id_key] UNIQUE NONCLUSTERED ([userId],[id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Attachment] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [url] TEXT NOT NULL,
    [courseId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Attachment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Attachment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Attachment_courseId_idx] ON [dbo].[Attachment]([courseId]);

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attachment] ADD CONSTRAINT [Attachment_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

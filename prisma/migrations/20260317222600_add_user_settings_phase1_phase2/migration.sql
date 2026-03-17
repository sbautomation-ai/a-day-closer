-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "dayRolloverTime" TEXT,
ADD COLUMN     "emailReminderEnabled" BOOLEAN,
ADD COLUMN     "emailReminderFrequency" TEXT,
ADD COLUMN     "highContrastReading" BOOLEAN,
ADD COLUMN     "textSize" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "weeklySummaryEnabled" BOOLEAN;

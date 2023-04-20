/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `mqtt_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `mqtt_user_username_key` ON `mqtt_user`(`username`);

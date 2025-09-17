import { Worker } from "bullmq";
import { redisConnection } from "@repo/backend-common/secret";
import { prismaClient } from "@repo/db";

const chatWorker = new Worker(
  "chat-queue",
  async (job) => {
    const { roomId, message, userId } = job.data;
    console.log("Worker processing job:", job.id, job.data);

    await prismaClient.chat.create({
      data: { roomId: Number(roomId), message, userId },
    });
  },
  { connection: redisConnection }
);

chatWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

chatWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
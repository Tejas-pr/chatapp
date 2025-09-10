"use server";

import { prismaClient } from "@repo/db";
import { CreateRoomSchema } from "@repo/common/types";
import { getUserSession } from "./utils";
import { ZodError } from "zod";

export const creteNewRoom = async (room: string) => {
  const session = await getUserSession();
  try {
    if (!session) {
      return { error: "Unauthorized" };
    }

    const parsedData = CreateRoomSchema.safeParse({ name: room });

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const userId = session.user.id;

    const isRoom = await prismaClient.room.findFirst({
      where: { slug: parsedData.data.name },
    });

    if (isRoom) {
      return { message: "Room already exists!!" };
    }

    const newRoom = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    if (newRoom) {
      return { room: newRoom };
    } else {
      return { message: "Failed to create a room" };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((issue) => {
        console.error(
          `Field: ${issue.path.join(".")}, Message: ${issue.message}`
        );
      });
      return { message: "Validation failed", status: 400 };
    } else if (error instanceof Error) {
      console.error("Error creating room:", error.message);
      return { message: error.message, status: 400 };
    } else {
      console.error("Unknown error:", error);
      return { message: "Unexpected error", status: 500 };
    }
  }
};

export const getAllRooms = async () => {
  const session = await getUserSession();
  try {
    console.log("the session is", session);
    if (!session) {
      return { error: "Unauthorized" };
    }

    const user = session?.user.id;
    console.log("the user is", user);

    const rooms = await prismaClient.room.findMany({
      where: {
        adminId: user,
      },
    });

    return {
      rooms,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((issue) => {
        console.error(
          `Field: ${issue.path.join(".")}, Message: ${issue.message}`
        );
      });
    } else {
      console.error(error);
    }
  }
};

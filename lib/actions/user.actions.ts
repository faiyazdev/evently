"use server";
import { clerkClient } from "@clerk/nextjs/server";
import connectToDatabase from "../db";
import Event from "../db/models/event.model";
import User from "../db/models/user.model";
import type { CreateUserParams, UpdateUserParams } from "@/types";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return newUser.toObject();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { $set: user },
      {
        returnDocument: "after",
      },
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Error upserting user:", error);
    throw error;
  }
};

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Event.updateMany(
      {
        organizer: userToDelete._id,
      },
      { $unset: { organizer: 1 } },
    );

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

type SyncClerkMetadataParams = {
  clerkId: string;
  userId: string;
};

export async function syncClerkMetadata({
  clerkId,
  userId,
}: SyncClerkMetadataParams) {
  try {
    const client = await clerkClient();

    await client.users.updateUserMetadata(clerkId, {
      publicMetadata: {
        userId,
      },
    });
  } catch (error) {
    console.error("Failed to sync Clerk metadata:", error);
    throw error;
  }
}

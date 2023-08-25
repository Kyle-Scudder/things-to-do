"use server"

import { revalidatePath } from "next/cache";
import User, { IUser } from "../models/user";
import { connectToDB } from "../mongoose";
import { clerkClient } from "@clerk/nextjs";
import { convertBase64ToFile } from "../utils";

export async function getUserInfo(id: string) {
  try {
    connectToDB();

    return await User.findOne({
      clerkId: id
    })
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

export async function updateUser(userData: IUser, path: string) {
  try {
    connectToDB();

		await User.findOneAndUpdate(
			{ clerkId: userData.clerkId }, {
			_id: userData._id,
			username: userData.username,
			clerkId: userData.clerkId,
			name: userData.name,
			bio: userData.bio,
			onboarded: true
    }, { upsert: true, new: true })
    if (!userData.image.includes('https://img.clerk.com')) {
      const file: File = convertBase64ToFile(userData.image)
      clerkClient.users.updateUserProfileImage(userData.clerkId, { file: file }).catch(err => console.table(err.errors));
    }
    
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

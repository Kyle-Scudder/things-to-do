import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  _id: string;
	clerkId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
	_id: { type: String },
	clerkId: { type: String },
	username: { type: String, required: true, unique: true, min: [3, 'Please enter a longer name'], max: [3, 'Please enter a shorter name'] },
	name: { type: String, min: [3, 'Please enter a longer name'], max: [3, 'Please enter a shorter name'] },
	bio: { type: String },
	image: { type: String },
	onboarded: { type: Boolean, default: false }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
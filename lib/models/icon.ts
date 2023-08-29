import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IIcon {
  _id: string;
	icon: string;
	text: string;
}

const iconSchema = new mongoose.Schema<IIcon>({
	_id: { type: String },
	icon: { type: String },
	text: { type: String }
})

const Icon = mongoose.models.Icon || mongoose.model('Icon', iconSchema)

export default Icon
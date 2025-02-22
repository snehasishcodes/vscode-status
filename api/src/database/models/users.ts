import { Schema, Document, model } from "mongoose";

export interface Activity {
	started: Date
	ended?: Date
	file: {
		path: string
		name: string
		extension: string
		language: string
		size: string
		lines: number
		position: {
			line: number
			column: number
		}
		errors: number
	}
	workspace: {
		name: string
		path: string
	}
	debugging: boolean
}

export interface User extends Document {
	id: string
	token: string
	current: Activity | null
	recent: Activity | null
	updated: Date
	created: Date
}

const userSchema = new Schema<User>({
	id: { type: String, required: true },
	token: { type: String, required: true },
	current: { type: Schema.Types.Mixed, required: false },
	recent: { type: Schema.Types.Mixed, required: false },
	updated: { type: Date, required: true, default: new Date() },
	created: { type: Date, required: true, default: new Date() }
});

const users = model<User>("users", userSchema);

export default users;
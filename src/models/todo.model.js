import { Schema, model } from "mongoose";


const todoSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    favorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey:false
} )


export const Todo = model("Todo", todoSchema)
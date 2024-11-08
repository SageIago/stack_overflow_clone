import { models, model, Schema } from "mongoose";

export interface I_Interaction extends Document {
    user: Schema.Types.ObjectId;
    action: string
    question: Schema.Types.ObjectId
    answer: Schema.Types.ObjectId[]
    tags: Schema.Types.ObjectId[]
    createdAt: Date
}

const InteractionSchema = new Schema<I_Interaction>({
    user: { type: Schema.Types.ObjectId, ref: "User" , required: true},
    action: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    answer: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    createdAt: { type: Date, default: Date.now }
})

const Interaction = models.Interaction || model<I_Interaction>("Interaction", InteractionSchema)

export default Interaction


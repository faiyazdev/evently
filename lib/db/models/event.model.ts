import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: String,
    isFree: { type: Boolean, default: false },
    url: String,

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;

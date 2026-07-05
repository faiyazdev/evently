import mongoose, {
  Document,
  Schema,
  model,
  models,
  Types,
  InferSchemaType,
} from "mongoose";
import { UserType } from "./user.model";
import { CategoryType } from "./category.model";

export interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;

  imageUrl: string;

  startDateTime: Date;
  endDateTime: Date;

  price?: string;
  isFree: boolean;
  url?: string;

  category: Types.ObjectId;
  organizer: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: String,
    location: String,

    imageUrl: {
      type: String,
      required: true,
    },

    startDateTime: {
      type: Date,
      default: Date.now,
    },

    endDateTime: {
      type: Date,
      default: Date.now,
    },

    price: String,

    isFree: {
      type: Boolean,
      default: false,
    },

    url: String,

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event: mongoose.Model<IEvent> =
  models.Event || model<IEvent>("Event", EventSchema);
export type EventType = InferSchemaType<typeof EventSchema>;
export type EventTypeWithRelations = Omit<
  EventType,
  "organizer" | "category"
> & {
  organizer: UserType;
  category: CategoryType;
};
export default Event;

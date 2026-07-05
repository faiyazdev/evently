import mongoose, {
  InferSchemaType,
  models,
  Schema,
  Document,
  Model,
} from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

const Category: Model<ICategory> =
  models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export type CategoryType = InferSchemaType<typeof CategorySchema>;
export default Category;

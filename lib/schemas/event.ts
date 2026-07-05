import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    imageUrl: z.url({ message: "Invalid image URL" }),
    startDateTime: z.date(),
    endDateTime: z.date(),
    price: z.string().optional(),
    isFree: z.boolean(),
    url: z.url({ message: "Invalid event URL" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
    organizer: z.string().min(1, { message: "Organizer is required" }),
  })
  .refine((data) => data.isFree || data.price !== "", {
    message: "Price is required for paid events.",
    path: ["price"],
  })
  .refine((data) => data.endDateTime > data.startDateTime, {
    message: "End date must be after the start date.",
    path: ["endDateTime"],
  });

export type IEventSchema = z.infer<typeof eventSchema>;

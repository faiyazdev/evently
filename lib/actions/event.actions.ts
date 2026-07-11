"use server";

import { CreateEventParams, UpdateEventParams } from "@/types";
import connectToDatabase from "../db";
import User, { UserType } from "../db/models/user.model";
import { EventDto, toEventDto } from "../dto/event.dto";
import Event, { EventType, IEvent } from "../db/models/event.model";
import Category, { CategoryType } from "../db/models/category.model";
import { QueryFilter } from "mongoose";

export const createEvent = async ({
  userId,
  event,
}: CreateEventParams): Promise<IEvent> => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.error("Error creating Event:", error);
    throw error;
  }
};

export const updateEvent = async ({
  userId,
  event: data,
}: UpdateEventParams): Promise<IEvent> => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const updateEvent = await Event.findByIdAndUpdate(data._id, {
      $set: { ...data, organizer: userId },
    });
    return JSON.parse(JSON.stringify(updateEvent));
  } catch (error) {
    console.error("Error updating Event:", error);
    throw error;
  }
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

export const getEvents = async ({
  limit = 6,
  page,
  query,
  category,
}: {
  limit?: number;
  page: number;
  query?: string;
  category?: string;
}) => {
  await connectToDatabase();
  console.log("events rendered");

  const categoryDoc = category ? await getCategoryByName(category) : null;

  if (category && !categoryDoc) {
    return {
      data: [],
      totalPages: 0,
    };
  }

  const filter: QueryFilter<EventType> = {};

  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    filter.title = {
      $regex: escaped,
      $options: "i",
    };
  }

  if (categoryDoc) {
    filter.category = categoryDoc._id;
  }

  const [events, total] = await Promise.all([
    Event.find(filter)
      .populate<{ organizer: UserType }>("organizer")
      .populate<{ category: CategoryType }>("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

    Event.countDocuments(filter),
  ]);

  return {
    data: events.map(toEventDto),
    totalPages: Math.ceil(total / limit),
  };
};

export const getEventById = async (id: string): Promise<EventDto | null> => {
  try {
    await connectToDatabase();

    const event = await Event.findById(id)
      .populate<{ organizer: UserType }>("organizer")
      .populate<{ category: CategoryType }>("category")
      .lean();

    if (!event) return null;
    return toEventDto(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

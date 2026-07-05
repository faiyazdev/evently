"use server";

import { CreateEventParams, UpdateEventParams } from "@/types";
import connectToDatabase from "../db";
import User, { UserType } from "../db/models/user.model";
import { EventDto, toEventDto } from "../dto/event.dto";
import Event, { IEvent } from "../db/models/event.model";
import { CategoryType } from "../db/models/category.model";

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

export const getEvents = async () => {
  try {
    await connectToDatabase();
    const events = await Event.find()
      .populate<{ organizer: UserType }>("organizer")
      .populate<{ category: CategoryType }>("category")
      .lean();

    if (!events) return [];
    return events.map((event) => toEventDto(event));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
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

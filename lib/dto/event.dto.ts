import { EventTypeWithRelations } from "../db/models/event.model";
import { CategoryDto } from "./category.dto";
import { UserDto } from "./user.dto";

export type EventDto = {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category: CategoryDto;
  organizer: UserDto;
  createdAt: Date;
  updatedAt: Date;
};

export function toEventDto(Event: EventTypeWithRelations): EventDto {
  return {
    _id: Event._id.toString(),
    title: Event.title,
    description: Event.description,
    location: Event.location,
    imageUrl: Event.imageUrl,
    startDateTime: Event.startDateTime,
    endDateTime: Event.endDateTime,
    price: Event.price,
    isFree: Event.isFree,
    url: Event.url,
    category: {
      _id: Event.category._id.toString(),
      name: Event.category.name,
    },
    organizer: {
      _id: Event.organizer._id.toString(),
      firstName: Event.organizer.firstName,
      lastName: Event.organizer.lastName,
      email: Event.organizer.email,
    },
    createdAt: Event.createdAt,
    updatedAt: Event.updatedAt,
  };
}

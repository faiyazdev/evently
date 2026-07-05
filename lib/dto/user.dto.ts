import { UserType } from "../db/models/user.model";

export type UserDto = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export function toUserDto(user: UserType): UserDto {
  return {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

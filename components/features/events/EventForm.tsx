"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/schemas/event";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import CategoryDialog from "../categories/CategoryDialog";
import { createCategory } from "@/lib/actions/category.actions";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { EventDto } from "@/lib/dto/event.dto";
import { DatePicker } from "@/components/shared/DatePicker";

type EventFormProps = {
  userId: string;
  type: "create" | "update";
  categories: { _id: string; name: string }[] | null;
  event?: EventDto;
};

export default function EventForm({
  userId,
  type,
  categories: initialCategories,
  event,
}: EventFormProps) {
  const [categories, setCategories] = useState(initialCategories || []);
  const { reset, control, handleSubmit, setValue } = useForm<
    z.infer<typeof eventSchema>
  >({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      location: event?.location || "",
      imageUrl: event?.imageUrl || "",
      startDateTime: event?.startDateTime
        ? new Date(event.startDateTime)
        : new Date(),
      endDateTime: event?.endDateTime
        ? new Date(event.endDateTime)
        : new Date(),
      price: event?.price || "",
      isFree: event?.isFree || false,
      url: event?.url || "",
      categoryId: event?.category._id || "",
      organizer: event?.organizer._id || userId,
    },
  });

  async function onSubmit(data: z.infer<typeof eventSchema>) {
    console.log(data);
    if (type === "create") {
      await createEvent({ event: data, userId, path: "/profile" });

      toast.success("You created the event successfully!");
    } else {
      if (!event?._id) {
        return toast.error("Event ID is missing. Cannot update the event.");
      }
      await updateEvent({
        event: { ...data, _id: event?._id },
        userId,
        path: `/events/${event?._id}`,
      });

      toast.success("You updated the event successfully!");
    }
  }

  const isEventFree = useWatch({
    control,
    name: "isFree",
  });

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <form
          id="event-form"
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Form errors:", errors);
            toast.error("Please fix the errors in the form before submitting.");
          })}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Event Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter event title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    Event Description
                  </FieldLabel>
                  <Textarea
                    className="min-h-25"
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter event description"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="location">Event location</FieldLabel>
                  <Input
                    {...field}
                    id="location"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter event location"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="url"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="url">Event url</FieldLabel>
                  <Input
                    {...field}
                    id="url"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter event url"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="imageUrl"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="imageUrl">Event imageUrl</FieldLabel>
                  <Input
                    {...field}
                    id="imageUrl"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter event imageUrl"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="startDateTime"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="startDateTime">
                    Event start date and time
                  </FieldLabel>
                  <DatePicker
                    value={field.value}
                    setValue={(val: Date) => {
                      field.onChange(val);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="endDateTime"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endDateTime">
                    Event end date and time
                  </FieldLabel>
                  <DatePicker
                    value={field.value}
                    setValue={(val: Date) => {
                      field.onChange(val);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="isFree"
              control={control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend>Free Event</FieldLegend>
                  <FieldDescription>
                    Do you want to make this event free?
                  </FieldDescription>
                  <RadioGroup
                    name={field.name}
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => {
                      const isFree = value === "true";

                      field.onChange(isFree);

                      if (isFree) {
                        setValue("price", "");
                      }
                    }}
                  >
                    {[
                      {
                        id: "true",
                        title: "yes",
                        description: "This event is free to attend",
                      },
                      {
                        id: "false",
                        title: "no",
                        description: "This event has a price",
                      },
                    ].map((plan) => (
                      <FieldLabel
                        key={plan.title}
                        htmlFor={`form-rhf-radiogroup-${plan.id}`}
                      >
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <FieldTitle>{plan.title}</FieldTitle>
                            <FieldDescription>
                              {plan.description}
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={plan.id}
                            id={`form-rhf-radiogroup-${plan.id}`}
                            aria-invalid={fieldState.invalid}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            {!isEventFree && (
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">Event price</FieldLabel>
                    <Input
                      {...field}
                      id="price"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter event price"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="select-category">Category</FieldLabel>
                    <FieldDescription>
                      Select the category that best describes your event.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="select-category"
                      aria-invalid={fieldState.invalid}
                      className="min-w-30"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {categories.length > 0 &&
                        categories.map((category) => {
                          return (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>

                    <CategoryDialog
                      onSubmit={async (newCategory) => {
                        const res = await createCategory({
                          categoryName: newCategory,
                        });
                        const newCategoryObj = {
                          _id: res._id.toString(),
                          name: newCategory,
                        };
                        setCategories((prev) => [...prev, newCategoryObj]);
                        setTimeout(() => {
                          setValue("categoryId", newCategoryObj._id);
                        }, 10);
                        console.log("selected category", newCategoryObj);
                      }}
                    />
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" variant="secondary" form="event-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

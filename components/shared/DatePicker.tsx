"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  value: Date;
  setValue: (val: Date) => void;
};

export function DatePicker({ value, setValue }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <FieldGroup className="flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {value ? format(value, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              defaultMonth={value}
              onSelect={(selectedDate) => {
                if (!selectedDate) return;
                const newDate = new Date(selectedDate);

                newDate.setHours(value.getHours());
                newDate.setMinutes(value.getMinutes());
                newDate.setSeconds(value.getSeconds());

                setValue(newDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={format(value, "HH:mm:ss")}
          onChange={(e) => {
            const [hours, minutes, seconds] = e.target.value
              .split(":")
              .map(Number);

            const newDate = new Date(value);

            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            newDate.setSeconds(seconds || 0);

            setValue(newDate);
          }}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}

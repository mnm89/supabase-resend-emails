import React from "react";
import { useFormContext } from "react-hook-form";

import { useFormField } from "@/components/ui/form";
import { ParsedField } from "../../core/types";
import { ZFieldProps } from "../../types";
import { DateTimePicker } from "../calendar";

function useDateField<T = Date>(field: ParsedField) {
  const { setValue, getValues } = useFormContext();
  const { id, name } = useFormField();
  const { key } = field;
  const selected = getValues(name) as T;
  const onSelect = (date: T | undefined) => {
    setValue(name, date, { shouldValidate: true });
  };

  return { key, id, onSelect, selected };
}
export const DateField: React.FC<ZFieldProps> = ({ field }) => {
  const { onSelect, selected } = useDateField(field);

  return (
    <DateTimePicker
      value={selected}
      onChange={(date) => {
        onSelect(date);
      }}
      granularity="day"
    />
  );
};

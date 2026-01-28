"use client";

import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Control, Controller } from "react-hook-form";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { ErrorMessageForm } from "../forms/error-message-form";

interface MultiSelectProps {
  label: string;
  name: string;
  control: Control<any>;
  data: { value: string; label: string }[];
  messageError?: string;
}

export function MultiSelectLabel({
  label,
  name,
  control,
  data,
  messageError,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid w-full items-center gap-3">
      <Label>{label}</Label>

      <Controller
        name={name}
        control={control}
        defaultValue={[]} // Garante que comece como array vazio
        render={({ field }) => {
          const selectedValues = Array.isArray(field.value) ? field.value : [];

          const toggleValue = (value: string) => {
            const newValues = selectedValues.includes(value)
              ? selectedValues.filter((v) => v !== value)
              : [...selectedValues, value];
            field.onChange(newValues);
          };

          return (
            <div className="flex flex-col gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="border border-gray-200">
                  <Button
                    variant="outline"
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-auto min-h-10 hover:bg-background"
                  >
                    <div className="flex flex-wrap gap-1">
                      {selectedValues.length === 0 && (
                        <span className="text-muted-foreground font-normal">
                          Selecione os gêneros...
                        </span>
                      )}
                      {selectedValues.map((val) => {
                        const item = data.find((d) => d.value === val);
                        return (
                          <Badge
                            key={val}
                            variant="secondary"
                            className="mr-1 mb-1"
                          >
                            {item?.label}
                            <span
                              role="button"
                              className="ml-1 cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-full p-0.5"
                              onClick={(e) => {
                                e.preventDefault(); // IMPORTANTE: Impede o Popover de fechar
                                e.stopPropagation(); // IMPORTANTE: Impede o clique de subir para o Trigger
                                toggleValue(val);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </span>
                          </Badge>
                        );
                      })}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar gênero..." />
                    <CommandEmpty>Nenhum gênero encontrado.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {data.map((item) => (
                          <CommandItem
                            key={item.value}
                            onSelect={() => toggleValue(item.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedValues.includes(item.value)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {messageError && <ErrorMessageForm message={messageError} />}
            </div>
          );
        }}
      />
    </div>
  );
}

import { Component, Show, mergeProps } from "solid-js";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";
import { IconSearch } from "./ui/icons";
import { TextField, TextFieldInput } from "./ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { JSX } from "solid-js";

export const SearchField: Component<{
  label?: string;
  class?: string;
  isCollapsed?: boolean;
  onSubmit?: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent>;
}> = (props) => {
  props = mergeProps(
    { label: "Search", class: "p-4", isCollapsed: false },
    props,
  );

  return (
    <form class={props.class} onSubmit={props.onSubmit} method="post">
      <Show
        when={props.isCollapsed}
        fallback={
          <TextField class="relative">
            <IconSearch class="absolute left-3 top-3 size-4 text-muted-foreground" />
            <TextFieldInput
              class="ps-9"
              placeholder={props.label}
              type="text"
              name="url"
            />
            <button class="sr-only">Submit</button>
          </TextField>
        }
      >
        <Tooltip openDelay={0} closeDelay={0} placement="right">
          <TooltipTrigger
            as="button"
            class={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-10",
            )}
          >
            <IconSearch />
            <span class="sr-only">{props.label}</span>
          </TooltipTrigger>
          <TooltipContent class="px-1.5">
            <TextField class="relative">
              <IconSearch class="absolute left-3 top-3 size-4 text-muted-foreground" />
              <TextFieldInput
                class="ps-9"
                placeholder={props.label}
                type="text"
                name="url"
              />
            </TextField>
          </TooltipContent>
        </Tooltip>
      </Show>
    </form>
  );
};

import { A } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { IconTrash } from "./ui/icons";
import { FEED } from "~/lib/constants";

type NavProps = {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: Component;
    variant: "default" | "ghost";
    filter?: {
      name: string;
      value: string;
    };
    delete?: () => void;
  }[];
};

export default function Nav(props: NavProps) {
  return (
    <div
      data-collapsed={props.isCollapsed}
      class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 grid-cols-1">
        <For each={props.links}>
          {(item) => {
            const Icon = item.icon;
            const url = item.filter
              ? `?${item.filter.name}=${item.filter.value}`
              : "";
            return (
              <Show
                when={props.isCollapsed}
                fallback={
                  <>
                    <A
                      href={url}
                      class={cn(
                        buttonVariants({
                          variant: item.variant,
                          size: "sm",
                          class: "text-sm",
                        }),
                        item.variant === "default" &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "justify-start",
                      )}
                    >
                      <div class="mr-2">
                        <Icon />
                      </div>
                      {item.title}
                      <Show when={item.label}>
                        <span
                          class={cn(
                            "ml-auto",
                            item.variant === "default" &&
                              "text-background dark:text-white",
                          )}
                        >
                          {item.label}
                        </span>
                      </Show>
                    </A>
                    <Show when={item.filter?.name === FEED}>
                      <Button
                        class="col-start-2 size-9"
                        size="icon"
                        variant={item.variant}
                        onClick={item.delete}
                      >
                        <IconTrash />
                      </Button>
                    </Show>
                  </>
                }
              >
                <Tooltip openDelay={0} closeDelay={0} placement="right">
                  <TooltipTrigger
                    as={A}
                    href={url}
                    class={cn(
                      buttonVariants({ variant: item.variant, size: "icon" }),
                      "size-9",
                      item.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      "justify-self-center",
                    )}
                  >
                    <Icon />
                    <span class="sr-only">{item.title}</span>
                  </TooltipTrigger>
                  <TooltipContent class="flex items-center gap-4">
                    {item.title}
                    <Show when={item.label}>
                      <span class="ml-auto text-muted-foreground">
                        {item.label}
                      </span>
                    </Show>
                  </TooltipContent>
                </Tooltip>
              </Show>
            );
          }}
        </For>
      </nav>
    </div>
  );
}

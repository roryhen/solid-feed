import {
  RouteDefinition,
  RouteSectionProps,
  createAsync,
} from "@solidjs/router";
import { Show } from "solid-js";

export const route = {
  load({ params }) {},
} satisfies RouteDefinition;

export default function FeedPage({ params }: RouteSectionProps) {
  return <div>{params.id}</div>;
}

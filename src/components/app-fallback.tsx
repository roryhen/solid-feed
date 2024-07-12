import { Separator } from "~/components/ui/separator";
import { TopBar } from "./feed-main";
import SearchField from "./search-field";
import { Tabs } from "./ui/tabs";

let phrases = [
  "Starting up...",
  "Flipping through articles...",
  "Loading up the feed...",
];

export default function AppFallback() {
  return (
    <Tabs>
      <TopBar />
      <Separator />
      <SearchField />
      <p class="text-xl">
        {phrases[Math.floor(Math.random() * phrases.length)]}
      </p>
    </Tabs>
  );
}

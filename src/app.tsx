// @refresh reload
import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createSignal, onCleanup, onMount } from "solid-js";
import "./app.css";
import Sidebar from "./components/sidebar";
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/toast";
import { cn } from "./lib/utils";
import { clientOnly } from "@solidjs/start";
import AppFallback from "./components/app-fallback";
import { Button } from "./components/ui/button";
import { IconDots, IconX } from "./components/ui/icons";

const FeedProvider = clientOnly(() =>
  import("./components/feed-provider").then((m) => m),
);

export default function App() {
  let [sizes, setSizes] = makePersisted(createSignal<number[]>([0.2, 0.8]), {
    name: "resizable-sizes",
    storage: cookieStorage,
    storageOptions: {
      path: "/",
    },
  });

  let [isCollapsed, setIsCollapsed] = createSignal(false);
  let [isMenuOpen, setIsMenuOpen] = createSignal(false);
  return (
    <Router
      root={(props) => (
        <FeedProvider>
          <Resizable
            class="min-h-screen"
            sizes={sizes()}
            onSizesChange={setSizes}
          >
            <div
              class={cn(
                "transition sm:hidden fixed inset-0 z-10 bg-black/50",
                isMenuOpen() ? "opacity-100 visible" : "invisible opacity-0",
              )}
              onClick={() => setIsMenuOpen((x) => !x)}
            />
            <ResizablePanel
              class={cn(
                "max-sm:!basis-full max-sm:transition absolute inset-0 end-auto z-20 sm:relative max-sm:bg-[hsl(var(--background))]",
                isMenuOpen()
                  ? "max-sm:translate-x-0"
                  : "max-sm:-translate-x-full",
                isCollapsed() &&
                  "min-w-[56px] transition-all duration-300 ease-in-out",
              )}
              initialSize={sizes()[0]}
              minSize={0.12}
              maxSize={0.3}
              collapsible
              onCollapse={(e) => {
                setIsCollapsed(e === 0);
              }}
              onExpand={() => {
                setIsCollapsed(false);
              }}
            >
              <Sidebar isCollapsed={isCollapsed()} />
            </ResizablePanel>
            <ResizableHandle class="hidden sm:flex" withHandle />
            <ResizablePanel
              class="max-sm:!basis-full"
              initialSize={sizes()[1]}
              minSize={0.3}
            >
              <Suspense fallback={<AppFallback />}>{props.children}</Suspense>
            </ResizablePanel>
          </Resizable>
          <Button
            class="fixed bottom-4 end-4 z-30 sm:hidden"
            size="icon"
            onClick={() => setIsMenuOpen((x) => !x)}
          >
            {isMenuOpen() ? <IconX /> : <IconDots />}
          </Button>
          <Toaster />
        </FeedProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

// @refresh reload
import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createSignal } from "solid-js";
import "./app.css";
import { FeedProvider } from "./components/feed-provider";
import { Sidebar } from "./components/sidebar";
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/toast";
import { cn } from "./lib/utils";

export default function App() {
  const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
    name: "resizable-sizes",
    storage: cookieStorage,
    storageOptions: {
      path: "/",
    },
  });

  const [isCollapsed, setIsCollapsed] = createSignal(false);

  return (
    <Router
      root={(props) => (
        <FeedProvider>
          <Resizable
            class="min-h-screen"
            sizes={sizes()}
            onSizesChange={setSizes}
          >
            <ResizablePanel
              initialSize={sizes()[0] ?? 0.2}
              minSize={0.1}
              maxSize={0.2}
              collapsible
              onCollapse={(e) => {
                setIsCollapsed(e === 0);
              }}
              onExpand={() => {
                setIsCollapsed(false);
              }}
              class={cn(
                isCollapsed() &&
                  "min-w-[56px] transition-all duration-300 ease-in-out",
              )}
            >
              <Sidebar isCollapsed={isCollapsed()} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel initialSize={sizes()[1] ?? 0.8} minSize={0.3}>
              <Suspense>{props.children}</Suspense>
            </ResizablePanel>
          </Resizable>
          <Toaster />
        </FeedProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

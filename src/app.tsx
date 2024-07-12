// @refresh reload
import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createSignal } from "solid-js";
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
              initialSize={sizes()[0]}
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
            <ResizablePanel initialSize={sizes()[1]} minSize={0.3}>
              <Suspense fallback={<AppFallback />}>{props.children}</Suspense>
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

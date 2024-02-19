// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";
import "./app.css";
import { Col, Grid } from "./components/ui/grid";
import { Flex } from "./components/ui/flex";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { saveFeed } from "./lib/api";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Grid class="min-h-screen" cols={1} colsMd={3} colsLg={4}>
          <Col class="p-8 border-e" span={1}>
            <form action={saveFeed} method="post">
              <Label for="feed-url">Enter Feed Urls</Label>
              <Flex class="gap-2">
                <Input id="feed-url" name="url" />
                <Button aria-label="Add Feed">
                  <span class="rotate-45 text-xl">⚲</span>
                </Button>
              </Flex>
            </form>
            <Suspense fallback="Loading Subs..">hello</Suspense>
          </Col>
          <Col class="p-8" span={1} spanMd={2} spanLg={3}>
            <Suspense fallback="Loading Main Feed">{props.children}</Suspense>
          </Col>
        </Grid>
      )}
      rootLoad={({ intent, location, params }) => {}}
    >
      <FileRoutes />
    </Router>
  );
}

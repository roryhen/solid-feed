// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Col, Grid } from "./components/ui/grid";
import { FeedList } from "./components/FeedList";
import { AddFeed } from "./components/AddFeed";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Grid class="min-h-screen" cols={1} colsMd={3} colsLg={4} $ServerOnly>
          <Col class="p-8 border-e" span={1}>
            <AddFeed />
            <Suspense fallback="Loading Subs..">
              <FeedList />
            </Suspense>
          </Col>
          <Col class="p-8" span={1} spanMd={2} spanLg={3}>
            <Suspense fallback="Loading Main Feed">{props.children}</Suspense>
          </Col>
        </Grid>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

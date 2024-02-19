import {
  ColorModeProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
} from "@kobalte/core";
import { createHandler, StartServer } from "@solidjs/start/server";
import { isServer } from "solid-js/web";

export default createHandler((context) => {
  const storageManager = cookieStorageManagerSSR(
    isServer ? context.request.headers.get("cookie") ?? "" : document.cookie
  );

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
              <div id="app">{children}</div>
            </ColorModeProvider>
            {scripts}
          </body>
        </html>
      )}
    />
  );
});

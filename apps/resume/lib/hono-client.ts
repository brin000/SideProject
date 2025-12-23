import { hc } from "hono/client";
import { AppType } from "../app/api/[[...route]]/route";

import ky from "ky";

export const fetch = ky.extend({
  hooks: {
    afterResponse: [
      async (_, __, response: Response) => {
        if (response.ok) {
          return response;
        } else {
          throw await response.json();
        }
      },
    ],
  },
});

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  fetch,
});

import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    { path: "/api/contact", method: "POST", advancedOptions: { checkLevel: "basic" } },
    { path: "/api/submit", method: "POST", advancedOptions: { checkLevel: "basic" } },
  ],
});

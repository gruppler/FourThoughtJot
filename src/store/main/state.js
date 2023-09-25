import { LocalStorage } from "quasar";

export default function () {
  return {
    dark: LocalStorage.has("dark") ? LocalStorage.getItem("dark") : "auto",

    draft: LocalStorage.has("draft") ? LocalStorage.getItem("draft") : null,

    server: LocalStorage.has("server")
      ? LocalStorage.getItem("server")
      : "private",

    servers: LocalStorage.has("servers")
      ? LocalStorage.getItem("servers").map((id) =>
          LocalStorage.getItem("server-" + id)
        )
      : [],
  };
}

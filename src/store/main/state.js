import { LocalStorage } from "quasar";

export default function () {
  return {
    dark: LocalStorage.has("dark") ? LocalStorage.getItem("dark") : "auto",

    privacy: LocalStorage.has("privacy")
      ? LocalStorage.getItem("privacy")
      : "private",

    draft: LocalStorage.has("draft") ? LocalStorage.getItem("draft") : null,
  };
}

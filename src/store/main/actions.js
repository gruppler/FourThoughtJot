import { Dark, LocalStorage } from "quasar";

export function setDark({ commit }, mode) {
  if (mode === null) {
    mode = "auto";
  }
  Dark.set(mode);
  LocalStorage.set("dark", mode);

  commit("setDark", mode);
}

export function setPrivacy({ commit }, mode) {
  LocalStorage.set("privacy", mode);
  commit("setPrivacy", mode);
}

export function saveDraft({ commit }, draft) {
  if (draft === null) {
    LocalStorage.remove("draft");
  } else {
    LocalStorage.set("draft", draft);
  }
  commit("setDraft", draft);
}

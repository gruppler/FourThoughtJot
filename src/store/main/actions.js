import { Dark, LocalStorage } from "quasar";

export function setDark({ commit }, mode) {
  if (mode === null) {
    mode = "auto";
  }
  Dark.set(mode);
  LocalStorage.set("dark", mode);

  commit("setDark", mode);
}

export function saveDraft({ commit }, draft) {
  if (draft === null) {
    LocalStorage.remove("draft");
  } else {
    LocalStorage.set("draft", draft);
  }
  commit("setDraft", draft);
}

export async function stakeThought({ commit, state }, thought) {
  if (state.server === "private") {
    // Save to localStorage
    console.log(thought);
  } else {
    await new Promise((resolve, reject) =>
      setTimeout(() => reject("Testing"), 500)
    );
  }
}

export function selectServer({ commit }, mode) {
  LocalStorage.set("server", mode);
  commit("selectServer", mode);
}

export async function connectServer({ commit }, server) {
  let result = false;
  result = await new Promise((resolve, reject) =>
    setTimeout(() => resolve(new Date()), 500)
  );
  LocalStorage.set("server-" + server.id, { ...server, connected: result });
  commit("connectServer", { server, result });
  return result;
}

export function addServer({ commit, state }, server) {
  LocalStorage.set("server-" + server.id, server);
  commit("addServer", server);
  LocalStorage.set(
    "servers",
    state.servers.map((server) => server.id)
  );
}

export function updateServers({ commit }, servers) {
  LocalStorage.set(
    "servers",
    servers.map((server) => server.id)
  );
  commit("updateServers", servers);
}

export function updateServer({ commit, state }, { index, server }) {
  if (!state.servers[index] || server.id !== state.servers[index].id) {
    throw "Server not found";
  }
  LocalStorage.set("server-" + server.id, server);
  commit("updateServer", { index, server });
}

export function removeServer({ commit, state }, index) {
  let server = state.servers[index];
  if (!server) {
    throw "Server not found";
  }
  LocalStorage.remove("server-" + server.id);
  commit("removeServer", index);
  LocalStorage.set(
    "servers",
    state.servers.map((server) => server.id)
  );
}

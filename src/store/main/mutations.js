export function setDark(state, id) {
  state.dark = id;
}

export function setDraft(state, draft) {
  state.draft = draft;
}

export function stakeThought(state, thought) {}

export function selectServer(state, id) {
  state.server = id;
}

export function connectServer(state, { server, result }) {
  const index = state.servers.findIndex((s) => s.id === server.id);
  if (index >= 0) {
    state.servers[index] = {
      ...state.servers[index],
      connected: result,
    };
  }
}

export function addServer(state, server) {
  state.servers.push(Object.freeze(server));
}

export function updateServers(state, servers) {
  state.servers = servers.map((server) => Object.freeze(server));
}

export function updateServer(state, { index, server }) {
  state.servers[index] = Object.freeze(server);
}

export function removeServer(state, index) {
  state.servers.splice(index, 1);
}

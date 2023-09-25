<template>
  <q-page class="page-options non-selectable" padding>
    <!-- Dark Mode -->
    <q-item tag="label" @click.right.stop.prevent="darkMode = 'auto'" clickable>
      <q-item-section avatar>
        <q-icon name="dark_mode" />
      </q-item-section>
      <q-item-section>
        {{ $t("Dark Mode") }}
      </q-item-section>
      <q-item-section avatar>
        <q-toggle
          v-model="darkMode"
          @click.right.stop.prevent="darkMode = 'auto'"
          color="primary"
        />
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- Servers -->
    <draggable v-model="servers" group="servers" item-key="id" handle=".handle">
      <template #item="{ element: server, index: i }">
        <q-item>
          <q-item-section>
            <div class="row q-gutter-sm">
              <q-input
                class="col"
                style="min-width: 15em"
                :label="$t('Name')"
                :model-value="servers[i].name"
                @update:model-value="updateServer(i, 'name', $event)"
                :debounce="500"
              >
                <template v-slot:prepend>
                  <q-btn-dropdown
                    class="handle"
                    :icon="server.type"
                    auto-close
                    dense
                    flat
                  >
                    <q-list class="non-selectable">
                      <q-item
                        v-for="type in typeOptions"
                        :key="type.value"
                        @click="updateServer(i, 'type', type.value)"
                        clickable
                        v-ripple
                      >
                        <q-item-section avatar>
                          <q-icon :name="type.icon" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ type.label }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item @click="deleteServer(i)" clickable v-ripple>
                        <q-item-section avatar>
                          <q-icon name="delete" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ $t("Delete") }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </template>
              </q-input>

              <q-input
                class="col"
                style="min-width: 10em"
                :label="$t('Address')"
                :model-value="servers[i].address"
                @update:model-value="updateServer(i, 'address', $event)"
                :debounce="500"
              />
            </div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              @click="connect(server)"
              :icon="server.connected ? 'check' : 'connect'"
              color="primary"
              :loading="isConnecting[server.id]"
              :disable="Boolean(server.connected)"
            />
          </q-item-section>
        </q-item>
      </template>
    </draggable>

    <q-item @click="addServer" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="add" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Add Server") }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import draggable from "vuedraggable";
import { uid } from "quasar";

export default {
  name: "PageOptions",
  components: { draggable },
  data() {
    return {
      isConnecting: {},
    };
  },
  computed: {
    darkMode: {
      get() {
        return this.$store.state.main.dark;
      },
      set(mode) {
        this.$store.dispatch("setDark", mode);
      },
    },
    typeOptions() {
      return [
        {
          value: "local",
          label: this.$t("Local"),
          icon: "local",
        },
        {
          value: "global",
          label: this.$t("Global"),
          icon: "global",
        },
      ];
    },
    servers: {
      get() {
        return this.$store.state.main.servers;
      },
      set(value) {
        return this.$store.dispatch("updateServers", value);
      },
    },
  },
  methods: {
    async connect(server) {
      try {
        this.isConnecting[server.id] = true;
        await this.$store.dispatch("connectServer", server);
      } catch (error) {
        console.error(error);
      } finally {
        this.isConnecting[server.id] = false;
      }
    },
    addServer() {
      this.$store.dispatch("addServer", {
        id: uid(),
        name: "",
        address: "",
        type: "local",
        connected: false,
      });
    },
    updateServer(index, key, value) {
      this.$store.dispatch("updateServer", {
        index,
        server: { ...this.servers[index], [key]: value },
      });
    },
    deleteServer(index) {
      this.$store.dispatch("removeServer", index);
    },
  },
};
</script>

<style lang="scss">
.page-options {
  max-width: $breakpoint-xs;
  margin: 0 auto;
}
</style>

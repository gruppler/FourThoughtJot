<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import ICONS from "./icons";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const $q = useQuasar();

    $q.dark.set(store.state.main.dark);

    // Custom icon mapping
    $q.iconMapFn = (name) => {
      const icon = ICONS[name];
      if (icon !== undefined) {
        return { icon };
      }
    };

    return {};
  },
});
</script>

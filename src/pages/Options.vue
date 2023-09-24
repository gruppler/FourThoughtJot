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

    <!-- Connect -->
    <q-item>
      <q-item-section>
        <q-item-label>
          {{ $t("connectIris") }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn @click="connect" :label="$t('Connect')" color="primary" />
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
export default {
  name: "PageOptions",
  computed: {
    darkMode: {
      get() {
        return this.$store.state.main.dark;
      },
      set(mode) {
        this.$store.dispatch("setDark", mode);
      },
    },
  },
  methods: {
    async connect() {},
  },
};
</script>

<style lang="scss">
.page-options {
  max-width: $breakpoint-xs;
  margin: 0 auto;
}
</style>

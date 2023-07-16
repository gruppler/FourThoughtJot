<template>
  <q-page class="page-options" padding>
    <q-btn @click="authorize" :label="$t('Authorize')" color="primary" />
  </q-page>
</template>

<script>
export default {
  name: "PageOptions",
  methods: {
    async authorize() {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=${
        process.env.CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
        window.location.href
      )}&response_type=token&scope=identify%20guilds`;
    },
  },
};
</script>

<style lang="scss">
.page-options {
  max-width: $breakpoint-sm;
  margin: 0 auto;
}
</style>

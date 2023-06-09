<template>
  <q-card>
    <!-- Type -->
    <q-btn-toggle
      class="no-border-radius"
      v-model="type"
      :options="Object.values(types)"
      :toggle-color="typeBG"
      :toggle-text-color="typeFG"
      @click="thoughtInput.focus()"
      no-caps
      spread
      stack
    />

    <!-- Thought -->
    <q-input
      ref="thoughtInput"
      v-model:model-value="thought"
      :label="$t('Thought')"
      :color="typeBG || 'primary'"
      item-aligned
      autogrow
    />
  </q-card>
</template>

<script>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "PagePopup",
  setup() {
    const { t } = useI18n({ useScope: "global" });

    const thought = ref("");
    const thoughtInput = ref(null);

    const type = ref(null);
    const types = {
      prediction: {
        value: "prediction",
        label: t("Prediction"),
        icon: "prediction",
        bg: "prediction",
        fg: "grey-1",
      },
      question: {
        value: "question",
        label: t("Question"),
        icon: "question",
        bg: "question",
        fg: "grey-10",
      },
      reflection: {
        value: "reflection",
        label: t("Reflection"),
        icon: "reflection",
        bg: "reflection",
        fg: "grey-10",
      },
      statement: {
        value: "statement",
        label: t("Statement"),
        icon: "statement",
        bg: "statement",
        fg: "grey-1",
      },
    };
    const typeBG = computed(() => {
      return type.value ? types[type.value].bg : "";
    });
    const typeFG = computed(() => {
      return type.value ? types[type.value].fg : "";
    });

    return {
      thought,
      thoughtInput,
      type,
      types,
      typeBG,
      typeFG,
    };
  },
};
</script>

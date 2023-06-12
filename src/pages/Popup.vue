<template>
  <q-card square>
    <!-- Type -->
    <q-btn-toggle
      class="no-border-radius"
      v-model="buffer.type"
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
      v-model:model-value="buffer.thought"
      :label="$t('Thought')"
      :color="typeBG || 'primary'"
      item-aligned
      autogrow
    />

    <!-- Truth -->
    <q-item>
      <q-item-section>
        <q-item-label>{{ $t("Truth") }}</q-item-label>
        <q-slider
          class="q-mb-lg"
          v-model="buffer.truth"
          @click.right.prevent="buffer.truth = 50"
          :min="0"
          :max="100"
          :markers="100 / truthLabels.length"
          snap
          label
          label-always
          switch-label-side
          :disable="buffer.type === 'question'"
          :label-value="truthLabel"
          :color="typeBG || 'primary'"
          :label-text-color="typeFG || ''"
        />
      </q-item-section>
    </q-item>

    <!-- Goodness -->
    <q-item>
      <q-item-section>
        <q-item-label>{{ $t("Goodness") }}</q-item-label>
        <q-slider
          class="q-mb-lg"
          v-model="buffer.goodness"
          @click.right.prevent="buffer.goodness = 50"
          :min="0"
          :max="100"
          :markers="100 / goodnessLabels.length"
          snap
          label
          label-always
          switch-label-side
          :label-value="goodnessLabel"
          :color="typeBG || 'primary'"
          :label-text-color="typeFG || ''"
        />
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "PagePopup",
  setup() {
    const { t, locale, messages } = useI18n({ useScope: "global" });

    const buffer = ref({
      type: null,
      thought: "",
      truth: 50,
      goodness: 50,
    });

    const thoughtInput = ref(null);

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
      return buffer.value.type ? types[buffer.value.type].bg : "";
    });
    const typeFG = computed(() => {
      return buffer.value.type ? types[buffer.value.type].fg : "";
    });

    const truthLabels = computed(
      () => messages.value[locale.value].labels.truth
    );
    const truthLabel = computed(() => {
      const value = buffer.value.truth;
      const max = truthLabels.value.length;
      const step = 100 / max;
      let label;
      for (let i = 0; i < max; i++) {
        if (value <= step * (i + 1)) {
          label = truthLabels.value[i];
          break;
        }
      }
      return `${label} (${value}%)`;
    });

    const goodnessLabels = computed(
      () => messages.value[locale.value].labels.goodness
    );
    const goodnessLabel = computed(() => {
      const value = buffer.value.goodness;
      const max = goodnessLabels.value.length;
      const step = 100 / max;
      let label;
      for (let i = 0; i < max; i++) {
        if (value <= step * (i + 1)) {
          label = goodnessLabels.value[i];
          break;
        }
      }
      return `${label} (${value}%)`;
    });

    return {
      buffer,
      thoughtInput,
      types,
      typeBG,
      typeFG,
      truthLabel,
      truthLabels,
      goodnessLabel,
      goodnessLabels,
    };
  },
};
</script>

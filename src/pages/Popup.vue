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

    <!-- Accuracy -->
    <q-item>
      <q-item-section>
        <q-item-label>{{ $t("Accuracy") }}</q-item-label>
        <q-slider
          class="q-mb-lg"
          v-model="buffer.accuracy"
          @click.right.prevent="buffer.accuracy = 50"
          :min="0"
          :max="100"
          :markers="50"
          snap
          label
          label-always
          switch-label-side
          :label-value="accuracyLabel"
          :color="typeBG || 'primary'"
          :label-text-color="typeFG || ''"
        />
      </q-item-section>
    </q-item>

    <!-- Benevolence -->
    <q-item>
      <q-item-section>
        <q-item-label>{{ $t("Benevolence") }}</q-item-label>
        <q-slider
          class="q-mb-lg"
          v-model="buffer.benevolence"
          @click.right.prevent="buffer.benevolence = 50"
          :min="0"
          :max="100"
          :markers="50"
          snap
          label
          label-always
          switch-label-side
          :label-value="benevolenceLabel"
          :color="typeBG || 'primary'"
          :label-text-color="typeFG || ''"
        />
      </q-item-section>
    </q-item>

    <!-- Certainty -->
    <q-item>
      <q-item-section>
        <q-item-label>{{ $t("Certainty") }}</q-item-label>
        <q-slider
          class="q-mb-lg"
          v-model="buffer.certainty"
          @click.right.prevent="buffer.certainty = 50"
          :min="0"
          :max="100"
          :markers="50"
          snap
          label
          label-always
          switch-label-side
          :label-value="certaintyLabel"
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
    const { t } = useI18n({ useScope: "global" });

    const buffer = ref({
      type: null,
      thought: "",
      accuracy: 50,
      benevolence: 50,
      certainty: 50,
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

    const accuracyLabel = computed(() => {
      const value = buffer.value.accuracy;
      let label;
      if (value < 50) {
        label = t("Inaccurate");
      } else if (value > 50) {
        label = t("Accurate");
      } else {
        label = t("Neutral");
      }
      return `${label} (${value}%)`;
    });

    const benevolenceLabel = computed(() => {
      const value = buffer.value.benevolence;
      let label;
      if (value < 50) {
        label = t("Malevolent");
      } else if (value > 50) {
        label = t("Benevolent");
      } else {
        label = t("Neutral");
      }
      return `${label} (${value}%)`;
    });

    const certaintyLabel = computed(() => {
      const value = buffer.value.certainty;
      let label;
      if (value < 50) {
        label = t("Uncertain");
      } else if (value > 50) {
        label = t("Certain");
      } else {
        label = t("Neutral");
      }
      return `${label} (${value}%)`;
    });

    return {
      buffer,
      thoughtInput,
      types,
      typeBG,
      typeFG,
      accuracyLabel,
      benevolenceLabel,
      certaintyLabel,
    };
  },
};
</script>

<template>
  <q-card square>
    <!-- Type -->
    <q-btn-toggle
      class="no-border-radius"
      v-model="buffer.type"
      :options="typeOptions"
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

    <q-separator />

    <q-card-actions>
      <!-- Privacy -->
      <q-select
        v-model="privacy"
        :options="privacyOptions"
        :color="typeBG || 'primary'"
        map-options
        emit-value
        filled
        dense
      >
        <template v-slot:prepend>
          <q-icon
            :name="privacyLevels[privacy].icon"
            :color="typeBG || 'primary'"
          />
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section v-if="scope.opt.icon" avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-space />

      <q-btn
        @click="reset"
        :label="$t('Reset')"
        :color="typeBG || 'primary'"
        flat
      />
      <q-btn
        @click="stake"
        :label="$t('Stake')"
        :color="typeBG || 'primary'"
        :text-color="isValid ? typeFG || 'primary' : ''"
        :disable="!isValid"
        :flat="!isValid"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "PagePopup",
  setup() {
    const { t, locale, messages } = useI18n({ useScope: "global" });

    const defaultBuffer = Object.freeze({
      type: null,
      thought: "",
      truth: 50,
      goodness: 50,
    });

    const buffer = ref({ ...defaultBuffer });

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
    const typeOptions = Object.values(types);
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

    const privacy = ref("private");
    const privacyLevels = {
      private: {
        value: "private",
        label: t("Private"),
        icon: "private",
        order: 1,
      },
      local: {
        value: "local",
        label: t("Local"),
        icon: "local",
        order: 2,
      },
      global: {
        value: "global",
        label: t("Global"),
        icon: "global",
        order: 3,
      },
    };
    const privacyOptions = Object.values(privacyLevels).sort(
      (a, b) => a.order - b.order
    );

    const isValid = computed(() => {
      return Boolean(buffer.value.type && buffer.value.thought.trim());
    });

    const reset = () => {
      buffer.value = { ...defaultBuffer };
    };

    const stake = () => {};

    return {
      buffer,
      thoughtInput,
      types,
      typeOptions,
      typeBG,
      typeFG,
      truthLabel,
      truthLabels,
      goodnessLabel,
      goodnessLabels,
      privacy,
      privacyLevels,
      privacyOptions,
      isValid,
      reset,
      stake,
    };
  },
};
</script>

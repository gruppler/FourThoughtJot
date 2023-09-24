<template>
  <q-card style="width: 380px" square>
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
        <q-item-label>{{ $t("Verity") }}</q-item-label>
        <q-slider
          class="q-pb-lg"
          v-model="buffer.verity"
          @click.right.prevent="buffer.verity = 0.5"
          :min="0"
          :max="1"
          :step="0.01"
          :markers="1 / verityLabels.length"
          snap
          label
          label-always
          switch-label-side
          :label-value="verityLabel"
          :color="typeBG || 'primary'"
          :label-text-color="typeFG || ''"
          :disable="buffer.type === 'question'"
        />
      </q-item-section>
    </q-item>

    <!-- Goodness -->
    <q-item>
      <q-item-section>
        <q-item-label>{{ $t("Valence") }}</q-item-label>
        <q-slider
          class="q-pb-lg q-mb-sm"
          v-model="buffer.valence"
          @click.right.prevent="buffer.valence = 0"
          :min="-1"
          :step="0.01"
          :max="1"
          :markers="2 / valenceLabels.length"
          snap
          label
          label-always
          switch-label-side
          :label-value="valenceLabel"
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
        :loading="isStaking"
        :disable="!isValid"
        :flat="!isValid"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { isEqual } from "lodash";

export default {
  name: "PagePopup",
  setup() {
    const store = useStore();
    const { t, locale, messages } = useI18n({ useScope: "global" });

    const defaultBuffer = Object.freeze({
      type: null,
      thought: "",
      verity: 0.5,
      valence: 0,
    });

    const buffer = ref({ ...(store.state.main.draft || defaultBuffer) });
    watch(
      buffer,
      (draft) => {
        if (isEqual(draft, defaultBuffer)) {
          draft = null;
        }
        store.dispatch("saveDraft", draft);
      },
      { deep: true }
    );

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
        fg: "grey-1",
      },
      statement: {
        value: "statement",
        label: t("Statement"),
        icon: "statement",
        bg: "statement",
        fg: "grey-10",
      },
    };
    const typeOptions = Object.values(types);
    const typeBG = computed(() => {
      return buffer.value.type ? types[buffer.value.type].bg : "";
    });
    const typeFG = computed(() => {
      return buffer.value.type ? types[buffer.value.type].fg : "";
    });

    const verityLabels = computed(
      () => messages.value[locale.value].labels.verity
    );
    const verityLabel = computed(() => {
      const value = buffer.value.verity;
      const max = verityLabels.value.length;
      const step = 1 / max;
      let label;
      for (let i = 0; i < max; i++) {
        if (value <= step * (i + 1)) {
          label = verityLabels.value[i];
          break;
        }
      }
      return `${value} (${label})`;
    });

    const valenceLabels = computed(
      () => messages.value[locale.value].labels.valence
    );
    const valenceLabel = computed(() => {
      const value = buffer.value.valence;
      const max = valenceLabels.value.length;
      const step = 1 / max;
      let label;
      for (let i = 0; i < max; i++) {
        if ((value + 1) / 2 <= step * (i + 1)) {
          label = valenceLabels.value[i];
          break;
        }
      }
      return `${value} (${label})`;
    });

    const privacy = ref(store.state.main.privacy);
    watch(privacy, (mode) => store.dispatch("setPrivacy", mode));
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

    const reset = () => {
      buffer.value = { ...defaultBuffer };
    };

    const stake = async () => {
      try {
        isStaking.value = true;
      } catch (error) {
        console.error(error);
      } finally {
        isStaking.value = false;
      }
    };
    const isStaking = ref(false);

    const isValid = computed(() => {
      return Boolean(buffer.value.type && buffer.value.thought.trim());
    });

    return {
      buffer,
      thoughtInput,
      types,
      typeOptions,
      typeBG,
      typeFG,
      verityLabel,
      verityLabels,
      valenceLabel,
      valenceLabels,
      privacy,
      privacyLevels,
      privacyOptions,
      reset,
      stake,
      isStaking,
      isValid,
    };
  },
};
</script>

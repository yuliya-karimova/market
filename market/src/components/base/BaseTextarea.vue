<template>
  <div
    class="relative"
    :class="hasError && 'has-error'"
    style="scroll-margin-top: calc(4rem + var(--sat))"
  >
    <label
      v-if="label"
      class="block text-sm font-medium leading-5 mb-1"
      :class="[rounded === 'full' ? 'px-6' : 'px-4']"
    >
      {{ label }}
      {{ required ? '*' : '' }}
    </label>
    <div
      v-if="description"
      class="text-xs text-gray-500 mb-1 -mt-1"
      :class="[rounded === 'full' ? 'px-6' : 'px-4']"
    >
      {{ description }}
    </div>
    <div
      v-show="!hideInput"
      class="relative border transition duration-150 ease-in-out"
      :class="[
        !isFocused && !errorMessage && 'border-gray-300',
        isFocused && !errorMessage && 'border-blue-300',
        errorMessage && 'border-red-400',
        disabled && 'cursor-not-allowed',
        proxyInputShadow,
        proxyRounded,
      ]"
    >
      <div
        class="absolute inset-0 bg-clip-content"
        :class="[
          disabled ? disabledInputBackgroundClass : inputBackgroundClass,
          proxyRounded,
        ]"
      />
      <div class="relative flex items-center">
        <div v-if="$slots.left" :class="[disabled && 'pointer-events-none']">
          <slot name="left" />
        </div>
        <div class="flex-1 overflow-hidden flex items-center">
          <textarea
            ref="textareaEl"
            v-model="simpleInputValue"
            class="appearance-none bg-transparent flex-1 max-w-full placeholder-gray-400 focus:outline-none sm:text-sm sm:leading-5 p-2"
            :class="[
              disabled && 'pointer-events-none',
              $slots.left || rounded !== 'full' ? 'px-4' : 'px-6',
              proxyInputTextAlign,
              proxyRounded,
            ]"
            :name="name"
            :disabled="disabled"
            :minlength="minlength"
            :maxlength="maxlength"
            :rows="rows"
            :cols="cols"
            :placeholder="placeholder"
            :readonly="readonly"
            aria-label=""
            v-on="handlers"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
        </div>

        <div v-if="$slots.right">
          <slot name="right" />
        </div>
      </div>
    </div>
    <div class="flex pt-px text-sm leading-4">
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="transform -translate-y-3 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-3 opacity-0"
      >
        <span
          v-if="hasError"
          class="text-red-600 mt-1"
          :class="[rounded === 'full' ? 'px-6' : 'px-4']"
        >
          <slot name="error">
            {{ errorMessage }}
          </slot>
        </span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { useSimpleInput } from './use-simple-input'
import { Ref, computed, getCurrentInstance, nextTick, ref, useSlots } from 'vue'

const shadow = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  normal: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
}

const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
}

interface InputProps {
  value?: string | number
  modelValue?: string | number
  placeholder?: string
  description?: string
  label?: string
  disabled?: boolean
  hideInput?: boolean
  validateOnBlur?: boolean
  name: string
  error?: string
  rules?: RuleExpression<boolean | object | string | number | any[] | null>
  cols?: number | string
  rows?: number | string
  required?: boolean
  readonly?: boolean
  maxlength?: number | string
  minlength?: number | string
  inputBackgroundClass?: string | string[] | Record<string, string>
  disabledInputBackgroundClass?: string | string[] | Record<string, string>
  inputShadow?: keyof typeof shadow
  rounded?: keyof typeof roundedMap
  inputTextAlign?: keyof typeof textAlign
}

const props = withDefaults(defineProps<InputProps>(), {
  value: '',
  modelValue: '',
  placeholder: '',
  description: '',
  label: '',
  disabled: false,
  hideInput: false,
  validateOnBlur: true,
  error: '',
  rules: '',
  cols: undefined,
  rows: undefined,
  required: false,
  readonly: undefined,
  minlength: undefined,
  maxlength: undefined,
  inputBackgroundClass: '',
  disabledInputBackgroundClass: 'bg-gray-100',
  inputShadow: 'sm',
  rounded: 'xl',
  inputTextAlign: 'left',
})

const textareaEl = ref<InstanceType<typeof HTMLTextAreaElement> | null>(null)
const isFocused = ref(false)
const proxyInputShadow = computed(
  () => props.inputShadow && shadow[props.inputShadow]
)
const proxyInputTextAlign = computed(
  () => props.inputTextAlign && textAlign[props.inputTextAlign]
)
const proxyRounded = computed(() => props.rounded && roundedMap[props.rounded])

const simpleInput = useSimpleInput(props, getCurrentInstance(), true)

const { handlers, errorMessage } = simpleInput
const simpleInputValue = simpleInput.value as Ref<any>

const slots = useSlots()
const hasError = computed(
  () => !props.disabled && (errorMessage.value || slots.error)
)

function focus() {
  nextTick(() => {
    textareaEl.value?.focus?.()
  })
}

defineExpose({ focus })
</script>

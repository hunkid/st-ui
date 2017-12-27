<template>
  <transition name="st-radio-animation">
    <label class="st-radio">
      <span class="st-radio__input" :class="{
          'is-checked': model === label,
          'is-disabled': isDisabled,
          'is-focused': isFocused
        }">
        <span class="st-radio__show"></span>
        <input type="radio"
          :name="name"
          v-model="model"
          @focus="focus = true"
          @blur="focus = false"
          class="st-radio__original"
          :disabled="isDisabled"
          :value="label">
      </span>
      <span class="st-radio__label">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
    </label>
  </transition>
</template>

<script>

import Emitter from '../../../src/mixins/emitter'

export default {
  name: 'StRadio',

  mixins: [Emitter],

  componentName: 'StRadio',

  data() {
    return {
      focus: false
    }
  },

  props: {
    disabled: Boolean,
    label: {},
    value: {},
    name: String
  },

  computed: {
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'StRadioGroup') {
          parent = parent.$parent
        } else {
          this._radioGroup = parent
          return true
        }
      }
      return false
    },

    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('StRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
      }
    },

    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled
        : this.disabled
    },

    isFocused() {
      if (this.isDisabled) {
        return false
      }
      if (this.focus) {
        return true
      }
      return false
    }
  }
}
</script>

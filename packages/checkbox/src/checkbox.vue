<template>
  <transition name="st-checkbox-animation">
    <label class="st-checkbox">
      <span class="st-checkbox__input" :class="{
          'is-checked': isChecked,
          'is-disabled': isDisabled
        }">
        <span class="st-checkbox__show"></span>
        <!-- <input v-if="a"
          type="checkbox"> -->
        <input
          type="checkbox"
          :name="name"
          v-model="model"
          class="st-checkbox__original"
          :disabled="isDisabled"
          :value="label">
      </span>
      <span class="st-checkbox__label">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
    </label>
  </transition>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'

export default {
  name: 'StCheckbox',

  mixins: [Emitter],

  componentName: 'StCheckbox',

  data() {
    return {
      selfValue: false
    }
  },

  props: {
    disabled: Boolean,
    label: {},
    value: {},
    name: String,
    checked: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'StCheckboxGroup') {
          parent = parent.$parent
        } else {
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },

    model: {
      get() {
        let val = this.isGroup ? this._checkboxGroup.value : this.value
        val = val === undefined ? this.selfValue : val
        return val
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('StCheckboxGroup', 'input', [val])
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
    },

    isChecked() {
      if (Object.prototype.toString.call(this.model).toLowerCase() === '[object boolean]') {
        return this.model
      } else if (Object.prototype.toString.call(this.model).toLowerCase() === '[object array]') {
        return this.model.indexOf(this.label) > -1
      }
      return false
    }
  },

  methods: {
    addToStore() {
      if (Object.prototype.toString.call(this.model).toLowerCase() === '[object array]' &&
          this.model.indexOf(this.label) === -1) {
        this.model.push(this.label)
      } else {
        this.model = true
        this.selfValue = true
      }
    }
  },

  created() {
    this.checked && this.addToStore()
  }
}
</script>

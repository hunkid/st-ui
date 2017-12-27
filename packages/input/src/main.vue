<template>
  <div
    :class="[
      type === 'textarea' ? 'st-textarea' : 'st-input',
      {
        'is-disabled': disabled,
        'st-input--prefix': prefixIcon || $slots.prefix,
        'st-input--suffix': suffixIcon || $slots.suffix
      }
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false">
    <template v-if="type !== 'textarea'">
      <input
        type="text"
        class="st-input__inner"
        v-bind="$props"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="input">
      <span v-if="$slots.prefix || prefixIcon" class="st-input__prefix">
        <span class="st-spannput__prefix-inner"></span>
        <slot name="prefix">
          <i class="st-input__icon"
           :class="prefixIcon" v-if="prefixIcon"></i>
        </slot>
      </span>
      <span v-if="$slots.suffix || suffixIcon" class="st-input__suffix" :style="suffixStyle">
        <span class="st-spannput__suffix-inner"></span>
        <slot name="suffix">
          <i class="st-input__icon"
           :class="suffixIcon" v-if="suffixIcon"></i>
        </slot>
      </span>
      <i v-if="showClearIcon" class="st-input__clear"></i>
    </template>
    <template v-else>
      <textarea
        v-bind="$props"
        class="st-textarea__inner"></textarea>
    </template>

  <!-- <button @click="computePosition">computePosition</button> -->
  </div>
</template>

<script>

import Emitter from '../../../src/mixins/emitter'

export default {
  name: 'StInput',
  componentName: 'StInput',
  mixins: [Emitter],

  data () {
    return {
      isFocused: false,
      isHovering: false,
      suffixStyle: null
    }
  },

  props: {
    placeholder: String,
    'suffixIcon': String,
    'prefixIcon': String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    clearable: Boolean
  },

  computed: {
    showClearIcon() {
      return this.value !== '' && this.isFocused && this.isHovering
    }
  },

  methods: {
    handleBlur(e) {
      this.focused = false
      this.$emit('blur', event)
    },
    handleFocus(e) {
      this.focused = true
      this.$emit('focus', event)
    },
    computeSuffixPosition() {
      console.log(this.$refs.input)
      let left = this.$refs.input.offsetWidth - 30
      return {left: `${left}px`}
    }
  },

  mounted() {
    this.suffixStyle = this.computeSuffixPosition()
  }
}
</script>


<template>
  <transition name="st-alert-animation">
    <div class="st-alert" :class="[ classType ]" v-show="visiable">
      <i class="st-alert__icon" v-show="showIcon"></i>
      <div class="st-alert__content">
        <span class="st-alert__title" :class="isBoldTitle" v-if="title">{{ title }}</span>
        <slot>
          <p class="st-alert__detail" v-if="detail">{{ detail }}</p>
        </slot>
      </div>
      <i class="st-alert__closebtn" :class="{'customed': closeText !== '', 'st-icon-close': closeText === ''}" v-show="closable"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'st-alert',

  props: {
    closable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    detail: {
      type: String,
      default: ''
    },
    closeText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visiable: true
    }
  },

  methods: {
    close() {
      this.visiable = true
      this.$emit('close')
    }
  },

  computed: {
    classType() {
      return `st-alert--${this.type}`
    },
    isBigIcon() {
      return this.detail === '' ? 'is-big' : ''
    },
    isBoldTitle() {
      return this.detail === '' ? 'is-bold' : ''
    }
  }
}
</script>

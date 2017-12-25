<template>
  <transition name="st-alert-animation">
    <div class="st-alert" :class="[ classType ]" v-show="visiable">
      <i class="st-alert__icon" :class="[ iconClass, isBigIcon ]" v-show="showIcon"></i>
      <div class="st-alert__content">
        <span class="st-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <slot>
          <p class="st-alert__detail" v-if="detail">{{ detail }}</p>
        </slot>
      </div>
      <i class="st-alert__closebtn" :class="{'is-customed': closeText !== '', 'st-icon-close': closeText === ''}" v-show="closable" @click="close">{{closeText}}</i>
    </div>
  </transition>
</template>

<script>
const ICON_TYPE_MAP = {
  success: 'st-icon-circle-check',
  warning: 'st-icon-circle-question',
  info: 'st-icon-circle-info',
  error: 'st-icon-circle-error'
}
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
      default: 'info' // success, error, info, warning
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visiable: true
    }
  },

  methods: {
    close() {
      this.visiable = false
      this.$emit('close')
    }
  },

  computed: {
    classType() {
      return `st-alert--${this.type}`
    },
    iconClass() {
      // 图标应当采用图标式样命名类，而不应当用处于什么状态来命名类
      return ICON_TYPE_MAP[this.type]
    },
    isBigIcon() {
      return this.detail === '' ? '' : 'is-big'
    },
    isBoldTitle() {
      return this.detail === '' ? '' : 'is-bold'
    }
  }
}
</script>

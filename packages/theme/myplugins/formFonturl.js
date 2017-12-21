var postcss = require('postcss')
module.exports = postcss.plugin('formFonturl', function myplugin(options) {
  return function (css) {
    css.walkAtRules('font-face', function(rule) {
      rule.walkDecls(function(decl) {
        if (decl.prop === 'src') {
          var newVal = decl.value.replace(/\.\//g, './st-ui/packages/theme/src/')
          decl.value = newVal
        }
      })
    })
  }
})

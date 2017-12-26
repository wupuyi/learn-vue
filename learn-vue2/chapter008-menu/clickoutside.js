Vue.directive('clickoutside', {
    bind: function(el, binding, vnode) {
        function documentHandler(e) {
            // contains方法是用来判断元素A是否包含了元素B,包含返回true,不包含返回false
            if(el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutSide__ = documentHandler;
        document.addEventListener('click', doucmentHandler);
    },
    unbind: function(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSide__);
        delete el.__vueClickOutSide__;
    }
});
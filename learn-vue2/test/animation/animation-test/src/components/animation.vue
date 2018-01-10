// animation.vue 

<template>
    <div>
        <button @click="show = !show">
            Toggle
        </button>
        <transition name="slide-fade">
            <p v-if="show">Hello, World!</p>
        </transition>

        <button @click="show1 = !show1">Toggle show</button>
        <transition name="bounce">
            <p v-if="show1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sapiente eius, quo totam harum maxime quae quam. Odit accusamus dolor, sequi, sint omnis laborum aliquam consequuntur aut debitis, saepe iusto?</p>
        </transition>
        
        <!-- 自定义过渡的类名 -->
        <div>
            <button @click="show2 = !show2">
                Toggle render
            </button>
            <transition
                name="custom-classes-transition"
                enter-active-class="animated flipInX"
                leave-active-class="animated rotateOutDownRight">
                <p v-if="show2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sapiente eius, quo totam harum maxime quae quam. Odit accusamus dolor, sequi, sint omnis laborum aliquam consequuntur aut debitis, saepe iusto?</p>
            </transition>
        </div>

        <!-- 多个元素的过渡 -->
        <div>
            <!-- <transition>
                <table v-if="items.length > 0">

                </table>

                <p v-else>Sorry, no items found.</p>
            </transition> -->
            <!-- <transition>
                <button v-if="isEditing" key="save">
                    Save
                </button>
                <button v-else key="edit">
                    Edit
                </button>
            </transition> -->
        </div>

        <!-- 多个组件的过渡 -->
        <div>
            <transition name="component-fade" mode="out-in">
                <component :is="view"></component>
            </transition>
        </div>
    </div>
</template>

<script>
import animate from 'animate.css'
export default {
  name: 'Animation',
  data () {
    return {
      show: true,
      show1: true,
      show2: true,
      view: 'v-a'
    }
  }
}
</script>


<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


.bounce-enter-active {
    animation: bounce-in .5s;
}

.bounce-leave-active {
    animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to {
    opacity: 0;
}

</style>

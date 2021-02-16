<template>
  <ul class="list-group list-group-horizontal">
    <li v-for="(item, i) in navItems" :key="i">
      <router-link :to="{ name: item.name }"
                   :class="{ active: item.name == $router.currentRoute.name }">
        <span class="mx-2" :style="style">
          {{ item.label }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'BaseNavbarItems',
    props: {
      navItems: {
        type: Array,
        required: false,
        default: () => { return []; },
      },
      color: {
        type: String,
        required: false,
        default: '#dddddd',
      },
      size: {
        type: String,
        required: false,
        default: '1.4em',
      },
      weight: {
        type: String,
        required: false,
        default: 'normal',
      },
    },
    computed: {
      style: function () {
        return {
          color: this.color,
          'font-size': this.size,
          'font-weight': this.weight,
        }
      },
    },
  };
</script>

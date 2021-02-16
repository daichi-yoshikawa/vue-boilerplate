<template>
  <div>
    <b-navbar class="footer-container">
      <footer class="text-small container mx-auto pt-3">
        <div class="row w-100 m-0">
          <div class="col-6 d-flex align-items-center text-left">
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <router-link :to="{ name: 'private-home' }">
                  <img class="app-logo" :src="require('@/img/logo-placeholder.png')">
                </router-link>
              </div>
              <div>
                <router-link :to="{ name: 'private-home' }">
                  <span class="app-title">{{ appName }}</span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-6 d-flex align-items-center text-right">
            <div class="ml-auto">
              <font-awesome-icon :icon="['fab', 'facebook']" class="icon mr-1"/>
              <font-awesome-icon :icon="['fab', 'twitter']" class="icon mr-1"/>
              <font-awesome-icon :icon="['fab', 'youtube']" class="icon mr-1"/>
              <font-awesome-icon :icon="['fab', 'instagram']" class="icon mr-1"/>
              <font-awesome-icon :icon="['fab', 'github']" class="icon mr-1"/>
              <font-awesome-icon :icon="['fab', 'linkedin']" class="icon"/>
            </div>
          </div>
          <div class="col-12">
            <hr/>
          </div>
          <div class="col-6">
            <ul class="inline">
              <li class="list-inline-item">
                <router-link :to="{ name: 'tos' }">
                  Terms of Service
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link :to="{ name: 'privacy' }">
                  Privacy Policy
                </router-link>
              </li>
              <li class="list-inline-item">
                <font-awesome-icon :icon="['fas', 'globe']" class="mr-1"/>English
              </li>
            </ul>
          </div>
          <div class="col-6 d-flex align-items-center text-right">
            <div class="ml-auto">
              <p>Copyright &copy; XXX, All Right Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </b-navbar>
  </div>
</template>

<script>
  import { appName } from '@router/routes'

  export default {
    name: 'TheFooter',
    computed: {
      appName: function () {
        return appName;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .footer-container
    color $footer-font-color
    background-color $footer-bg-color
    width 100%

  .container
    max-width $max-width-primary

  .app-logo
    height 32px

  .app-title
    color $footer-font-color
    font-weight bold
    font-size 1.4em

  a
    color $footer-font-color

  .icon
    size 20px
    height @size
    width @size
</style>

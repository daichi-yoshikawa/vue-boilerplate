<template>
  <LayoutMain>
    <div class="container mt-5">
      <b-tabs v-model="tab" content-class="mt-3">
        <b-tab title="Profile">
          <SettingProfile />
        </b-tab>
        <b-tab title="Security">
          <SettingSecurity />
        </b-tab>
        <b-tab title="Invite People">
          <SettingInvite />
        </b-tab>
      </b-tabs>
    </div>
  </LayoutMain>
</template>

<script>
  import LayoutMain from '@private/layouts/layout-main'
  import SettingInvite from '@private/settings/setting-invite'
  import SettingProfile from '@private/settings/setting-profile'
  import SettingSecurity from '@private/settings/setting-security'

  export default {
    name: 'SettingsView',
    components: {
      LayoutMain,
      SettingInvite,
      SettingProfile,
      SettingSecurity,
    },
    data: function () {
      return {
        tab: 0,
      };
    },
    created: function () {
      this.tab = 0;
      if (this.$route.query != null && this.$route.query.tab != null) {
        this.tab = parseInt(this.$route.query.tab);
      }
    },
  };
</script>

<style lang="stylus">
  .container
    max-width $primary-max-width
</style>

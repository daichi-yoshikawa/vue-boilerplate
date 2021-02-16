<template>
  <div>
    <h3 class="mt-5 mb-3 font-weight-bold">Edit profile information</h3>
    <div class="my-3">
      <UserImage />
    </div>
    <div>
      <UserProfile />
    </div>
  </div>
</template>

<script>
  import UserImage from '@private/settings/modules/user-image'
  import UserProfile from '@private/settings/modules/user-profile'

  export default {
    name: 'SettingProfile',
    components: {
      UserImage,
      UserProfile,
    },
  };
</script>

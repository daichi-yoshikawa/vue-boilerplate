<template>
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Platform</th>
          <th scope="col">Date</th>
          <th scope="col">Duration</th>
          <th scope="col">Review Status</th>
        </tr>
      </thead>
      {{ collaborations }}
    </table>
  </div>
</template>

<script>
  import client from '@js/client'
  import resources from '@js/resources'

  export default {
    name: 'CollaborationTable',
    data: function () {
      return {
        page: 1,
        collaborations: [],
      };
    },
    mounted: async function () {
      const res = await client.get(
        resources.tenants + `${this.tenantDomain}/collaborations/?page=${this.page}`);
      /*
      res.data.collaborations.forEach(elem => {
        const collaboration = {
          name: elem.user.first_name + ' ' + elem.user.last_name,
          type: elem.seeker.id === this.userId ? 'Outgoing Call' : 'Incoming Call',
          collaborationMethod: elem.collaboration_method == null ? '' : elem.collaboration_method.name,
          collaborationDate: elem.collaboration_date == null ? '' : elem.collaboration_date,
          minutes: elem.minutes,
        };
        this.collaborations.push(collaboration);
      });*/
    },
    computed: {
      userId: function () {
        return this.$store.state.user.id;
      },
      tenantDomain: function () {
        return this.$store.state.tenant.domain;
      }
    },
  };
</script>

<template>
  <div>
    <template v-if="!sentInvitation && !sendingInvitation">
      <h3 class="mt-5 mb-3 font-weight-bold">Invite people to {{ tenantName }}</h3>
      <div class="my-3">
        <validation-observer v-slot="{ invalid }">
          <validation-provider name="email"
                               rules="email|required"
                               v-slot="{ errors }">
            <b-form-tags name="email"
                         placeholder="Add email addresses you'd like to invite."
                         duplicate-tag-text="Duplicate email(s)"
                         remove-on-delete
                         v-model="emails"
                         :limit="limit"
                         :limit-tags-text="`Invitation can be sent up to ${limit} at one time.`"
                         :separator="separator"
                         :disabled="sendingInvitation">
            </b-form-tags>
            <div class="position-relative">
              <p class="text-right text-muted">
                <small>{{ emails.length }} email addresses</small>
              </p>
              <div class="invite-button">
                <PrimaryButton @click="sendInvitation"
                               :disabled="invalid || sendingInvitation">
                  Send Invitation
                </PrimaryButton>
                <small class="ml-3 text-danger">{{ errors[0] }}</small>
              </div>
            </div>
          </validation-provider>
        </validation-observer>
      </div>
    </template>
    <template v-else-if="sendingInvitation">
      <div class="mt-5 mb-3 text-center">
        <h5>
          Sending {{ invitedEmails.length }} invitation{{ invitedEmails.length > 1 ? 's' : '' }} to:
        </h5>
        <div class="my-3">
          <InvitedEmailList :emails="invitedEmails"
                            :cols="emailListCols"/>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mt-5 mb-3 text-center">
        <h5 class="font-weight-bold">
          {{ invitedEmails.length }} invitation{{ invitedEmails.length > 1 ? 's were ' : ' was ' }}sent to:
        </h5>
        <div class="mt-3 mb-4">
          <InvitedEmailList :emails="invitedEmails"
                            :cols="emailListCols"/>
        </div>
        <PrimaryButton @click="activateForm">
          Invite more people
        </PrimaryButton>
      </div>
    </template>
  </div>
</template>

<script>
  import client from '@js/client'
  import resources from '@js/resources'
  import InvitedEmailList from '@private/settings/modules/invited-email-list'
  import PrimaryButton from '@modules/primary-button'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { email, required } from '@js/validators/rules'

  export default {
    name: 'SettingInvite',
    components: {
      InvitedEmailList,
      PrimaryButton,
      ValidationObserver,
      ValidationProvider,
    },
    data: function () {
      return {
        emailListCols: 3,
        limit: 50,
        separator: " ,;",
        sendingInvitation: false,
        sentInvitation: false,
        validator: null,
        emails: [],
        invitedEmails: [],
      };
    },
    methods: {
      sendInvitation: async function () {
        try {
          this.sendingInvitation = true;
          const payload = this.emails.map((elem, index, array) => {
            return {
              tenant_id: this.tenantId,
              tenant_user_id: this.tenantUserId,
              email: elem,
            };
          });
          this.invitedEmails = await this.emails;
          const res = await client.post(
              resources.tenants + `${this.tenantDomain}/invitation_codes/`,
              payload);
          this.sendingInvitation = await false;
          this.sentInvitation = await true;
          this.emails = await [];
        } catch (error) {
          this.invitedEmails = [];
          this.sendingInvitation = false;
          this.sentInvitation = false;
          console.error(error);
        }
      },
      activateForm: function () {
        this.sentInvitation = false;
      }
    },
    computed: {
      tenantId: function () {
        return this.$store.state.tenant.id;
      },
      tenantDomain: function () {
        return this.$store.state.tenant.domain;
      },
      tenantName: function () {
        return this.$store.state.tenant.name;
      },
      tenantUserId: function () {
        return this.$store.state.tenantUser.id;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .invite-button
    position absolute
    top 0
    margin-top 14px
</style>

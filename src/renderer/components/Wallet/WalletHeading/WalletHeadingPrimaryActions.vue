<template>
  <div
    key="PrimaryActions"
    class="WalletHeading__PrimaryActions flex items-center"
  >
    <button
      v-if="!walletVote.publicKey"
      v-tooltip="{ content: $t('PAGES.WALLET_SHOW.NO_VOTE'), trigger:'hover' }"
      class="bg-theme-button-special-choice cursor-pointer rounded-full w-2 h-2 m-3"
      @click="goToDelegates"
    />

    <ButtonReload
      :color-class="buttonStyle"
      :is-refreshing="isRefreshing"
      class="WalletNew__refresh-button mr-2"
      text-class="hover:text-white"
      @click="refreshWallet"
    />

    <ButtonModal
      :class="buttonStyle"
      icon="qr"
      label="QR"
      view-box="0 0 18 18"
    >
      <template slot-scope="{ toggle, isOpen }">
        <ModalQrCode
          v-if="isOpen"
          :value="currentWallet.address"
          @close="toggle"
        />
      </template>
    </ButtonModal>

    <ButtonModal
      v-show="!currentWallet.isContact"
      :class="buttonStyle"
      :label="$t('TRANSACTION.SEND')"
      icon="send"
      view-box="0 0 12 12"
    >
      <template slot-scope="{ toggle, isOpen }">
        <TransactionModal
          v-if="isOpen"
          :type="0"
          @cancel="toggle"
          @sent="toggle"
        />
      </template>
    </ButtonModal>
  </div>
</template>

<script>
import { ButtonModal, ButtonReload } from '@/components/Button'
import { ModalQrCode } from '@/components/Modal'
import { TransactionModal } from '@/components/Transaction'

export default {
  name: 'WalletHeadingPrimaryActions',

  inject: ['switchToTab', 'walletVote'],

  components: {
    ButtonModal,
    ButtonReload,
    ModalQrCode,
    TransactionModal
  },

  data () {
    return {
      isRefreshing: false
    }
  },

  computed: {
    buttonStyle () {
      return 'option-heading-button mr-2 px-3 py-2'
    },

    currentWallet () {
      return this.wallet_fromRoute
    }
  },

  methods: {
    goToDelegates () {
      this.switchToTab('WalletDelegates')
    },

    async refreshWallet () {
      this.isRefreshing = true
      await this.$eventBus.emit('wallet:reload')
      this.isRefreshing = false
    }
  }
}
</script>

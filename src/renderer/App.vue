<template>
  <div
    id="app"
    :class="darkTheme ? 'theme-dark' : 'theme-light'"
    class="bg-theme-page text-theme-page-text font-sans flex flex-col px-4 py-6 w-screen h-screen overflow-hidden"
  >

    <div class="flex-1 flex mt-6 mb-4 mr-6">
      <AppSidemenu />
      <router-view class="flex-1" />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import '@/styles/style.css'
import AppFooter from '@/components/AppFooter'
import AppSidemenu from '@/components/AppSidemenu'
import config from '@config'

export default {
  name: 'DesktopWallet',
  components: {
    AppFooter,
    AppSidemenu
  },

  data: () => ({
    darkTheme: false
  }),

  created () {
    this.$store.dispatch('network/setDefaults', config.NETWORKS)
  }
}
</script>
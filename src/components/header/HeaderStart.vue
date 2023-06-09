<template>
  <HeaderContainer v-if="largerThanSm">
    <TheLogo />
    <NavAuth />
  </HeaderContainer>

  <HeaderContainer v-else>
    <TheLogo />
    <NavStartMobile />
  </HeaderContainer>
</template>

<script setup lang="ts">
import HeaderContainer from '@/components/header/HeaderContainer.vue';
import NavAuth from '@/components/header/navigation-start/NavAuth.vue';
import NavStartMobile from '@/components/header/navigation-start/NavStartMobile.vue';
import TheLogo from '@/components/logo/TheLogo.vue';
import TheLogoSmall from '@/components/logo/TheLogoSmall.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';

const { largerThanSm } = getBreakpoints();
</script>

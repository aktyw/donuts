<template>
  <HeaderContainer v-if="largerThanMd">
    <NavSlimOptions />
    <NavMainFeatures />
    <NavSettings />
  </HeaderContainer>

  <HeaderContainer v-else>
    <NavSlimOptions />
    <NavAppMobile />
  </HeaderContainer>
</template>

<script setup lang="ts">
import HeaderContainer from '@/components/header/HeaderContainer.vue';
import NavAppMobile from '@/components/header/navigation/NavAppMobile.vue';
import NavMainFeatures from '@/components/header/navigation/NavMainFeatures.vue';
import NavSettings from '@/components/header/navigation/NavSettings.vue';
import NavSlimOptions from '@/components/header/navigation/NavSlimOptions.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';

const { largerThanMd } = getBreakpoints();
</script>

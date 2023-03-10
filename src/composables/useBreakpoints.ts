import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

export function getBreakpoints() {
  const smAndSmaller = breakpoints.smallerOrEqual('sm');
  const smAndLarger = breakpoints.greaterOrEqual('sm');
  const largerThanSm = breakpoints.greater('sm');
  const lgAndSmaller = breakpoints.smallerOrEqual('lg');
  const smallerThanLg = breakpoints.smaller('lg');

  return { smAndLarger, largerThanSm, lgAndSmaller, smallerThanLg, smAndSmaller };
}

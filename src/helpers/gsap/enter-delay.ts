import gsap from 'gsap';

export function onEnter(el: HTMLElement, done: GSAPCallback) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index ? +el.dataset.index : 0 * 0.15,
    onComplete: done,
  });
}

export function onLeave(el: HTMLElement, done: GSAPCallback) {
  gsap.to(el, {
    opacity: 0,
    delay: el.dataset.index ? +el.dataset.index : 0 * 0.15,
    onComplete: done,
  });
}

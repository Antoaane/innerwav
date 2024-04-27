export const clickOutsideDirective = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event) {
      // Vérifier si le clic a été effectué en dehors de l'élément et si la directive a une expression
      if (!(el === event.target || el.contains(event.target))) {
        // Appeler la fonction passée en expression à la directive
        binding.value(event);
      }
    };
    window.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    window.removeEventListener('click', el.clickOutsideEvent);
  },
};

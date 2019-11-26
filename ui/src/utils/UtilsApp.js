
// TODO - choose scrolling position
export const scrollToElementId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 4);
    // const middle = absoluteElementTop - 50;
    window.scrollTo(0, middle);
    // window.scrollTop(0);
  }
};

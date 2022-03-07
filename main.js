class Onboarding {
  constructor() {
    this.root = this.select(".onboarding");
    this.items = this.selectAll(".onboarding__item");
    this.activeItem = this.select(".onboarding__item--active");
    this.tracker = this.select(".onboarding__tracker");
    this.navs = this.selectAll(".onboarding__nav-button");
  }

  handleTrackerPosition(top, left, height, width) {
    this.tracker.style.top = `${top}px`;
    this.tracker.style.left = `${left}px`;
    this.tracker.style.height = `${height}px`;
    this.tracker.style.width = `${width}px`;
  }

  getNewActiveIndex(type) {
    let index = 0;
    if (type === "prev") {
      index = this.activeItemIndex - 1 >= 0 ? this.activeItemIndex - 1 : 0;
    } else {
      index =
      this.activeItemIndex + 1 <= this.items.length - 1 ?
      this.activeItemIndex + 1 :
      this.items.length - 1;
    }

    return index;
  }

  setTrackerPosition() {
    const {
      offsetTop,
      offsetLeft,
      clientHeight,
      clientWidth } =
    this.activeItem;
    this.handleTrackerPosition(
    offsetTop,
    offsetLeft,
    clientHeight,
    clientWidth);


    const block = innerHeight < clientHeight ? "start" : "center";
    this.activeItem.scrollIntoView({ block, behavior: "smooth" });
  }

  setActiveItemIndex() {
    this.items.forEach((item, index) => {
      if (item.classList.contains("onboarding__item--active")) {
        this.activeItemIndex = index;
      }
    });
  }

  select(el) {
    const node = document.querySelector(el);
    if (node) {
      return node;
    } else {
      console.error("[Onboarding] - Element is not found");
    }
  }

  selectAll(el) {
    const nodes = document.querySelectorAll(el);
    if (nodes && nodes.length > 0) {
      return nodes;
    } else {
      console.error("[Onboarding] - Elements are not found");
    }
  }

  setActiveItem(index) {
    const newActiveItem = this.items[index];
    this.activeItemIndex = index;
    this.activeItem.classList.remove("onboarding__item--active");
    this.activeItem = newActiveItem;
    this.activeItem.classList.add("onboarding__item--active");
    this.setTrackerPosition(this.activeItem);
  }

  setActiveItemWithItemClick() {
    this.items.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.setActiveItem(index);
      });
    });
  }

  setNavActions() {
    this.navs.forEach((nav) =>
    nav.addEventListener("click", e => {
      const index = this.getNewActiveIndex(
      e.currentTarget.getAttribute("data-type"));

      this.setActiveItem(index);
    }));

  }

  stopTransition() {
    this.tracker.classList.add("onboarding__tracker--stop-t");
    const resizeTimer = setTimeout(() => {
      this.tracker.classList.remove("onboarding__tracker--stop-t");
      clearTimeout(resizeTimer);
    }, 400);
  }

  handleWindowResize() {
    window.addEventListener("resize", () => {
      this.setTrackerPosition();
      this.stopTransition();
    });
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setTrackerPosition();
      this.setActiveItemIndex();
      this.setNavActions();
      this.setActiveItemWithItemClick();
      this.stopTransition();
      this.handleWindowResize();
      const timeout = setTimeout(() => {
        this.root.classList.remove("onboarding--loading");
        clearTimeout(timeout);
      }, 640);
    });
  }}


const onboarding = new Onboarding();
onboarding.init();
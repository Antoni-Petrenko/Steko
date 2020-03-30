const page = {
  preloader: document.querySelector(".preloader"),
  firstSsectionImg: document.querySelector(".first-section__image-box--image"),
  footerSection: document.querySelector(".footer__content-box"),
  sections: [
    document.querySelector(".second-section"),
    document.querySelector(".third-section"),
    document.querySelector(".fourth-section"),
    document.querySelector(".fifth-section"),
    document.querySelector(".sixth-section")
  ],
  svgRects: document.querySelectorAll("[class*='__clone__SVG']"),
  preloaderAnimation:anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000
  })

};


const setCloneSectionSize = section => {
  const selectClone = document.querySelector(`.${section.className}__clone`);
  if (selectClone) {
    const height = section.offsetHeight;
    const positionOnThePage = section.offsetTop;
    selectClone.style.height = `${height}px`;
    selectClone.style.top = `${positionOnThePage}px`;
  }
};


const addObserver = (targetElement, callback, isDisconect) => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = [...entry.target.children];
        element.forEach(callback);
        observer.disconnect();
      }
    })
  }, observerOptions);
  observer.observe(targetElement)
};


document.addEventListener('DOMContentLoaded', () => {
  page.preloaderAnimation.add({
    targets:page.preloader.children[0],
    translateX: "-50%",
    translateY:"-50%"
  }).add({
    targets:page.preloader.children[0],
    height: "100%",
  }).add({
    targets: page.preloader.children[1],
    easing: 'easeOutExpo',
    duration: 1000,
    opacity:1,
    translateX:["-50%", "-50%"],
    translateY:["-42%","-50%"]
  });
  window.addEventListener("scroll", () => (page.firstSsectionImg.style.transform = `scale(${1.2 - window.pageYOffset / 2000})`));
  window.addEventListener("resize", e => (e.target.requestIdleCallback(() => page.sections.forEach(setCloneSectionSize))));

  const rellax = new Rellax(" .parallax", {
    center: true
  });
  page.svgRects.forEach((observerTarget) => addObserver(observerTarget, animationTarget => {
    anime.timeline({
      targets: animationTarget,
      easing: 'easeOutExpo',
      duration: 1000
    }).add({
      width: '100%',
      height: "2%"
    }).add({
      height: "100%"
    })
  }))
  addObserver(page.footerSection, (animationTarget, index) => {
    anime({
      targets: animationTarget,
      easing: 'easeOutExpo',
      duration: 3500,
      delay: `1${index*2}00`,
      opacity: [0, 1],
      translateY: [25, 0],
    })
  })

})

window.onload = () => {
 page.preloaderAnimation.add({
    targets:page.preloader,
    easing: 'easeOutExpo',
    duration: 2000,
    opacity:0
  })
  page.preloaderAnimation.finished.then((el)=>{
    page.preloader.remove()
  });
  page.sections.forEach(setCloneSectionSize);
}
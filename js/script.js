const page = {
  preloader: document.querySelector(".preloader"),
  headerBackground: document.querySelector(".header__background"),
  firstSsectionImg: document.querySelector(".first-section__image-box--image"),
  header: document.querySelector(".header"),
  footerSection: document.querySelector(".footer__content-box"),
  sections: [
    document.querySelector(".second-section"),
    document.querySelector(".third-section"),
    document.querySelector(".fourth-section"),
    document.querySelector(".fifth-section"),
    document.querySelector(".sixth-section")
  ],
  svgRects: document.querySelectorAll("[class*='__clone__SVG']"),
  preloaderAnimation: anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000
  })

};


window.onbeforeunload=()=>window.scrollTo(0,0);
let isScrollAnimationON=true;
const scroll = e => {
  e.preventDefault();
  if(isScrollAnimationON){
    isScrollAnimationON=false
  anime.timeline({
    targets:page.headerBackground,
    delay:500,
    duration: 500,
    endDelay: 400,
    easing: 'easeInOutSine'
  }).add({
    opacity:[0,1],
  }).add({
    targets:page.header,
    opacity:0
  }).add({
    delay: 100,
    opacity:[1,0],
    complete:()=>{
      page.headerBackground.style.pointerEvent="none";
      page.header.remove();
      window.removeEventListener("wheel",scroll);
      window.removeEventListener("touchmove",scroll);
      window.removeEventListener("scroll",scroll);
    }
  })
  }else return
}
window.addEventListener("wheel", scroll, {
  passive: false
});
window.addEventListener("touchmove", scroll, {
  passive: false
});
window.addEventListener("scroll", scroll, {
  passive: false
});




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
    targets: page.preloader.children[0],
    translateX: "-50%",
    translateY: "-50%"
  }).add({
    targets: page.preloader.children[0],
    height: "100%",
  }).add({
    targets: page.preloader.children[1],
    easing: 'easeOutExpo',
    duration: 1000,
    opacity: 1,
    translateX: ["-50%", "-50%"],
    translateY: ["-42%", "-50%"]
  });
  window.addEventListener("scroll", () => (page.firstSsectionImg.style.transform = `scale(${1.2 - window.pageYOffset / 2000})`));
  window.addEventListener("resize", e => (e.target.requestIdleCallback(() => page.sections.forEach(setCloneSectionSize))));

  const rellax = new Rellax(" .parallax", {
    center: true
  });
  page.svgRects.forEach((observerTarget) => addObserver(observerTarget, animationTarget => {
    animationTarget.classList.add("fadeIn")
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
  page.sections.forEach(setCloneSectionSize);
  page.preloaderAnimation.add({
    targets: page.preloader,
    easing: 'easeOutExpo',
    duration: 2000,
    opacity: 0
  })
  page.preloaderAnimation.finished.then((el) => {
    page.preloader.remove()
  }); 
}


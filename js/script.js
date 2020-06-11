window.addEventListener('load', () => {
    $.ajax({
        url: 'https://b2c.steko.com.ua/api/getregions',
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            var cur_ques_details = data;
            var array = $.map(cur_ques_details, function (value, index) {
                return "<option value=" + value['id'] + ">" + value['name'] + "</option>";
            });

            $('form').find('[name=leed_region_id]').html("<option value='not_set' id='not_set'>Не выбрано</option>" + array);
        }
    });
})

const page = {
    navigation: document.querySelector(".navigation"),
    preloader: document.querySelector(".preloader"),
    headerBackground: document.querySelector(".header__background"),
    firstSsectionImg: document.querySelector(".first-section__image-box--image"),
    header: document.querySelector(".header"),
    footerSection: document.querySelector(".footer__content-box"),
    navButton: document.querySelector(".navigation__button"),
    sections: [
        document.querySelector(".second-section"),
        document.querySelector(".third-section"),
        document.querySelector(".fourth-section"),
        document.querySelector(".fifth-section"),
        document.querySelector(".sixth-section"),
    ],
    svgRects: document.querySelectorAll("[class*='__clone__SVG']"),
    preloaderAnimation: anime.timeline({
        easing: "easeOutExpo",
        duration: 1000,
    }),
    logoWhiteLetter: [
        ...document.querySelectorAll(".navigation__logo > path[fill='#fff']"),
    ],
    isScrollAnimationON: true,
    callFormButton: document.querySelectorAll('[id$="__button"]'),
    formContainer: document.querySelector(".form"),
    form: document.querySelector("#form"),
    scrollBarTrack: document.querySelector(".navigation__scroll-bar-track")
};

window.onbeforeunload = () => window.scrollTo(0, 0);

const closeForm = () => {
    page.formContainer.classList.add("off");
    const succass = anime
        .timeline({
            easing: "easeOutExpo",
            duration: 500,
        }).add({
            targets: page.formContainer,
            opacity: 0,
        })
    succass.finished
        .then(() => {
            page.formContainer.style.pointerEvents = "none";
            anime({
                targets: document.querySelector(".form__background"),
                scale: 1,
                duration: 1000
            })
        });
}
page.navButton.addEventListener("click", () => {
    if (!page.formContainer.classList.contains("off")) {
        closeForm();
    } else if (window.pageYOffset !== 0) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});

const scroll = (e) => {
    e ? e.preventDefault() : null;
    let {
        headerBackground,
        header,
        navigation,
        logoWhiteLetter
    } = page;

    if (page.isScrollAnimationON) {
        page.isScrollAnimationON = false;
        anime
            .timeline({
                targets: headerBackground,

                duration: 300,
                endDelay: 400,
                easing: "easeInOutSine",
            })
            .add({
                opacity: [0, 1],
            })
            .add({
                delay: 150,
                targets: header,
                opacity: 0,
            })
            .add({
                delay: 100,
                opacity: [1, 0],
                complete: () => {
                    window.innerWidth > 1000 ? null : navigation.style.backgroundColor = `rgba(255,255,255, 0.7)`;
                    logoWhiteLetter.forEach((el) => {
                        el.style.fill = "#535659";
                    });
                    headerBackground.style.pointerEvent = "none";
                    // header.remove();
                    window.removeEventListener("wheel", scroll);
                    window.removeEventListener("touchmove", scroll);
                    window.removeEventListener("scroll", scroll);
                    document.querySelector(".navigation__scroll-bar-track").style.opacity = 1;
                    setTimeout(() => $('html').easeScroll({
                        frameRate: 1,
                        animationTime: 2000,
                        stepSize: 50,
                        pulseAlgorithm: 1,
                        pulseScale: 8,
                        pulseNormalize: 1,
                        accelerationDelta: 1,
                        accelerationMax: 1,
                        keyboardSupport: true,
                        arrowScroll: 50,
                        touchpadSupport: true,
                        fixedBackground: true
                    }), 0)

                },
            });
    } else return;
};
window.addEventListener("wheel", scroll, {
    passive: false,
});
window.addEventListener("touchmove", scroll, {
    passive: false,
});
window.addEventListener("scroll", scroll, {
    passive: false,
});

const setCloneSectionSize = (section, index, allSections) => {

    const selectClone = document.querySelector(`.${section.className}__clone`);
    if (selectClone) {
        const height = section.offsetHeight;
        const positionOnThePage = section.offsetTop;
        selectClone.style.height = allSections.length - 1 === index ? `${document.body.offsetHeight-section.offsetTop}px` : `${height}px`;
        selectClone.style.top = `${positionOnThePage}px`;

    }
};

const addObserver = (targetElement, callback, isDisconect) => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = [...entry.target.children];
                element.forEach(callback);
                observer.disconnect();
            }
        });
    }, observerOptions);
    observer.observe(targetElement);
};

document.addEventListener("DOMContentLoaded", () => {
    page.preloaderAnimation
        .add({
            targets: page.preloader.children[0],
            translateX: "-50%",
            translateY: "-50%",
        })
        .add({
            targets: page.preloader.children[0],
            height: "100%",
        })
        .add({
            targets: page.preloader.children[1],
            easing: "easeOutExpo",
            duration: 1000,
            opacity: 1,
            translateX: ["-50%", "-50%"],
            translateY: ["-42%", "-50%"],
        });
    window.addEventListener(
        "scroll",
        () =>
        (page.firstSsectionImg.style.transform = `scale(${
    1.2 - window.pageYOffset / 2000
        })`)
    );

    page.svgRects.forEach((observerTarget) =>
        addObserver(observerTarget, (animationTarget) => {
            animationTarget.classList.add("fadeIn");
        })
    );
    addObserver(page.footerSection, (animationTarget, index) => {
        anime({
            targets: animationTarget,
            easing: "easeOutExpo",
            duration: 3500,
            delay: `${index * 2}00`,
            opacity: [0, 1],
            translateY: [25, 0],
        });
    });
});

window.addEventListener("DOMContentLoaded", () => {
    page.sections.forEach(setCloneSectionSize);

    const rellax = new Rellax(" .parallax", {
        center: true,
    });

    window.addEventListener(
        "resize",
        (e) => {
            page.sections.forEach(setCloneSectionSize);
            rellax.refresh();
        },
        false
    );
    page.preloaderAnimation.add({
        targets: page.preloader,
        easing: "easeOutExpo",
        duration: 2000,
        opacity: 0,
    });
    page.preloaderAnimation.finished.then(() => {
        page.preloader.remove();
    });
})

page.callFormButton.forEach((button) =>
    button.addEventListener("click", () => {
        if (page.formContainer.classList.contains("off")) {
            page.formContainer.classList.toggle("off");
            page.form.parentElement.querySelector('.form__close-button').addEventListener("click", () => {
                closeForm()
            });
            document.querySelector(".form__background").addEventListener("click", () => {
                closeForm()
            });
            page.logoWhiteLetter.forEach((el) => {
                el.style.fill = "#535659";
            });
            const formAnimation = anime.timeline({
                easing: "easeOutExpo",
                duration: 400,
            }).add({
                targets: document.querySelector(".form__background"),
                scale: 50
            }).add({
                targets: page.formContainer,
                translateX: 0,
                opacity: 1,
                complete: () => {
                    page.formContainer.style.pointerEvents = "initial";
                    document.querySelector(".navigation__scroll-bar-track").style.opacity = window.offsetTop > 0 ? 1 : 0;
                    page.navigation.style.backgroundColor = window.innerWidth > 1300 ? "transparent" : "rgba(255,255,255, 0.7)";
                    page.logoWhiteLetter.forEach((el) => {
                        el.style.fill = "#535659";
                    });
                    page.headerBackground.style.pointerEvent = "none";
                    if (!window.innerWidth > 500) {
                        // page.header.remove();
                        window.removeEventListener("wheel", scroll);
                        window.removeEventListener("touchmove", scroll);
                        window.removeEventListener("scroll", scroll);

                    }

                }
            })
        }
    })
);

$("input[type=tel]").mask("+38(999)999-99-99", {
    onBeforeMask: function (t, e) {
        return t.replace(/^38/g, "")
    },
    onBeforePaste: function (t, e) {
        return t.replace(/^38/g, "")
    }
})

page.form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const {leed_name,leed_phone,leed_region_id}=e.target.children;

    
    

    const invalidChars = leed_name.value.match(/[^(А-яA-z 'ієї)]/g);
    const isInvalidPhonNumber= leed_phone.value.replace(/\D/g,'').length<10;
    const isRegionSelected=leed_region_id.value === "not_set";


    console.log(invalidChars)

    if ( invalidChars ) {
        leed_name.setCustomValidity(`Ім'я не може містити ${invalidChars.toString()}`);
        leed_name.reportValidity();
        console.log(invalidChars)
    } else if (isRegionSelected) {
        leed_name.setCustomValidity("");
        leed_region_id.setCustomValidity(`Оберіть будьласка місто`);
        leed_region_id.reportValidity();
        console.log(invalidChars)
    } else {
        console.log(invalidChars)
        const data = [...document.querySelectorAll('[name^=leed]')].reduce((obj, curInp) => {
            obj[curInp.name] = curInp.value;
            return obj
        }, {});
        console.log(data)
    }
    
});





const scrollBar = () => {
    const precentOfDocumentScroll = (((window.scrollY + window.innerHeight) / document.body.offsetHeight) * 100 | 0);
    const thumbSize = page.scrollBarTrack.firstElementChild.offsetHeight;
    const heightOfScrollTrack = page.scrollBarTrack.offsetHeight - thumbSize;
    const scrollThumbOffsetTop = (heightOfScrollTrack * (precentOfDocumentScroll / 100));

    page.scrollBarTrack.firstElementChild.style.transform = `translateY(${scrollThumbOffsetTop}px)`;
}

window.addEventListener("scroll", scrollBar)

 const scrollParallax = element => {
    if (((this.scrollY / this.innerHeight) * 100 | 0) < 59) {
        let translateY = ((this.scrollY / this.innerHeight) * 100 | 0) / 4;
        img.style.transform = `translate(-50%, -${translateY%15}%)`;
    } else return
}
window.onload = () => {
    const timeLine = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000,
    });

    timeLine
        .add({
            targets: ".preloader__path",
            translateX: [{
                    value: "100%",
                },
                {
                    value: "0%"
                }
            ]
        })
        .add({
            targets: ".preloader__path",
            scaleY: 150,
        })
        .add({
            targets: ".logo-steko-preloader",
            translateY: ["-20%", "-50%"],
            opacity: 1,
            easing: 'linear'
        })
        .add({
            targets: ".preloader",
            opacity: 0,
            duration: 500,
            delay: 500,
            easing: "linear",
        })

    timeLine.finished.then(() => {
       
        anime({
            targets: '.header__heading',
            translateY: ['50px', "0px"],
            opacity: 1,
            easing: 'easeInOutSine',
            duration: 1750,

        })
        anime({
            targets: ".header__paragraph",
            translateY: ['50px', "0px"],
            opacity: 1,
            easing: 'easeInOutSine',
            duration: 1500,
            delay: 250
        })
        anime({
            targets: ".header__button",
            translateY: ['50px', "0px"],
            opacity: 1,
            easing: 'easeInOutSine',
            duration: 1500,
            delay: 350
        })
        anime({
            targets: '.header__picture',
            translateX: ['50px', "0px"],
            opacity: 1,
            easing: 'easeInOutSine',
            duration: 1500,
            delay: 450,
            complete:()=>document.body.style.overflow="scroll"
        })


    })


    timeLine.finished.then(() => {
        document.querySelector('.preloader').remove();
        
    })


}













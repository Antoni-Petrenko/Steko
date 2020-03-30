 const scrollParallax = element => {
     console.log(element)
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

//     addObserver(
//         document.querySelector('.firstSection'),
//         () => {
//             anime({
//                 targets: '.firstSection__img>img',
//                 translateY: ['150px', "0px"],
//                 opacity: 1,
//                 easing: 'easeInOutQuad',
//                 duration: 1500
//             })
//             anime({
//                 targets: ".firstSection > .heading",
//                 translateY: ['100px', "0px"],
//                 opacity: 1,
//                 easing: 'easeInOutQuad',
//                 duration: 1500,
//                 delay: 500
//             })
//             anime({
//                 targets: '.firstSection > .paragraph',
//                 translateY: ['150px', "0px"],
//                 opacity: 1,
//                 easing: 'easeInOutQuad',
//                 duration: 1500,
//                 delay: 500,
                
//             })
//         },
//         true
//     );

//     addObserver(
//         document.querySelector('.secSection'),
//         () => {
//             anime.timeline({
//                 targets: ".secSection__rect rect",
//                 easing: 'easeOutQuint',
//                 duration: 700
//             }).add({
//                 width: "100%"
//             }).add({
//                 height: "100%"
//             }).add({
//                 targets:".secSection h2",
//                 translateX:["-5%","0%"],
//                 opacity:1,
//                 duration: 1500
//             })

//             anime({
//                 targets:".content-box  .paragraph",
//                 easing: 'easeOutQuint',
//                 translateY:["-5%","0%"],
//                 opacity:1,
//                 delay:1500,
//                 duration:1500
//             })
//             anime({
//                 targets:".secSection div picture",
//                 easing: 'easeOutQuint',
//                 opacity:1,
//                 delay:1500,
//                 duration:1500
//             })
//         },
//         true
//     );

    
//     addObserver(
//         document.querySelector('.thirdSection'),
//         () => {
//             anime.timeline({
//                 targets: ".thirdSection__rect rect",
//                 easing: 'easeOutQuint',
//                 duration: 700
//             }).add({
//                 width: "100%"
//             }).add({
//                 height: "100%"
//             }).add({
//                 targets:".thirdSection h2",
//                 translateX:["-5%","0%"],
//                 opacity:1,
//                 duration: 1500
//             })

//             anime({
//                 targets:".content-box  .paragraph",
//                 easing: 'easeOutQuint',
//                 translateY:["-5%","0%"],
//                 opacity:1,
//                 delay:1500,
//                 duration:1500
//             })
//             anime({
//                 targets:".content-box  picture",
//                 easing: 'easeOutQuint',
//                 translateY:"-65%",
//                 translateX:["60%","0%"],
//                 opacity:1,
//                 delay:1500,
//                 duration:1500
//             })
//         },
//         true
//     );
}















// window.onload = () => {
//     addObserver(targetElementForObserve[0], 0.5, {
//         targets: document.querySelector('.navigation'),
//     })

// }
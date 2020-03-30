const addObserver = (targetElement, callback, isDisconect) => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                callback();
                isDisconect ? observer.disconnect() : null;
            }
        })
    }, observerOptions);
    observer.observe(targetElement)
};



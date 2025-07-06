(function(){
    window.ReactBits = {
        reveal(selector){
            document.querySelectorAll(selector).forEach(el => {
                el.style.opacity = 0;
                el.style.transform = 'translateY(20px)';
                const obs = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting){
                            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                            el.style.opacity = 1;
                            el.style.transform = 'translateY(0)';
                            obs.unobserve(entry.target);
                        }
                    });
                }, {threshold: 0.1});
                obs.observe(el);
            });
        }
    };
})();

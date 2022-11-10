if (window.history && window.history.pushState && typeof window.bckLink != 'undefined') {
    window.history.pushState('forward', null, null);
    window.onpopstate = () => {
        setTimeout(()=>{
            window.location.href = window.bckLink;
            }
            , 0
        );
    }
}
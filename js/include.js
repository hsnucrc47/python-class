async function loadComponents() {
    const components = [
        { id: 'nav-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/nav.html' },
        { id: 'header-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/header.html' },
        { id: 'footer-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/footer.html' }
    ];


    await Promise.all(components.map(async (comp) => {
        const placeholder = document.getElementById(comp.id);
        if (!placeholder) return;
        try {
            const response = await fetch(comp.url);
            const html = await response.text();
            placeholder.innerHTML = html;
        } catch (err) {
            console.error(`載入 ${comp.url} 失敗:`, err);
        }
    }));

    initNavbarLogic();
    window.dispatchEvent(new Event('componentsLoaded'));
}

function initNavbarLogic() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    

    if (menuBtn && mobileMenu) {
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.replaceWith(newMenuBtn);
        newMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }


    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.includes('/python-class/') && !window.location.pathname.includes('.html');
    
    const homeBaseUrl = "https://hsnucrc47.github.io/python-class/index.html";

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        const targetId = anchor.getAttribute('href'); 

        if (!isHomePage) {

            anchor.href = homeBaseUrl + targetId;
        } else {

            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {

                    const navHeight = document.getElementById('nav-placeholder').offsetHeight || 70;
                    const targetPosition = targetElement.offsetTop - navHeight - 10; // 多留 10px 呼吸空間

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    if (mobileMenu) mobileMenu.classList.add("hidden");
                }
            });
        }
    });
}


window.addEventListener('scroll', function () {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        if (window.scrollY > 50) {
            navPlaceholder.classList.add('shadow-lg');
        } else {
            navPlaceholder.classList.remove('shadow-lg');
        }
    }
});

document.addEventListener('DOMContentLoaded', loadComponents);
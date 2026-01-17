async function loadComponents() {

    const components = [

        { id: 'nav-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/nav.html' },

        { id: 'header-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/header.html' },

        { id: 'footer-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/footer.html' }

    ];



    for (const comp of components) {

        const placeholder = document.getElementById(comp.id);

        if (!placeholder) continue;



        try {

            const response = await fetch(comp.url);

            const html = await response.text();

            placeholder.innerHTML = html;

        } catch (err) {

            console.error(`載入 ${comp.url} 失敗:`, err);

        }

    }



    initNavbarLogic();

    window.dispatchEvent(new Event('componentsLoaded'));

}



function initNavbarLogic() {

    const menuBtn = document.getElementById("menu-btn");

    const mobileMenu = document.getElementById("mobile-menu");

   

    if (menuBtn && mobileMenu) {

        menuBtn.replaceWith(menuBtn.cloneNode(true));

        const newMenuBtn = document.getElementById("menu-btn");

       

        newMenuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("hidden");

        });

    }





    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');

            const targetElement = document.querySelector(targetId);

           

            if (targetElement) {

                window.scrollTo({

                    top: targetElement.offsetTop -70,

                    behavior: 'smooth'

                });

               

                if (mobileMenu) mobileMenu.classList.add("hidden");

            }

        });

    });

}





window.addEventListener('scroll', function () {

    const nav = document.querySelector('nav');

    if (nav) {

        if (window.scrollY > 100) {

            nav.classList.add('shadow-lg');

        } else {

            nav.classList.remove('shadow-lg');

        }

    }

});





document.addEventListener('DOMContentLoaded', loadComponents);
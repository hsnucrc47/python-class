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
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");
    
    // 1. 漢堡選單 (手機版)
    if (menuBtn && mobileMenu) {
        // 使用 cloneNode 確保不會重複綁定 EventListener
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.replaceWith(newMenuBtn);
        newMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 2. 其他資源下拉選單 (電腦版)
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle("hidden");
        });
    }

    // [防呆] 點擊頁面其他地方時，關閉所有開啟的選單
    window.addEventListener("click", () => {
        if (mobileMenu) mobileMenu.classList.add("hidden");
        if (dropdownMenu) dropdownMenu.classList.add("hidden");
    });

    // 3. 頁面路徑與平滑捲動處理
    const path = window.location.pathname;
    const isHomePage = path.endsWith('/python-class/') || 
                       path.endsWith('/index.html') || 
                       path === '/python-class' ||
                       path === '/'; // 增加根目錄判斷
    
    const homeBaseUrl = "https://hsnucrc47.github.io/python-class/index.html";

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        const targetId = anchor.getAttribute('href'); 

        if (!isHomePage) {
            // 如果不在首頁，將錨點改為絕對路徑
            anchor.href = homeBaseUrl + targetId;
        } else {
            // 如果在首頁，實作平滑捲動
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 計算導覽列高度避開遮擋
                    const navPlaceholder = document.getElementById('nav-placeholder');
                    const navHeight = navPlaceholder ? navPlaceholder.offsetHeight : 70;
                    const targetPosition = targetElement.offsetTop - navHeight - 10;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 捲動後自動關閉手機選單
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
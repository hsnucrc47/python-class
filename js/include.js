async function loadComponents() {
    const components = [
        { id: 'nav-placeholder', url: 'https://hsnucrc47.github.io/python-class/components/nav.html' },
        { id: 'header-placeholder', url: 'https://hsnucrc47.github.io/python-class/components/header.html' },
        { id: 'footer-placeholder', url: 'https://hsnucrc47.github.io/python-class/components/footer.html' }
    ];

    // 使用 Promise.all 讓載入速度更快
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

    // 組件載入後執行邏輯
    initNavbarLogic();
    window.dispatchEvent(new Event('componentsLoaded'));
}

function initNavbarLogic() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    // 漢堡選單邏輯
    if (menuBtn && mobileMenu) {
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.replaceWith(newMenuBtn);
        newMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 判斷當前是否在首頁
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.includes('/python-class/') && !window.location.pathname.includes('.html');
    
    const homeBaseUrl = "https://hsnucrc47.github.io/python-class/index.html";

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        const targetId = anchor.getAttribute('href'); // 取得如 "#calendar"

        if (!isHomePage) {
            // --- 分頁邏輯：將連結改為絕對路徑回首頁 ---
            anchor.href = homeBaseUrl + targetId;
        } else {
            // --- 首頁邏輯：執行平滑捲動 ---
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 動態計算導覽列高度（自動適應手機/電腦版）
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

// 捲動陰影邏輯
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
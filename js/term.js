function toggleTerm() {
    const checkbox = document.getElementById('term-toggle');
    const slider = document.getElementById('term-slider');
    const text1 = document.getElementById('text-term1');
    const text2 = document.getElementById('text-term2');
    const term1Content = document.getElementById('term1-content');
    const term2Content = document.getElementById('term2-content');

    // 切換狀態
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
        // 切換到下學期
        slider.style.transform = 'translateX(100%)';
        text1.classList.add('text-gray-500');
        text1.classList.remove('text-white');
        text2.classList.add('text-white');
        text2.classList.remove('text-gray-500');
        
        term1Content.classList.add('hidden');
        term2Content.classList.remove('hidden');
    } else {
        // 切換到上學期
        slider.style.transform = 'translateX(0%)';
        text1.classList.add('text-white');
        text1.classList.remove('text-gray-500');
        text2.classList.add('text-gray-500');
        text2.classList.remove('text-white');

        term1Content.classList.remove('hidden');
        term2Content.classList.add('hidden');
    }
}

// 頁面加載時初始化顏色
document.addEventListener('DOMContentLoaded', () => {
    const text1 = document.getElementById('text-term1');
    if (text1) text1.classList.add('text-white');
});
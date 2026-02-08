
// 頁面開始載入時鎖定捲軸
document.body.classList.add('loading');

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    // 為了確保動畫流暢，稍微延遲一點點再關閉（可自訂）
    setTimeout(() => {
        document.body.classList.remove('loading');
        
        // 徹底移除 DOM 避免干擾點擊
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); 
    }, 0); 
});
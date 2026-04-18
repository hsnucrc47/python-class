document.addEventListener('DOMContentLoaded', () => {
    let searchData = [];
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // 1. 抓取剛剛生成的 search-index.json
    fetch('search-index/search-index.json')
        .then(response => {
            if (!response.ok) throw new Error('無法載入搜尋索引');
            return response.json();
        })
        .then(data => {
            searchData = data;
            console.log('Search index loaded:', searchData.length, 'items');
        })
        .catch(err => console.error('Search init error:', err));

    // 2. 監聽輸入事件
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();

        // 如果輸入框是空的，隱藏結果區
        if (keyword === '') {
            searchResults.classList.add('hidden');
            searchResults.innerHTML = '';
            return;
        }

        // 3. 執行搜尋過濾
        const filteredResults = searchData.filter(item => {
            return item.title.toLowerCase().includes(keyword) ||
                item.content.toLowerCase().includes(keyword) ||
                item.week.toLowerCase().includes(keyword);
        });

        renderResults(filteredResults);
    });

    // 4. 渲染搜尋結果
    function renderResults(results) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="p-4 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100 italic">
                    找不到關鍵字相關的課程內容...
                </div>
            `;
        } else {
            results.forEach(item => {
                const resultItem = document.createElement('div');
                // 使用 Tailwind CSS 打造符合你網頁風格的卡片
                resultItem.className = "p-4 bg-white hover:bg-blue-50 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 cursor-pointer mb-2 group";

                resultItem.innerHTML = `
                    <a href="${item.link}" class="block">
                        <div class="flex justify-between items-center mb-1">
                            <h4 class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">${item.title}</h4>
                            <span class="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">${item.week}</span>
                        </div>
                        <p class="text-sm text-gray-500 line-clamp-1">${item.content}</p>
                    </a>
                `;

                // 點擊搜尋結果後自動清空搜尋框並隱藏結果
                // 在 renderResults 函數內的 resultItem.addEventListener('click', ...) 處替換
                resultItem.addEventListener('click', (e) => {
                    const link = item.link; // 取得如 "#next-week-4" 的連結

                    // 檢查是否跳轉到下學期
                    if (link.endsWith('-2')) {
                        const toggle = document.getElementById('term-toggle');
                        // 如果目前還在上學期 (checkbox 未被勾選)，就觸發切換
                        if (toggle && !toggle.checked) {
                            // 呼叫你原本 HTML 裡的切換函式
                            toggleTerm();
                        }
                    }

                    // 給瀏覽器一點時間（100ms）完成切換動畫，再進行滾動
                    setTimeout(() => {
                        const targetId = link.substring(1); // 去掉 # 號
                        const targetElement = document.getElementById(targetId);

                        if (targetElement) {
                            const offset = 100; // 避開導覽列的高度
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - offset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }
                    }, 150); 

                    searchResults.classList.add('hidden');
                    searchInput.value = '';
                });
                searchResults.appendChild(resultItem);
            });
        }

        searchResults.classList.remove('hidden');
    }
});
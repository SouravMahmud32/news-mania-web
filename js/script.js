const loadAllNews = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data.data.news_category;
}

const setAllMenu = async() =>{
    const data = await loadAllNews();
    const menu = document.getElementById('all-menu');
    data.forEach((news) =>{
        console.log(news);
        const li = document.createElement('li');
            li.innerHTML = `<a>${news.category_name}</a>`;
            menu.appendChild(li);
    });
}
setAllMenu();

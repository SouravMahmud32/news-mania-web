const loadAllNews = async () => {
  try{
    const response = await fetch(
      `https://openapi.programming-hero.com/api/news/categories`
    );
    const data = await response.json();
    return data.data.news_category;
  } catch (err) {
    console.log(err);
  }
};

const setAllMenu = async () => {
  const data = await loadAllNews();
  const menu = document.getElementById("all-menu");
  data.forEach((news) => {
    console.log(news);
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `<a href="#" onclick="loadNews('${news.category_id}')" toggleSpinner(${true})>${news.category_name}</a>`;
    menu.appendChild(li);
  });
};

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
}

setAllMenu();



const loadNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data))
};

const showNews = (data) => {
  console.log(data);
  const cardParent = document.getElementById("card-parent");
  cardParent.innerHTML = '';

  // display no news found
  const noNewsFound = document.getElementById('no-found-message');
  if(data.length === 0){
    noNewsFound.classList.remove('hidden');
  }
  else{
    noNewsFound.classList.add('hidden');
  }

  document.getElementById('news-count').innerHTML = data.length;
  

  data.forEach((news) => {
    console.log(news);
    const { thumbnail_url, total_view, author, name, details } = news;
    const cretcardDiv = document.createElement("div");
    cretcardDiv.classList.add("card");
    cretcardDiv.innerHTML = `
      <figure><img src=${thumbnail_url} alt="Album"></figure>
            <div class="card-body">
              <h2 class="card-title">New album is released!</h2>
              <p>${details.length > 700 ? details.slice(0, 700) + '...' : details}</p>
              <footer class="footer items-center p-4 bg-neutral text-neutral-content">
                <div class="items-center grid-flow-col">
                <div class="w-10 rounded-full">
                  <img src=${author.img} />
                </div>
                <h3>${author.name}</h3> 
                <p>${author.published_date}</p>
                <div>
                
                <h4><i class="far fa-eye ml-8"></i> ${total_view}</h4>
                </div>
            </div> 
            <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <label for="my-modal-3" 
                    onclick="showModal('${details.replace(/'/g, "\\'").replace(/>/g, "&gt;")}','${thumbnail_url}', '${author.name}')"  class="btn btn-primary modal-button">Show Detail</label>
              </div>
            </div>
           </footer>
        </div>
      `;

    cardParent.appendChild(cretcardDiv);
  });
  toggleSpinner(false);
};

const showModal = (details, thumbnail_url, name)=>{
    console.log(details, thumbnail_url)
    const modalBody = document.getElementById("modal-body");
    // modalBody.innerHTML = '';
    modalBody.innerHTML = `
    <h3 class="text-bold">${name}</h3>
    <img src="${thumbnail_url}"/>
    <p class="py-4">
    ${details}
    </p>
    `;
}


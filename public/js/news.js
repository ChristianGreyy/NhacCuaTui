const validationTheLengthOfNews = (() => {
    document.querySelectorAll('.music-content-left__news-items__right-content').forEach(item => {
        let value = item.innerText;
        value = value.slice(0, 210);
        item.innerText = value;
    })
})();

const fetchTheNews = (async () => {
    const response = await fetch('https://gw.vnexpress.net/ar/get_rule_1?category_id=1002737,1003522,1002717,1002719&limit=100000&page=1&data_select=article_id,article_type,title,share_url,thumbnail_url,publish_time,lead,privacy,original_cate,article_category&exclude_id=4425040,4421404,4424378,4422217,4422869,4422609,4422915,4422354,4422124,4421997,4421440,4421704,4420872,4420360,4418149,4420225,4419382,4419074,4419303,4418974,4418963,4418624,4418772,4418574,4418644,4417307,4418606,4418346,4418459,4418415&thumb_size=300x180&thumb_quality=100&thumb_dpr=1,2&thumb_fit=crop&exclude_id=${exclude}', {
        method: 'GET'
    })
    const data = await response.json();
    const news = data.data;
    const firstNews = news['1002717'].data.concat(news['1002719'].data).concat(news['1002737'].data).concat(news['1003522'].data);
    
    
    const url = window.location.href.split('/')[window.location.href.split('/').length - 1];
    let page = url.split('=')[url.split('=').length - 1];
    page = +page;
    // Solve pagination
    
    const solvePagination = (() => {
        const pageNum = Math.ceil(firstNews.length / 6);

        let the1, the2, the3, the4, the5, the6, the7 = 0;
        if(page <= 4) {
            the1 = 1, the2=2, the3=3, the4=4, the5=5, the6=6, the7=7;
        } else if(page >= pageNum - 3) {
            the1 = pageNum-6, the2=pageNum-5, the3=pageNum-4, the4=pageNum-3, the5=pageNum-2, the6=pageNum-1, the7=pageNum;
        } else {
            the1 = page - 3;
            the2 = page - 2;
            the3 = page - 1;
            the4 = page;
            the5 = page + 1;
            the6 = page + 2;
            the7 = page + 3;
        }

        const string = `
        <a href="/tin-tuc-am-nhac/?page=1" class="music-content-left__pagination-link">
            Trang đầu
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the1}" class="music-content-left__pagination-link">
            ${the1}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the2}" class="music-content-left__pagination-link">
            ${the2}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the3}" class="music-content-left__pagination-link">
            ${the3}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the4}" class="music-content-left__pagination-link">
            ${the4}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the5}" class="music-content-left__pagination-link">
            ${the5}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the6}" class="music-content-left__pagination-link">
            ${the6}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${the7}" class="music-content-left__pagination-link">
            ${the7}
        </a>
        <a href="/tin-tuc-am-nhac/?page=${pageNum}" class="music-content-left__pagination-link">
            Trang cuối
        </a>
        ` 

        document.querySelector('.music-content-left__pagination').innerHTML = string;
    })();


    let string = '';
    firstNews.forEach((news, i) => {
        if(6*page >=i && i >= 6*(page - 1)) {
            string += `
                <li class="music-content-left__news-items">
                    <div class="music-content-left__news-items__left">
                        <a href="${news.share_url}" class="music-content-left__news-items__left-link">
                            <img src="${news.thumbnail_url}" alt="" class="music-content-left__news-items__left-link-img">
                        </a>
                    </div>
                    <div class="music-content-left__news-items__right">
                        <a href="${news.share_url}" class="music-content-left__news-items__right-title">
                            ${news.title}
                        </a>
                        <div class="music-content-left__news-items__right-content">
                            ${news.lead}
                        </div>
                        <a href="${news.share_url}" class="music-content-left__news-items__right-link">
                            Xem thêm
                        </a>
                    </div>
                </li>
            `
        }
    })
    document.querySelector('.music-content-left__news').innerHTML = string;   
    
    const solveOnclickPagination = (() => {
        document.querySelectorAll('.music-content-left__pagination-link').forEach(item => {
            if(item.innerText == page) {
                item.classList.add('music-content-left__pagination-link--active')
            }
        })
    })();

    // console.log()[0].innerText)
    
})();


var books = function() {

}
books.prototype = {
    getBooks: function(url,info) {
        this.ajaxData(url, this.renderList,info);
        return this;
    },
    getMore: function(url) {
        this.ajaxData(url, this.renderList);
        return this;
    },
    getSingleBook: function(id) {
        var url = 'https://api.douban.com/v2/book/'+id;
        this.ajaxData(url, this.renderSingle);
        return this;
    },
    getImg: function(data) {
        // 假如有预加载图片的需求可以使用getImg
        var books = data.books;
        for (var i in books) {
           
        }
    },
    renderList: function(data,info) {
        var $booksContainer = $('<div class="book-container"><h2>'+info+'</h2><span class="book-container-getMore">更多>></span><ul></ul><ul></ul></div>')
        $booksContainer.appendTo($('body'));
        for (var i in data.books) {
            var $li = $('<li><a href="javascript:" targetBookId="'+data.books[i].id+'"><img src="' + data.books[i].images.large + '"></a><p>' + data.books[i].title + '</p><img src="./img/star4.5.png" alt="" class="book-container-star"><span class="book-container-score">' + data.books[i].rating.average + '</span></li>');

            $li.find('a').on('click',function(){
                var targetBookId=$(this).attr('targetBookId');
                $.cookie('targetBookId', targetBookId, { expires: 7, path: '/' });
                $(this).attr('href','./bookDetail.html');
            });

            if (i<4) {
                $booksContainer.find('ul').eq(0).append($li);
            }else{
                $booksContainer.find('ul').eq(1).append($li); 
            };
        }
        return this;
    },
    renderSingle: function(data) {
        var $bookDetailContainer=$('.bookDetail-container');
        var $content=$('<div class="content"><h2>'+data.title+'</h2><div class="detail-containe-score"><img src="./img/star4.5.png" /><span class="searchResult-list-score-text">'+data.rating.average+'</span><p>'+data.rating.numRaters+'<strong>人评价</strong></p></div><div class="sumarize"><p>'+data.summary+'</p></div><div class="author"><p>'+data.author_intro+'</p></div></div>');
        var $img=$('<img src="'+data.images.large+'" alt="'+data.title+'" class="cover">');
        $bookDetailContainer.append($content).append($img);
    },
    ajaxData: function(url, renderList,info) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            processData: false,
            type: 'get',
            success: function(data) {
                self.getImg(data);
                renderList(data,info);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    },
};

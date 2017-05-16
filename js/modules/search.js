var search = function() {
    this.Moviesdata = null;
    this.Booksdata = null;
}
search.prototype = {
    getSearch: function(query) {
        var bookUrl = 'https://api.douban.com/v2/book/search?q=' + query;
        var movieUrl = 'https://api.douban.com/v2/movie/search?q=' + query;

        this.ajaxData(bookUrl, this.renderBookList);
        this.ajaxData(movieUrl, this.renderMovieList);

        return this;
    },
    getSingle: function(query) {
        var url = '';
        this.ajaxData(url, this.renderSingle);
        return this;
    },
    getImg: function(data) {
        // 假如有预加载图片的需求可以使用getImg
        var search = data.search;
        for (var i in search) {
            
        }
    },
    renderBookList: function(data) {
        var self = this;

        var $bookList = $('<div class="searchResult-list-content books"><h2>图书</h2><ul></ul><p class="searchResult-list-more getMoreBooks">查看更多结果(<span>' + (data.books.length - 3) + '</span>)</p></div>');

        for (var i in data.books) {
            if (i < 3) {
                var $li = $('<li><a href="javascript:" targetBookId="' + data.books[i].id + '"><img src="' + data.books[i].images.large + '"><div class="searchResult-list-score"><p>' + data.books[i].title + '</p><img src="./img/star4.5.png" /><span class="searchResult-list-score-text">' + data.books[i].rating.average + '</span></div></a></li>');
                $li.appendTo($bookList.find('ul'));
            };
        }
        data.books.splice(1, 3);
        this.Booksdata = $.extend([], data.books);

        // 获取更多内容
        $bookList.find('.getMoreBooks').on('click', function() {
            for (var i = 0; i < self.Booksdata.length; i++) {
                var $li = $('<li><a href="javascript:" targetBookId="' + self.Booksdata[i].id + '"><img src="' + self.Booksdata[i].images.large + '"><div class="searchResult-list-score"><p>' + self.Booksdata[i].title + '</p><img src="./img/star4.5.png" /><span class="searchResult-list-score-text">' + self.Booksdata[i].rating.average + '</span></div></a></li>');
                $li.appendTo($bookList.find('ul'));
                $(this).find('span').html('0');
            };
            $bookList.find('a').on('click', function() {
                var targetBookId = $(this).attr('targetBookId');
                $.cookie('targetBookId', targetBookId, { expires: 7, path: '/' });
                $(this).attr('href', './bookDetail.html');
            });
        });

        $bookList.find('a').on('click', function() {
            var targetBookId = $(this).attr('targetBookId');
            $.cookie('targetBookId', targetBookId, { expires: 7, path: '/' });
            $(this).attr('href', './bookDetail.html');
        });

        $bookList.appendTo($('.searchResult-list'));

        return this;
    },
    renderMovieList: function(data) {
        var self = this;
        var $movieList = $('<div class="searchResult-list-content movies"><h2>影视</h2><ul></ul><p class="searchResult-list-more getMoreMovies">查看更多结果(<span>' + (data.subjects.length - 3) + '</span>)</p></div>');
        for (var i in data.subjects) {
            if (i < 3) {
                var $li = $('<li><a href="javascript:" targetmovieId="' + data.subjects[i].id + '"><img src="' + data.subjects[i].images.large + '"><div class="searchResult-list-score"><p>' + data.subjects[i].title + '</p><img src="./img/star4.5.png" /><span class="searchResult-list-score-text">' + data.subjects[i].rating.average + '</span></div></a></li>');
                $li.appendTo($movieList.find('ul'));
            };
        }

        data.subjects.splice(1, 3);
        this.Moviesdata = $.extend([], data.subjects);

        // 获取更多内容
        $movieList.find('.getMoreMovies').on('click', function() {
            for (var i = 0; i < self.Moviesdata.length; i++) {
                var $li = $('<li><a href="javascript:" targetmovieId="' + self.Moviesdata[i].id + '"><img src="' + self.Moviesdata[i].images.large + '"><div class="searchResult-list-score"><p>' + self.Moviesdata[i].title + '</p><img src="./img/star4.5.png" /><span class="searchResult-list-score-text">' + self.Moviesdata[i].rating.average + '</span></div></a></li>');
                $li.appendTo($movieList.find('ul'));
                $(this).find('span').html('0');
            };
            $movieList.find('a').on('click', function() {
                var targetmovieId = $(this).attr('targetmovieId');
                $.cookie('targetmovieId', targetmovieId, { expires: 7, path: '/' });
                $(this).attr('href', './movieDetail.html');
            });
        });

        $movieList.find('a').on('click', function() {
            var targetmovieId = $(this).attr('targetmovieId');
            $.cookie('targetmovieId', targetmovieId, { expires: 7, path: '/' });
            $(this).attr('href', './movieDetail.html');
        });

        $movieList.appendTo($('.searchResult-list'));

        return this;
    },
    renderSingle: function(data) {

    },
    ajaxData: function(url, renderList, para) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            processData: false,
            type: 'get',
            success: function(data) {
                self.getImg(data);
                renderList(data);
                $.extend(self.data, data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    },
};

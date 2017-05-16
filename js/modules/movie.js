var movies = function() {

}
movies.prototype = {
    getMovies: function(url, info) {
        this.ajaxData(url, this.renderList, info);
        return this;
    },
    getMore: function(url) {
        this.ajaxData(url, this.renderList);
        return this;
    },
    getSingleMovie: function(id) {
        var url = 'https://api.douban.com/v2/movie/subject/' + id;
        this.ajaxData(url, this.renderSingle);
        return this;
    },
    getImg: function(data) {
        // 假如有预加载图片的需求可以使用getImg
        var movie = data.movie;
        for (var i in movie) {
        }
    },
    renderList: function(data, info) {
        var $movieContainer = $('<div class="movie-container"><h2>' + info + '</h2><span class="movie-container-getMore">更多>></span><ul></ul><ul></ul></div>')
        $movieContainer.appendTo($('body'));
        for (var i in data.subjects) {
            var $li = $('<li><a href="javascript:" targetmovieId="' + data.subjects[i].id + '"><img src="' + data.subjects[i].images.large + '"></a><p>' + data.subjects[i].title + '</p><img src="./img/star4.5.png" alt="" class="movie-container-star"><span class="movie-container-score">' + data.subjects[i].rating.average + '</span></li>');

            $li.find('a').on('click', function() {
                var targetmovieId = $(this).attr('targetmovieId');
                $.cookie('targetmovieId', targetmovieId, { expires: 7, path: '/' });
                $(this).attr('href', './movieDetail.html');
            });

            if (i < 4) {
                $movieContainer.find('ul').eq(0).append($li);
            } else if(i<8) {
                $movieContainer.find('ul').eq(1).append($li);
            };
        }

        return this;
    },
    renderSingle: function(data) {
        var $movieDetailContainer = $('.movieDetail-container');
        var $content = $('<div class="content"><h2>' + data.title + '</h2><div class="detail-containe-score"><img src="./img/star4.5.png" /><span class="searchResult-list-score-text">' + data.rating.average + '</span><p>' + data.reviews_count + '<strong>人评价</strong></p></div><p>' + data.summary + '</p></div>');
        var $img = $('<img src="' + data.images.large + '" alt="' + data.title + '" class="cover">');
        $movieDetailContainer.append($content).append($img);
    },
    ajaxData: function(url, renderList, info) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            processData: false,
            type: 'get',
            success: function(data) {
                self.getImg(data);
                renderList(data, info);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    },
};

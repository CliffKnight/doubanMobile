var activities = function() {

}
activities.prototype = {
    getEvents: function() {
        var url = 'https://api.douban.com/v2/event/list?loc=108288&count=8';
        this.ajaxData(url, this.renderList);
        return this;
    },
    getMore: function() {
        var url = 'https://api.douban.com/v2/event/list?loc=108288&start=' +
            5 + '&count=5';
        this.ajaxData(url, this.renderList);
        return this;
    },
    getSingleEvent: function(id) {
        var url = 'https://api.douban.com/v2/event/' + id;
        this.ajaxData(url, this.renderSingle);
        return this;
    },
    getImg: function(data) {
        // 假如有预加载图片的需求可以使用getImg
        var events = data.events;
        for (var i in events) {

        }
    },
    renderList: function(data) {
        var $container = $('<div class="indexPage-list"><ul></ul></div>');
        $('.indexload-img').before($container);
        var oli = '';
        var events = data.events;
        var self = this;

        for (var i = 0; i < events.length; i++) {
            var $li = $('<li><a href="#" class="indexPage-list-link" idTarget=' + events[i].id + '><p class="title">' + events[i].title + '</p></a><p><span>展期：</span><span class="indexPage-list-time">' + events[i].time_str + '</span></p><p><i>地点：</i><strong>' + events[i].address + '</strong></p><p class="indexPage-list-class">展览</p><img src="" /></li>')
            $li.find('img').attr('src', events[i].image);

            $container.find('ul').append($li);
        };

        $('.indexPage-list').find('.indexPage-list-link').on('click', function() {
            var idTarget=$(this).attr('idTarget');     
            $.cookie('activitiesId', idTarget, { expires: 7, path: '/' });
            $(this).attr('href','./indexGetDetail.html');
        });


    },
    renderSingle: function(data) {
        var $indexGetDetail = $('<div class="indexGetDetail"></div');

        var $indexGetDetailHead = $('<div class="indexGetDetail-head"><h2>' + data.title + '</h2><img src="" alt=""></div>')
        $indexGetDetailHead.find('img').attr('src', data.image_hlarge);

        var $indexGetDetailDetail2 = $('<div class="indexGetDetail-detail"><div class="indexGetDetail-detail-data"><span>时间：</span><ul><li class="indexGetDetail-startTime">' + data.begin_time + '</li><li class="indexGetDetail-endTime">' + data.end_time + '</li></ul></div><div class="indexGetDetail-detail-data"><span>地点：</span>    <ul> <li>' + data.address + '</li></ul></div><div class="indexGetDetail-detail-data"> <span>门票：</span><ul><li>' + data.fee_str + '</li></ul></div><div class="indexGetDetail-detail-data"><span>类型：</span><ul><li>' + data.category_name + '</li></ul></div></div><h2 class="activities-details">活动详情</h2>');

        var $indexGetDetailContent = data.content;

        $indexGetDetail.append($indexGetDetailHead).append($indexGetDetailDetail2).append($indexGetDetailContent);;

        $indexGetDetail.appendTo($('body'));
    },
    ajaxData: function(url, renderList) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            processData: false,
            type: 'get',
            success: function(data) {
                self.getImg(data);
                renderList(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    },
    setCookies: function(cookieName, value, settings) {
        $.cookie(cookieName, value, settings);
    },
};

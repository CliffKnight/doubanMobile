各页面间通过cookie传递参数

<h2>首页index.html</h2>
<h3>activities类：</h3>
<ul>
	<li>方法:</li>
	<li>getEvents页面首次加载时调用ajaxData(),renderList(),获取8条数据显示在页面中</li>
	<li>ajaxData跨域从豆瓣公开的api获取近期活动数据</li>
	<li>renderList 将数据渲染到页面中，给项活动中的a标签添加自定义属性idTarge，其值为本项活动豆瓣给的id，绑定点击事件响应函数-点击时将改标签中的idTarge以变量名activitiesId存入cookie中</li>
	<li>getMore页面下拉加载更多内容，调用renderList()渲染到页面中</li>
	<li>getSingleEvent根据传入的url获取某一时间的具体信息，调用renderSingle()在indexDetail.html页中渲染</li>
</ul>

		
<h2>活动详情页indexDetail.html</h2>
<ul>
	<li>页面载入从cookie获取activitiesId值，构造对应的url，使用getSingleEvent()获取数据，渲染到页面。</li>
</ul>
	
<h2>电影页：movie.html</h2>
<h3>movie类方法:</h3>
<ul>
	<li>getMovies页面首次加载时调用ajaxData(),renderList(),获取8条数据显示在页面中</li>
	<li>ajaxData跨域从豆瓣公开的api获取近期电影数据</li>
	<li>renderList 将数据渲染到页面中，给项电影中的a标签添加自定义属性targetmovieId，其值为本项活动豆瓣给的id，绑定点击事件响应函数-点击时将改标签中的targetmovieId以变量名targetmovieId存入cookie中</li>
	<li>getMore页面下拉加载更多内容，调用renderList()渲染到页面中</li>
	<li>getSingleMovie根据传入的url获取某一时间的具体信息，调用renderSingle()在movieDetail.html页中渲染</li>
</ul>
<h2>活动详情页movieDetail.html</h2>
<ul>
	<li>页面载入从cookie获取targetmovieId值，构造对应的url，使用getSingleEvent()获取数据，渲染到页面。</li>
</ul>
<p>书籍页，搜索页中类books，search功能类似，不再详述</p>		
		







		
		

	

		
		






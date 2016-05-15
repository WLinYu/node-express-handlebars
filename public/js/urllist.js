$(document).ready(function(){
  var url = window.location.pathname;
  url = url.substring(1);

	$.getJSON("urllist", function(data){
        //var dataJSON = JSON.parse(data);
        //data = eval("("+data+")");
				var html="";
				/*$.each(data, function(index, entry){
            alert(entry);
						if(url == entry){
              if(index != 0){
                html += "<a htrf=/" + entry[index-1] + "上一页</a>";
                html += "<a htrf=/" + entry[index+1] + "下一页</a>";
              }else if(index == entry.length-1){
                html += "<a htrf=/" + entry[index-1] + "上一页</a>";
              }else {
                html += "<a htrf=/" + entry[index+1] + "下一页</a>";
              }
            }
					});*/
          for(var index = 0; index < data.length; index++){
            if(url == data[index]){
              if(index == 0){
                html += "<a href='" + data[index+1] + "'>下一篇</a>";
              }else if(index == data.length-1){
                html += "<a href='" + data[index-1] + "'>上一篇</a>";
              }else {
                html += "<a href='" + data[index+1] + "'>下一篇</a>";
                html += "<a href='" + data[index-1] + "'>上一篇</a>";
              }
            }
          }
					$("#page").append(html);
	});
});

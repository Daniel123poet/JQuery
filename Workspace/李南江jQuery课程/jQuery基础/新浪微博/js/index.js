$(function () {
    //1.监听内容的实时输入
    $('body').delegate('.comment', 'input propertychange', function () {
        //判断是否输入了内容
        if($(this).val().length > 0){
            //有内容按钮可用
            $('.send').prop('disabled', false);

        }else{
            //无内容按钮不可用
            $('.send').prop('disabled', true);
        }

    });

    $('.send').click(function () {
        //2. 拿到用户输入的内容，根据内容创建节点
        var $text = $('.comment').val();
        var $weibo = createEle($text);
        // 插入微博
        $('.messageList').prepend($weibo);

    });

    //创建节点方法
    function createEle (text) {
        var $weibo = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">"+text+"</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">"+ formatDate()+"</span>\n" +

            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javascript:;\" class=\"infoLike\">0</a>\n" +
            "                    <a href=\"javascript:;\" class=\"infoUnlike\">0</a>\n" +
            "                    <a href=\"javascript:;\" class=\"infoDelete\">删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");

        return $weibo;
    }

    //生成时间方法
    function formatDate () {
        var date = new Date();
        // console.log(date);

        var arr = [date.getFullYear() + '-',
            date.getMonth() + 1 + '-',
            date.getDate() + ' ',
            date.getHours()+ ':',
            date.getMinutes() + ':',
            date.getSeconds()]

        // console.log(arr.join(''));
        return arr.join('');

    }


    //监听顶点击
    $('body').delegate('.infoLike', 'click', function () {
        // alert('like');
       $(this).text(parseInt($(this).text()) +1);
    });

    //监听踩点击
    $('body').delegate('.infoUnlike', 'click', function () {
        // alert('unlike');
        $(this).text(parseInt($(this).text()) +1);
    });

    //监听删除点击(删除的是创建的这个节点， 也就是class=info 的div)
    $('body').delegate('.infoDelete', 'click', function () {
        // alert('delete');
        $(this).parents('.info').remove();
    });

});
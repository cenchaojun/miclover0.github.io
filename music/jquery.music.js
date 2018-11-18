function Music() {
    // ����setInterval�ı䲥�Ž���������
    this.clock;
    // ����setTimeout����������ʧ
    this.controlVolumeHide;
    //����������
    this.songName;
    // ����
    this.singer;
    // ������ͼƬ
    this.songPicture;
    // ��������Ƶ������Ϣ
    this.songSsid;
    this.songSid;
    //������飬��������װ���Ƕ���ÿһ�������.lyric���Դ��������ֲ��֣�ÿһ�������.time������һ�����飬��������ÿһ���Ǹ�ʳ��ֵ�ʱ�䣨��ʵ����������[20,180]����20���ʱ�򣬸ø�ʳ��֣�180���ʱ��ø��Ҳ����
    this.lyricArr = [];
    // ����ģʽ
    this.playModel;
    //���͸���ajaxʱ��״̬���������ڸ�������֮ǰ���û�һֱ�����ť����ֹajax���ٴη���
    this.isSongClose = false;
    //�ж��Ƿ���û��Ƶ�������������ajax�����Ƿ�����Ƶ�������������ajax
    // ����¼��Ƶ����id���Ӷ��жϲ����ĸ�Ƶ���ĸ���
    this.clickedChannel;
    //Ĭ������
    this.volumeValue = 10;
    // ��¼ԭ������ֵ��Ϊ�˵����������ٵ����ָ�ԭ��������
    this.muteVolumeValue = this.volumeValue;
    ////���͸��ajaxʱ��״̬��
    this.isLyricClose = false;
    
    this.appendCss();
    this.appendHtml();
    this.toggleShow($('#jquery-music .menu-btn'),$('#jquery-music .menu'),'click');
    this.toggleShow($('#jquery-music-player'),$('#jquery-music'),'click');
    this.toggleShow($('#jquery-music .song-lyrics'),$('#jquery-music-lyrics'),'click');
    this.toggleShow($('#jquery-music .play-model'),$('#jquery-music .play-model-show'),'click');
    this.dialog($('#jquery-music-player'));
    this.bind();
    this.ajaxChannels();
    this.audioAPIbind($('#jquery-music .play a'));
    //һ��ʼ���������һ�׸�������Ȼ�ܿ��ܺܶ��˸����Ͳ�֪����������ô��
    this.ajaxSongs();
}
Music.prototype = {
    appendCss : function () {
        $('head').append('<link rel="stylesheet"  href="css/music.css">');
        $('head').append('<link rel="stylesheet"  href="css/font-awesome.min.css">');
        $('head').prepend('<meta name="referrer" content="no-referrer">');
    },
    appendHtml:function () {
        var me = this ;
        var audio = new Audio();
        //��Ϊme.volumeValue=20����ζ��me.audio.volume=1
        audio.volume=0.5;
        me.audio = audio;
        $('body').append(me.audio);
        var tpl = '<div class="music-player" id="jquery-music-player">'+
            '<a href="#" title="��������ֲ�����">'+
            '<i class="fa fa-music"></i>'+
            '</a>'+
            '</div>'+
            '<div class="music" id="jquery-music">'+
            '<div class="menu">'+
            '<ul class="mucic-ct">'+
            '<li class="music-tab">'+
            '<ul class="music-popular-list">'+
            '</ul>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '<div id="header" class="clear">'+
            '<a href="#" class="menu-btn">'+
            '<i class="fa fa-list-ul"></i>'+
            '</a>'+
            '<a href="#" class="close-btn">'+
            '<i class="fa fa-close"></i>'+
            '</a>'+
            '</div>'+
            '<div id="main">'+
            '<div class="play">'+
            '<a href="#">'+
            '<i class="fa fa-play-circle-o"></i>'+
            '</a>'+
            '</div>'+
            '</div>'+
            '<div id="footer" class="clear">'+
            '<div class="song-message clear">'+
            '<div class="message"><span class="message-length"><span class="singer"></span><span class="fengefu"></span><span class="song-name"></span></span></div>'+
            '<div class="time"><span class="curtime">00:00</span><span>/</span><span class="song-time">00:00</span></div>'+
            '</div>'+
            '<div class="progressbar">'+
            '<div class="bar">'+
            '<div class="bar-circle"></div>'+
            '</div>'+
            '</div>'+
            '<div class="control clear">'+
            '<a href="#"  class="song-volume">'+
            '<div class="control-volume">'+
            '<div class="volume-progressbar">'+
            '<div class="volume-bar">'+
                '<div class="volume-bar-circle"></div>'+
            '</div>'+
            '</div>'+
            '<div class="triangle"></div>'+
            '</div>'+
            '<i class="fa fa-volume-up"></i>'+
            '</a>'+
            '<a href="#" class="next-song">'+
            '<i class="fa fa-forward"></i>'+
            '</a>'+
            '<a href="#" class="play-model">'+
            '<i class="fa fa-long-arrow-right"></i>'+
            '<div class="play-model-show">'+
            '<div class="triangle"></div>'+
            '<div class="single-play"><i class="fa fa-long-arrow-right"></i>&nbsp��������</div>'+
            '<div class="single-cycle"><i class="fa fa-retweet"></i>&nbsp����ѭ��</div>'+
            '<div class="random-play"><i class="fa fa-random"></i>&nbsp�������</div>'+
            '</div>'+
            '</a>'+
            '<a href="#" class="song-lyrics">��</a>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="music-lyrics" id="jquery-music-lyrics">'+
            '<div class="music-lyrics-close">'+
            '<i class="fa fa-close"></i>'+
            '</div>'+
            '<p></p>'+
            '</div>';
        $('body').append($(tpl));
    },
    //���ƶ����
    dialog:function ($node) {
        $node.on("mousedown",function (e) {
            var X = e.pageX - $node.offset().left;
            var Y = e.pageY - $node.offset().top;
            $node.addClass('cursor').data('inner',{x:X,y:Y});
        });
        $node.on("mouseup",function () {
            $node.removeClass('cursor').data('inner','');
        });
        $(document).on("mousemove",function (e) {
            if($node.data('inner')){
                $node.offset({
                    left : e.pageX-$node.data('inner').x,
                    top : e.pageY-$node.data('inner').y
                });
            }
        });
    },
    //�л�չʾ���
    toggleShow:function ($switch,$component,event) {
        var $sth = $switch;
        var $cpt = $component;
        var $event = event;
        $sth.data('isShow',false);
        $sth.on($event,function (e) {
            if(!$sth.data('isShow')){
                e.preventDefault();
                $cpt.show();
                $sth.data('isShow',true);
            }
            else{
                e.preventDefault();
                $cpt.hide();
                $sth.data('isShow',false);
            }
        })
    },
    bind:function () {
        var me = this;
        //show���ƶ�����
        $('#jquery-music-player').on('click',function (e) {
            e.preventDefault();
            me.dialog($('#jquery-music'));
        });
        $('#jquery-music-lyrics').on('click',function (e) {
            e.preventDefault();
            me.dialog($('#jquery-music-lyrics'));
        });
        //����ģʽ
        $('#jquery-music .random-play').on('click',function (e) {
            e.preventDefault();
            me.playModel = 'random-play';
            $('#jquery-music .play-model>i').attr('class','fa fa-random');
        });
        $('#jquery-music .single-cycle').on('click',function (e) {
            e.preventDefault();
            me.playModel = 'single-cycle';
            $('#jquery-music .play-model>i').attr('class','fa fa-retweet');
        });
        $('#jquery-music .single-play').on('click',function (e) {
            e.preventDefault();
            me.playModel = '';
            $('#jquery-music .play-model>i').attr('class','fa fa-long-arrow-right');
        });
        //�������ֲ�����
        $('#jquery-music .close-btn').on('click',function (e) {
            e.preventDefault();
            $('#jquery-music').hide();
            $('#jquery-music-player').data('isShow',false);
        });
        //�������ĳ���
        $('#jquery-music .song-volume').on('mouseenter',function (e) {
            e.preventDefault();
            $(this).css({
                cursor:'pointer'
            });
            clearTimeout(me.controlVolumeHide);
            $('#jquery-music .control-volume').show();
        });

        $('#jquery-music .song-volume').on('mouseleave',function (e) {
            e.preventDefault();
            me.controlVolumeHide = setTimeout(function () {
                $('#jquery-music .control-volume').hide();
            },2000);
        });
        //���ֿ���������
        document.getElementsByClassName('song-volume')[0].addEventListener('mousewheel',function (e) {
            //ֻҪ�����Ͱ�ͼ������
            if(me.audio.volume === 0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
            }
            if(me.audio.volume < 0.5 && me.audio.volume!==0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
            }
            if(me.audio.volume >= 0.5){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
            }
            me.volumeValue = me.volumeValue+e.wheelDelta/120;
            if(me.volumeValue<0){
                me.volumeValue =0;
            }
            if(me.volumeValue>20){
                me.volumeValue =20;
            }
            $('#jquery-music .volume-bar').height(me.volumeValue*4);
            me.audio.volume = me.volumeValue*0.05;
            me.muteVolumeValue = me.volumeValue;
        });
        //����������¼�
        $('#jquery-music .control-volume').on('click',function (e) {
            e.preventDefault();
            //��ֹ�¼���һ��ð��
            e.stopPropagation();
            // a������
            var a = $('#jquery-music .volume-progressbar').height()-(e.pageY - $('#jquery-music').offset().top-288);
            $('#jquery-music .volume-bar').height(a);
            //audio.volume��0��1֮��;
            var b = a*1/$('#jquery-music .volume-progressbar').height();  //��������
            me.audio.volume = b;
            //��Ϊme.volumeValue=20����ζ��me.audio.volume=1
            me.volumeValue = me.audio.volume*20/1;
            me.muteVolumeValue = me.volumeValue;
            if(me.audio.volume === 0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
            }
            if(me.audio.volume < 0.5 && me.audio.volume!==0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
            }
            if(me.audio.volume >= 0.5){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
            }
        });
        //��������ק�¼�
        $('#jquery-music .volume-bar-circle').on('mousedown',function (e) {
            //��ֹ�¼���һ��ð��
            e.preventDefault();
            e.stopPropagation();
            $('#jquery-music .volume-bar-circle').data('change',true);
        });
        $(document).on("mousemove",function (e) {
            if($('#jquery-music .volume-bar-circle').data("change")){
                $(this).css({
                    cursor:'pointer'
                });
                //��ק�ĳ���
                var a = $('#jquery-music .volume-progressbar').height()-(e.pageY - $('#jquery-music').offset().top-288);
                if(a<0){
                    a = 0;
                }
                if(a>$('#jquery-music .volume-progressbar').height()){
                    a = $('#jquery-music .volume-progressbar').height();
                }
                $('#jquery-music .volume-bar').height(a);
                //audio.volume��0��1֮��;
                var b = a*1/$('#jquery-music .volume-progressbar').height();  //��������
                me.audio.volume = b;
                //��Ϊme.volumeValue=20����ζ��me.audio.volume=1
                me.volumeValue = me.audio.volume*20/1;
                me.muteVolumeValue = me.volumeValue;
                if(me.audio.volume === 0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
                }
                if(me.audio.volume < 0.5 && me.audio.volume!==0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
                }
                if(me.audio.volume >= 0.5){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
                }
            }
        });
        $('#jquery-music .volume-bar-circle').on('mouseup',function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('#jquery-music .volume-bar-circle').data('change',false);
        });
        //����
        $('#jquery-music .song-volume').on('click',function (e) {
            e.preventDefault();
            //�����������ٵ����ָ�ԭ��������
            if(!$('.song-volume').data('mute')){
                me.audio.volume = 0;
                me.volumeValue = 0;
                $('#jquery-music .volume-bar').height(0);
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
                $('#jquery-music .song-volume').data('mute',true);
            }
            else{
                me.audio.volume = me.muteVolumeValue*0.05;
                me.volumeValue = me.muteVolumeValue;
                $('#jquery-music .volume-bar').height(me.volumeValue*4);
                if(me.audio.volume === 0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
                }
                if(me.audio.volume < 0.5 && me.audio.volume!==0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
                }
                if(me.audio.volume >= 0.5){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
                }
                $('#jquery-music .song-volume').data('mute',false);
            }
        });
        //�رո�����
        $('#jquery-music-lyrics .music-lyrics-close').on('click',function (e) {
            e.preventDefault();
            $('#jquery-music-lyrics').hide();
            $('#jquery-music .song-lyrics').data('isShow',false);

        });
        //��һ�׸����¼�
        $('#jquery-music .next-song').on('click',function (e) {
            e.preventDefault();
            me.audio.pause(); //����ͣ����бȽϺ�
            if (me.isSongClose) {
                return;
            }
            me.isSongClose = true;
            if(me.clickedChannel){
                me.ajaxChannelsSongs();
            }
            else{
                me.ajaxSongs();
            }
        });
        //����������¼�
        $('#jquery-music .progressbar').on('click',function (e) {
            e.stopPropagation();
            //û�и�����ʱ������������û�и��������Ǹ����ݶ�ѽ
            if(!me.audio.src){
                return
            }
            clearInterval(me.clock);
            // a����������ĳ���
            var a = (e.pageX - $('#jquery-music').offset().left)-10;
            $('.bar').width(a);
            var b = a*me.audio.duration/$('#jquery-music .progressbar').width();  //������
            me.audio.currentTime = b;
            me.changeStyle();
        });
        //��������ק�¼�
        $('#jquery-music .bar-circle').on('mousedown',function (e) {
            //��ֹ�¼���һ��ð��
            e.stopPropagation();
            clearInterval(me.clock);
            $('#jquery-music .bar-circle').data('change',true);
        });
        $(document).on("mousemove",function (e) {
            if($('#jquery-music .bar-circle').data("change")){
                var a = (e.pageX - $('#jquery-music').offset().left)-10;
                if(a<0){
                    a = 0;
                }
                if(a>$('#jquery-music .progressbar').width()){
                    a = $('#jquery-music .progressbar').width();
                }
                $('.bar').width(a);
                // ����me.time��Ŀ���Ƿſ���꣨��������mouseup�¼��󣩲Ż�ı䲥�ŵĽ���
                me.time = a*me.audio.duration/$('#jquery-music .progressbar').width();  //������
            }
        });
        $('#jquery-music .bar-circle').on('mouseup',function (e) {
            e.preventDefault();
            e.stopPropagation();
            me.audio.currentTime = me.time;
            me.changeStyle();
            $('#jquery-music .bar-circle').data('change',false);
        });
        // �����Ŀ�ʼ����ͣ
        $('#jquery-music .play a').on('click',function (e) {
            e.preventDefault();
            if(!$('#jquery-music .play a').data('isShow')){
                //�ж���û�и�����û�и����Ļ��ͷ���ajax�����һ��
                if(!me.audio.src){
                    if (me.isSongClose) {
                        return;
                    }
                    me.isSongClose = true;
                    me.ajaxSongs();
                }
                else{
                    me.audio.play();
                    me.changeStyle();
                    // ������������Ĳ��ã�Ӧ����isPlay�Ŷ�
                    $('#jquery-music .play a').data('isShow',true);
                }
            }
            else{
                me.audio.pause();
                $('#jquery-music .play a').data('isShow',false);
            }
        });
        //���Ƶ����ȡƵ������
        $('#jquery-music .music-popular-list').on('click','li',function () {
            // ÿһ��Ƶ����liԪ�ص�data���Զ��Ƕ�Ӧ��channel_id��Ƶ����id��
            me.clickedChannel = $(this).attr('data');
            $('#jquery-music .music-popular-list li').removeClass('active');
            $(this).addClass('active');
            me.audio.pause();
            if (me.isSongClose) {
                return;
            }
            me.isSongClose = true;
            me.ajaxChannelsSongs();
        });
    },
    //����setInterval�ı䲥�Ž���������
    changeStyle:function () {
        var me = this;
        me.clock = setInterval(function () {
            $('#jquery-music .bar').css({
                width:me.audio.currentTime*$('#jquery-music .progressbar').width()/me.audio.duration
            });
        },0.001);
    },
    //ajax��ȡ����Ƶ����Ϣ����������Ƶ��
    ajaxChannels:function () {
        var isClose=false;
        if (isClose) {
            return;
        }
        isClose = true;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            type: 'get',
            dataType: 'json',
            data: {

            },
            success: function (data) {
                var tpl = '';
                for(var i=0;i<data.channels.length;i++){
                    tpl += '<li class="music-type" data='+data.channels[i].channel_id+'>';
                    tpl += data.channels[i].name;
                    tpl += '</li>'
                }
                $('#jquery-music .music-popular-list').append($(tpl));
                isClose = false;
            },
            error: function () {
                console.log('get error channels data');
                isClose = false;
            }
        });
    },
    //��ȡ�������
    ajaxSongs:function () {
        var me = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            type: 'get',
            dataType: 'json',
            data: {
            },
            success: function (data) {
                if (data.r === 0) {
                    me.audio.src = data.song[0].url;
                    me.songName = data.song[0].title;
                    me.singer = data.song[0].artist;
                    me.songPicture = data.song[0].picture;
                    me.songSsid = data.song[0].ssid;
                    me.songSid =data.song[0].sid;
                    me.audio.play();
                    me.changeStyle();
                    // ������������Ĳ��ã�Ӧ����isPlay�Ŷ�
                    $('#jquery-music .play a').data('isShow',true);
                    me.isSongClose = false;
                }
            },
            error: function () {
                console.log('get error songs data');
                me.isSongClose = false;
            }
        });
    },
    //��ȡ���
    ajaxLyric:function (songssid,songsid) {
        var me = this;
        var ssid = songssid;
        var sid = songsid;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getLyric.php',
            type: 'post',
            dataType: 'json',
            data: {
                ssid: ssid,
                sid:sid
            },
            success: function (data) {
                console.log(data);
                var re = /\n/;//���з�
                var songArr = data.lyric.split(re);//"" "[ar:A-Lin������]" "[ti:�Һ�æ]" "[04:01.42]����ֻ�����Լ�" "[04:01.42][02:03.42]����ֻ�����Լ�"
                console.log(songArr);
                for(var i=0;i<songArr.length;i++){
                    //����lyricArr����
                    var re = /[\d{2}:\d{2}.\d{2}]+/g;
                    var re2 = /[\[\]]/g;
                    if(re.test(songArr[i])){ //songArr[i]����"[04:01.42][02:03.42]����ֻ�����Լ�"
                        var lyricObj = {};
                        lyricObj.time = [];
                        var lyricTimeArr = songArr[i].match(re); //["04:01.42"] ["04:01.42", "02:03.42"]
                        var realLyric = songArr[i].replace(re,'').replace(re2,''); //'����ֻ�����Լ�'


                        var songTime; //songTime����ʵ������
                        for(var j=0;j<lyricTimeArr.length;j++){
                            var stringTime = lyricTimeArr[j].replace('[','');//"03:07.35"
                            var timeArr = stringTime.split(':'); //["03", "07.35"]
                            songTime = parseInt(timeArr[0])*60 + parseFloat(timeArr[1]); //187.35��
                            lyricObj.time.push(songTime);
                        }

                        lyricObj.lyric = realLyric;
                        me.lyricArr.push(lyricObj);
                    }
                }
                console.log(me.lyricArr);
                me.isLyricClose = false;
            },
            error: function () {
                console.log('get error Lyric data');
                me.isLyricClose = false;
            }
        });
    },
    audioAPIbind :function ($switch) {
        var me = this ;
        var $sth = $switch;
        $('#jquery-music .play a').data('isShow',false);
        me.audio.addEventListener('play',function () {
            $('#jquery-music .bar-circle').show();
            $sth.find('i').removeClass('fa-play-circle-o');
            $sth.find('i').addClass('fa-pause-circle-o');
            $('#jquery-music .singer').text(me.singer);
            $('#jquery-music .fengefu').text('-');
            $('#jquery-music .song-name').text(me.songName);
            $('#jquery-music .play').css({
                background: "url("+me.songPicture+")",
                backgroundSize: 'cover'
            });
            //�жϸ�����Ϣ�ǲ���̫����Ҫ��̫���͹���
            if($('#jquery-music .message-length').width() > $('#jquery-music .message').width()){
                if(!$('#jquery-music .message').data('isFirstTooLong')){  //Ϊ�˱����������׸����̫��������
                    $('#jquery-music .message').addClass('marquee');
                    $('#jquery-music .marquee').marquee();
                    $('#jquery-music .message').data('isFirstTooLong',true);
                }
            }
            //������һ�׸����Ϣ̫����������һ�׸�Ҳ����
            else {
                $('#jquery-music .message').removeClass('marquee');
                $('#jquery-music .message').data('isFirstTooLong',false);
                $('#jquery-music .message').html('<span class="message-length"><span class="singer">'+me.singer+'</span><span class="fengefu">-</span><span class="song-name">'+me.songName+'</span></span>');
            }
            //�����������ʱ�򴴽��������lyricArr
            me.lyricArr = [];
            if (me.isLyricClose) {
                return;
            }
            me.isLyricClose = true;
            me.ajaxLyric(me.songSsid,me.songSid);
        });
        me.audio.addEventListener('timeupdate',function () {
            //�������ŵĵ�ǰʱ��
            var  realcurtimeMinutes;
            var  realcurtimeSeconds;
            var curtimeMinutes = parseInt(Math.floor(me.audio.currentTime)/60);
            var curtimeSeconds = Math.floor(me.audio.currentTime)%60;
            if(curtimeMinutes <= 9){
                realcurtimeMinutes ='0' + curtimeMinutes;
            }
            else{
                realcurtimeMinutes =curtimeMinutes;
            }
            if(curtimeSeconds <= 9){
                realcurtimeSeconds ='0' + curtimeSeconds;
            }
            else{
                realcurtimeSeconds =curtimeSeconds;
            }
            //���׸��ʱ��
            var  realsongMinutes;
            var  realsongSeconds;
            var songMinutes = parseInt(Math.floor(me.audio.duration)/60);
            var songSeconds = Math.floor(me.audio.duration)%60;
            if(songMinutes <= 9){
                realsongMinutes ='0' + songMinutes;
            }
            else{
                realsongMinutes =songMinutes;
            }

            if(songSeconds <= 9){
                realsongSeconds ='0' + songSeconds;
            }
            else{
                realsongSeconds =songSeconds;
            }

            //��������ʱ���NaN  NaN��Ȼ���ܵ���NaN����NaN�Ǽ�ֵ����ֻҪ�ų�0�ͺ���
            if(!realsongMinutes && realsongMinutes!==0 && !realsongSeconds && realsongSeconds!==0){
                $('#jquery-music .song-time').text('00'+':'+'00');
            }
            else{
                $('#jquery-music .song-time').text(realsongMinutes+':'+realsongSeconds);
            }
            $('#jquery-music .curtime').text(realcurtimeMinutes+':'+realcurtimeSeconds);

            //�ı���ʾ���;
            if(Math.floor(me.audio.currentTime)===0){ //��ʼ����ǰ�����ʾ�����ֺ͸�����
                $('#jquery-music-lyrics p').text(me.singer+'-'+me.songName);
            }
            for(var i=0;i<me.lyricArr.length;i++){ //�������������ÿ�����󣨼�ÿ���ʣ�
                for(var j=0;j<me.lyricArr[i].time.length;j++){ //����ÿ�����и�ʳ���ʱ������
                    if(Math.floor(me.audio.currentTime)===Math.round(me.lyricArr[i].time[j])){
                        $('#jquery-music-lyrics p').text(me.lyricArr[i].lyric);
                    }
                }
            }
        });
        me.audio.addEventListener('pause',function () {
            $('#jquery-music .bar').stop();
            clearInterval(me.clock);
            $sth.find('i').removeClass('fa-pause-circle-o');
            $sth.find('i').addClass('fa-play-circle-o');
        });
        me.audio.addEventListener('ended',function () {
            clearInterval(me.clock);
            $('#jquery-music .bar-circle').hide();
            $sth.find('i').removeClass('fa-pause-circle-o');
            $sth.find('i').addClass('fa-play-circle-o');
            $sth.data('isShow',false);
            if(me.playModel === 'random-play'){
                if (me.isSongClose) {
                    return;
                }
                me.isSongClose = true;
                if(me.clickedChannel){
                    me.ajaxChannelsSongs();
                }
                else{
                    me.ajaxSongs();
                }
            }
            if(me.playModel === 'single-cycle'){
                me.audio.play();
                me.changeStyle();
                // ����������ò��ã�Ӧ����isPlay�Ŷ�
                $sth.data('isShow',true);
            }
        });
    },
    //��ȡƵ������
    ajaxChannelsSongs:function () {
        var me = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            type: 'get',
            dataType: 'json',
            data: {
                channel: me.clickedChannel
            },
            success: function (data) {
                if (data.r === 0) {
                    me.audio.src = data.song[0].url;
                    me.songName = data.song[0].title;
                    me.singer = data.song[0].artist;
                    me.songPicture = data.song[0].picture;
                    me.songSsid = data.song[0].ssid;
                    me.songSid =data.song[0].sid;
                    me.audio.play();
                    me.changeStyle();
                    $('#jquery-music .play a').data('isShow',true);
                    me.isSongClose = false;
                }
            },
            error: function () {
                console.log('get error data');
                me.isSongClose = false;
            }
        });
    }
};
new Music();
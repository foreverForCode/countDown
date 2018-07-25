// 倒计时插件
/**
 * 倒计时插件
 * author：李想
 * 实现功能倒计时
 * eg：
 *  countDown({endTime:"2018-07-28 11:15:00",startTime:"2018-07-28 11:12:31"})
 * 
 * */ 
;(function(win,$){

    function CountDown(opts){

        var defaultOpts = {
            startTime:'',
            endTime:'',
            cell:'',
            moveCallback:null,
            endCallback:null,
        };
        this.currentOpts = $.extend(defaultOpts,opts);
        this.diff = 0;
        this.timer = null;
        if(!this.currentOpts.startTime || !this.currentOpts.endTime){
            console.log('开始时间和结束时间都不能少');
            return;
        };
        this.getDateFormat();
        this.init();

    }
    CountDown.prototype = {
        
        parseDateTool:function(strDate){
            return new Date(Date.parse(strDate.replace(/-/g,"/"))) 
        },
        getDateFormat:function(){
            var that = this;
            that.currentOpts.startTime = that.parseDateTool(that.currentOpts.startTime);
            that.currentOpts.endTime = that.parseDateTool(that.currentOpts.endTime);
            that.diff = that.currentOpts.endTime.getTime() - that.currentOpts.startTime.getTime();
        },
        convientTool:function(val,type){
            switch(type){

                case 'D':
                    return Math.floor(val / (1000 * 60 * 60 * 24));
                    break;
                case 'H':
                    return Math.floor(val / (1000 * 60 * 60)) % 24;
                    break;
                case 'M':
                    return Math.floor(val / (1000 * 60)) % 60;
                    break;
                case 'S':
                    return Math.floor(val / 1000) % 60;
                    break;
                case 'MS':
                    return Math.floor(val / 100) % 10;
                    break;
                default:
                    return;
            }
        },
        checkTime:function(i){
            if(i < 10){
                return "0"+i;
            }else{
                return i
            }
        },
        init:function(){
            var that = this;
            that.timer = setInterval(function(){
                var me = that;
                if(me.diff >= 0){
                    var days = me.checkTime(me.convientTool(me.diff,'D'));
                    var hours = me.checkTime(me.convientTool(me.diff,'H'));
                    var mins = me.checkTime(me.convientTool(me.diff,'M'));
                    var miaos = me.checkTime(me.convientTool(me.diff,'S'));
                    var haomiaos = me.checkTime(me.convientTool(me.diff,'MS'))

                    me.currentOpts.moveCallback&&me.currentOpts.moveCallback(days,hours,mins,miaos);
                                   
                }else{
                    clearInterval(me.timer);
                    me.currentOpts.endCallback&&me.currentOpts.endCallback()
                };
                me.diff = me.diff - 1000;
            },1000)
        }
    }
    function countDown(opts){
        return new CountDown(opts);
    }
    window.countDown = countDown;
})(window,$)
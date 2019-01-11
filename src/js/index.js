import css from '../css/style.css'
// import $ from 'zepto'
// import $ from 'n-zepto'
// import common from './js/common.js'
// import $ from './js/zepto.min.js'

const basicUrl = 'http://test.myerong.com:5080/inner/';
(function () {
    $('.loading_level').css('display', 'block');
    $.ajax({
        type: 'get',
        headers: {
            Authorization: "Basic ZXJvbmdfMTAwMDUwMDE6YjcxNDczNmFlZTJhNDY3MWJlNWM2YzllYTI3ZDJlYmI="
        },
        url: basicUrl + "auth/oauth/token?grant_type=client_credentials",
        dataType: 'JSON',

        success: function (msg) {
            $('.loading_level').css('display', 'none');
            msg = JSON.parse(msg);
            token = "bearer " + msg.access_token;
            sessionStorage.token = token;
        },
        error: function (msg) {
            $('.loading_level').css('display', 'none');
            console.log(msg);
        }
    });
})();

function _getCurDate() {
    var myDate = new Date();
    return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
}

$('.downloadBtn').on('click', function () {
    // $('.cover_level').css('display', 'block');
    // $('.outside_box').css('display', 'block');
    // $('.swiper_box').css('display', 'block');
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            $('.cover_level').css('display', 'block');
            $('.outside_box').css('display', 'block');
            $('.swiper_box').css('display', 'block');
        } else {
            var params = {};
            params.sysType = 'ANDROID';
            params.appType = '1004';
            params.updateDate = _getCurDate();
            $.ajax({
                type: 'POST',
                url: basicUrl + "erong-cfss-phss/appSummary/addclicksummary",
                data: JSON.stringify(params),
                contentType: "application/json;charset=UTF-8",
                headers: {
                    Authorization: sessionStorage.token
                },
                success: function (res) {
                    console.log(res);
                },
                error: function (err) {
                    console.log(err);
                }
            })
            $('.downloadBtn a').attr('href', 'https://119.23.160.205/chedaiApp/yrph.apk');
            // https://www.myerong.com/chedaiApp/yrph.apk";
        }
    }
    if (isIOS) {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            $('.cover_level').css('display', 'block');
            $('.outside_box').css('display', 'block');
            $('.swiper_box').css('display', 'block');
        } else {
            var params = {};
            params.sysType = 'IOS';
            params.appType = '1004';
            params.updateDate = _getCurDate();
            $.ajax({
                type: 'POST',
                url: basicUrl + "erong-cfss-phss/appSummary/addclicksummary",
                data: JSON.stringify(params),
                headers: {
                    Authorization: sessionStorage.token
                },
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    console.log(res);
                },
                error: function (err) {
                    console.log(err);
                }
            })
            // itms-services://?action=download-manifest&url=https://www.myerong.com/chedaiApp/erpy.plist";
            $('.downloadBtn a').attr('href', 'itms-services://?action=download-manifest&url=https://119.23.160.205/chedaiApp/erpy.plist');
        }
    }
})
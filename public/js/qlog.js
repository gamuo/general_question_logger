/**********
* qlog.js
***********

/*******************
* Global variables
*******************/
var log_row_number = 0;

/****************************
*function: logに出力
*parametor: insert_element
*return: None
*note:
****************************/
function insert_log(insert_element)
    {
        var log = document.getElementById('log');
        log.append(insert_element);
    }

/*******************************************
*function: server_messageを一時的に変更する
*parametor: None
*return: None
*note:
*******************************************/
function update_server_message() 
    {

        var span = document.getElementById('server_message_text');
        
        var request_text = 'server request...';
        var wait_text = 'waiting for data...';
        
        // 一時的にメッセージを変更        
        span.innerText = request_text;
        // 元に戻すためのメッセージを変更
        setTimeout(function() {span.innerText = wait_text}, 10000);
    }

/**************************************
*function: 外部のjavascriptを読み込む
*parametor: None
*return: None
*note:
***************************************/
function load_javascript()
    {
        update_server_message();

        var script     = document.createElement('script');
        script.charset = 'utf-8';
        script.src     = 'http://www.geocities.jp/nice_popcorn/log.js';

        document.body.appendChild(script);
    }


/************************************
*function: (10 x N+1)秒後を取得する
*parametor: Number
*return: TimeString
*note: １０秒づつに処理するため
************************************/
function calc_after_seconds(n)
    {
        var date = new Date();
        date.setSeconds(date.getSeconds() + (10 * (n+1)));

        var hours = ("0"+date.getHours()).slice(-2);
        var minutes = ("0"+date.getMinutes()).slice(-2);

        return '(' + hours + ':' + minutes + ')';
    }

/********************************************************
*function: 次にサーバリクエストするための時間を計算する
*parametor: Number
*return: TimeString
*note: 
********************************************************/
function calc_load_time() 
    {
        var date = new Date;
        var current_seconds = ("0"+date.getSeconds()).slice(-2)+"000";

        return 66000 - current_seconds;
}

/*******************************
*function: jsonをlogに追加する
*parametor: json
*return: TimeString
*note: 
*******************************/
function insert_json(json)
    {
        for(var i = 0; i < json.length; i++)
            {
                // 行数を追加
                log_row_number += 1;

                // logに追加するデータ
                var row_number     = log_row_number,
                    question_title = json[i]['title'],
                    question_url   = json[i]['url'],
                    time_stump     = calc_after_seconds(i);

                var div    = document.createElement('div'),
                    href_1 = document.createElement('a'),
                    span_1 = document.createElement('span'),
                    span_2 = document.createElement('span');

                href_1.className = 'question_href';
                span_1.className = 'log_row_number';
                span_2.className = 'time_stump';

                href_1.innerText = question_title;
                href_1.href      = question_url;
                href_1.target    = '_blank';
                span_1.innerText = row_number;
                span_2.innerText = time_stump;

                div.append(span_1);
                div.append(href_1);
                div.append(span_2);

                // 10秒毎にlogに追加する
                // setTimeoutはクロージャーで変数を保持しながらセットしていく
                (function(insert_element,for_timeout)
                    {
                        if (for_timeout == 4) 
                            {
                                setTimeout(function()
                                     {
                                          insert_log(insert_element);
                                          setTimeout("load_javascript()",
                                              calc_load_time());
                                     },
                                     10000*(for_timeout+1));
                            }
                        else
                            {
                                setTimeout(function()
                                    {
                                        insert_log(insert_element);
                                    },
                                    10000*(for_timeout+1));
                            }
                    }
                )(div,i);
            }
    }
    
/****************************************
*function: load_javascript()からのcallback
*parametor: json
*return: None
*note:
*****************************************/
function callback(json)
    {
        insert_json(json);
    }

/***********
*Execution
************/

load_javascript();

var row_number = 0;

/**********************
* func: ログに出力
* pram: insert_element
* return: None
* supple:
**********************/
function insert_log(insert_element)
	{
		var log = document.getElementById('log');
		log.append(insert_element);
	}

/***********************
* func: jsonを取得する
* pram: None
* return: None
* supple:
***********************/
function load_json()
	{

		var message_text = document.getElementById('message_text');
		message_text.innerText = 'server request...'
		setTimeout(function() {message_text.innerText = 'waiting for data...'}, 10000)

		var script     = document.createElement('script');
		script.charset = 'utf-8';
		script.src     = 'http://www.geocities.jp/nice_popcorn/log.js';

		document.body.appendChild(script);
	}


/*********************
* func: N秒後の時刻を返す
* pram: loopNumber
* return: TimeString
* supple: コールバックで１０秒後づつに処理するため
*********************/
function after_seconds(n) 
	{
		var plus_seconds = (n+1) * 10

		var date = new Date();
		date.setSeconds(date.getSeconds() + plus_seconds);

		var hours = ("0"+date.getHours()).slice(-2);
		var minutes = ("0"+date.getMinutes()).slice(-2);

		return '(' + hours + ':' + minutes + ')';
	}

/*********************
* func: コールバック
* pram: json
* return: None
* supple:
*********************/
function callback(json)
	{
		// jsonをlogに追加する
	    for(var i = 0; i < json.length; i++)
			{
				row_number += 1;

                // logに追加するデータ
				var row            = row_number,
				    question_title = json[i]['title'],
					question_url   = json[i]['url'],
				    time_stump       = after_seconds(i);

				// HTMLに追加するエレメント
				var div    = document.createElement('div'),
				    href_1 = document.createElement('a'),
				    span_1 = document.createElement('span');
				    span_2 = document.createElement('span');

				href_1.className = 'question_href';
				span_1.className = 'row_number';
				span_2.className = 'time_stump';

				href_1.innerText = question_title;
				href_1.href      = question_url;
				span_1.innerText = row;
				span_2.innerText = time_stump;

				div.append(span_1);
				div.append(href_1);
				div.append(span_2);

				(function(elem,for_timeout)
					{
						if (for_timeout == 4) 
							{
						    	setTimeout(function(){insert_log(elem);
													  console.log(new Date);
													  var date = new Date;
										          	  var current_seconds = ("0"+date.getSeconds()).slice(-2) + "000";
													  console.log(current_seconds);
												      var load_seconds = 66000 - current_seconds;
													  console.log(load_seconds);
												      setTimeout("load_json()", load_seconds);
													 },
										    10000*(for_timeout+1));
							}
						else
							{
						    	setTimeout(function(){insert_log(elem)},
										    10000*(for_timeout+1));
							}
                	}
			    )(div,i);
			}
	}

//load_json();
var date = new Date;
var current_seconds = ("0"+date.getSeconds()).slice(-2) + "000";
var load_seconds = 60000 - current_seconds;
console.log(load_seconds);

setTimeout("load_json()", load_seconds);

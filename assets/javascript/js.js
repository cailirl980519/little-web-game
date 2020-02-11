function getRandomArrayElements(arr, count) {
	var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}

function resize(){
	console.log(window.screen.height);
	$('body').css('height', window.screen.height);
}

window.onload = function(){
	resize();
	var count = 0;
	var score = 0;
	var problem = [
		{Q:'何者不是社交工程的攻擊手法?', A0:'利用電子郵件誘騙使用者開啟檔案、圖片，以植入惡意程式、暗中收集機敏性資料。', A1:'利用電子郵件誘騙使用者登入偽裝之網站以騙取帳號及通行碼，如網路釣魚。', A2:'監聽網路封包，攔截資料。', ANS:2},
		{Q:'使用個人電腦應注意事項為何?', A0:'使用外來檔案，應先掃毒。', A1:'自行關閉系統自動更新程式。', A2:'瀏覽器安全等級應設定為低。', ANS:0},
		{Q:'何者為政府機關加強網站資訊安全防護的方法 ?', A0:'資訊單位定期進行弱點掃瞄。', A1:'提升系統管理人員資訊安全管理能力。', A2:'以上皆是', ANS:2}
	];
	var order = getRandomArrayElements(problem, 3)
	var container = new Vue({
		el: '#container',
		data: {
			question: order[count].Q,
			answers: order[count].ANS,
			score: score,
			arrayData:[
				{id: '0', img_src: 'image/jellyfish.png', text: order[count].A0},
				{id: '1', img_src: 'image/jellyfish_pink.png', text: order[count].A1},						
				{id: '2', img_src: 'image/ocean.png', text: order[count].A2, style: 'height:60%;width:auto;'}
			]
		},
		methods: {
			show: function(e){
				// console.log(e);
				var tmp = e.currentTarget.id.split('fish')[1]
				if(tmp==container.answers){
					$('#score_con').addClass('animated bounce');
					$('#correct').css('visibility','visible');
					console.log('true')
					score++;
					container.score = score;
					setTimeout(function(){
						$('#score_con').removeClass('animated bounce');
						$('#correct').css('visibility','hidden');
						$('.tip').css('visibility','hidden');
						next();
					},5000);
				}else{
					console.log(false)
					$('.ans').css('visibility','visible');
					$('.tip').css('visibility','visible');
					setTimeout(function(){	
						$('.ans').css('visibility','hidden');
						$('.tip').css('visibility','hidden');
						next();
					},5000);
				}
			}
		}
	});
	$('.fish').hover(function(){
		$(this).prev().css('visibility','visible');
	},function(){
		$(this).prev().css('visibility','hidden');
	});
	function next(){
		count++;
		if(count<3){
			$('#question_con').addClass('animated bounceInDown');
			now = order[count];
			container.question = now.Q;
			container.answers = now.ANS;
			container.arrayData[0].text = now.A0;
			container.arrayData[1].text = now.A1;
			container.arrayData[2].text = now.A2;
			setTimeout(function(){
				$('#question_con').removeClass('animated bounceInDown');
			},1000)
		}else{
			$('#game').load('finish.html #container',function(){
				console.log($(this).find('#sum'));
				$(this).find('#sum').text('共答對'+score+'題!');
			});
		}
	}
}
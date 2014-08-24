

$(function() {
	var articles = $('section');
	var navs = undefined;
	var imgDialog = undefined;
	
	var currentNo = 0;
	
	var App = {
		INITIAL_NO : 0,
		init : function() {
			this.initialize();
			this.bindEvents();
			Utils.changePage(this.INITIAL_NO);
		},
		// Initialize ////////////////////////////////////////////////
		initialize : function() {
			this.createNavigationLink();
			this.createButtons();
			this.adjustNavAlign();
			this.createImgDialog();
		},
		createNavigationLink : function() {
			var cnt = 1;
			var df = document.createDocumentFragment();
			articles.each(function() {
				var title = $(this).find('h2.h2_title').html();
				var hoge = $('<nav><h4 class=\"h4_title\"><a href=\"#' + cnt + '\">' + title + '</a></h4></nav>');
				df.appendChild(hoge[0]);
				cnt++;
			});
			$('div.div_nav').append(df);
			navs = $('nav');
		},
		createButtons : function() {
			var $btnPrev = $('<button id=\"btn-prev\" class=\"btn btn-primary btn-command\" title=\"Back to Previous Contents\"><< Prev</button>');
			var $btnNext = $('<button id=\"btn-next\" class=\"btn btn-primary btn-command\" title=\"Go to Next Contents\">Next >></button>');
			$('div.div_article').append($btnPrev);
			$('div.div_article').append($btnNext);
		},
		adjustNavAlign : function() {
			var wrapWidth = $('div.div_nav').width();
			var maxWidth = 0;
			$('h4.h4_title a').each(function() {
				maxWidth = Math.max(maxWidth, $(this).width());
			});
			var newLeft = (wrapWidth -  maxWidth) / 2;
			if(newLeft > 0) {
				$('h4.h4_title a').css({'left':newLeft});
			}
		},
		createImgDialog : function() {
			imgDialog = $('div#div-dialog').dialog({
				'autoOpen': false,
				'modal': true,
				'buttons' : [{
					'id' : 'btn-close-dialog',
					'class' : 'btn btn-primary',
					'text' : 'Close',
					'click' : function() {
						$(this).dialog('close');
					}
				}]
			});
		},
		// BindEvents ////////////////////////////////////////////////
		bindEvents : function() {
			$(window).resize(this.adjustNavAlign);
			$(document).keydown(function(e) {
				if(e.keyCode == Utils.KEY_LEFT) Utils.clickLeftKey();
				if(e.keyCode == Utils.KEY_RIGHT) Utils.clickRightKey();
			});
			$('a').on('click', function() {
				var clickNoStr = $(this).attr('href').substring(Utils.CHAR_NO_SHARP);
				var clickNo = parseInt(clickNoStr) - 1;
				Utils.changePage(clickNo);
			});
			$('button#btn-toggle-nav').on('click', Utils.toggleNavigation);
			$('button#btn-prev').on('click', Utils.clickLeftKey);
			$('button#btn-next').on('click', Utils.clickRightKey);
			$('img.img-zoomable').on('click', function() {
				var img = $('img#img-dialog');
				img.attr('src', $(this).attr('src'));
				Utils.adjustImgSize(img);
				Utils.adjustImgDialogSize(imgDialog);
				imgDialog.dialog('open');
			});
			$('div.btn-group-language button').on('click', function() {
				Utils.toggleLangButton($(this));
			});
		}
		//////////////////////////////////////////////////////////////
	};
	
	var Utils = {
		KEY_LEFT : 37,
		KEY_RIGHT : 39,
		changePage : function(nextNo) {
			Utils.hideSection(currentNo);
			Utils.showSection(nextNo);
			currentNo = nextNo;
			Utils.changeButtonStatus();
		},
		clickLeftKey : function() {
			if(currentNo <= 0) {
				return;
			}
			Utils.changePage(currentNo - 1);
		},
		clickRightKey : function() {
			if(currentNo >= articles.length - 1) {
				return;
			}
			Utils.changePage(currentNo + 1);
		},
		CHAR_NO_SHARP : 1,
		NAV_FOCUS : 'nav_focus',
		showSection : function(sectionNo) {
			$(articles[sectionNo]).show();
			$(navs[sectionNo]).addClass(this.NAV_FOCUS);
		},
		hideSection : function(sectionNo) {
			$(articles[sectionNo]).hide();
			$(navs[sectionNo]).removeClass(this.NAV_FOCUS);
		},
		changeButtonStatus : function() {
			if(currentNo == 0) {
				$('button#btn-prev').attr('disabled','disabled');
			} else {
				$('button#btn-prev').removeAttr('disabled');
			}
			if(currentNo == articles.length - 1) {
				$('button#btn-next').attr('disabled','disabled');
			} else {
				$('button#btn-next').removeAttr('disabled');
			}
		},
		toggleNavigation : function() {
			if($(this).html() == '&lt;&lt;') {
				$('div.div_nav').hide();
				$('div.div_article').addClass('div-width-max');
				$(this).html('&gt;&gt;');
				$(this).attr('title','Show Navigation');
			} else {
				$('div.div_nav').show();
				$('div.div_article').removeClass('div-width-max');
				$(this).html('&lt;&lt;');
				$(this).attr('title','Hide Navigation');
			}
		},
		adjustImgSize : function(img) {
			img.css({
				'width': $(window).width() - 240,
				'height' : $(window).height() - 240
			});
		},
		adjustImgDialogSize : function(dialog) {
			imgDialog.dialog({
				'width': $(window).width() - 160,
				'height' : $(window).height() - 80
			});
		},
		toggleLangButton : function($self) {
			var selectedVal = $self.html();
			$('div.btn-group-language button').each(function() {
				if($(this).html() === selectedVal) {
					$(this).addClass('btn-primary');
					$(this).removeClass('btn-default');
				} else {
					$(this).removeClass('btn-primary');
					$(this).addClass('btn-default');
				}
				$(this).blur();
			});
		}
	};
	
	App.init();
});




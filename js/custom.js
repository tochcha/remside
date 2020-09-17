$(window).on('load', function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    };
    $('body').removeClass('loaded');
});


// колонки в подменю
$(function () {
    $('.mainnav__submenu').autocolumnlist({
        columns: 3
    });
})

// mmenu - меню по клику
$("#top-menu").mmenu({
    extensions: [
        'shadow-page',
        'shadow-panels',
        'listview-large',
        'pagedim-black',
        'theme-dark'
    ],
    "navbars": [{
        "position": "bottom",
        "content": [
            '<div class="mm_navbar buttonbox"><a data-fancybox data-src="#zamer" href="javascript:;" class="button small">Вызов замерщика</a></div>',
            '<div class="mm_navbar emailbox"><a href="mailto:remside@mail.ru"><i class="icon icon-email"></i>remside@mail.ru</a></div>',
            '<div class="mm_navbar chatbox"><a href="#" title="whatsapp"><img src="img/whatsapp.png" alt=""></a><a href="#" title="telegram"><img src="img/telegram-white.png" alt=""></a></div>',
            '<div class="mm_navbar schedulebox"><div class="header__tel"><a href="tel:+78005557589">+7 (800) 555-75-89</a></div><div class="header__tel"><a href="tel:+78005557589">+7 (800) 555-75-89</a></div><div class="recall"><a data-fancybox data-src="#oz" href="javascript:;">Обратный звонок</a></div></div>'
        ]
    }],
    navbar: {
        title: '<img src="img/logo-footer.png" alt="" />'
    },
    offCanvas: {
        position: 'left'
    },
    pageScroll: true,
    slidingSubmenus: true
});

var api = $("#top-menu").data("mmenu");
api.bind("open:finish", function () {
    $('.mm-opened .hb_left .hamburger').addClass('is-active');
});
api.bind("close:finish", function () {
    $('.hb_left .hamburger').removeClass('is-active');
});

$("#catalog-menu").mmenu({
    extensions: [
        'shadow-page',
        'shadow-panels',
        'listview-large',
        'pagedim-black',
        'theme-dark'
    ],
    "navbars": [{
        "position": "bottom",
        "content": [
            '<div class="mm_navbar searchbox"><div class="search"><input type="search" placeholder="Поиск..."><i class="icon icon-zoom"></i></div></div>'
        ]
    }],
    navbar: {
        title: '<img src="img/logo-footer.png" alt="" />'
    },
    offCanvas: {
        position: 'right'
    },
    pageScroll: true,
    slidingSubmenus: true
});

var api = $("#catalog-menu").data("mmenu");
api.bind("open:finish", function () {
    $('.mm-opened .hb_right .hamburger').addClass('is-active');
});
api.bind("close:finish", function () {
    $('.hb_right .hamburger').removeClass('is-active');
});

// меняем стрелку на гамбургер при клике на область контента
$(".maincontent .hamburger").click(function() {
    $(this).toggleClass('is-active');
    $('.aside').toggleClass('active');
});
jQuery(function($){
    $(document).mouseup(function (e){
        var div = $(".aside");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            div.removeClass('active');
            $(".maincontent .hamburger").removeClass('is-active');
        }
    });
});

// стилизация форм
if ($('.styled').length) {
    $('.styled').styler({
        fileBrowse: 'Прикрепить файл',
        filePlaceholder: ''
    });
};
if ($('.styled_drug').length) {
    $('.styled_drug').styler({
        fileBrowse: 'Нажмите, чтобы выбрать фото <br>или перетащите фото сюда',
        filePlaceholder: ''
    });
};



/*
if($('.scroll').length) {
    $(".scroll").mCustomScrollbar({
        axis:"yx",
        theme:"dark-thin",
        autoExpandScrollbar:true,        
        scrollInertia:350,
        advanced:{autoExpandHorizontalScroll:true}
    });
};
*/

// плавная прокрутка вниз к якорю
/*$(".header nav ul li a").click(function () {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
});*/


// тень от меню при прокрутке страницы больше чем 355px (можно делать липкий хедер)
$(window).scroll(function() {
    if ($(this).scrollTop() > 106) {
        $('body').addClass('scrolled');
    } else {
        $('body').removeClass('scrolled');
    }
});

// Подсветка активного пункта меню
var link = window.location.pathname;
$('.aside__menu ul li a[href="'+link+'"]').parent().addClass('active');
$('.top_nav ul li a[href="'+link+'"]').parent().addClass('active');
$('.mainnav li a[href="'+link+'"]').parent().addClass('active');

// fancybox убираем автофокус
$('[data-fancybox=""]').fancybox({
    autoFocus: false
});


// выпадающие меню в футере на мобилках
$('.footer__spoiler_title').click(function() {
    $(this).parents('.footer__spoiler').toggleClass('active');
});

// главный слайдер
$('#hero-slider').on('init', function(e, slick) {
    var $firstAnimatingElements = $('.hero-slide:first-child').find('[data-animation]');
    doAnimations($firstAnimatingElements);    
});
$('#hero-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
          var $animatingElements = $('.hero-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
          doAnimations($animatingElements);    
});
$('#hero-slider').slick({
    autoplay: true,
    autoplaySpeed: 10000,
    dots: true,
    fade: true,
    infinite: true,
    prevArrow: '<div class="slick-prev"><i class="icon icon-slick-arrow-left"></i></div>',
    nextArrow: '<div class="slick-next"><i class="icon icon-slick-arrow-right"></i></div>',
});
function doAnimations(elements) {
    var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    elements.each(function() {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function() {
            $this.removeClass($animationType);
        });
    });
}

// фильтр "Примеры выполненных работ"
$('.pvr .check_prv').click(function() {
    $(this).addClass('active');
    $('.check_prv').not(this).removeClass('active');
});

// адаптив "Примеры выполненных работ"
$(window).on('resize load', function() {
    if ($(window).width() < 1200) {
        $('.in_mob_1200').detach().insertAfter($('.insert_in_mobile_simpletabs')).removeClass('simpletabs__checks_item');
    }
    if ($(window).width() >= 1200) {
        $('.in_mob_1200').detach().insertAfter($('.insert_in_decktop_simpletabs')).addClass('simpletabs__checks_item');
    }
});
$(window).on('resize load', function() {
    if ($(window).width() < 992) {
        $('.in_mob_992').detach().insertAfter($('.insert_in_mobile_simpletabs')).removeClass('simpletabs__checks_item');
    }
    if ($(window).width() >= 992) {
        $('.in_mob_992').detach().insertAfter($('.insert_in_decktop_simpletabs')).addClass('simpletabs__checks_item');
    }
});
$(window).on('resize load', function() {
    if ($(window).width() < 600) {
        $('.in_mob_600').detach().insertAfter($('.insert_in_mobile_simpletabs')).removeClass('simpletabs__checks_item');
    }
    if ($(window).width() >= 600) {
        $('.in_mob_600').detach().insertAfter($('.insert_in_decktop_simpletabs')).addClass('simpletabs__checks_item');
    }
});

// смотреть еще
$('.box__seemore').click(function() {
    $(this).parents('.works').find('.work.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.ourservs').find('.ourservs__item.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.reviews__item.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.gratitude__item.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.video__item.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.serts__item.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.staff__item.hidden').slideDown();
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.shop_cats__item.hidden').css('display', 'flex');
    $(this).hide();
});
$('.box__seemore').click(function() {
    $(this).parents('.listwithmore').find('.gr_list__item.hidden').css('display', 'flex');
    $(this).hide();
});
$('.box__seemoreprods').click(function() {
    $(this).parents('.listwithmore').find('.prodlist__item.hidden').css('display', 'flex');
    $(this).hide();
});

// работа фильтра работ
$('.simpletabs__checks-1').click(function() {
    $('.work').removeClass('hide');
});
$('.simpletabs__checks-2').click(function() {
    $('.work').addClass('hide');
    $('.work.r_kvartir').removeClass('hide');
});
$('.simpletabs__checks-3').click(function() {
    $('.work').addClass('hide');
    $('.work.r_ofisov').removeClass('hide');
});
$('.simpletabs__checks-4').click(function() {
    $('.work').addClass('hide');
    $('.work.r_pomesch').removeClass('hide');
});
$('.simpletabs__checks-5').click(function() {
    $('.work').addClass('hide');
    $('.work.r_servs').removeClass('hide');
});
$('.simpletabs__checks-6').click(function() {
    $('.work').addClass('hide');
    $('.work.r_vk').removeClass('hide');
});
$('.simpletabs__checks-7').click(function() {
    $('.work').addClass('hide');
    $('.work.r_tsehov').removeClass('hide');
});


// слайдер клиентов
$('.brands_slider').slick({
    autoplay: true,
    autoplaySpeed: 6000,
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<div class="slick-prev"><i class="icon icon-slick-arrow-left"></i></div>',
    nextArrow: '<div class="slick-next"><i class="icon icon-slick-arrow-right"></i></div>',
    responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 200,
            settings: "unslick"
        }
    ]
});

// читать далее в сео-тексте
$('.seotext .readmore').click(function() {
    $(this).parents('.seotext').children('.colwide').addClass('active');
    $(this).addClass('hidden');
});

// слайдер о компании
$('.staticgallery__full').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    asNavFor: '.staticgallery__thumbs',
    prevArrow: '<div class="slick-prev"><i class="icon icon-slick-arrow-left"></i></div>',
    nextArrow: '<div class="slick-next"><i class="icon icon-slick-arrow-right"></i></div>',
    responsive: [
    {
      breakpoint: 768,
      settings: {
        fade: false,
        }
    }
    ]
});
$('.staticgallery__thumbs').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.staticgallery__full',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false
});
// слайдер о компании

// слайдер выполненных работ
$('.works__list_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false,
    infinite: false,
    prevArrow: '<div class="slick-prev"><i class="icon icon-slick-arrow-left"></i></div>',
    nextArrow: '<div class="slick-next"><i class="icon icon-slick-arrow-right"></i></div>',
    responsive: [
    {
      breakpoint: 1200,
      settings: {
            slidesToShow: 2
        },
    },{
      breakpoint: 768,
      settings: {
            slidesToShow: 1
        },
    }
    ]
});
// слайдер выполненных работ end

// слайдер персонала
$('.staff__list_slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false,
    infinite: false,
    prevArrow: '<div class="slick-prev"><i class="icon icon-slick-arrow-left"></i></div>',
    nextArrow: '<div class="slick-next"><i class="icon icon-slick-arrow-right"></i></div>',
    responsive: [
    {
      breakpoint: 1200,
      settings: {
            slidesToShow: 3
        },
    },{
      breakpoint: 768,
      settings: {
            slidesToShow: 2
        },
    },{
      breakpoint: 480,
      settings: {
            slidesToShow: 1
        },
    }
    ]
});
// слайдер персонала end

// подробнее для отзывов
$('.review_toggle').click(function() {
    $(this).parents('.reviews__item').toggleClass('open');
});
$('.gratitude__text .more').click(function() {
    $(this).parents('.gratitude__item').addClass('open');
});
$('.gratitude__text .nomore').click(function() {
    $(this).parents('.gratitude__item').removeClass('open');
});

// вырезать блок, вставить в мобилках 
$(window).on('resize load', function() {
    if ($(window).width() < 992) {
        $('.blue_form__fields .rem').detach().insertAfter($('.filefield'));
    }
    if ($(window).width() >= 992) {
        $('.blue_form__fields .rem').detach().insertAfter($('.insertafterbutton'));
    }
});

// маска телефона
$("input[type=tel]").mask("+7(999) 999-99-99");

// шторка
$(function() {
    $(".curtain").twentytwenty({
        default_offset_pct: 0.5, // Начальное положение шторки
        orientation: 'horizontal', // Движение шторки ("horizontal" или "vertical")
        before_label: 'До', // Подпись "до"
        after_label: 'После', // Подпись "после"
        no_overlay: false, // Не отображать оверлей для подписей "до" и "после"
        move_slider_on_hover: false, // Если true, то при наведении на блок сразу же активируется перетаскивание шторки
        move_with_handle_only: true, // Перемещать шторку движением пальца
        click_to_move: true // Если true, то при нажатии на область с изображениями, шторка переместиться на место клика
    });
});

// slideDown для faq
$('.faqlist__toggle').click(function() {
    $(this).parents('.faqlist__item').toggleClass('open');
});

// slideDown для калькулятора
$('.psevdoselect__toggle').click(function() {
    $(this).parents('.psevdoselect').toggleClass('open');
});

// disabled поля ввода площади для чекбоксов
$('.checkbox input:checkbox + label').click(function() {
    if($(this).parents('.psevdoselect__item').find('.checkbox input').attr("checked") != 'checked') {  
        $(this).parents('.psevdoselect__item').find('.checkbox__other_inptext').prop('disabled',false);
    } else {
        $(this).parents('.psevdoselect__item').find('.checkbox__other_inptext').prop('disabled',true);
    }
});
$('.checkbox input:radio + label').click(function() {
        $(this).parents('.psevdoselect').find('.checkbox__other_inptext').prop('disabled',true);
        $(this).parents('.psevdoselect__item').find('.checkbox__other_inptext').prop('disabled',false);
});

// табы простые
function initTabs(){for(var e=document.getElementsByTagName("ul"),d=0;d<e.length;d++)if(-1!=e[d].className.indexOf("tabset"))for(var g=[],b=e[d].getElementsByTagName("a"),a=0;a<b.length;a++)if(-1!=b[a].className.indexOf("tab")){g.push(b[a]);b[a].tabs=g;var f=document.getElementById(b[a].href.substr(b[a].href.indexOf("#")+1));f&&(-1!=b[a].className.indexOf("active")?f.className="tab vis":f.className="tab");b[a].onclick=function(){var h=document.getElementById(this.href.substr(this.href.indexOf("#")+
1));if(h){for(var c=0;c<this.tabs.length;c++){var k=document.getElementById(this.tabs[c].href.substr(this.tabs[c].href.indexOf("#")+1));k&&(k.className="tab");this.tabs[c].className=this.tabs[c].className.replace("active","")}this.className+=" active";h.className="tab vis";return!1}}}}window.addEventListener("load",initTabs,!1);
// табы простые end


$('#cart_mobile_switcher').click(function() {
    $('.header__mobile_cart').addClass('active');
});
jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(".header__mobile_cart.active"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.removeClass('active'); // скрываем его
        }
    });
});

// num input
(function(){
    var inps = $('div.num_input');
    inps.each(function(){
        var box = $(this);
        var inp = box.find('input');
        var plus = box.find('.plus');
        var minus = box.find('.minus');
        plus.click(function(){
            inp.val( +inp.val()+1 );
        });
        minus.click(function(){
            var val = +inp.val()-1;
            if( val < 0 ) val = 0;
            inp.val( val );
        });
    });
})();


$( "#polzunok" ).slider({
    animate: "slow",
    range: true,  
    values: [130,16000],
    min: 0,
    max: 30000,
    slide : function(event, ui) {    
        $("#result-polzunok1").text(ui.values[0]);
        $("#result-polzunok2").text(ui.values[1]);
    }
});
// $( "#result-polzunok1" ).text($( "#polzunok" ).slider( "ui.values[0]" ));
// $( "#result-polzunok2" ).text($( "#polzunok" ).slider( "ui.values[1]" ));

$('.shop_filter__more').click(function() {
    $(this).parents('.shop_filter__content').toggleClass('active');
});
$('.shop_filter__clear').click(function() {
    $(this).parents('.shop_filter__content').find('input').removeAttr("checked");
});
$('.shop_filter__title').click(function() {
    $(this).parents('.shop_filter__item').toggleClass('open');
});

$('.filter_opener').click(function() {
    $('.shop_catalog__bar, .unioverlay').addClass('visible');
});
$('.shop_filter__close, .unioverlay').click(function() {
    $('.shop_catalog__bar, .unioverlay').removeClass('visible');
});

$(window).on('resize load', function() {
    if ($(window).width() < 992) {
        $('.shop_filter__item').removeClass('open');
    }
});

$('.sort__item').click(function() {
    if ($(this).hasClass('active_down')) {
        $(this).removeClass('active_down').addClass('active_up');
    } else {
        $(this).removeClass('active_up').addClass('active_down');
    }
    $(this).addClass('active');
    $(this).siblings('.sort__item').not(this).removeClass('active').removeClass('active_down').removeClass('active_up');
});
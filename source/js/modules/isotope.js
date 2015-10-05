var $ = require('jquery');
var Isotope = require('isotope-layout');
//require('isotope-masonry');
var PhotoSwipe = require('photoswipe');
var Handlebars = require('handlebars');
var PhotoSwipeUI_Default = require('../vendor/photoswipe-ui-default.min');
//var _ = require('underscore');
//var imagesLoaded = require('imagesloaded');
responsivelyLazy = require('../vendor/responsively_lazy.min');


function loadGalleryJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '/../assets/json/gallery_images.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

var gallery_items = {};






// var galleryHtmlTemplate =
//
// "<figure class=\"item {{category}}\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">" +
//
//   "<a href=\"{{desktopImage.src}}\" data-mobile-link=\"{{mobileImage.src}}\" itemprop=\"contentUrl\" data-size=\"{{desktopImage.w}}x{{desktopImage.h}}\" data-size-desktop=\"{{desktopImage.w}}x{{desktopImage.h}}\"
//   data-size-mobile=\"{{mobileImage.w}}x{{mobileImage.h}}\">" +
//
//       "<img class=\"responsively-lazy\" src=\"{{desktopImage.src}}\"
//        srcset=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\"
//       data-srcset=\"
//         {{srcImage}}_w400{{imageExtension}} 400w,
//         {{srcImage}}_w600{{imageExtension}} 600w,
//         {{srcImage}}_w800{{imageExtension}} 800w\"
//       alt=\"An image of a peice of art by Chantown Creative\"
//       title=\"{{title}} | {{year}}\" itemprop=\"thumbnail\"  />" +
//
//  "</a>" +
//  "<figcaption itemprop=\"caption description\">
//     {{title}} | {{year}} </br>
//     {{description}}
//     <span itemprop=\"copyrightHolder\"> &copy; Chantown Creative</span>
//   </figcaption>
// </figure>";










var buildGalleryHTML = function(json) {
  var myJson = json,
      _$gallery_container = $("#gallery_container"),
      unCompiledGalleryHtml = _$gallery_container.html(),
      galleryTemplate = Handlebars.compile(unCompiledGalleryHtml),
      result = galleryTemplate(myJson);

      _$gallery_container.html(result);
}






var runPhotoswipe = function () {
      var $window = $(window);
      var $images = $('#gallery_container figure img');

      var itemReveal = Isotope.Item.prototype.reveal;
      Isotope.Item.prototype.reveal = function() {
        itemReveal.apply( this, arguments );
        $( this.element ).removeClass('isotope-hidden');
      };

      var itemHide = Isotope.Item.prototype.hide;
      Isotope.Item.prototype.hide = function() {
        itemHide.apply( this, arguments );
        $( this.element ).addClass('isotope-hidden');
      };


      //imagesLoaded( _portfolio_gallery, function() {

        var $image_gallery = new Isotope ('.masonry-grid', {
          masonry: {
            columnWidth: '.grid-sizer',
            //isFitWidth: true,
            gutter: 10
          }, /* masonry */
          hiddenStyle: {
            opacity: 0
          },
          visibleStyle: {
            opacity: 1
          },
          transitionDuration: '.3s',
          //sortBy: 'random'
          });
        // once images have loaded - run the layout script to put all images in masonry layout
        // imagesLoaded('.masonry-grid', function() {
        //  // layout Isotope after each image loads
        //  $image_gallery.layout();
        //  $image_gallery.arrange();
        //  //console.log("images loaded");
        // });
        // $image_gallery.arrange();

        //console.log($image_gallery);

        // console.log(Chantown);
        // update lazy load when isotope has re-arranged the images
        $image_gallery.on('arrangeComplete',function() {

             //console.log("image filtering updated");
            //Chantown.responsiveLazy.run();
        });

        // align the isotope layout every 500ms
        window.setInterval(function(){
          $image_gallery.arrange({
          })
        }, 500);

        // show the images once aligned
        _portfolio_gallery.find("figure").css("visibility","visible");

        // bind isotope filter button click
        $('.filter-btns').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');

          //$grid.filter(filter: filterValue,);
          $image_gallery.arrange({
            filter: filterValue,
          })
          //responsivelyLazy.run()
        });

        // PHOTOSWIPE GALLERY
         var pswpElement = $('.pswp')[0];
         var isotopeContainer = $('.masonry-grid');
         var realViewportWidth; // create variable that will store real size of viewport
         var useLargeImages = false;
         var firstResize = true;
         var imageSrcWillChange;

         isotopeContainer.on('click', 'a', function(e){
           e.preventDefault();
           var $items = isotopeContainer.find('figure:not(.isotope-hidden)'),
               self = $(this),
               parent = self.closest('figure'),
               index = $items.index(parent);

           var items = isotopeContainer.find('figure:not(.isotope-hidden)').get().map(function(item){
             var figure = $(item),
                 link = figure.children('a'),
                 caption = figure.find('figcaption'),
                 size = link.data('size').split('x'),
                 mobileImgSrc = link.data('mobile-link');
                 desktopSize = link.data('size-desktop').split('x'),
                 mobileSize = link.data('size-mobile').split('x'),
                 data = {
                   src: link.attr('href'),
                   w: +size[0],
                   h: +size[1],
                   mobile_src: mobileImgSrc,
                   mobile_w: +mobileSize[0],
                   mobile_h: +mobileSize[1]
                 };

             if (caption.length){
               data.title = caption.html();
             }
             return data;
           });

           var options = {
             index: index,
             getThumbBoundsFn: function(index) {
                       // See Options -> getThumbBoundsFn section of documentation for more info
                       var thumbnail = self.find('img')[0], // find thumbnail
                           pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                           rect = thumbnail.getBoundingClientRect();

                       return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                   }
           };

           var photoswipeInstance = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
           photoswipeInstance.listen('destroy', function() {
             // trigger resize on isotope
           });


           // hide sticky header navigation when photoswipe opens
           photoswipeInstance.listen('initialZoomIn', function() {
             //console.log("opening photoSwipe... fading out the nav");
             $("header").find(".scrollmagic-pin-spacer").fadeOut(250);
             $(".back-to-top").addClass("behind-lightbox");
           });

           // show sticky nav again once closing photoswipe
           photoswipeInstance.listen('close', function() {
             //console.log("closing photoSwipe");
             $("header").find(".scrollmagic-pin-spacer").fadeIn(250);
             $(".back-to-top").removeClass("behind-lightbox");
           });

           // beforeResize event fires each time size of gallery viewport updates
           photoswipeInstance.listen('beforeResize', function() {
                // gallery.viewportSize.x - width of PhotoSwipe viewport
                // gallery.viewportSize.y - height of PhotoSwipe viewport
                // window.devicePixelRatio - ratio between physical pixels and device independent pixels (Number)
                //                          1 (regular display), 2 (@2x, retina) ...


                // calculate real pixels when size changes
                realViewportWidth = photoswipeInstance.viewportSize.x * window.devicePixelRatio;

                // Code below is needed if you want image to switch dynamically on window.resize

                // Find out if current images need to be changed
                if(useLargeImages && realViewportWidth < 1000) {
                    useLargeImages = false;
                    imageSrcWillChange = true;
                } else if(!useLargeImages && realViewportWidth >= 1000) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }

                // Invalidate items only when source is changed and when it's not the first update
                if(imageSrcWillChange && !firstResize) {
                    // invalidateCurrItems sets a flag on slides that are in DOM,
                    // which will force update of content (image) on window.resize.
                    photoswipeInstance.invalidateCurrItems();
                    // console.log('run resize photoswipe');
                }

                if(firstResize) {
                    firstResize = false;
                }

                imageSrcWillChange = false;

            });

           // function that decides whether to load mobile or desktop version of the full size image when clicking on one of the thumbnails

           // the photoswipe gettingData event fires each time PhotoSwipe retrieves image source & size
           photoswipeInstance.listen('gettingData', function(index, item) {
                // Set image source & size based on real viewport width
                if( useLargeImages ) {
                    item.src = item.src;
                    item.w = item.w;
                    item.h = item.h;
                } else {
                    item.src = item.mobile_src;
                    item.w = item.mobile_w;
                    item.h = item.mobile_h;
                }

                // It doesn't really matter what will you do here,
                // as long as item.src, item.w and item.h have valid values.
                //
                // Just avoid http requests in this listener, as it fires quite often

            });


          photoswipeInstance.init();
         });
       //}); // imagesloaded





      // change is-checked class on buttons
      $('.filter-btns').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
        });
      });

}; // runPhotoswipe function



var _portfolio_gallery = $('#gallery_container');
if ( _portfolio_gallery.length > 0 ) {

  Handlebars.registerHelper('escape', function(variable) {
    return variable.replace(/(['"])/g, '\\$1');
  });

  // if placing the json file on an external server, could use this code.
  // loadGalleryJSON(function(response) {
  //   // Parse JSON string into object
  //     gallery_items = JSON.parse(response);
  //     buildGalleryHTML(gallery_items);
  //     runPhotoswipe();
  // });

  gallery_items = require('../json/gallery_images');
  buildGalleryHTML(gallery_items);
  runPhotoswipe();

  }

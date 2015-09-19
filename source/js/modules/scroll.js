/*
  scroll / reveal header script
  By Osvaldas Valutis, www.osvaldas.info
  Available for use under the MIT License
*/

//
// ;( function ( document, window, index )
// {
//   'use strict';
//
//   // var elSelector		= '.main-header',
//     var elSelector		= 'body',
//     elClassHidden	= 'header--hidden',
//     elClassNarrow	= 'header--narrow',
//     elNarrowOffset	= 400,
//     throttleTimeout	= 500,
//     element			= document.querySelector( elSelector );
//
//   if( !element ) return true;
//
//   var dHeight			= 0,
//     wHeight			= 0,
//     wScrollCurrent	= 0,
//     wScrollBefore	= 0,
//     wScrollDiff		= 0,
//     hasElementClass		= function( element, className ){ return element.classList ? element.classList.contains( className ) : new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className ); },
//     addElementClass		= function( element, className ){ element.classList ? element.classList.add( className ) : element.className += ' ' + className; },
//     removeElementClass	= function( element, className ){ element.classList ? element.classList.remove( className ) : element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' ); },
//
//     throttle = function( delay, fn )
//     {
//       var last, deferTimer;
//       return function()
//       {
//         var context = this, args = arguments, now = +new Date;
//         if( last && now < last + delay )
//         {
//           clearTimeout( deferTimer );
//           deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
//         }
//         else
//         {
//           last = now;
//           fn.apply( context, args );
//         }
//       };
//     };



  // scroll handlers
  // window.addEventListener( 'scroll', throttle( throttleTimeout, function()
  // {
  // 	dHeight			= document.body.offsetHeight;
  // 	wHeight			= window.innerHeight;
  // 	wScrollCurrent	= window.pageYOffset;
  // 	wScrollDiff		= wScrollBefore - wScrollCurrent;
  //
  // 	if( wScrollCurrent > elNarrowOffset ) // toggles "narrow" classname
  // 	{
  // 		if( !hasElementClass( element, elClassNarrow ) )
  // 			addElementClass( element, elClassNarrow );
  // 	}
  // 	else removeElementClass( element, elClassNarrow );
  //
  // 	if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
  // 		removeElementClass( element, elClassHidden );
  //
  // 	else if( wScrollDiff > 0 && hasElementClass( element, elClassHidden ) ) // scrolled up; element slides in
  // 		removeElementClass( element, elClassHidden );
  //
  // 	else if( wScrollDiff < 0 ) // scrolled down
  // 	{
  // 		if( wScrollCurrent + wHeight >= dHeight && hasElementClass( element, elClassHidden ) ) // scrolled to the very bottom; element slides in
  // 			removeElementClass( element, elClassHidden );
  //
  // 		else // scrolled down; element slides out
  // 			addElementClass( element, elClassHidden );
  // 	}
  //
  // 	wScrollBefore = wScrollCurrent;
  //
  //   showBackToTopLink();
  //
  //
  // }));

// ;( function ( document, window, index )
//   function showBackToTopLink()
//   {
//       var scrollBarPosition = window.pageYOffset | document.body.scrollTop;
//       var bk2TopLink = document.querySelectorAll('.back-to-top')[0];
//       // show back to top link after user has scrolled 200px from the top
//       if(scrollBarPosition > 340) {
//         bk2TopLink.classList.add('visible');
//       }
//       else {
//           bk2TopLink.classList.remove('visible');
//       }
//   }
//
// }( document, window, 0 ));
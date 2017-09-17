export default function SiteDrawer() {

  console.log('----------------------------------------');
  console.log('SiteDrawer has loaded');
  console.log('----------------------------------------');

  const hamburger = $('.site-nav__hamburger');
  const overlay = $('.site-overlay');
  const drawer = $('.site-drawer');
  const close = $('.site-drawer__close');

  const add_classes = function() {
    console.log('adding classes');
    overlay.addClass( 'site-overlay--active' );
    drawer.addClass( 'site-drawer--active' );
  };

  const remove_classes = function() {
    console.log('removing classes');
    overlay.removeClass( 'site-overlay--active' );
    drawer.removeClass( 'site-drawer--active' );
  };

  hamburger.off();
  hamburger.on('click', function(event) {
    event.preventDefault();
    console.log('BOOM!');
    add_classes();
  });

  close.off();
  close.on('click', function(event) {
    event.preventDefault();
    remove_classes();
  });

}

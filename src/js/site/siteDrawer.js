export default function SiteDrawer() {

  console.log('SiteDrawer has loaded');
  console.log('----------------------------------------');

  const hamburger = $('.site-nav__hamburger'),
        overlay = $('.site-overlay'),
        drawer = $('.site-drawer'),
        close = $('.site-drawer__close'),

  add_classes = function() {
    overlay.addClass( 'site-overlay--active' );
    drawer.addClass( 'site-drawer--active' );
  },

  remove_classes = function() {
    console.log('removing classes');
    overlay.removeClass( 'site-overlay--active' );
    drawer.removeClass( 'site-drawer--active' );
  };

  hamburger.off();
  hamburger.on('click', function(event) {
		event.preventDefault();
    add_classes();
  });

  close.off();
  close.on('click', function(event) {
		event.preventDefault();
    remove_classes();
  });

}

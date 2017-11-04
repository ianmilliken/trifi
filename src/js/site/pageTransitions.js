export default function pageTransitions() {

  console.log('PageTransitions has loaded');
  console.log('----------------------------------------');

  var cache = {};
  function loadPage(url) {
    if (cache[url]) {
      return new Promise(function(resolve) {
        resolve(cache[url]);
      });
    }

    return fetch(url, {
      method: 'GET'
    }).then(function(response) {
      cache[url] = response.text();
      return cache[url];
    });
  }

  var main = document.querySelector('.main');
  console.log(main);

  function changePage() {
    var url = window.location.href;
    var path = window.location.pathname;

    if (path.indexOf('journal') > -1) {
      var logo = document.querySelector('.site-nav__logo--white');
      var box = document.querySelector('.flexbox--light');
      logo.classList.remove('site-nav__logo--white');
      box.classList.remove('flexbox--light');
    }

    loadPage(url).then(function(responseText) {
      var wrapper = document.createElement('div');
          wrapper.innerHTML = responseText;
       console.log(wrapper);

      var oldContent = document.querySelector('.main__inner');
      var newContent = wrapper.querySelector('.main__inner');

      main.appendChild(newContent);
      animate(oldContent, newContent);
    });
  }

  function animate(oldContent, newContent) {
    oldContent.style.position = 'absolute';

    var fadeOut = oldContent.animate({
      opacity: [1, 0]
    }, 1000);

    var fadeIn = newContent.animate({
      opacity: [0, 1]
    }, 1000);

    fadeIn.onfinish = function() {
      oldContent.parentNode.removeChild(oldContent);
    };
  }

  window.addEventListener('popstate', changePage);

  document.addEventListener('click', function(e) {
    var el = e.target;

    console.log('click!');

    while (el && !el.href) {
      el = el.parentNode;
    }

    if (el) {
      e.preventDefault();
      history.pushState(null, null, el.href);
      changePage();

      return;
    }
  });

}

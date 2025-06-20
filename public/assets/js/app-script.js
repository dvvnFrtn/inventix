$(document).ready(function() {
    let isOpen;

    // Set isOpen berdasarkan lebar awal menu
    if ($('#menu').width() > 0) {
      isOpen = true;
    } else {
      isOpen = false;
    }

    $('#bar').click(function() {
      if (isOpen) {
        $('#menu').css('width', '0px');
      } else {
        $('#menu').css('width', '200px');
      }
      isOpen = !isOpen;
    });

    // Optional: Update state on window resize
    $(window).on('resize', function () {
      if (window.innerWidth >= 768) {
        $('#menu').css('width', '200px');
        isOpen = true;
      } else {
        $('#menu').css('width', '0px');
        isOpen = false;
      }
    });
  });
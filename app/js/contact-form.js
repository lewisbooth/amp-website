$(document).ready(function() {
  $('form').submit((e) => {
    e.preventDefault();
    $('.contact form button').addClass('processing');
    var formData = {          
      name: $('#form-name').val(),
      email: $('#form-email').val(),
      message: $('#form-message').val()
    }
    $.ajax({
      type: 'POST',
      url: 'http://amp.dev/contact_submit.php',
      data: formData,
      dataType: 'json',
      encode: true
    })
    .done((data) => {
      if (data.success === true) {
        $('.contact form button').removeClass('processing')
                                 .addClass('success');
        $('#form-reset-text').text('Send another message');
        $('#form-reset-container').addClass('active');
      } else {
        $('.contact form button').removeClass('processing')
                                 .addClass('failed');
        $('#form-reset-text').text('Try again');
        $('#form-reset-container').addClass('active');
      }
    })
    .fail((data) => {
        $('.contact form button').removeClass('processing')
                                 .addClass('failed');
        $('#form-reset-text').text('Try again');
        $('#form-reset-container').addClass('active');
    })
  });
  $('#form-reset-container').click(() => {
    $('form input').val('');
    $('form textarea').val('');
    $('.contact-form button').prop('disabled', true);
    $('.contact form button').removeClass('processing failed success');
    $('#form-name').removeClass('valid');
    $('#form-email').removeClass('valid');
    $('#form-message').removeClass('valid');
    $('#form-reset-container').removeClass('active');
  })

  // Realtime validation
  $('#form-name').on('input', () => {
    if ($('#form-name').val()) {
      var firstName = $('#form-name').val()
                                    // Get first word
                                    .split(' ')[0]
                                    .split('');
      firstName[0] = firstName[0].toUpperCase();
      firstName = firstName.join('');
      $('#form-name').addClass('valid');
    } else {
      var firstName = 'You';
      $('#form-name').removeClass('valid');
    }
    $('#contact-name').text(firstName);
    checkFormInputs();
  });

  $('#form-email').on('input', () => {
    var emailInput = $('#form-email').val()
    var emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (emailRegex.test(emailInput)) {
      $('#form-email').addClass('valid');
    } else {
      $('#form-email').removeClass('valid');
    }
    checkFormInputs();
  });

  $('#form-message').on('input', () => {
    if ($('#form-message').val().length > 5) {
      $('#form-message').addClass('valid');
    } else {
      $('#form-message').removeClass('valid');
    }
    checkFormInputs();
  });

  function checkFormInputs() {
    if ($('#form-name').hasClass('valid') &&
        $('#form-email').hasClass('valid') &&
        $('#form-message').hasClass('valid')) {        
      $('.contact-form button').prop('disabled', false);
      console.log('valid')
    } else {
      $('.contact-form button').prop('disabled', true);
    }
  }

});
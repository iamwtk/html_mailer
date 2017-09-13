$(function () {
    "use strict";
    /******************
    POPUPS
    *******************/
    var closeBtn = '<button type="button" id="pop-close"><i class="fa fa-close"></i></button>';
    
    $(document).on('click','.login-btn', function (e) {
        e.preventDefault();
         $('#home .pop-overlay, #home .pop-overlay .form').addClass('hidden');
        $('#home .pop-overlay, #home .pop-overlay .login').removeClass('hidden');
        $('#home .pop-overlay .login form').append(closeBtn);
    });
    $(document).on('click','.signup-btn', function (e) {
        e.preventDefault();
         $('#home .pop-overlay, #home .pop-overlay .form').addClass('hidden');
        $('#home .pop-overlay, #home .pop-overlay .signup').removeClass('hidden');
        $('#home .pop-overlay .signup form').append(closeBtn);
    });
    $(document).on('click','#pop-close', function (e) {
        e.preventDefault();
        $('#home .pop-overlay, #home .pop-overlay .form').addClass('hidden');
        $(this).remove();
    });
    
    
    
    
    
    
    /******************
    AJAX LOGIN & SIGNUP
    *******************/
    function passwordsMatch(pwd1, pwd2) {
        if (pwd1 === pwd2) {
            return true;
        } else {
            return false;
        }
    }

    function handleResponse($message, response) {
        if (response.success) {
            $($message).removeClass('error').addClass('success').text(response.message);
            window.location.replace('/app');
        } else {
            $($message).removeClass('success').addClass('error').text(response.message);

        }
    }

    function callAJAX(formData) {
        $(formData.$message).text(formData.message);
        $.post(formData.url, formData.data, function (response) {
            handleResponse(formData.$message, response);
            $('.form input[type=password]').val('');

        });
    }


    $('.form form').on('submit', function (e) {

        e.preventDefault();

        var loginForm = {
                url: '/login',
                message: 'Logging in...',
                $message: $('#login-form').siblings('p.message'),
                data: {
                    email: $('#login-form .email').val(),
                    password: $('#login-form .password').val()
                }
            },
            signupForm = {
                url: '/signup',
                message: 'Signing up...',
                $message: $('#signup-form').siblings('p.message'),
                data: {
                    email: $('#signup-form .email').val(),
                    password: $('#signup-form .password').val()
                },
                confirm: $('#signup-form .password_2').val()
            };


        if ($(this).attr('id') === 'login-form') {

            callAJAX(loginForm);

        } else if ($(this).attr('id') === 'signup-form') {
            if (passwordsMatch(signupForm.data.password, signupForm.confirm)) {
                callAJAX(signupForm);
            } else {
                $(this).siblings('p.message').addClass('error').text("Passwords don't match");
            }
        }
    });
});
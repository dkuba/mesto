$(document).ready(function(){
    set_bindings();
    init_current_user();

});

function set_bindings(){

    $("#create_account_link").click(function () {
        show_signup_menu();
        }
    );

    $("#back_to_signup_link").click(function (){
        show_login_menu();
        }
    );

    $('#button_login').click(function(event){
        console.log('логин')
        user_login($("input[name='sign_in_username']").val(),  $("input[name='sign_in_password']").val());
    });

    $('form[name="signup_form"]').submit(function(event){
        event.preventDefault();
        username_validation();
    });

    $("input[name='password_second']").click(function () {
        clear_input_borders();
    });
    $("input[name='signup_username']").click(function () {
        clear_input_borders();
    });
    $("input[name='password_first']").click(function () {
        clear_input_borders();
    });
    $("input[name='signup_email']").click(function () {
        clear_input_borders();
    });

}

function clear_input_borders(){
    $("input[name='signup_username']").css("border", "none");
    $("input[name='password_first']").css("border", "none");
    $("input[name='password_second']").css("border", "none");
    $("input[name='signup_email']").css("border", "none");
    $("#wrong_password_message").css("visibility", "hidden");
}

function username_validation(){
    set_waiting_spinner_on();
    const signup_username = $("input[name='signup_username']").val();
    if(signup_username === ""){
        set_signup_warning_message("signup_username","введите имя пользователя");
        return;
    }
    is_user_name_exist_request(signup_username);
}

function register_form_validation(){
    const email = $("input[name='signup_email']").val()
    const password_first = $("input[name='password_first']").val();
    const password_second = $("input[name='password_second']").val();

    if (!email_is_valid(email)){
        set_signup_warning_message("signup_email","некорректный e-mail");
    }
    else if( password_first !== password_second){
        set_signup_warning_message("password_second","пароли не совпадают");
    }
    else if(password_first === ""){
        set_signup_warning_message("password_first","введите пароль");
    }
    else if(password_second === ""){
        set_signup_warning_message("password_second","введите пароль");
    }
    else{
        register_new_user();
    }
}

function register_new_user(){
    set_waiting_spinner_on();
    register_new_user_request();
}

function register_new_user_request() {
    $.ajax({
        type: "POST",
        url: "/api/new_user_registration",
        data: $('form[name="signup_form"]').serialize(),
        dataType: 'json',
        success: function (response) {
                if(response === 'false'){
                    alert('Ошибка регистрации пользователя');
                    show_signup_menu();
                }else{
                    user_login();
                }

        },
        error: function(error) {
            console.log(error);
        }

});
}

function user_login(username, password){
    let loginData = {usr_name: username, pw: password }
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: JSON.stringify(loginData),
        dataType: 'json',
        success: function (response) {
                if(response === 'false'){
                    alert('Ошибка входа');
                    show_login_menu();
                }else{
                    alert('Вход выполнен');

                }

        },
        error: function(error) {
            console.log(error);
        }
});

}

function email_is_valid(email){
    return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email)
        && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
}

function set_signup_warning_message(input_name, warning_message){
    $(`input[name='${input_name}']`).css("border", "2px solid darkred");
    $("#wrong_password_message").html(warning_message);
    $("#wrong_password_message").css("visibility", "visible");
}

function is_user_name_exist_request(username){
    $.ajax({
        type: "POST",
        url: "/api/check_username",
        data: username,
        dataType: 'text',
        success: function (response) {
            set_waiting_spinner_off();
            if(response === 'false'){
                register_form_validation();
                }
            else if(response === 'true'){
                set_signup_warning_message("signup_username","Пользователь с таким именем существует");
                return true;
                }
            else {
                alert('Нераспознанный ответ сервера!');
            }
        },
        error: function(error) {
            console.log(error);
        }

});

}

function init_current_user() {
    set_waiting_spinner_on();
    $.ajax({
        type: "GET",
        url: "/api/current_user",
        success: function(current_user) {
                set_waiting_spinner_off();
                if (current_user.name == ''){
                      clear_user_view();
                      show_login_menu();
                }
                else{
                    hide_login_menu();
                    set_user_view(current_user);
                }
                },

        error: function(error) {
            console.log(error);
        }
    });
}

function clear_user_view(){
    $(".user-info").hide();
}

function set_user_view(user_info){
    $(".user-info").show();
    $(".user-info__name").html(user_info.name);
    if(user_info.avatar_url != ''){
        $(".user-info__photo").css("background-image", `url('${user_info.avatar_url}'`);
    }
}

function show_login_menu() {
    set_waiting_spinner_off();
    hide_signup_menu();
    $("#login_menu").css("display", "flex");
}

function hide_login_menu() {
    $("#login_menu").css("display", "none");
}

function show_signup_menu(){
    set_waiting_spinner_off();
    hide_login_menu();
    $("#signup_menu").css("display", "flex");
}

function hide_signup_menu(){
    $("#signup_menu").css("display", "none");
}

function set_waiting_spinner_on(){
    $("#waiting_spinner").css("display", "flex");
}

function set_waiting_spinner_off(){
    console.log('выключаем спиннер');
    $("#waiting_spinner").css("display", "none");
}

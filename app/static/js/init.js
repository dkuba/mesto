$(document).ready(function(){
    set_bindings();
    init_current_user();

});

function set_bindings(){

    $("#create_account_link").click(function () {
        hide_login_menu();
        show_signup_menu();
        }
    );

    $("#back_to_signup_link").click(function (){
        hide_signup_menu();
        show_login_menu();
        }
    );

    $('form[name="signup_form"]').submit(function(event){
        event.preventDefault();
        register_form_validation();
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

}

function clear_input_borders(){
    $("input[name='signup_username']").css("border", "none");
    $("input[name='password_first']").css("border", "none");
    $("input[name='password_second']").css("border", "none");
    $("#wrong_password_message").css("visibility", "hidden");
}

function register_form_validation(){
    const signup_username = $("input[name='signup_username']").val();
    console.log('signup_username', signup_username, '!');
    let password_first = $("input[name='password_first']").val();
    const password_second = $("input[name='password_second']").val();
    console.log("signup_username", signup_username);
    console.log("password_first", password_first);

    if(signup_username === ""){
        set_signup_warning_message("signup_username","введите имя пользователя");
    }
    else if(!is_user_name_exist(signup_username)){
        alert("name exists already!");
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
        alert("пароли совпали!");
    }
}

function set_signup_warning_message(input_name, warning_message){
    $(`input[name='${input_name}']`).css("border", "2px solid darkred");
    $("#wrong_password_message").html(warning_message);
    $("#wrong_password_message").css("visibility", "visible");
}

function is_user_name_exist(username){
    $.ajax({
        type: "POST",
        url: "/api/check_username",
        data: JSON.stringify({username: username}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result){
            console.log(result['is_username_exist']);
            return true;
        },

        error: function(error) {
            console.log(error);
        }
    });
}

function init_current_user() {
    $.ajax({
        type: "GET",
        url: "/api/current_user",
        success: function(current_user) {

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
    $("#login_menu").css("display", "flex");
}

function hide_login_menu() {
    $("#login_menu").css("display", "none");
}

function show_signup_menu(){
    $("#signup_menu").css("display", "flex");
}

function hide_signup_menu(){
    $("#signup_menu").css("display", "none");
}
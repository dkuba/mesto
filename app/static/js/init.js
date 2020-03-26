$(document).ready(function(){
    get_current_user();

});

function get_current_user() {
    $.ajax({
        type: "GET",
        url: "/api/current_user",
        success: function(current_user) {

        if (current_user.name == ''){
              clear_user_view();
              console.log("clear_user_view();")
              show_login_menu();
        }
        else{
            $(".user-info__name").html(current_user.name);
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

}

function show_login_menu() {
    $("#login_menu").css("display", "flex");
}
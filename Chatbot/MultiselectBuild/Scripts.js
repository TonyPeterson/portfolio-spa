$(document).ready(function () {
    $('input:checkbox').change(function () {
        if ($(this).closest("form").find("input:checkbox:checked").length > 0) {
            $(this).parent().siblings('.continue').removeClass('disabled');
        } else {
            $(this).parent().siblings('.continue').addClass('disabled');
        }
    });
});
$(function () {

    window.getCookie = function (name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }

    $("#filterBtn").on("click", () => {
        let url = "/users/details";

        $.get({url: url}).then((details) => {
            let cookie = window.getCookie(details.filterMyLeechesCookieName);

            if (cookie) {
                $('#showMyLeeches').prop('checked', true);
            } else {
                $('#showMyLeeches').prop('checked', false);
            }

            $('#gridSystemModal').modal('show');
        });
    });

    $("#showMyLeeches").on("change", () => {
        let url = "/users/details";

        $.get({url: url}).then((details) => {
            let isChecked = $("#showMyLeeches").is(':checked');
            let cookieName = "filterMyLeeches-" + details.userId;

            if (isChecked) {
                document.cookie = cookieName + "=" + isChecked;
            } else {
                document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01GMT;';
            }

            window.location.replace("/");
        });
    });
});

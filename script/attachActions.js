function attachEvents() {
    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    })

    //reg/login/logout events
    $("#loginBtn").on("click", function (e) { e.preventDefault(); loginAccount()})
    $("#registerBtn").on("click", function (e) { e.preventDefault(); registerAccount()})
    $("#nav .logout").on("click",function () { logoutAccount()})

    //nav events
    $("#nav-editor").on("click", function (){ showHomeView() })

    $("#addItemBtn").on("click", function (e) { e.preventDefault(); addEntry()})
    $("#checkoutBtn").on("click", function (e) { e.preventDefault(); checkout()})
    $("#nav-overview").on("click", function () { showMyReceipts()})
}
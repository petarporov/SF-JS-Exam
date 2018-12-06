function login(res, mes) {
    sessionStorage.setItem("username", res.username)
    sessionStorage.setItem("userId", res._id)
    sessionStorage.setItem("authToken", res._kmd.authtoken)
    $("#username-register").val("")
    $("#password-register").val("")
    $("#username-login").val("")
    $("#password-login").val("")

    $("#password-register-check").val("")
    showHomeView()
    showInfo(mes)
}

function logoutAccount() {
    remote.post("user", "_logout", "").then(function () {
        sessionStorage.clear()
        showHomeView()
        showInfo("Logout successful.")
    }).catch(function () {
        throwError("Bad Request")
    })

}

function loginAccount() {
    let userName = $("#username-login")
    let pass1 = $("#password-login")
    if(userName.val().length < 5){
        showError("invalid Username")
        return
    }
    if(pass1.val().length === 0){
        showError("invalid passwords")
        return
    }

    remote.post("user", "login", "basic", {username: userName.val(), password: pass1.val()})
        .then(function (res) {
            login(res, "login successful.")
        }).catch(function () {
        throwError("Bad Request")
    })
}

function registerAccount() {
    let userName = $("#username-register")
    let pass1 = $("#password-register")
    let pass2 = $("#password-register-check")

    if(userName.val().length < 5){
        showError("invalid Username")
        return
    }
    if(pass1.val().length === 0 || pass1.val() !== pass2.val()){
        showError("invalid passwords")
        return
    }
    remote.post("user", "", "basic", {username: userName.val(), password: pass1.val()})
        .then(function (res) {
            login(res, "User registration successful.")
        }).catch(function () {
        throwError("Bad Request")
    })
}

function buildEditor() {
    $("#active-entries > .row").remove()
    $("#total-sum").text(0)
    remote.get("appdata", `receipts?query={"_acl.creator":"${sessionStorage.getItem("userId")}","active":"true"}`, "kinvey")
        .then(function (res) {
            console.log(res)
            if(res.length < 1){
                remote.post("appdata", "receipts", "kinvey", {active: "true"})
            }else{
                console.log("first")
                activeReceiptExist(res)
            }
        }).catch(function () {
        throwError("Bad Request")
    })
}

function checkout() {
    showInfo("Receipt checked out")
    remote.update("appdata", `receipts/${$("#receipt-id").val()}`, "kinvey",
        {active: false, total: Number($("#total-sum").text())
            , productCount: Number($($("#create-receipt-form input").toArray()[2]).val())})
        .then(function () {
            showHomeView()
        }).catch(function () {
        throwError("Bad Request")
    })
}

function deleteEntry(e) {
    let target = $(e.target).parent().parent()
    remote.remove("appdata", "entries/" + target.attr("name"), "kinve")
        .then(function () {
            let sum = Number(Number($("#total-sum").text()) - Number(target.find("#sub-total").text()))
            let allEntries = Number($($("#create-receipt-form input").toArray()[2]).val())
            $($("#create-receipt-form input").toArray()[2]).val(allEntries - 1)
            $("#total-sum").text(sum.toFixed(2))
           target.remove()
        }).catch(function () {
        throwError("Bad Request")
    })
}

function showReceipts(res) {
    let total = 0
    for (let obj of res) {
        let row = $("<div class=\"row\">")
        row.append(`<div class="col wide">${(new Date(obj._kmd.ect)).toDateString()}</div>`)
        row.append(`<div class="col wide">${obj.productCount}</div>`)
        row.append(`<div class="col">${obj.total}</div>`)
        row.append($(`<div class="col">`).append("<a href=\"#\">Details</a>"))
        total += Number(obj.total)
        $("#prepend").prepend(row)
    }
    $("#total-all-receipt").text(total)
}

function showMyReceipts() {
    showAllReceipts()
    remote.get("appdata",
        `receipts?query={"_acl.creator":"${sessionStorage.getItem("userId")}","active":"false"}`, "kinvey")
        .then(function (res) {
            showReceipts(res)
        }).catch(function () {
        throwError("Bad Request")
    })
}
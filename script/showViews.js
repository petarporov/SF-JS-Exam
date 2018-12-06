function showHomeView() {
    hideAll()
    if(sessionStorage.getItem("authToken") === null){
        $("#profile").hide()
        $("#welcome-section").show()
    }else{
        $("#cashier > a").text(sessionStorage.getItem("username"))
        buildEditor()
        $("#profile").show()
        $("#create-receipt-view").show()
    }
}

function showAllReceipts() {
    $("#all-receipt-table .row").remove()
    console.log(2)
    hideAll()
    $("#all-receipt-view").show()
}

function showReceiptDetails() {
    hideAll()
    $("#receipt-details-view").show()
}
function hideAll() {
    $("section").hide()
}
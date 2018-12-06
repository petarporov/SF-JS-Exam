function activeReceiptExist(res) {
    let obj = res[0]
    $($("#create-receipt-form input").toArray()[1]).val(obj._id)
    remote.get("appdata", `entries?query={"receiptId":"${obj._id}"}`, "kinvey")
        .then(function (response) {
            $($("#create-receipt-form input").toArray()[2]).val(response.length)
            let total = 0
            for (let obj1 of response) {
                appendEntries(obj1)
                total += Number((Number(obj1.price) * Number(obj1.qty)).toFixed(2))
            }
            $($("#create-receipt-form input").toArray()[3]).val(total)
            $("#total-sum").text(total)
        }).catch(function () {
        throwError("Bad Request")
    })
}

function appendEntries(obj1) {
    let content = $("#active-entries")
    let row = $(`<div class="row" name="${obj1._id}">`)
    row.append(`<div class="col wide">${obj1.type}</div>`)
    row.append(`<div class="col wide">${obj1.qty}</div>`)
    row.append(`<div class="col wide">${obj1.price}</div>`)
    row.append(`<div id="sub-total" class="col">${(Number(obj1.price) * Number(obj1.qty)).toFixed(2)}</div>`)
    row.append($(`<div class="col right">`)
        .append($(`<a href="#">&#10006;</a>`).on("click",
            function (e) { deleteEntry(e)  })))

    content.append(row)
}

function addEntry(){
    let [name, qty, price, btn] = $("#create-entry-form input")
    if($(name).val().length < 1){
        showError("name must be not empty")
        return
    }
    $(qty).val(Number($(qty).val()))
    if($(qty).val() === "NaN"){
        showError("quantity must be number")
        return
    }
    $(price).val(Number($(price).val()))
    if($(price).val() ===  "NaN"){
        showError("price must be number")
        return
    }

    remote.post("appdata", "entries", "kinvey", {receiptId: $("#receipt-id").val(),
        price: $(price).val(), qty: $(qty).val(), type: $(name).val()})
        .then(function (res) {
            let sum = Number(($(price).val() * $(qty).val()).toFixed(2))
            $("#total-sum").text(Number($("#total-sum").text()) + sum)
            $(price).val("")
            $(qty).val("")
            $(name).val("")
            let allEntries = Number($($("#create-receipt-form input").toArray()[2]).val())
            $($("#create-receipt-form input").toArray()[2])
                .val(allEntries + 1)
            appendEntries(res)
    }).catch(function () {
        throwError("Bad Request")
    })
}
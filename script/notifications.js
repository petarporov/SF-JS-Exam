function showInfo(message) {
    let infoBox = $('#infoBox span')
    infoBox.text(message)
    $('#infoBox').show()
    $('#infoBox').on("click", function () {
        $('#infoBox').fadeOut()
    })
    setTimeout(function() {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(errorMsg) {
    let errorBox = $('#errorBox span')
    errorBox.text("Error: " + errorMsg)
    $('#errorBox').show()
    $('#errorBox').on("click", function () {
        $('#errorBox').fadeOut()
    })
    setTimeout(function() {
        $('#errorBox').fadeOut()
    }, 3000)
}

function throwError() {
    let errorBox = $('#errorBox span')
    errorBox.text("Error: " + errorMsg)
    $('#errorBox').show()
    $('#errorBox').on("click", function () {
        $('#errorBox').fadeOut()
    })
    setTimeout(function() {
        $('#errorBox').fadeOut()
    }, 3000)
}


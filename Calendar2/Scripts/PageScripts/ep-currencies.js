openAddForm("/Currency/AddCurrency");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`DeleteCurrency?id=${id}`, res);
    });
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    localStorage.setItem("symbol", e.parentElement.parentElement.children[1].textContent);
    localStorage.setItem("name", e.parentElement.parentElement.children[2].textContent);
    $.get(`/Currency/EditCurrency?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
setDatatable();

function result(res) {
    httpResponse(res);
}
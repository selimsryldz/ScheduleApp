openAddForm("/Customer/Add");

function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`DeleteCustomer?id=${id}`, res);
    });
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/Edit?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
        });
}
function getDetail(e) {
    const id = e.attributes["data-id"].value;
    window.location.href = `/Customer/Details?id=${id}`;
}

function result(res) {
    httpResponse(res);
}
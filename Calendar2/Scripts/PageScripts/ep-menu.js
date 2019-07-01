openAddForm("/Menu/AddMenu");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`DeleteMenu?id=${id}`, "Menüyü siliyorsunuz!");
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;

    $.get(`/Menu/EditMenu?id=${id}`)
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
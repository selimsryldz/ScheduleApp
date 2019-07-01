openAddForm("/Storage/AddStorage");
function stRemove(e) {
    tableDataRemove(`Remove?id=${getId(e)}`, "Depoyu siliyorsunuz!");
}

function stEdit(e) {
    blockUi();
    localStorage.setItem("name", e.parentElement.parentElement.children[0].textContent.trim());
    localStorage.setItem("description", e.parentElement.parentElement.children[1].textContent.trim());
    $.get(`/Storage/EditStorage?id=${getId(e)}`)
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
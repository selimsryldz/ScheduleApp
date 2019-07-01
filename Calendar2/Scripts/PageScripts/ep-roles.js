openAddForm("/Role/AddRolePartial");

function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`RemoveRole?id=${id}`, "Rolü silmek istiyormusunuz");
}
function stDetail(e) {
    const id = getId(e);
    window.location.href = `/Role/Detail?id=${id}`;
}

function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Role/EditRole?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
        });
}
setDatatable();

function result(res) {
    httpResponse(res);
}
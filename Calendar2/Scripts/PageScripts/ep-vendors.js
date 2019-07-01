openAddForm("/Vendor/AddVendor");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`RemoveVendor?id=${id}`, res);
    });
}

function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Vendor/EditVendor?id=${id}`)
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
function begin() {
    blockUi();
}
function complete() {
    $.unblockUI();
}
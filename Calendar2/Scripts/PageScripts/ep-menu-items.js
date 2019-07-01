validate("#add-menu-item");
validate("#edit-menu-item");
validate("#transaction-menu-item");
function stAdd(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Menu/AddMenuItem?id=${id}`)
        .done(function (responsedata) {
            $("#add-form").html(responsedata);
            $('#add-modal').modal('show');
            $.unblockUI();
        });
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;

    const mId = e.attributes["data-mid"].value;
    $.get(`/Menu/EditMenuItem?id=${id}&mId=${mId}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
function stTransaction(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Menu/AddTransaction?id=${id}`)
        .done(function (responsedata) {
            $("#transaction-form").html(responsedata);
            $('#transaction-modal').modal('show');
            $.unblockUI();
        });
}
function deleteMenuItem(e) {
    const menuItemId = e.attributes["data-menuItemId"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`DeleteMenuItem?id=${menuItemId}`, res);

    });
    
}
function activeMenuItem(e) {
    const menuItemId = e.attributes["data-menuItemId"].value;
    getRequest(`ActiveMenuItem?id=${menuItemId}`).then((ok) => {
        httpResponse(ok);
    });
}
var options = { tableId: "table", orderColumn: "1", orderArrow: "asc" }
setDatatable(null,true,options);
function result(res) {
    httpResponse(res);
}
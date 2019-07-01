var options = {
    tableId: "table",
    orderColumn: "1",
    orderArrow: "asc"
};
setDatatable(null, true, options);

function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveRival?id=${id}`, res);
    });
}

function stEdit(e) {

    blockUi();
    const id = e.attributes["data-id"].value;
   $.get(`/Rival/EditRival?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
           
        });
    
}
function getDetail(e) {
    const id = e.attributes["data-id"].value;
    window.location.href = `/Rival/Details?id=${id}`;
    
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
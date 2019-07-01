openAddForm("/Personnel/AddPersonnel");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`DeletePersonnel?id=${id}`, res);
    });
}

function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Personnel/EditPersonnel?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
function getDetail(e) {
    window.location.href = `/Personnel/Detail?id=${getId(e)}`;
}
setDatatable();

function result(res) {
    httpResponse(res);
}
openAddForm("/Product/AddExcelFile");


function stAddAttch(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Product/AddExcelFile?id=${id}`)
        .done(function (responsedata) {
            $("#excel-form").html(responsedata);
            $('#excel-modal').modal('show');
            $.unblockUI();
        });
}

function result(res) {
    httpResponse(res);
}

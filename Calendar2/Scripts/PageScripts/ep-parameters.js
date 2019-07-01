openAddForm("/Parameter/AddParameter");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`DeleteParameter?id=${id}`, "Parametreyi siliyorsunuz!");
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    localStorage.setItem("key", e.parentElement.parentElement.children[1].textContent);
    localStorage.setItem("value", e.parentElement.parentElement.children[2].textContent);
    $.get(`/Parameter/EditParameter?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
var opt = {
    type: "local",
    layout: {
        theme: 'default',
        class: 'm-datatable--brand',
        scroll: false,
        height: null,
        footer: false,
        header: true,

        smoothScroll: {
            scrollbarShown: true
        }
    },
    sortable: true,
    responsive: true,
    pagination: true,
    search: {
        onEnter: false,
        input: $('#generalSearch'),
    },

    rows: {
        callback: function () { },
        autoHide: false,
    },
    initComplete: function (e) {
        console.log(e);
    }
}
$("#html_table").mDatatable(opt);

function result(res) {
    httpResponse(res);
}
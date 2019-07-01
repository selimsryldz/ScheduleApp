function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`DeleteSession?id=${id}`, "User Session siliyorsunuz!");
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
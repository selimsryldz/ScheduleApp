function stEditCurrencyExchange(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Currency/EditCurrencyExchange?id=${id}`)
        .done(function (responsedata) {
            $("#edit-exchange-form").html(responsedata);
            $('#edit-exchange-modal').modal('show');
            $.unblockUI();
        });
}
function stUpdateCurrencyExchange(e) {
    const id = e.attributes["data-id"].value;
    $.get(`/Currency/UpdateCurrencyExchange?id=${id}`)
        .done(function (responsedata) {
            httpResponse(responsedata);
        });
}

function updateCurrencyExchanges() {
    $.get(`/Currency/CurrencyExchange?type=refresh`)
        .done(function (responsedata) {
            window.location.href = window.location;
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
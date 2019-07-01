openAddForm("/Notification/AddNotification");
function deleteNotification(e) {
    const notificationId = e.attributes["data-notificationId"].value;
    swal({
        title: "Emin Misiniz?",
        text: "Duyuruyu silmek üzeresiniz!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Evet"
    }).then(function (se) {
        if (se.value) {
            blockUi();
            getRequest(`DeleteNotification?id=${notificationId}`).then((ok) => {
                httpResponse(ok);
                $.unblockUI();
            });
        }
    });
}
function activeNotification(e) {
    blockUi();
    const notificationId = e.attributes["data-notificationId"].value;
    getRequest(`SetActived?id=${notificationId}`).then((ok) => {
        httpResponse(ok);
        $.unblockUI();
    });
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Notification/EditNotification?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
var opt = {
    type: "local",
    noRecords: 'Kayıt bulunamadı.',
    layout: {
        theme: "default",
        class: "m-datatable--brand",
        scroll: false,
        height: null,
        footer: false,
        header: true,

        smoothScroll: {
            scrollbarShown: true
        },

        spinner: {
            overlayColor: "#000000",
            opacity: 0,
            type: "loader",
            state: "brand",
            message: true
        },

        icons: {
            sort: { asc: "la la-arrow-up", desc: "la la-arrow-down" },
            pagination: {
                next: "la la-angle-right",
                prev: "la la-angle-left",
                first: "la la-angle-double-left",
                last: "la la-angle-double-right",
                more: "la la-ellipsis-h"
            },
            rowDetail: { expand: "fa fa-caret-down", collapse: "fa fa-caret-right" }
        }
    },
    sortable: true,
    responsive: true,
    pagination: true,
    search: {
        onEnter: false,
        input: $("#generalSearch")
    },
  
    detail: {
        title: "Hedef Kullanıcılar",
        content: function (e) {
            console.log(e);
            const id = e.data["#"].split("_")[1];
            console.log(id);
            $("<div />").attr("id", `s_${e.data["#"]}`).appendTo(e.detailCell).mDatatable({
                data: {
                    type: "remote",
                    source: {
                        read: {
                            url: setApiUrl(`GetNotificationUsersWithViewState?id=${id}`, "get"),
                            method: "GET",
                            params: {
                            },
                            map: function (raw) {
                                return raw.Result;
                            }
                        }
                    },
                    pageSize: 10,
                    serverPaging: 1,
                    serverFiltering: 0,
                    serverSorting: 1
                },
                layout: {
                    theme: "default",
                    scroll: 1,
                    height: 300,
                    footer: 0,
                    spinner: {
                        type: 1,
                        theme: "default"
                    }
                },
                sortable: 1,
                columns: [

                    {
                        field: "FirstName",
                        title: "İsim"
                    },
                    {
                        field: "LastName",
                        title: "Soyisim"
                    }, {
                        field: "Email",
                        title: "E-Mail"
                    }, {
                        field: "Phone",
                        title: "Telefon"
                    }, {
                        field: "Viewed",
                        title: "Görüldü?"
                    }
                ]
            });
        }
    },

    rows: {
        callback: function () { },
        autoHide: false
    },
    initComplete: function (e) {
        console.log(e);
    },
    sort: {
        sort: "asc",
        field: "Tarih"
    }
};
$("#html_table").mDatatable(opt);

function result(res) {
    httpResponse(res);
}
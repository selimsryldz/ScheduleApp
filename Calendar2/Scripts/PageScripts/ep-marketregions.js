openAddForm("/MarketRegion/AddMarketRegion");

function stRemoveCity(e) {
    const cityId = e.attributes["data-cityId"].value;
    const marketRegionId = e.attributes["data-marketRegionId"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`DeleteCityToMarketRegion?cityId=${cityId}&marketRegionId=${marketRegionId}`, res);
    });
}

function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`DeleteMarketRegion?id=${id}`, res);

    });
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/MarketRegion/EditMarketRegion?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
function stAddCity(e) {
    blockUi();
    $.get(`/MarketRegion/AddCityToMarketRegion?id=${getId(e)}`)
        .done(function (responsedata) {
            $("#add-city-form").html(responsedata);
            $('#add-city-modal').modal('show');
            $.unblockUI();
        });
}

var opt = {
    type: "local",
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
    columns: [
        {
            field: "#",
            width: 40
        },
        {
            field: "Rol"
        }
    ],
    detail: {
        title: "Load sub table",
        content: function (e) {
            //console.log(e);
            const id = e.data["#"].split("_")[1];
            $("<div/>").attr("id", `s_${e.data["#"]}`).appendTo(e.detailCell).mDatatable({
                data: {
                    type: "remote",
                    source: {
                        read: {
                            url: setApiUrl(`GetMarketRegionCityList?id=${id}`, "get"),
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
                        field: "CountryName",
                        title: "Ülke"
                    },
                    {
                        field: "CityName",
                        title: "Şehir"
                    }, {
                        field: "Actions",
                        width: 110,
                        title: "İşlemler",
                        sortable: false,
                        overflow: "visible",
                        template: function (t) {
                            return `<button data-cityId="${t.CityId}" data-marketRegionId="${t.MarketRegionId}"  class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Şehri Kaldır" onclick="stRemoveCity(this)">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</button>\t\t\t\t\t`;
                        }
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
    }
};
$("#html_table").mDatatable(opt);

function result(res) {
    httpResponse(res);
}
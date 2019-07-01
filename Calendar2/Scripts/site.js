const MainUrl = "http://localhost:25502/";
//const MainUrl = "https://ep.wy.com.tr/";
//const MainUrl = "https://eptest.wy.com.tr/";

const BaseUrl = MainUrl + "JsRequest";
const LanguageUrl = MainUrl + "Language/Index";
const ServerIp = BaseUrl;
const postAddress = ServerIp + "/post";
function httpGet(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', setApiUrl(url, "get"), true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const resp = request.response;
                resolve(JSON.parse(resp));
            } else {
                reject(request);
            }
        };
        request.onerror = function (r) {
            reject(r);
        };
        request.send();
    });
}
function httpGetWebUi(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const resp = request.response;
                resolve(JSON.parse(resp));
            } else {
                reject(request);
            }
        };

        request.onerror = function (r) {
            reject(r);
        };
        request.send();
    });
}
function httpGetLang(key) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', setLangUrl(key), true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const resp = request.response;
                resolve(resp);
            } else {
                reject(request);
            }
        };

        request.onerror = function (r) {
            reject(r);
        };
        request.send();
    });
}
function httpPost(data) {
    return new Promise(function (resolve, reject) {
        $.post(postAddress, data).done((res) => { resolve(res) });
    });
}
function setApiUrl(transactionName, type) {
    transactionName = transactionName.replace(/&/g, "-");
    const url = ServerIp + "/" + type + "?tName=" + transactionName;
    return url;
}
function setLangUrl(key) {
    return LanguageUrl + "?key=" + key;
}
function httpResponse(res, options = {
    redirect: window.location.href,
    isRefresh: true,
    wMessage: "Hata",
    sMessage: "Başarılı"
}) {
    options.redirect = options.redirect === undefined ? window.location.href : options.redirect;
    options.isRefresh = options.isRefresh === undefined ? true : options.isRefresh;
    options.wMessage = options.wMessage === undefined ? "Hata" : options.wMessage;
    options.sMessage = options.sMessage === undefined ? "Başarılı" : options.sMessage;
    if (options.redirect.indexOf("#")) {
        options.redirect = options.redirect.replace("#", "");
    }
    const result = res;
    console.log(result);
    if (result.Errors.length > 0) {
        toastr.clear();
        for (let i = res.Errors.length - 1; i >= 0; i--) {
            toastr.error(res.Errors[i]);
        }
    } else {
        toastr.clear();
        toastr.info(options.sMessage);
        if (options.isRefresh) {
            window.location.href = options.redirect;
        } else {
            //TODO : console
        }
    }
}

function getRequest(url, isWebRequest = false) {
    blockUi();
    return Promise.resolve($.ajax({
        url: isWebRequest ? url : setApiUrl(url, "get"),
        type: "get",
        success: function (res) {
            $.unblockUI();
        },
        error: function (res) {
            $.unblockUI();
            return swal({
                title: "HATA!",
                text: "Beklenmeyen bir hata oluştu. Teknik ekibe mail yoluyla iletmek ister misiniz?",
                type: "error",
                showCancelButton: true,
                confirmButtonText: "Evet",
                cancelButtonText: "Hayır"
            }).then(function (e) {

                if (e.value) {
                    $.get(`/JsRequest/SendMail?r=${url}&p=${window.location.pathname}`)
                        .done(function (responsedata) {
                            swal("Başarılı!", responsedata + " ", "success");
                        });
                }

            });
        }
    }));
}

function epSwalAlert(options = {}) {
    return swal({
        title: "Uyarı",
        text: options.message,
        type: "warning",
        cancelButtonText: "Hayır",
        showCancelButton: true,
        confirmButtonText: "Evet"
    });
}
function epSwalAlert2(options = {}) {
    httpGetLang("Warning").then((res) => {
        return swal({
            title: res,
            text: options.message,
            type: "warning",
            cancelButtonText: "Hayır",
            showCancelButton: true,
            confirmButtonText: "Evet"
        });
    });
}
function setChildTableOpt(url, columns) {
    const opt = {
        data: {
            type: "remote",
            source: {
                read: {
                    url: url,
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
        columns: columns
    };
    return opt;
}
function setDataTableOptions(options = {}) {
    const opt = {
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
            }
        ],
        detail: {
            title: "Detaya Git",
            content: function (e) {
                options.detailContent(e);
            }
        },

        rows: {
            callback: function () { },
            autoHide: false
        },
        initComplete: function (e) {
            console.log(e);
        },
        translate: {
            records: {
                processing: "Yükleniyor...",
                noRecords: "Kayıt bulunamadı."
            }
        }
    }

    return opt;
}
function setDataTableOptionsNotSubTable() {
    const opt = {
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
        rows: {
            callback: function () { },
            autoHide: false
        },
        initComplete: function (e) {
            console.log(e);
        },
        translate: {
            records: {
                processing: "Yükleniyor...",
                noRecords: "Kayıt bulunamadı"
            }
        }
    }

    return opt;
}
function tableDataRemove(url, message) {

    epSwalAlert({ message: message }).then(function (re) {
        if (re.value) {
            httpGetLang("PleaseWait").then((res) => {
                toastr.warning(res);
            });

            getRequest(url).then((res) => {
                httpResponse(res);

            });
        } else {

        }
    });
}
function openAddForm(url, selector = ".addNewItem", divName = "#add-form", modalName = "#add-modal") {
    $(selector).click(function () {
        blockUi();
        $.get(url)
            .done(function (responsedata) {
                $(divName).html(responsedata);
                $(modalName).modal("show");
                $.unblockUI();
            });
    });
}

function ddlGenerator(data, value, text, name, selectedId = 0, multiple = false, required = false) {
    selectedId = parseInt(selectedId);
    var select = document.createElement("select");
    select.className = "form-control m-bootstrap-select m_selectpicker ddlGenerator";

    if (multiple) {
        select.setAttribute("multiple", "multiple");
        select.setAttribute("data-actions-box", "true");
    } else {
        select.setAttribute("data-live-search", "true");
    }
    select.setAttribute("required", "required");
    select.name = name;
    if (selectedId === 0)
        select.options.add(new Option("Seçiniz", "0", true, true));
    data.forEach(function (v) {
        if (selectedId === v[value]) {
            select.options.add(new Option(v[text], v[value], true, true));
        } else
            select.options.add(new Option(v[text], v[value]));
    });
    return select;
}

function ddlGeneratorForSelect2(data, value, text, name) {
    var select = document.createElement("select");
    select.className = "form-control m-select2 ddlGenerator";
    select.setAttribute("multiple", "multiple");
    select.setAttribute("aria-hidden", "true");
    select.name = name;
    data.forEach(function (v) {
        select.options.add(new Option(v[text], v[value]));
    });
    return select;
}
function addChildTable() {
}

function validate(formId) {
    $(formId).validate({
        lang: "tr",
        invalidHandler: function (e, r) {
            toastr.clear();
            toastr.warning("Lütfen formu uygun biçimde doldurunuz.", "Uyarı!");
        }
    });
}
function closeModal(modalSelector) {
    $(modalSelector).modal("dispose");
}
function getId(e) {
    return parseInt(e.parentElement.children[0].value);
}
function fail(e) {
    console.log(e);
}
function begin(e) {
    console.log(e);
}

function setAjaxDatatable(transactionName, options = { tableId: "table", orderColumn: "0", orderArrow: "asc" }, columns) {
    var uri = BaseUrl + "/AjaxDatatablePost?tName=" + transactionName;
    var e;
    (e = $(`#${options.tableId}`).DataTable({
        order: [[options.orderColumn, options.orderArrow]],
        responsive: true,
        pagingType: "full_numbers",
        pageLength: 50,
        dom:
            "<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
        buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
        select: { style: "multi", selector: "td:first-child .m-checkable" },
        columnDefs: [{ orderable: true }],
        "ajax": { "url": uri, type: "POST", datatype: "json" },
        "columns": columns,
        "processing": true,
        "serverSide": true,
        "ordering": true,
        "lengthChange": true,
        "searching": true,
        paging: true
    }));
    return e;
}

function setDatatable(i, checkBoxEnable = true, options = { tableId: "table", orderColumn: "0", orderArrow: "asc" }) {
    if (i == null) {
        $(`#${options.tableId} tfoot th`).each(function () {
            const title = $(this).text();
            if (title !== "İşlemler" || title !== "Transactions") {
                $(this).html(`<input type="text" class="form-control" />`);
            }
        });
        var e;
        (e = $(`#${options.tableId}`).DataTable({
            order: [[options.orderColumn, options.orderArrow]],
            responsive: true,
            pagingType: "full_numbers",
            pageLength: 50,
            dom:
                "<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
            buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
            select: { style: "multi", selector: "td:first-child .m-checkable" },
            columnDefs: [{ orderable: true }],
            ajax: "",
            columns: null
        }).on("change",
            ".m-group-checkable",
            function () {
                var a = $(this).closest("table").find("td:first-child .m-checkable"), t = $(this).is(":checked");
                $(a).each(function () {
                    t
                        ? ($(this).prop("checked", true), e.rows($(this).closest("tr")).select())
                        : ($(this).prop("checked", false), e.rows($(this).closest("tr")).deselect());
                });
            }), $("#m_search").on("click",
                function (t) {
                    t.preventDefault();
                    var e = {};
                    $(".m-input").each(function () {
                        var a = $(this).data("col-index");
                        e[a] ? e[a] += "|" + $(this).val() : e[a] = $(this).val();
                    }), $.each(e, function (t, e) { a.column(t).search(e || "", false, false) }), a.table().draw();
                })
        );
        e.columns().every(function () {
            var that = this;
            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
        return e;
    } else {
        for (var a = 0; a <= i; a++) {
            $(`#${options.tableId}-${a} tfoot th`).each(function () {
                var title = $(this).text();
                if (title !== "İşlemler") {
                    $(this).html('<input type="text" class="form-control" />');
                }
            });
            var e;

            (e = $(`#${options.tableId}-${a}`).DataTable({
                order: [[options.orderColumn, options.orderArrow]],
                responsive: true,
                dom:
                    "<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
                select: { style: "multi", selector: "td:first-child .m-checkable" },
                columnDefs: [{ orderable: true }]
                //language: {
                //    "url": `/Content/languageFile/${language}.Json`
                //}
            }).on("change",
                ".m-group-checkable",
                function () {
                    var a = $(this).closest("table").find("td:first-child .m-checkable"), t = $(this).is(":checked");
                    $(a).each(function () {
                        t
                            ? ($(this).prop("checked", true), e.rows($(this).closest("tr")).select())
                            : ($(this).prop("checked", false), e.rows($(this).closest("tr")).deselect());
                    });
                }), $("#m_search").on("click",
                    function (t) {
                        t.preventDefault();
                        var e = {};
                        $(".m-input").each(function () {
                            var a = $(this).data("col-index");
                            e[a] ? e[a] += "|" + $(this).val() : e[a] = $(this).val();
                        }), $.each(e, function (t, e) { a.column(t).search(e || "", false, false) }), a.table().draw();
                    })
            );
            e.columns().every(function () {
                var that = this;
                $('input', this.footer()).on('keyup change',
                    function () {
                        if (that.search() !== this.value) {
                            that
                                .search(this.value)
                                .draw();
                        }
                    });
            });
        }
    }
}
function dataTableInitialize() {
}
function blockUi() {
    $.blockUI({
        message: "Lütfen Bekleyiniz",
        css: {
            border: "none",
            padding: "15px",
            backgroundColor: "#000",
            '-webkit-border-radius': "10px",
            '-moz-border-radius': "10px",
            opacity: .5,
            color: "#fff"
        }
    });

}

function labelRequired() {
    $(".required").append("* ");
}

function submitButton() {
    var button = $(".modal-footer :submit");
    $(button).click(function () {
        toastr.warning("Lütfen Bekleyiniz...");
    });
}

function formFunctions() {
    labelRequired();
    submitButton();
}
function inlineModalGenerator(url, div, modal) {
    $.blockUI({
        message: "Lütfen bekleyin..",
        css: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    });
    $.get(url).done(function (responsedata) {
        $(div).html(responsedata);
        $(modal).modal("show");
        $.unblockUI();
        $(modal).on("hidden.bs.modal",
            function (e) {
                $(div).html("");
            });
    });
}

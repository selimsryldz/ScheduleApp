var DatatablesExtensionsKeytable = {
    init: function () {
        var e;
        $("#m_table_1").DataTable({
            responsive: !0,
            select: !0,
            columnDefs: [
                {
                    targets: -1,
                    title: "Actions",
                    orderable: !1,
                    render: function (e, a, t, n) {
                        return '\n                        <span class="dropdown">\n                            <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">\n                              <i class="la la-ellipsis-h"></i>\n                            </a>\n                            <div class="dropdown-menu dropdown-menu-right">\n                                <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\n                                <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\n                                <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\n                            </div>\n                        </span>\n                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">\n                          <i class="la la-edit"></i>\n                        </a>'
                    }
                }, {
                    targets: 8,
                    render: function (e, a, t, n) {
                        var s = {
                            1: { title: "Pending", class: "m-badge--brand" },
                            2: { title: "Delivered", class: " m-badge--metal" },
                            3: { title: "Canceled", class: " m-badge--primary" },
                            4: { title: "Success", class: " m-badge--success" },
                            5: { title: "Info", class: " m-badge--info" },
                            6: { title: "Danger", class: " m-badge--danger" },
                            7: { title: "Warning", class: " m-badge--warning" }
                        };
                        return void 0 === s[e]
                            ? e
                            : '<span class="m-badge ' + s[e].class + ' m-badge--wide">' + s[e].title + "</span>"
                    }
                }, {
                    targets: 9,
                    render: function (e, a, t, n) {
                        var s = {
                            1: { title: "Online", state: "danger" },
                            2: { title: "Retail", state: "primary" },
                            3: { title: "Direct", state: "accent" }
                        };
                        return void 0 === s[e]
                            ? e
                            : '<span class="m-badge m-badge--' +
                            s[e].state +
                            ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' +
                            s[e].state +
                            '">' +
                            s[e].title +
                            "</span>"
                    }
                }
            ]
        }),
            (e = $("#m_table_2").DataTable({
                responsive: !0,
                select: { style: "multi", selector: "td:first-child .m-checkable" },
                headerCallback:
                    function (e, a, t, n, s) {
                        e.getElementsByTagName("th")[0].innerHTML =
                            '\n                    <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">\n                        <input type="checkbox" value="" class="m-group-checkable">\n                        <span></span>\n                    </label>'
                    },
                columnDefs: [
                    {
                        targets: 0,
                        orderable: !1,
                        render: function (e, a, t, n) {
                            return '\n                        <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">\n                            <input type="checkbox" value="" class="m-checkable">\n                            <span></span>\n                        </label>'
                        }
                    },
                    {
                        targets: -1,
                        title: "Actions",
                        orderable: !1,
                        render: function (e, a, t, n) {
                            return '\n                        <span class="dropdown">\n                            <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">\n                              <i class="la la-ellipsis-h"></i>\n                            </a>\n                            <div class="dropdown-menu dropdown-menu-right">\n                                <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\n                                <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\n                                <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\n                            </div>\n                        </span>\n                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">\n                          <i class="la la-edit"></i>\n                        </a>'
                        }
                    }, {
                        targets: 8,
                        render: function (e, a, t, n) {
                            var s = {
                                1: { title: "Pending", class: "m-badge--brand" },
                                2: { title: "Delivered", class: " m-badge--metal" },
                                3: { title: "Canceled", class: " m-badge--primary" },
                                4: { title: "Success", class: " m-badge--success" },
                                5: { title: "Info", class: " m-badge--info" },
                                6: { title: "Danger", class: " m-badge--danger" },
                                7: { title: "Warning", class: " m-badge--warning" }
                            };
                            return void 0 === s[e]
                                ? e
                                : '<span class="m-badge ' + s[e].class + ' m-badge--wide">' + s[e].title + "</span>"
                        }
                    }, {
                        targets: 9,
                        render: function (e, a, t, n) {
                            var s = {
                                1: { title: "Online", state: "danger" },
                                2: { title: "Retail", state: "primary" },
                                3: { title: "Direct", state: "accent" }
                            };
                            return void 0 === s[e]
                                ? e
                                : '<span class="m-badge m-badge--' +
                                s[e].state +
                                ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' +
                                s[e].state +
                                '">' +
                                s[e].title +
                                "</span>"
                        }
                    }
                ]
            })).on("change",
                ".m-group-checkable",
                function () {
                    var a = $(this).closest("table").find("td:first-child .m-checkable"), t = $(this).is(":checked");
                    $(a).each(function () {
                        t
                            ? ($(this).prop("checked", !0), e.rows($(this).closest("tr")).select())
                            : ($(this).prop("checked", !1), e.rows($(this).closest("tr")).deselect())
                    })
                })
    }
};
jQuery(document).ready(function () { DatatablesExtensionsKeytable.init() });
(function ($) {
    "use strict";
    $.fn.epDataTable = function (opt) {
        var keys = [{}];
        keys = opt.keys;
        var epOp = $.extend({
            pageSize: 10
        }, opt);
        const options = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: opt.url,
                        method: 'GET',
                        map: function (raw) {
                            console.log(raw.Result);
                            console.log(raw);
                            console.log(Object.keys(raw.Result[0]));
                            return raw.Result;
                        },
                    }
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true
                },

                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,
                autoColumns: false
            },

            layout: {
                theme: 'default',
                class: 'm-datatable--brand',
                scroll: false,
                height: null,
                footer: false,
                header: true,

                smoothScroll: {
                    scrollbarShown: true
                },

                spinner: {
                    overlayColor: '#000000',
                    opacity: 0,
                    type: 'loader',
                    state: 'brand',
                    message: true
                },

                icons: {
                    sort: { asc: 'la la-arrow-up', desc: 'la la-arrow-down' },
                    pagination: {
                        next: 'la la-angle-right',
                        prev: 'la la-angle-left',
                        first: 'la la-angle-double-left',
                        last: 'la la-angle-double-right',
                        more: 'la la-ellipsis-h'
                    },
                    rowDetail: { expand: 'fa fa-caret-down', collapse: 'fa fa-caret-right' }
                }
            },

            sortable: true,

            pagination: true,

            search: {
                // enable trigger search by keyup enter
                onEnter: false,
                // input text for search
                input: $('#generalSearch'),
                // search delay in milliseconds
            },

            detail: {
                title: 'Load sub table',
                content: function (e) {
                    // e.data
                    // e.detailCell
                }
            },

            rows: {
                callback: function () { },
                // auto hide columns, if rows overflow. work on non locked columns
                autoHide: false,
            },

            // columns definition
            columns: [{
                field: "#",
                title: "#",
                width: 40,
            }, {
                field: "Role",
                title: "Rol İsmi",
                sortable: 'asc',
                width: 150,
            }, {
                field: "Description",
                title: "Açıklama",
                width: 150,
            }],
            toolbar: {
                layout: ['pagination', 'info'],

                placement: ['bottom'],  //'top', 'bottom'

                items: {
                    pagination: {
                        type: 'default',

                        pages: {
                            desktop: {
                                layout: 'default',
                                pagesNumber: 6
                            },
                            tablet: {
                                layout: 'default',
                                pagesNumber: 3
                            },
                            mobile: {
                                layout: 'compact'
                            }
                        },

                        navigation: {
                            prev: true,
                            next: true,
                            first: true,
                            last: true
                        },

                        pageSizeSelect: [10, 20, 30, 50, 100]
                    },

                    info: true
                }
            },

            translate: {
                records: {
                    processing: 'Lütfen bekleyin...',
                    noRecords: 'No records found'
                },
                toolbar: {
                    pagination: {
                        items: {
                            default: {
                                first: 'First',
                                prev: 'Previous',
                                next: 'Next',
                                last: 'Last',
                                more: 'More pages',
                                input: 'Page number',
                                select: 'Select page size'
                            },
                            info: 'Displaying {{start}} - {{end}} of {{total}} records'
                        }
                    }
                }
            }
        }
        this.mDatatable(options);
    }
})(jQuery)
var stringStartDate = null;
var stringEndDate = null;
var searchType = null;
const searchTypeEnum = {
    Date: 1,
    Storage: 2,
    Product: 3,
    Category: 4,
    ChangeType: 5
};
$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        switch (searchType) {

            case searchTypeEnum.Date:
                return dateSearch(settings, data, dataIndex);
            case searchTypeEnum.Storage:
                return true;
            case searchTypeEnum.Category:
                return categorySearch(settings, data, dataIndex);
            default:
                return true;
        }
    }
);
var t = {
    leftArrow: '<i class="la la-angle-left"></i>',
    rightArrow: '<i class="la la-angle-right"></i>'
};
var picker = $("#m_datepicker_5").datepicker({ rtl: false, todayHighlight: !0, templates: t, autoclose: true });
var table;
$(`#table tfoot th`).each(function () {
    const title = $(this).text();
    const cellIndex = $(this)[0].cellIndex;
    if (cellIndex === 1 || cellIndex === 6 || cellIndex === 5 || cellIndex === 0) {
    }
    else if (title !== "İşlemler" || title !== "Transactions") {
        $(this).html(`<input type="text" class="form-control" placeholder="Ara ${title}" />`);
    }
});
(table = $(`#table`).DataTable({
    initComplete: function () {
        this.api().columns([0,1, 5]).every(function () {
            var column = this;
            var select = $('<select class="form-control"><option value="">Seçiniz</option></select>')
                .appendTo($(column.footer()).empty())
                .on('change', function () {
                    const val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                        .search(val ? `^${val}$` : '', true, false)
                        .draw();
                });

            column.data().unique().sort().each(function (d, j) {
                select.append(`<option value="${d}">${d}</option>`);
            });
        });
    },
    order: [["6", "desc"]],
    responsive: true,
    dom:
        "<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
    buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    select: { style: "multi", selector: "td:first-child .m-checkable" },
    columnDefs: [{ orderable: true }]
}).on("change", ".m-group-checkable",
    function () {
        var a = $(this).closest("table").find("td:first-child .m-checkable"), t = $(this).is(":checked");
        $(a).each(function () {
            t
                ? ($(this).prop("checked", true), table.rows($(this).closest("tr")).select())
                : ($(this).prop("checked", false), table.rows($(this).closest("tr")).deselect());
        });
    }), $("#m_search").on("click",
        function (t) {
            t.preventDefault();
            var e = {};
            $(".m-input").each(function () {
                var a = $(this).data("col-index");
                e[a] ? e[a] += `|${$(this).val()}` : e[a] = $(this).val();
            }), $.each(e, function (t, e) { a.column(t).search(e || "", false, false) }), a.table().draw();
        })
);
table.columns().every(function () {
    var that = this;
    $('input', this.footer()).on('keyup change', function () {
        if (that.search() !== this.value) {
            that.search(this.value).draw();
        }
    });
});
$("#m_datepicker_5").on('changeDate', () => {
    stringStartDate = $("#startDate").val();
    stringEndDate = $("#endDate").val();
    if (stringStartDate != null && stringEndDate != null) {
        searchType = searchTypeEnum.Date;
        table.draw();
    };
});

function dateSearch(settings, data, dataIndex) {
    const startDate = new Date(stringStartDate).getTime();
    const endDate = new Date(stringEndDate).getTime();
    const valueDate = new Date(data[6]).getTime();
    if (stringStartDate == null || stringEndDate == null) {
        return true;
    }
    if (valueDate > startDate && valueDate < endDate) {
        return true;
    }
    return false;
}
var selectBoxValue = 0;
$("#productCat").change((e) => {
    searchType = searchTypeEnum.Category;
    selectBoxValue = parseInt(e.target.value);
    table.draw();
});
function categorySearch(settings, data, dataIndex) {
    if (selectBoxValue === 0) return true;
    const categoryId = parseInt(settings.aoData[dataIndex].anCells[0].attributes["data-catid"].value);
    return selectBoxValue === categoryId;
}
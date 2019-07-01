const options =
{
    tableId: "table",
    orderColumn: "2",
    orderArrow: "asc"
}
setDatatable(null, true, options);
$(".addNewItem").click(function () {
    $.blockUI({
        message: "Lütfen bekleyin..",
        css: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    });
    $.get("/SampleOrder/Add")
        .done(function (responsedata) {
            $("#add-form").html(responsedata);
            $("#add-modal").modal("show");
            $.unblockUI();
            $('#add-modal').on('hidden.bs.modal',
                function (e) {
                    $("#add-form").html("");
                });
        });
});
function addSampleOrderProduct(e) {
    const id = getId(e);
    $.get(`/SampleOrder/AddOrderProduct?id=${id}`)
        .done(function (responsedata) {
            $("#add-order-product").html(responsedata);
            $("#add-product-modal").modal("show");
            $.unblockUI();
            $('#add-product-modal').on('hidden.bs.modal',
                function (e) {
                    $("#add-form").html("");
                });
        });
}
function removeSampleOrder(e) {
    const id = getId(e);
    tableDataRemove(`RemoveSampleOrder?id=${id}`, "Bu siparişi içindeki ürünlerle birlikte silmek istediğinize emin misiniz ? ");
}

function detailContent(e) {
    //console.log(e);
    const id = e.data["#"].split("_")[1];
    $("<div/>").attr("id", `s_${e.data["#"]}`).appendTo(e.detailCell).mDatatable({
        data: {
            type: "remote",
            source: {
                read: {
                    url: setApiUrl(`GetSampleOrderDetails?id=${id}`, "get"),
                    method: "GET",
                    params: {
                    },
                    map: function (raw) {
                        console.log(raw.Result);
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
                field: "EpProductOptions.ProductCode",
                title: "Ürün"
            },
            {
                field: "Quantity",
                title: "Gönderilen Miktar"
            },
            {
                field: "TurnQuantity",
                title: "Gelen Miktar"
            },
            {
                field: "EpProductOptions.Size",
                title: "Boyut"
            },
            {
                field: "EpProductOptions.Color",
                title: "Renk"
            },
            //{
            //    field: "Actions",
            //    width: 110,
            //    title: "İşlemler",
            //    sortable: false,
            //    overflow: "visible",
            //    template: function (t) {
            //        //return `<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" onclick="optQuantityRevision(${t.ProductOptionId},${t.ProductOptionQuantityId},${t.StorageId},${t.Quantity})" title="Stok Revizyonu" >\t\t\t\t\t\t\t<i class="fa fa-truck"></i>\t\t\t\t\t\t</button>\t\t\t\t\t\t<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" onclick="editOptQuantity(${t.ProductOptionId},${t.ProductOptionQuantityId})" title="Edit details" >\t\t\t\t\t\t\t<i class="la la-edit"></i>\t\t\t\t\t\t</button>\t\t\t\t\t\t<button type="button" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Rolden Kaldır" onclick="removeQuantity(${t.ProductOptionQuantityId})">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</button>\t\t\t\t\t`;
            //    }
            //}
        ]
    });
}
//  window.location.href = `/Customer/Details?id=${id}`;
$("#table").mDatatable(setDataTableOptions({ detailContent: detailContent }));


function getDetail(e) {
   const id = getId(e);
    window.location.href = `/sampleorder/Detail?id=${id}`;
}
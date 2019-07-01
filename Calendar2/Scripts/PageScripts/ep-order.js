validate("#m_form1");
$("#ddlCategories").selectpicker();
$("#ddlCategories").change(function () {
    const catId = parseInt(this.value);
    mApp.block("#products",
        {
            overlayColor: "#000000",
            type: "loader",
            state: "primary",
            message: "Lütfen Bekleyin.."
        });
    $.get(`/Order/ProductList?cid=${catId}`)
        .done(function (responsedata) {
            $("#products").html(responsedata);
            mApp.unblock("#products");
            function detailContent(e) {
                const id = e.data["#"].split("_")[1];
                const col = [
                    {
                        field: "Size",
                        title: "Boyut"
                    },
                    {
                        field: "Color",
                        title: "Renk"
                    }, {
                        field: "Actions",
                        width: 110,
                        title: "Ekle",
                        sortable: false,
                        overflow: "visible",
                        template: function (t) {
                            return `\t\t\t\t\t\t<button type="button" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill"data-container="body" data-toggle="tooltip" data-placement="right"  title="Siparişe Ekle" onclick="addOrderProduct(${
                                t.ProductOptionId},${t.ProductId},'${t.EpProducts.ProductCode}','${t.Size}','${t.Color
                                }','${t.EpProducts.SellingPrice}',${t.EpProducts.CurrencyId
                                })">\t\t\t\t\t\t\t<i class="la la-plus-circle" style="font-size:25px"></i>\t\t\t\t\t\t</button>\t\t\t\t\t`;
                        }
                    }
                ];
                const opt = setChildTableOpt(setApiUrl(`GetOrderPOptions?id=${id}`, "get"), col);
                $("<div/>").attr("id", `s_${e.data["#"]}`).appendTo(e.detailCell).mDatatable(opt);
            }
            $("#products-table").mDatatable(setDataTableOptions({ detailContent: detailContent }));
        });
});
function addOrderProduct(opt, p, code, size, color, price, currency) {
    const b = {
        Size: size,
        Color: color,
        Code: code,
        ProductId: p,
        ProductOptionId: opt,
        Quantity: 1,
        Price: price,
        CurrencyId: currency
    };
    $.ajax({
        url: "/Order/AddBasket",
        type: "post",
        data: { basket: b },
        success: function (r) {
            toastr.success(`1 adet <b>${code} </b> ürününden <b> ${size} </b> boyutunda <b> ${color} </b> renginde ürününüz eklendi`, "Bilgi");
        }
    });
}
var r = new mWizard("m_wizard", {}).on("change",
    function (e) {
        if (e.currentStep === 3) {
            // getRequest("/Orders/GetNewOrderNo").then(function (o) { $("#orderNo").val(o.Result); });
            getRequest("/Order/GetBasket", true).then(function (r) {
                if (r === 0) {
                    return;
                }
                $("#totalAmount").val(r.TotalAmount);
                console.log(r);
            });
        }
    });

console.log($("#oCustomer"));
$("#add-modal").on("hidden.bs.modal",
    function () {
        console.log("ee");
        getRequest("/Order/RemoveBasket", true).then(function () { });
    });
openAddForm("/Product/Add");
openAddForm("/Product/AddCategory", ".addProductCategory");
function stRemove(e) {
    console.warn("ÜRÜN SİLME");
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    window.location.href = `/Product/Detail?id=${id}`;
}
const options =
    {
        tableId: "table",
        orderColumn: "1",
        orderArrow: "asc"
    }
var columns = [
    {
        "data": "ProductCode", "name": "ProductCode", render: function (data, type, row) {
            return `<a style="text-decoration: none !important;color:black" href="/Product/Detail?id=${row.Id}"><b>${data}</b></a>`;
        }
    },
    { "data": "Category", "name": "Category" },
    {
        "data": "PurchasingPrice", "name": "PurchasingPrice", render: function (data, type, row) {
            return data + " " + row.Currency;
        }
    },
    {
        "data": "SellingPrice", "name": "SellingPrice", render: function (data, type, row) {
            return data + " " + row.Currency;
        }
    },
    {
        "data": "Image", "name": "Image", render: function (data, type, row) {
            return `<a style="text-decoration: none !important;color:black" href="/Product/Detail?id=${row.Id}"><img src="${data}" height="50" alt="" /></a> `;
        }
    }
];
setAjaxDatatable("GetAllProducts", options, columns);

function result(res) {
    httpResponse(res);
}
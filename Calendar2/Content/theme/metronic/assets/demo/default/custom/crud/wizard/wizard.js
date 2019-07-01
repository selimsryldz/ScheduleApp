var WizardDemo = function () {
    $("#m_wizard");
    var e, r, i = $("#m_form");
    return {
        init: function () {
            var n;
            $("#m_wizard"), i = $("#m_form"), (r = new mWizard("m_wizard",
                {
                    startStep: 1
                })).on("beforeNext",
                    function (r) {
                        true !== e.form() && r.stop();
                    }), r.on("change",
                        function (e) {
                            mUtil.scrollTop();
                        }), e = i.validate({
                            ignore: ":hidden",
                            lang: "tr",
                            rules: {
                            },
                            invalidHandler: function (e, r) {
                                mUtil.scrollTop();
                            },
                            submitHandler: function (e) { }
                        }), (n = i.find('[data-wizard-action="submit"]')).on("click",
                            function (r) {
                                r.preventDefault(), e.form() &&
                                    (mApp.progress(n), i.ajaxSubmit({
                                        success: function (a) {
                                            httpResponse(a);
                                        },
                                        fail: function () {
                                            console.log("hata");
                                        }
                                    }));
                            });
        }
    }
}();
jQuery(document).ready(function () {
    WizardDemo.init();
});
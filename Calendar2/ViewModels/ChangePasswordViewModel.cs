using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Calendar2.ViewModels
{
    public class ChangePasswordViewModel
    {
        public User mevcutkullanici { get; set; }

        [DisplayName("Şifre"), Required(ErrorMessage = "{0} alanı boş geçilemez."),
           StringLength(25, ErrorMessage = "{0} max. {1} karakter olabilir")]
        public string password { get; set; }

        [DisplayName("Şifre(Tekrar)"), Required(ErrorMessage = "{0} alanı boş geçilemez."),
            StringLength(25, ErrorMessage = "{0} max. {1} karakter olabilir"),
           Compare("password", ErrorMessage = "{0} ile {1} uyuşmuyor")]
        public string repassword { get; set; }
    }
}
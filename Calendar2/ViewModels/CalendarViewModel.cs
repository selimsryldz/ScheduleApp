using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.ViewModels
{
    public class CalendarViewModel
    {
        public List<string> stringliste { get; set; }
        public List<Calendar> calendarliste { get; set; }
        public string hata { get; set; }
        public string recursive { get; set; }
        public DateTime? bitistarihi { get; set; }
        public bool check { get; set; }
    }
}
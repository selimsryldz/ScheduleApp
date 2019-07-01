using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.ViewModels
{
    public class ReportViewModel
    {
        public List<Calendar> calliste { get; set; }
        public DateTime baslangicTarihi { get; set; }
        public DateTime bitisTarihi { get; set; }
        public int Owner_Id { get; set; }
        public List<string> userNameList { get; set; }
        public List<int> userIdList { get; set; }
        public List<User> userList { get; set; }
    }
}
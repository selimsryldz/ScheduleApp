using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.ViewModels
{
    public class IndexViewModel
    {
        public User mevcutkullanici { get; set; }
        public List<User> currenthere { get; set; }
        public List<User> kisilist { get; set; }
        public List<int> kisisure { get; set; }
    }
}
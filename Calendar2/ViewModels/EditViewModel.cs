using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.ViewModels
{
    public class EditViewModel
    {
        public Calendar editdate { get; set; }
        public int fark { get; set; }
        public DateTime now { get; set;}

    }
}
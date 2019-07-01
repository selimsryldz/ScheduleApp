using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Models
{
    public class EventObject
    {
        public string title { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public string id { get; set; }
        public int owner_id { get; set; }
        public string url { get; set; }
        public string className { get; set; }
        public string description { get; set; }
        public string ThemeColor { get; set; }
        public string location { get; set; }
        
    }
}
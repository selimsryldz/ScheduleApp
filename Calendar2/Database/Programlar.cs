//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Calendar2.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class Programlar
    {
        public int Id { get; set; }
        public int Owner_Id { get; set; }
        public System.DateTime Start_Event { get; set; }
        public System.DateTime End_Event { get; set; }
        public int Day_Id { get; set; }
    
        public virtual User User { get; set; }
    }
}

using Calendar2.Database;
using Calendar2.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Managers
{
    public class CurrentManager
    {
        Repository<Calendar> tarihler = new Repository<Calendar>();
        DateTime now = DateTime.Now;
        List<Calendar> geciciList = new List<Calendar>();
        public bool IsHere(int id)
        {
            

            //Calendar call= tarihler.Find(x=>x.Owner_Id==5);
           
            geciciList = tarihler.List(x => x.Start_Event.Day == now.Day && x.Start_Event.Month == now.Month && x.Start_Event.Year == now.Year && x.Owner_Id == id);
            foreach (var item in geciciList)
            {
                if (item.Start_Event <= now && item.End_Event >= now)
                {
                    return true;
                }
            }
            
            return false;
            }
            
        }
    }
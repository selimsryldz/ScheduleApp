using Calendar2.Database;
using Calendar2.Models;
using Calendar2.Repository;
using Calendar2.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Managers
{
    public class RecursiveManager
    {
        public bool AddSchedule(CalendarViewModel model)
        {
            DateTime now = DateTime.Now;
            Repository<Calendar> calendar = new Repository<Calendar>();
            DateTime erkentarih = new DateTime();
            DateTime nullDate = new DateTime();
            
            int i = 0;

            if (model.check == false)
            {
                model.bitistarihi = now;
                foreach (var item in model.calendarliste)
                {
                    if (item.Start_Event != nullDate && item.End_Event != nullDate)
                    {
                        if (item.End_Event < now.AddHours(-12))
                        {
                            return false;
                        }
                    }
                }
                foreach (var item in model.calendarliste)
                {
                    if (item.Start_Event != nullDate && item.End_Event != nullDate)
                    {                       
                            calendar.Insert(new Calendar()
                            {
                                Start_Event = Convert.ToDateTime(item.Start_Event),
                                End_Event = Convert.ToDateTime(item.End_Event),
                                Owner_Id = CurrentSession.User.Id,
                                Title = item.Title,
                                Location = item.Location

                            });
                     }                       
                       
                   }                      

                }
            
            else
            {
                //listenin en erken tarihlisini buluyorum
                erkentarih = model.calendarliste[0].End_Event;
                foreach (var item in model.calendarliste)
                {
                    if (item.End_Event < erkentarih)
                    {
                        erkentarih = item.End_Event;
                    }
                }
               
              
                foreach (var item in model.calendarliste)
                {
                    if (model.bitistarihi > item.End_Event.AddDays(7 * i))
                    {
                        if (item.Start_Event != nullDate && item.End_Event != nullDate)
                        {
                            if (item.End_Event < now.AddHours(-12))
                            {
                                return false;
                            }
                           
                        }                       
                    }

                }
                foreach (var item in model.calendarliste)
                {
                    if (model.bitistarihi > item.End_Event.AddDays(7 * i))
                    {
                        if (item.Start_Event != nullDate && item.End_Event != nullDate)
                        {
                            calendar.Insert(new Calendar()
                            {
                                Start_Event = Convert.ToDateTime(item.Start_Event).AddDays(7 * i),
                                End_Event = Convert.ToDateTime(item.End_Event).AddDays(7 * i),
                                Owner_Id = CurrentSession.User.Id,
                                Title = item.Title,
                                Location = item.Location

                            });

                        }
                    }

                }
                erkentarih = erkentarih.AddDays(7);
                while (erkentarih <= model.bitistarihi)
                {
                    i++;

                    foreach (var item in model.calendarliste)
                    {
                        if (model.bitistarihi > item.End_Event.AddDays(7 * i))
                        {
                            if (item.Start_Event != nullDate && item.End_Event != nullDate)
                            {
                                calendar.Insert(new Calendar()
                                {
                                    Start_Event = Convert.ToDateTime(item.Start_Event).AddDays(7 * i),
                                    End_Event = Convert.ToDateTime(item.End_Event).AddDays(7 * i),
                                    Owner_Id = CurrentSession.User.Id,
                                    Title = item.Title,
                                    Location = item.Location,
                                    IsRecursive = true

                                });

                            }                      

                          
                        }

                    }
                    erkentarih = erkentarih.AddDays(7);
                }
               

              
            }

            return true;
        }
    }
}
using Calendar2.Database;
using Calendar2.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Managers
{
    public class RealizedReportManager
    {
        CalendarEntities8 db = new CalendarEntities8();
        List<Calendar> listcalendar = new List<Calendar>();

        public List<Calendar> listele()
        {
            listcalendar = db.Calendar.Where(x => x.IsApproved == true).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }
        public List<Calendar> listele2(int id, DateTime baslangicTarihi, DateTime bitisTarihi)
        {
            DateTime date = new DateTime();

            
            if (id == 0 && baslangicTarihi!= date)
            {
                listcalendar = tariheGoreListele(baslangicTarihi, bitisTarihi);
            }
            if (id != 0 && baslangicTarihi == date)
            {
                listcalendar = kisiyeGoreListele(id);
            }
            if (id != 0 && baslangicTarihi != date)
            {
                listcalendar = kisiyeveTariheGoreListele(id, baslangicTarihi, bitisTarihi);
            }



            return listcalendar;
        }
        public List<Calendar> tariheGoreListele(DateTime baslangicTarihi, DateTime bitisTarihi)
        {

            listcalendar = db.Calendar.Where(x => x.Start_Event >= baslangicTarihi && x.End_Event <= bitisTarihi && x.IsApproved == true).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }
        public List<Calendar> kisiyeGoreListele(int id)
        {

            listcalendar = db.Calendar.Where(x => x.Owner_Id == id && x.IsApproved == true).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }
        public List<Calendar> kisiyeveTariheGoreListele(int id, DateTime baslangicTarihi, DateTime bitisTarihi)
        {
            
            listcalendar = db.Calendar.Where(x => x.Owner_Id == id && x.Start_Event >= baslangicTarihi && x.End_Event <= bitisTarihi && x.IsApproved == true).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }

    }
}

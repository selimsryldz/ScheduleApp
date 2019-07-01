using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Calendar2.Repository;

namespace Calendar2.Managers
{
    public class ReportManager
    {
        List<Calendar> listcalendar = new List<Calendar>();
        Repository<Calendar> cal = new Repository<Calendar>();
       
        public List<Calendar> listele()
        {
            listcalendar = cal.List().OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }
        public List<Calendar> listele2(int id, DateTime baslangicTarihi, DateTime bitisTarihi)
        {
            DateTime date = new DateTime();

           
            if (id == 0 && baslangicTarihi != date)
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

            listcalendar = cal.List(x => x.Start_Event >= baslangicTarihi && x.End_Event <= bitisTarihi).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }
        public List<Calendar> kisiyeGoreListele(int id)
        {

            listcalendar = cal.List(x => x.Owner_Id == id).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }
        public List<Calendar> kisiyeveTariheGoreListele(int id, DateTime baslangicTarihi, DateTime bitisTarihi)
        {

            listcalendar = cal.List(x => x.Owner_Id == id && x.Start_Event >= baslangicTarihi && x.End_Event <= bitisTarihi).OrderByDescending(x => x.Start_Event).ToList();

            return listcalendar;
        }

    }
}
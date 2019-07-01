using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Calendar2.Database;
using Calendar2.Repository;

namespace Calendar2.Managers
{
    // Kişinin normal programını bugünün tarihine göre ayarlamaya yarıyor.
    public class ScheduleManager
    {
        Repository<Programlar> veritabani = new Repository<Programlar>();

        DateTime today = DateTime.Now;


        

        public List<int> haftalikCalismaSuresi()
        {
            Repository<Calendar> db = new Repository<Calendar>();

            List<int> sureList = new List<int>();
            int calismaGun ,calismaSaat, calismaDakika;            
            List<Calendar> geciciSureListesi;
            string calismaGunu, calismaSaati, calismaDakikasi;           
            List<DateTime> gunler = new List<DateTime>();
            DateTime monday, tuesday, wednesday, thursday, friday;
            int bugunAdiInt;            
            bugunAdiInt = Convert.ToInt32(today.DayOfWeek);          


            monday = today.AddDays(1 - bugunAdiInt);
            bugunAdiInt--;
            tuesday = today.AddDays(1 - bugunAdiInt);
            bugunAdiInt--;
            wednesday = today.AddDays(1 - bugunAdiInt);
            bugunAdiInt--;
            thursday = today.AddDays(1 - bugunAdiInt);
            bugunAdiInt--;
            friday = today.AddDays(1 - bugunAdiInt);
            bugunAdiInt--;



            for (int j = 1; j <= 6; j++)
            {

                TimeSpan calismaSuresi = new TimeSpan();

                geciciSureListesi = db.List(x => x.Owner_Id == j && x.Start_Event.Day == monday.Day && x.Start_Event.Month == monday.Month && x.Start_Event.Year == monday.Year);
                foreach (var item in geciciSureListesi)
                {
                    calismaSuresi = calismaSuresi + (item.End_Event - item.Start_Event);
                };

                geciciSureListesi = db.List(x => x.Owner_Id == j && x.Start_Event.Day == tuesday.Day && x.Start_Event.Month == tuesday.Month && x.Start_Event.Year == tuesday.Year);
                foreach (var item in geciciSureListesi)
                {
                    calismaSuresi = calismaSuresi + (item.End_Event - item.Start_Event);
                };

                geciciSureListesi = db.List(x => x.Owner_Id == j && x.Start_Event.Day == wednesday.Day && x.Start_Event.Month == wednesday.Month && x.Start_Event.Year == wednesday.Year);
                foreach (var item in geciciSureListesi)
                {
                    calismaSuresi = calismaSuresi + (item.End_Event - item.Start_Event);
                };

                geciciSureListesi = db.List(x => x.Owner_Id == j && x.Start_Event.Day == thursday.Day && x.Start_Event.Month == thursday.Month && x.Start_Event.Year == thursday.Year);
                foreach (var item in geciciSureListesi)
                {
                    calismaSuresi = calismaSuresi + (item.End_Event - item.Start_Event);
                };

                geciciSureListesi = db.List(x => x.Owner_Id == j && x.Start_Event.Day == friday.Day && x.Start_Event.Month == friday.Month && x.Start_Event.Year == friday.Year);
                foreach (var item in geciciSureListesi)
                {
                    calismaSuresi = calismaSuresi + (item.End_Event - item.Start_Event);
                };


                calismaGunu = calismaSuresi.ToString("dd");
                calismaSaati = calismaSuresi.ToString("hh");
                calismaDakikasi = calismaSuresi.ToString("mm");
                calismaGun = Convert.ToInt32(calismaGunu);
                calismaSaat = Convert.ToInt32(calismaSaati);
                calismaDakika = Convert.ToInt32(calismaDakikasi);
                sureList.Add(calismaGun * 24 + calismaSaat + (calismaDakika / 60));

            }
            return sureList;
        }
    }

    //public List<string> listt(int Owner_Id)
    //{           
    //    List<string> list = new List<string>();
    //    DateTime gecicistart;
    //    DateTime geciciend;
    //    string baslamasaati;
    //    string bitissaati;
    //    DateTime monday;
    //    DateTime tuesday;
    //    DateTime wednesday;
    //    DateTime thursday;
    //    DateTime friday;

    //    string bugunadi = Convert.ToString(now.DayOfWeek);
    //    var today = DateTime.Now;

    //    //bugüne göre takvime hangi tarihlerin ekleneceğini belirliyoruz
    //    if (bugunadi == "Monday")
    //    {
    //        monday = today;
    //        tuesday = today.AddDays(+1);
    //        wednesday = today.AddDays(+2);
    //        thursday = today.AddDays(+3);
    //        friday = today.AddDays(+4);

    //    }
    //    else if(bugunadi == "Tuesday")
    //    {
    //        monday = today.AddDays(-1);
    //        tuesday = today.AddDays(0);
    //        wednesday = today.AddDays(1);
    //        thursday = today.AddDays(2);
    //        friday = today.AddDays(3);

    //    }
    //    else if(bugunadi== "Wednesday")
    //    {
    //        monday = today.AddDays(-2);
    //        tuesday = today.AddDays(-1);
    //        wednesday = today;
    //        thursday = today.AddDays(+1);
    //        friday = today.AddDays(+2);

    //    }
    //    else if (bugunadi == "Thursday")
    //    {
    //        monday = today.AddDays(-3);
    //        tuesday = today.AddDays(-2);
    //        wednesday = today.AddDays(-1);
    //        thursday = today;
    //        friday = today.AddDays(+1);

    //    }
    //    else if (bugunadi == "Friday")
    //    {   
    //        monday = today.AddDays(-4);
    //        tuesday = today.AddDays(-3);
    //        wednesday = today.AddDays(-2);
    //        thursday = today.AddDays(-1);
    //        friday = today;

    //    }
    //    else if (bugunadi == "Saturday")
    //    {
    //        monday = today.AddDays(-5);
    //        tuesday = today.AddDays(-4);
    //        wednesday = today.AddDays(-3);
    //        thursday = today.AddDays(-2);
    //        friday = today.AddDays(-1);

    //    }
    //    else
    //    {
    //        monday = today.AddDays(+1);
    //        tuesday = today.AddDays(+2);
    //        wednesday = today.AddDays(+3);
    //        thursday = today.AddDays(+4);
    //        friday = today.AddDays(+5);

    //    }

    //    for (int i = 1; i <=5; i++)
    //    {
    //        gecicistart = veritabani.Find(x => x.Owner_Id == Owner_Id && x.Day_Id == i).Start_Event;
    //        baslamasaati = gecicistart.ToString("HH:mm");
    //        geciciend = veritabani.Find(x => x.Owner_Id == Owner_Id && x.Day_Id == i).End_Event;
    //        bitissaati = geciciend.ToString("HH:mm");
    //        list.Add(monday.ToString("yyyy-MM-dd") + " " + baslamasaati);
    //        list.Add(monday.ToString("yyyy-MM-dd") + " " + bitissaati);
    //    }



    //    return list;
    //}



}
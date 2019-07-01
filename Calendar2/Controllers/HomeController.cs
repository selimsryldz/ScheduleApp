using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Calendar2.Database;
using Calendar2.Models;
using Newtonsoft.Json;
using Calendar2.ViewModels;
using Calendar2.Managers;
using Calendar2.Result;
using Calendar2.Repository;
using System.Data.Entity.Core.Objects;
using System.Data.Entity;
using Calendar2.Filters;
using Calendar2.Messages;

namespace Calendar2.Controllers
{

    public class HomeController : Controller
    {


        [Auth]
        public ActionResult Index()
        {
            //Indexte kullanacağım ViewModeli oluşturuyorum
            IndexViewModel indexViewModel = new IndexViewModel();

            //kisiler tablosunu çekip kisiliste değişkenine atıyorum
            Repository<User> kisiler = new Repository<User>();
            List<User> kisiliste = kisiler.List();

            //haftalık çalışma sürelerini ScheduleManager'de hesaplayıp listeye atıyorum.
            ScheduleManager sm = new ScheduleManager();
            List<int> listsure = new List<int>();
            listsure = sm.haftalikCalismaSuresi();

            //Şu an işte olanları buluyor 
            CurrentManager cm = new CurrentManager();
            List<User> currenthere = new List<User>();
            foreach (var item in kisiliste)
            {
                if (cm.IsHere(item.Id))
                {
                    currenthere.Add(item);
                }
            }

            indexViewModel.mevcutkullanici = kisiler.Find(x => x.Id == CurrentSession.User.Id);
            indexViewModel.kisilist = kisiliste;
            indexViewModel.kisisure = listsure;
            indexViewModel.currenthere = currenthere;
            return View(indexViewModel);
        }

        [Auth]
        public ActionResult GetEvents()
        {

            var db = new CalendarEntities8();

            var list = db.Calendar.ToList();
            var resultList = new List<EventObject>();
            foreach (var item in list)
            {
                var result = new EventObject();

                result.id = item.Id.ToString();
                result.start = item.Start_Event.ToString("s");
                result.end = item.End_Event.ToString("s");
                result.title = item.User.Name + " " + item.User.Surname;
                result.description = item.Title;
                result.location = item.Location;
                result.owner_id = item.Owner_Id;
                if (item.Owner_Id == 1)
                {
                    result.className = "fc-day-grid-event fc-h-event fc-event fc-start fc-end m-fc-event--light m-fc-event--solid-primary fc-draggable fc-resizable";
                }
                else if (item.Owner_Id == 2)
                {
                    result.className = "fc-day-grid-event fc-h-event fc-event fc-start fc-end m-fc-event--light m-fc-event--solid-danger fc-draggable fc-resizable";
                }
                else if (item.Owner_Id == 3)
                {
                    result.ThemeColor = "aqua";
                    result.className = "fc-day-grid-event fc-h-event fc-event fc-start fc-end m-fc-event--light fc-draggable fc-resizable";
                }
                else if (item.Owner_Id == 4)
                {
                    result.className = "fc-day-grid-event fc-h-event fc-event fc-start fc-end m-fc-event--light m-fc-event--solid-warning fc-draggable fc-resizable";
                }
                else if (item.Owner_Id == 5)
                {
                    result.className = "fc-day-grid-event fc-h-event fc-event fc-start fc-end m-fc-event--light m-fc-event--solid-success fc-draggable fc-resizable";
                }
                else
                {
                    result.className = "fc-day-grid-event fc-h-event fc-event fc-start fc-end m-fc-event--light bg-info fc-draggable fc-resizable";
                }
                resultList.Add(result);
            }
            //var json = JsonConvert.SerializeObject(resultList);
            var listtt = resultList.OrderBy(x => Convert.ToInt32(x.id));
            return Json(listtt, JsonRequestBehavior.AllowGet);
        }

        [Auth]
        public ActionResult EditSchedule(int id)
        {
            string farkGunu;
            string farkSaati;           
            TimeSpan fark = new TimeSpan();
            DateTime now = DateTime.Now;
            Repository<Calendar> calendar = new Repository<Calendar>();
            EditViewModel editViewModel = new EditViewModel();
            editViewModel.editdate = calendar.Find(x => x.Id == id);
            fark = (now - editViewModel.editdate.End_Event);
            farkGunu = fark.ToString("dd");
            farkSaati = fark.ToString("hh");
            editViewModel.fark = ((Convert.ToInt32(farkGunu) * 24) + (Convert.ToInt32(farkSaati)));
            editViewModel.now = now;
            return View(editViewModel);
        }
        [Auth]
        [HttpPost]
        public ActionResult EditSchedule(int id, EditViewModel model)
        {
            Repository<Calendar> calendarRepo = new Repository<Calendar>();
            DateTime now = DateTime.Now;
            Result<Calendar> res = new Result<Calendar>();
            if (model.editdate.End_Event < now.AddHours(-12))
            {
                res.AddError(ErrorMessageCode.CannotEditSchedule,"12 Saat Öncesi İçin Güncelleme Yapamazsınız!");
                res.Errors.ForEach(x => ModelState.AddModelError("", x.Message));
                return View(model);
            }
            var cal = calendarRepo.Find(x => x.Id == id);
            cal.Start_Event = model.editdate.Start_Event;
            cal.End_Event = model.editdate.End_Event;
            cal.Location = model.editdate.Location;
            cal.Title = model.editdate.Title;
            calendarRepo.Update(cal);


            return RedirectToAction("Index");
        }

        [Auth]
        public ActionResult AddSchedule()
        {
            TempData["hata"] = "";

            return View();
        }
        [Auth]
        [HttpPost]
        public ActionResult AddSchedule(CalendarViewModel model)
        {
            Result<EditViewModel> res = new Result<EditViewModel>();
            bool eklendimi;
            RecursiveManager rm = new RecursiveManager();
            eklendimi = rm.AddSchedule(model);
            if (eklendimi)
            {
                return RedirectToAction("Index");
            }
            else
            {
                TempData["hata"] = "we";
                model.hata = "12 Saat Öncesi İçin Ekleme Yapamazsınız!";
                return View(model);
            }

            
        }
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginViewModel model)
        {
            UserManager um = new UserManager();
            Result<User> res = um.LoginUser(model);

            if (ModelState.IsValid)
            {
                if (res.Errors.Count > 0)
                {
                    res.Errors.ForEach(x => ModelState.AddModelError("", x.Message));

                    return View(model);
                }

                CurrentSession.Set("login", res.Resultt);

                return RedirectToAction("Index");
            }

            return View(model);
        }
        [Auth]
        public ActionResult Logout()
        {
            CurrentSession.Clear();
            return RedirectToAction("Login");
        }
        [Auth]
        [HttpPost]
        public string Delete(int id)
        {
            Repository<Calendar> cal = new Repository<Calendar>();
            var silinecektakvim = cal.Find(x => x.Id == id);
            cal.Delete(silinecektakvim);
            return "Başarılı";
        }
        [Auth]
        [HttpPost]
        public string Approve(int id)
        {

            Repository<Calendar> calendarRepo = new Repository<Calendar>();

            var cal = calendarRepo.Find(x => x.Id == id);

            cal.Approve_Date = DateTime.Now;
            cal.IsApproved = true;

            calendarRepo.Update(cal);

            return "Başarılı";
        }
        [Auth]
        public ActionResult ChangePassword()
        {
            Repository<User> kisiler = new Repository<User>();
            ChangePasswordViewModel changePasswordViewModel = new ChangePasswordViewModel();
            changePasswordViewModel.mevcutkullanici = kisiler.Find(x => x.Id == CurrentSession.User.Id);
            return View(changePasswordViewModel);
        }
        [Auth]
        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordViewModel changePasswordViewModel)
        {
            Repository<User> kisiler = new Repository<User>();
            UserManager um = new UserManager();

            //User user_= kisiler.Find(x => x.Id == CurrentSession.User.Id);
            //user_.Password = changePasswordViewModel.mevcutkullanici.Password;
            string password = changePasswordViewModel.mevcutkullanici.Password;
            var kullanici = kisiler.Find(x => x.Id == CurrentSession.User.Id);

            kullanici.Password = password;
            Result<User> res = um.ChangePassword(kullanici, changePasswordViewModel);

            if (ModelState.IsValid)
            {
                if (res.Errors.Count > 0)
                {
                    res.Errors.ForEach(x => ModelState.AddModelError("", x.Message));

                    return View(changePasswordViewModel);
                }
                kullanici.Password = changePasswordViewModel.password;
                kisiler.Update(kullanici);
                return RedirectToAction("Index");

            }

            return View(changePasswordViewModel);
        }
        [Auth]
        public ActionResult Report()
        {
            ReportManager rm = new ReportManager();
            ReportViewModel reportViewModel = new ReportViewModel();
            reportViewModel.calliste = rm.listele();
            List<User> userList = new List<User>();
            Repository<User> users = new Repository<User>();
            List<string> userNameList = new List<string>();
            List<int> userIdList = new List<int>();
            userList = users.List();
            foreach (var item in userList)
            {
                userNameList.Add(item.Name + " " + item.Surname);
                userIdList.Add(item.Id);
            }
            reportViewModel.userList = users.List();
            reportViewModel.userNameList = userNameList;
            reportViewModel.userIdList = userIdList;
            return View(reportViewModel);
        }
        [Auth]
        [HttpPost]
        public ActionResult Report(ReportViewModel model)
        {
            ReportManager rm = new ReportManager();           
            List<Calendar> calList = new List<Calendar>();
            ReportViewModel reportViewModel = new ReportViewModel();
            List<User> userList = new List<User>();
            Repository<User> users = new Repository<User>();
            List<string> userNameList = new List<string>();
            List<int> userIdList = new List<int>();
            userList = users.List();
            foreach (var item in userList)
            {
                userNameList.Add(item.Name + " " + item.Surname);
                userIdList.Add(item.Id);
            }
            reportViewModel.userList = users.List();
            reportViewModel.userNameList = userNameList;
            reportViewModel.userIdList = userIdList;
            reportViewModel.calliste = rm.listele2(model.Owner_Id, model.baslangicTarihi, model.bitisTarihi);
          


            return View(reportViewModel);

        }
        [Auth]
        public ActionResult RealizedReport()
        {
            RealizedReportManager rm = new RealizedReportManager();
            ReportViewModel reportViewModel = new ReportViewModel();
            reportViewModel.calliste = rm.listele();


            return View(reportViewModel);
        }
        [HttpPost]
        public ActionResult RealizedReport(ReportViewModel model)
        {
            RealizedReportManager rm = new RealizedReportManager();           
            List<Calendar> calList = new List<Calendar>();
            ReportViewModel reportViewModel = new ReportViewModel();

            reportViewModel.calliste = rm.listele2(model.Owner_Id, model.baslangicTarihi, model.bitisTarihi);
            


            return View(reportViewModel);

        }
    }
}
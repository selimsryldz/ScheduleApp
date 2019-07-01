using Calendar2.Database;
using Calendar2.Messages;
using Calendar2.Repository;
using Calendar2.Result;
using Calendar2.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Managers
{
    public class UserManager
    {
        private Repository<User> repo_user = new Repository<User>();
        public Result<User> LoginUser(LoginViewModel data)
        {

            try
            {
                Result<User> res = new Result<User>();
                var a = repo_user.List();
                res.Resultt = repo_user.Find(x => x.Username == data.Username && x.Password == data.Password);

                if (res.Resultt != null)
                {

                }
                else
                {
                    res.AddError(ErrorMessageCode.UsernameOrPassWrong, "Kullanıcı adı ya da şifre uyuşmuyor.");
                }
                return res;
            }
            catch (Exception e)
            {

                throw e;
            }

        }
        public Result<User> ChangePassword(User data, ChangePasswordViewModel model)
        {
            try
            {
                Repository<User> kullaniciRep = new Repository<User>();
                var kullanici = kullaniciRep.Find(x => x.Id == data.Id);
                Result<User> res = new Result<User>();


                if (kullanici.Password == data.Password)
                {
                  

                }
                else
                {
                    res.AddError(ErrorMessageCode.WrongPassword, "Eski şifrenizi yanlış girdiniz.");
                }
                return res;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
    }
}
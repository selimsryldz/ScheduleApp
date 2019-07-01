using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Messages
{
    public enum ErrorMessageCode
    {
        UsernameAlreadyExist = 101,
        EmailAlreadyExists = 102,
        UserIsNotActive = 151,
        UsernameOrPassWrong = 152,
        CheckYourEmail = 153,
        UserAlreadyActive = 154,
        ActivateIdDoesNotExists = 155,
        UserNotFound = 156,
        WrongPassword = 157,
        CannotAddSchedule = 158,
        CannotEditSchedule = 159
    }
}
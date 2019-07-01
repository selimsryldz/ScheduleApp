﻿using Calendar2.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar2.Result
{
    public class Result<T> where T : class
    {
        public List<ErrorMessageObj> Errors { get; set; }
        public T Resultt { get; set; }

        public Result()
        {
            Errors = new List<ErrorMessageObj>();
        }

        public void AddError(ErrorMessageCode code, string message)
        {
            Errors.Add(new ErrorMessageObj() { Code = code, Message = message });
        }
    }
}
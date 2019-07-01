using Calendar2.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Calendar2.Repository
{
    public class Repository<T> where T : class
    {
        private CalendarEntities8 db = new CalendarEntities8();

        private DbSet<T> _objectSet;
        public Repository()
        {
            _objectSet = db.Set<T>();

        }

        public List<T> List()
        {
            return _objectSet.ToList();
        }

        public List<T> List(Expression<Func<T, bool>> where)
        {
            return _objectSet.Where(where).ToList();
        }

        public int Insert(T obj)
        {
            _objectSet.Add(obj);


            return Save();
        }

        public int Update(T obj)
        {
            int result;

            var updatedModel = db.Entry(obj);
            updatedModel.State = EntityState.Modified;
            result = db.SaveChanges();
            return result;
        }

        public int Delete(T obj)
        {


            _objectSet.Remove(obj);
            return Save();
        }

        private int Save()
        {
            return db.SaveChanges();
        }

        public T Find(Expression<Func<T, bool>> where)
        {
            return _objectSet.FirstOrDefault(where);
        }

        public T FindSingle(Expression<Func<T, bool>> where)
        {
            return _objectSet.SingleOrDefault(where);
        }
    }
}
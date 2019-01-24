using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

namespace Katalyst.Cookies
{
    /*
     * Note.  Uses Session for storing cookie values.  It does this because if you try to read a cookie value that was just written, it won't exist until next page load.  
     * So the session var stores the values after the cookies are updated, in case you need to read them later on in the same REQUEST.
    */

    internal class Crumb
    {
        public string ID = "";
        public string check = "";
        public delegate string callbackDelegate();
        public callbackDelegate getValue = () => (HttpContext.Current.Request["myQuerystring"]);
    }

    public static class CookieJar
    {

        // define more site cookies here (each definition is a crumb)
        private static Crumb[] siteCrumbs = new[] {
            new Crumb {
                // name of the cookie
                ID = "MCID",
                // if this querystring or form value is set, the cookie will be updated
                check = "tb_id",
                // lambda that returns the value to store in the cookie if the "check" value is set
                getValue = () => ( Helpers.UrlParams(new [] { "tb_id" }) )
            },
            new Crumb {
                ID = "channel",
                check = "utm_medium",
                getValue = () => ( Helpers.UrlParams(new [] { "utm_medium" }) )
            }
        };

        // this updates all the site cookies if they need it.  runs on every page load.  call this before reading cookie values!
        public static void Update()
        {
            Dictionary<string, string> vals = new Dictionary<string, string>();

            HttpContext cc = HttpContext.Current;
            foreach (Crumb cr in siteCrumbs)
            {
                string check = cc.Request.QueryString[cr.check] ?? cc.Request.Form[cr.check];
                if (check == null)
                {
                    // just add the value of the cookie to the dictionary
                    HttpCookie co = cc.Request.Cookies[cr.ID];
                    if (co != null)
                    {
                        vals.Add(cr.ID, co.Value);
                    }
                }
                else
                {
                    string newValue = cr.getValue();
                    if (string.IsNullOrEmpty(newValue))
                    {
                        // delete the cookie
                        cc.Response.Cookies[cr.ID].Expires = DateTime.Now.AddDays(-1);
                        vals.Add(cr.ID, "");
                    }
                    else
                    {
                        HttpCookie cn = new HttpCookie(cr.ID, newValue);
                        cn.HttpOnly = true;
                        cn.Secure = true;
                        cn.Expires = DateTime.Now.AddDays(365);
                        cc.Response.Cookies.Add(cn);
                        vals.Add(cr.ID, cn.Value);
                    }
                }
            }
            cc.Session["currentSiteCookieValues"] = vals;
        }

        public static string GetCookieValue(string name)
        {
            if (string.IsNullOrEmpty(name)) return "";

            Dictionary<string, string> cookieVals = (Dictionary<string, string>)HttpContext.Current.Session["currentSiteCookieValues"];
            if (cookieVals != null && cookieVals.ContainsKey(name)) return cookieVals[name];

            return "";
        }

        public static class Helpers
        {
            public static string UrlParams(string[] paramNames)
            {

                List<string> outParams = new List<string>();
                HttpContext cc = HttpContext.Current;

                foreach (string param in paramNames)
                {
                    if (!string.IsNullOrEmpty(param))
                    {
                        string p = cc.Request.QueryString[param] ?? cc.Request.Form[param] ?? "";
                        if (!string.IsNullOrEmpty(p))
                        {
                            outParams.Add(param + "=" + cc.Server.UrlEncode(p));
                        }
                    }
                }
                return string.Join("&", outParams);
            }
        }

        public static string getTBID()
        {
            string mcid = GetCookieValue("MCID");
            Regex r = new Regex("tb_id=(.*)(&|$)");
            Match m = r.Match(mcid);
            if (m.Groups.Count > 1)
            {
                return m.Groups[1].Value;
            }
            return "";
        }
    }
}
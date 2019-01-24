using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;
using System.Web.Mvc;
using System.Web;

namespace Katalyst.Routing
{
    /// <summary>
    /// Class dedicated in reading the routing.jsonp and provide
    /// </summary>
    public class RouteTag
    {
        public static MvcHtmlString Href(string PageName, string DisplayText, string Classes = "") {
            UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            return new MvcHtmlString($@"<a href='{urlHelper.RouteUrl(PageName)}' class='{Classes}'>{DisplayText}</a>");
        }
    }
}
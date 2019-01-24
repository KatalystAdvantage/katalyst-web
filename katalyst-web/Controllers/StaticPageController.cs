using Katalyst.Routing;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace katalyst_web.Controllers
{
    public class StaticPageController : KatalystPageController
    {
        //[MinifyHtml]
        //[CompressContent]
        public ActionResult StaticPage()
        {
            if (ViewBag.Route.SubView != "")
            {
                ViewBag.SubPage = ViewBag.Route.SubView;
            }
            return View(ViewBag.Route.View);
        }

        //[MinifyHtml]
        //[CompressContent]
        public ActionResult Http404()
        {
            Response.ContentType = "text/html; charset=utf-8";
            Response.StatusCode = 404;
            return View("Error");
        }

    }
}
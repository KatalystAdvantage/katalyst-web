using Katalyst.Routing;
using System.Web.Mvc;
using System.Web.Routing;

namespace katalyst_web.Controllers
{
    public class KatalystPageController : Controller
    {

        private bool IsCrawler()
        {
            return Request.Browser.Crawler || Request.UserAgent.ToLower().Contains("googlebot");
        }

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);

            if (requestContext.RouteData.Values["name"] != null)
            {
                string RouteName = requestContext.RouteData.GetRequiredString("name");
                ViewBag.Route = RouteLoader.get(RouteName);

            }
            ViewBag.Crawler = IsCrawler();
        }
    }
}
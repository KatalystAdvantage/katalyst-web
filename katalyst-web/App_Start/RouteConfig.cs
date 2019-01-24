using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Katalyst.Routing;

namespace ktalyst_web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.AppendTrailingSlash = true;

            routes.MapMvcAttributeRoutes();
            List<CustomRoute> routesObj = RouteLoader.readRoute();
            foreach (CustomRoute route in routesObj)
            {
                routes.MapRoute(
                    name: route.PageName,
                    url: route.Url,
                    defaults: new { action = route.Method, controller = route.Controller, id = UrlParameter.Optional, view = route.View, name = route.PageName }
                );
            }
        }
    }
}

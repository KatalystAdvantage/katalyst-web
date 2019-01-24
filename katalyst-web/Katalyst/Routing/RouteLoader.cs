using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

namespace Katalyst.Routing
{
    /// <summary>
    /// Class dedicated in reading the routing.jsonp and provide
    /// </summary>
    public class RouteLoader
    {
        public static List<CustomRoute> routes;
        public static Dictionary<string, CustomRoute> routesDict = new Dictionary<string, CustomRoute>();

        /// <summary>
        /// Read the route and converts it into a list of CustomRoute Objects
        /// </summary>
        /// <returns></returns>
        public static List<CustomRoute> readRoute()
        {
            if (routes == null)
            {
                StreamReader r = new StreamReader(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "routing.jsonp"));
                string json = r.ReadToEnd();
                // See if this is a jsonp format file
                if (!json.StartsWith("[") && !json.StartsWith("{"))
                {
                    json = json.Substring(json.IndexOf("(") + 1);
                }
                json = json.TrimEnd('(', ')', ';', '\r', '\n');
                routes = JsonConvert.DeserializeObject<List<CustomRoute>>(json);
                foreach (CustomRoute route in routes)
                {
                    routesDict.Add(route.PageName, route);
                }
                r.Close();
            }
            return routes;
        }

        public static CustomRoute get(string page_name)
        {
            try
            {
                return routesDict[page_name].Clone();
            }
            catch
            {
                throw new KeyNotFoundException($"Cannot find key: {page_name} in {string.Join("\n", routesDict.Keys)}");
            }
        }

        public static CustomRoute getSegmentRoute(string base_page_name, string segment_page_name)
        {
            try
            {
                CustomRoute base_page = routesDict[base_page_name].Clone();
                CustomRoute segment_page = routesDict[segment_page_name];
                base_page.PageTitle = segment_page.PageTitle;
                base_page.PageDescription = segment_page.PageDescription;
                return base_page;
            }
            catch
            {
                throw new KeyNotFoundException($"Cannot find key: {base_page_name} or {segment_page_name} in {string.Join("\n", routesDict.Keys)}");
            }
        }

        public static Boolean hasRoute(string route_name)
        {
            return routesDict.ContainsKey(route_name);
        }
    }
}
using System;

namespace Katalyst.Routing
{
    /// <summary>
    /// A class that stores the routing.jsonp items in C# objects
    /// </summary>
    public class CustomRoute
    {
        public string PageName { get; set; }
        public string ParentPage { get; set; }
        public string Url { get; set; }
        public string View { get; set; }
        public string SubView { get; set; }
        public string Controller { get; set; }
        public string Method { get; set; }
        public string PageTitle { get; set; }
        public string PageDescription { get; set; }

        public CustomRoute Clone()
        {
            return (CustomRoute)this.MemberwiseClone();
        }
    }
}
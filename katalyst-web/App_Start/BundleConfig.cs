using System.Configuration;
using System.Web;
using System.Web.Optimization;

namespace katalyst_web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = ConfigurationManager.AppSettings["EnableOptimizations"] != "false";

            //ScriptBundle ie8 = new ScriptBundle("~/bundles/ie8/");
            //ie8.Include("~/Content/js/vendor/respond.js");
            //ie8.Include("~/Content/js/vendor/html5shiv.js");
            //bundles.Add(ie8);

            // TODO: ensure JS is minified
            ScriptBundle foot = new ScriptBundle("~/bundles/foot/");
            foot.Include("~/Content/js/vendor/modernizr-custom.js");
            foot.Include("~/Content/js/vendor/jquery-{version}.js");
            foot.Include("~/Content/js/vendor/jquery.history*");
            foot.Include("~/Content/js/vendor/TweenMax.min.js");
            foot.IncludeDirectory("~/Content/js/katalyst/modules", "*.js", true);
            foot.Include("~/Content/js/katalyst/main.js");
            foot.Include("~/routing.jsonp");
            if (BundleTable.EnableOptimizations)
            {
                foot.Transforms.Add(new JsMinify());
            }
            bundles.Add(foot);
        }
    }
}

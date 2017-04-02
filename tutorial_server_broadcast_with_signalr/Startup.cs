using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(tutorial_server_broadcast_with_signalr.Startup))]

namespace tutorial_server_broadcast_with_signalr
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR("/signalr", new Microsoft.AspNet.SignalR.HubConfiguration());
        }
    }
}
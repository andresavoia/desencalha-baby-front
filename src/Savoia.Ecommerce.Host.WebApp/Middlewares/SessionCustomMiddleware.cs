using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;

namespace Savoia.Desencalha.Host.WebApp.Middlewares
{
    public class SessionCustomMiddleware
    {
        private readonly RequestDelegate _next;

        public SessionCustomMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        // IMessageWriter is injected into InvokeAsync
        public async Task InvokeAsync(HttpContext httpContext)
        {

            if(httpContext.Session.Get("Sessao")==null)
                httpContext.Session.Set("Sessao", new byte[] { 1, 2, 3, 4, 5 });

            httpContext.Response.Headers.Add("Sessao", httpContext.Session.Id);
            await _next(httpContext);
        }
    }
}

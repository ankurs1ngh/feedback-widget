(function () {
    const widgetIframe = document.createElement("iframe");
    widgetIframe.src = "http://localhost:5000/widget.html"; // Change to your hosted URL
    widgetIframe.style.position = "fixed";
    widgetIframe.style.bottom = "20px";
    widgetIframe.style.right = "20px";
    widgetIframe.style.width = "350px";
    widgetIframe.style.height = "400px";
    widgetIframe.style.border = "none";
    widgetIframe.style.zIndex = "9999";
    
    document.body.appendChild(widgetIframe);
  })();
  
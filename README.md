# ASP.NET Core MVC WebPack Typescript Template
ASP.NET Core MVC template for Visual Studio 2017 with WebPack bundle for JavaScript & CSS Stylesheet by using npm & TypeScript

# Supported
- Visual Studio 2017 Community
- WebPack 2.3.3
- JQuery 3.2.1
- Bootstrap 3.3.34
- TypeScript 2.2.2

# Output Structure
Clean & Simple project output structure to distribute to server
- **wwwroot\bundle.js**: all the JavaScript codes (transpiled from TypeScript/JavaScript by WebPack)
- **wwwroot\bundle.css**: all the CSS Stylesheet codes (bundled from css by WebPack)
- **wwwroot\fonts**: all referenced fonts in CSS
- **wwwroot\images**: all referenced images in CSS

# Project Structure
Clean & Simple ASP.NET Core MVC project structure for starting a new project in Visual Studio 2017. Can be used as a simple SPA template or starting point for an MVC project, then can convert to pure SPA WebPack html application by removing some ASP.NET MVC server-side codes (in *aspnet\\** folder)
## 1. ASP.NET Core
- **aspnet\Controllers**: only simple Home Index for the whole project
- **aspnet\Views**: only simple Index.cshtml reference to WebPack bundle resources
- **aspnet\Startup.cs**: default ASP.NET Core MVC template files (with relocation of /Views/ to /aspnet/Views/)
- **aspnet\Program.cs**: default ASP.NET Core MVC template files
## 2. TypeScripts & Stylesheets
- **scripts**: app.ts & place to push all of your custom TypeScripts here (must be registered in webpack.config)
- **styles**: app.css & place to push all of your custom Stylesheets here (must be registered in webpack.config)
- **images**: placeholder for all of your CSS images here
- **fonts**: placeholder for all of your CSS fonts here
## 3. Configurations
- **package.json**: refer to default npm packages
- **tsconfig.json**: WebPack TypeScipt transpiler configurations with **ES5** output & **DOM**/**ES5**/**ES6** typing libraries supports
- **webpack.config.js**: simple WebPack for above simple & clean Output
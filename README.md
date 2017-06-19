# ASP.NET Core MVC WebPack Typescript Template
ASP.NET Core MVC template for Visual Studio 2017 with WebPack bundle for JavaScript & CSS Stylesheet by using npm & TypeScript

# Supported
- Visual Studio 2017 Community
- WebPack 2.3.3
- TypeScript 2.2.2
- JQuery 3.2.1
- Bootstrap 3.3.34

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

# BONUS: recreate template from scratch
1. Create VS2017 ASP.NET Core MVC template
2. Relocate Controllers, Views, Startup.cs & Project.cs to aspnet sub-folder
3. Add class **AspnetViewLocationExpander**
```csharp
public class AspnetViewLocationExpander : Microsoft.AspNetCore.Mvc.Razor.IViewLocationExpander
{
    public IEnumerable<string> ExpandViewLocations(Microsoft.AspNetCore.Mvc.Razor.ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
    {
        yield return "/aspnet/Views/{1}/{0}.cshtml";
        yield return "/aspnet/Views/Shared/{0}.cshtml";
    }

    public void PopulateValues(Microsoft.AspNetCore.Mvc.Razor.ViewLocationExpanderContext context)
    {
    }
}
```
4. Relocate /Views to /aspnet/Views by **ConfigureServices** at **Startup**
```csharp
services.Configure<Microsoft.AspNetCore.Mvc.Razor.RazorViewEngineOptions>(options => {
    options.ViewLocationExpanders.Add(new AspnetViewLocationExpander());
});
```
5. Re-create wwwroot folder with:
- **wwwroot\fonts**: empty folder
- **wwwroot\images**: empty folder
- **wwwroot\bundle.css**: blank file
- **wwwroot\bundle.js**: blank file
- **wwwroot\favicon.ico**
6. Re-create project root with:
- **fonts**: empty folder
- **images**: empty folder
- **scripts\app.ts**: blank application entry TypeScript
- **styles\bundle.css**: blank global CSS Stylesheet
- **appsettings.json**: default generated ASP.NET Core
7. Run **npm** commands at Project root
```bash
# Initialize project with default npm settings
npm init -y
# Install & restore npm module for the project
npm install
# Install WebPack for transpiling TypeScript & buldle TS/JS/CSS
npm install --save-dev webpack@2.3.3
# Setup TypeScript by npm
npm install --save-dev typescript@2.2.2 ts-loader@2.0.3
# Install CSS Loader
npm install --save-dev extract-text-webpack-plugin@2.1.2 css-loader@0.28.4 style-loader@0.18.2 file-loader@0.11.2
# Install JQuery & BootStrap w/ typing (auto-completion for TypeScript)
npm install --save-dev jquery@3.2.1 @types/jquery@2.0.41 bootstrap@3.3.7 @types/bootstrap@3.3.34
```
8. Add new **TypeScript JSON Configuration File** tsconfig.json in VS2017 at project root
```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "noEmitOnError": true,
    "removeComments": false,
    "sourceMap": false,
    "target": "es5",
    "outDir": "./obj/ts/",
    "module": "commonjs",
    "moduleResolution": "node",
    "lib": [ "dom", "es5", "es6" ]
  },
  "exclude": [
    "node_modules",
    "wwwroot"
  ]
}
```
9. Add webpack.config.js at project root & configure:
- TypeScript transpiler
- JavaScript bundle
- Stylesheet bundle
- File loader for fonts & images
```js
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            './scripts/app.ts',
            './styles/app.css',
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/bootstrap/dist/css/bootstrap-theme.css'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'wwwroot/')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
    ]
};
```
10. Update npm config **package.json** to run webpack build
```json
"scripts": {
    "build": "webpack"
},
"-vs-binding": {
    "BeforeBuild": [
        "build"
    ]
}
```
11. Configure VS2017 project with **Post-build event command line**
```bash
npm run build
```
12. Edit directly csproj Project file to turn off default VS2017 TypeScript Compiler
```xml
<PropertyGroup>
    <TypeScriptCompileBlock>True</TypeScriptCompileBlock>
</PropertyGroup>
```
13. Edit app.ts
```typescript
import * as $ from "jquery"

$(document).ready(() => {
    $("<pre>").text("ASP.NET Core MVC TypeScript/WebPack template loaded").appendTo(document.body)
});
```
14. Build & Run Project in VS2017
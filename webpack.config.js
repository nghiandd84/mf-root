const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "mf-root";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "mf-app",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal === "true";
  const importMapData = {
    imports: {
      react:
        "https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.production.min.js",
      "react-dom":
        "https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.production.min.js",
      "single-spa":
        "https://cdn.jsdelivr.net/npm/single-spa@5.8.2/lib/system/single-spa.min.js",
      "@mf-user/mf-app": isLocal
        ? "http://localhost:8501/mf-user-mf-app.js"
        : "https://nghiandd84.github.io/mf-user/mf-user-mf-app.js",
      "@mf-dashboard/mf-app": isLocal
        ? "http://localhost:8502/mf-dashboard-mf-app.js"
        : "https://nghiandd84.github.io/mf-user/mf-dashboard-mf-app.js",
      "@mf-app/root-app": isLocal
        ? "http://localhost:9000/mf-root-mf-app.js"
        : "https://nghiandd84.github.io/mf-root/mf-root-mf-app.js",
      rxjs:
        "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@6.6.3/system/es2015/rxjs.min.js",
    },
  };
  console.log(isLocal);
  return merge(
    defaultConfig,
    {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal: isLocal,
            orgName,
          },
        }),
        new GenerateJsonPlugin("importmap.json", importMapData),
      ],
    },
    {
      // modify the webpack config however you'd like to by adding to this object
    }
  );
};

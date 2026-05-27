const { dependencies } = require("./package.json");
module.exports = {
    name: "container",
    filename: "remoteEntry.js",
    remotes: {
        homePage: "homePage@http://localhost:3011/remoteEntry.js",
        coursesPage: "Courses@http://localhost:3012/remoteEntry.js",
    },
    exposes: {},
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            import: "react",
            shareScope: "default",
            requiredVersion: dependencies.react,
        },
        "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
        },
    },
}

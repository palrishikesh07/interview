const { dependencies } = require("./package.json");
module.exports = {
    name: "Courses",
    filename: "remoteEntry.js",
    remotes: {},
    exposes: {
        "./Courses": "./src/App"
    },
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
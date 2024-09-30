module.exports = {
    apps: [
        {
            name: "heinsoe.com",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
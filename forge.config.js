module.exports = {
    packagerConfig: {
        // https://github.com/electron-userland/electron-installer-debian/issues/175#issuecomment-686982454
        name: 'cursor',
        icon: 'assets/icon/icon',
        extraResource: [
            './lsp',
            './resources',
            './tutor',
            './todesktop-runtime-config.json',
        ],
        osxSign: {},
        protocols: [
            {
                name: 'Electron Fiddle',
                schemes: ['electron-fiddle'],
            },
        ],
        // https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html#executablename
        // executableName: 'Cursor',
    },
    rebuildConfig: {},
    makers: [
        {
            // https://www.electronforge.io/config/makers/squirrel.windows
            name: '@electron-forge/maker-squirrel',
        },
        {
            // https://www.electronforge.io/config/makers/zip
            name: '@electron-forge/maker-zip',
        },
        {
            // https://www.electronforge.io/config/makers/rpm
            name: '@electron-forge/maker-rpm',
            platforms: ['linux'],
        },
        {
            // https://www.electronforge.io/config/makers/deb
            name: '@electron-forge/maker-deb',
            platforms: ['linux'],
            config: {
                options: {
                    mimeType: ['x-scheme-handler/electron-fiddle'],
                    icon: 'assets/icon/icon.png',
                },
            },
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-webpack',
            config: {
                mainConfig: './webpack.main.config.js',
                devContentSecurityPolicy:
                    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: file: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
                renderer: {
                    config: './webpack.renderer.config.js',
                    entryPoints: [
                        {
                            html: './src/index.html',
                            js: './src/index.ts',
                            name: 'main_window',
                            preload: {
                                js: './src/preload.ts',
                            },
                        },
                    ],
                },
            },
        },
    ],
}

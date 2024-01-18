import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es',
    },
    plugins: [
        resolve(), // Додаємо плагін node-resolve
        // Додаткові плагіни та налаштування можуть бути додані тут
    ],
};

//Librerias
const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

//Condición para no cerrar la aplicación cada vez que hagamos un cambio
if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {        
    })
}

//Método para crear una ventana principal y se carga la URL/ruta del archivo
let mainWindow
app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
});


//Librerias
const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

//Condición para no cerrar la aplicación cada vez que hagamos un cambio
if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {        
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow
let newProductWindow

//Método para crear una ventana principal y se carga la URL/ruta del archivo
app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    //Llamadas menu
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    //Cierra todas las ventanas (principal)
    mainWindow.on('closed', () => {
        app.quit();
    })
});

//Ventana para agregar un formulario
function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a New Product'
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    //Cierra todas las ventanas (añadir productos)
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
}

//Menú personalizado (array de objetos)
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New product',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow();
                }
            },
            {
                label: 'Remove All Products',
                click() {

                }
            },
            {
                label: 'Exit',
                //Condicion para diferentes dispositivos
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
]

//Condición para MAC
if(process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}

//Condición menu DevTools con consola y reload para actualizar
if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
               label: 'Show/Hide Dev Tools',
               click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
               }
            },
            {
                role: 'reload'
            }
        ]
    })
}
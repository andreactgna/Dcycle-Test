# 🌀 Dcycle Test

¡Hola! 👋  

Este proyecto es una demostración de mis habilidades, siguiendo las pautas establecidas en el ejercicio. 


## 👣 Flujo de la Aplicación  

La aplicación cuenta con **2 vistas principales**:  

- **Test 1:**  
  - Solicita al usuario su nombre y, tras enviarlo, obtiene y muestra:  
    - **Género más probable** y su porcentaje de certeza.  
    - **Nacionalidades probables**, acompañadas de su bandera y su probabilidad.  
    - **Edad estimada** basada en el nombre ingresado.  

- **Test 2:**  
  - Muestra información histórica sobre **COVID-19 en EE.UU. por día**, incluyendo:  
    - 📊 **Casos confirmados**.  
    - 🏥 **Pruebas realizadas**.  
    - ☠️ **Muertes registradas**.  
    - 📈 **Gráficos interactivos** para visualizar tendencias durante los años.  

---

## 🛠 Configuración  

Para clonar el proyecto, ejecuta:  

    $ git clone https://github.com/andreactgna/test-dcycle.git 

## 🏄 Cómo ejecutar el proyecto

Este proyecto cuenta con **un backend y un frontend**. Para que la aplicación funcione correctamente, primero debes iniciar el backend y luego ejecutar el frontend.  

### **1️⃣ Iniciar el Backend**  
Antes de correr la aplicación, asegúrate de que el servidor backend esté en ejecución:  

```sh
cd test-dcycle 
npm install && npm start 

```
El backend estará corriendo en: http://localhost:3200.

### **2️⃣ Iniciar el Frontend**  
Una vez que el backend esté activo, abre una nueva terminal y ejecuta:  

```sh
    cd test-dcycle-1
    npm install && npm start
```

La aplicación se ejecutará en: http://localhost:3000.

## ⚙️ Tecnologías utilizadas

* [React.js](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [React Router](https://reactrouter.com/)
* [Tailwind](https://v2.tailwindcss.com/)
* [Jest](https://jestjs.io/)


## 🏛️ Estructura del Proyecto

```
📂 src
│── 📂 api           # Contiene las funciones para realizar llamadas a la API.
│── 📂 components    # Contiene los componentes reutilizables en toda la aplicación.
│── 📂 hooks         # Contiene la lógica para el funcionamiento de las paginas principales
│── 📂 layout        # Define la estructura general de la aplicación, incluyendo encabezados, barras laterales y contenedores.
│── 📂 pages         # Contiene las páginas principales de la aplicación, cada una representando una vista.
│── global.d.ts       # Define los tipos globales y modelos utilizados en la aplicación.
│── App.tsx           # Maneja las rutas y la navegación.
│── index.tsx         
├── .gitignore     
├── package.json   
├── tsconfig.json  
└── README.md      
```

## 📝 Notas

✅ Se ha implementado manejo de errores en caso de que la API no responda correctamente.

✅ Se ha añadido un indicador de carga (loading) para mejorar la experiencia del usuario durante las solicitudes.

✅ La estructura del proyecto sigue el principio de **Separation of Concerns**, organizando el código de manera modular según su responsabilidad.

## 🚧 Mejoras y Roadmap

- \[ ] Implementar testing modular para verificar el correcto funcionamiento del flujo de las páginas.
- \[ ] Refinar la estructura del proyecto para mejorar la escalabilidad si este crece.
- \[ ] Dividir los componentes en unidades más pequeñas y reutilizables.
- \[ ] Mejor uso de etiquetas semánticas para mejorar la accesibilidad y compatibilidad con lectores de pantalla.
  
## ⭐️ Conclusión

¡Muchas gracias por la oportunidad! 🙇‍♀️

Ha sido un placer participar en este proceso y demostrar mis habilidades.
Estoy abierta a cualquier sugerencia, feedback o comentarios para mejorar aún más. 🚀✨

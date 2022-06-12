# Despliegue GestionApp
___

## Despliegue con Docker
Para este despliegue se ha optado por un despliegue con docker a partir de un empaquetado " .jar " para la api, un contenedor con node para la app en react para el fron y otro contenedor para la base de datos

### Pasos a seguir
1.Descargar la carpeta del proyecto o clonarlo del repositorio de [GitHub](https://github.com/luisalvarez35/ProyectoFinal.git).

2.Iniciar Docker.

3.Ejecutar el archivo " docker-compose.yml ". ==> ``docker-compose up -d``.

4.La aplicacion se encontrara en ``localhost:3000``.


### Despliegue en detalle

En esta seccion abordaremos en detalle el despliegue y posibles problemas comunes que se puedan producir.

#### Dockerfile API

En el archivo Dockerfile empezamos creando a partir de una imagen de 
maven a la cual asignamos el nombre de "build" un directorio de trabajo en el cual copiamos
los archivos necesarios para posteriormente generar el archivo ".jar" que a continuacion,
en una imagen del jdk11, copiamos con el nombre de " app.jar ". Despues de esto, exponemos el puerto
que necesitara la aplicacion (dentro de la red en docker) y la ejecutamos.

#### Dockerfile React

En este archivo Dockerfile empezamos descargando una imagen con nodeJS, definimos el working directory y agregamos e intalados las dependecias necesaria. Para finalizar copiamos la apicacion al contenedor y la ejecutamos.

#### Docker-compose

En el archivo Docker-compose se han creado dos servicios, el primero para una base de
datos MySQL, se le indica que se reinicie si por algun motivo se parase, se expone el puerto necesario para una conexion externa,
se dan los datos de configuracion de la base de datos necesarios, se crea un volumen para la persistencia de los datos
y se vincula con una red interna de docker llamada GestionApp.

En el segundo servicio se utiliza el Dockerfile para crear la imagen ya con la aplicacion, se definan los volumenes utilizados y se vinculan los puertos.

En el tercer servicio se utiliza el Dockerfile para crear la imagen ya con la aplicacion, se le
indica que se reinicie en el caso de que falle al iniciar la app (ya que es posible que la base de datos
no este preparada para una conexion en el primer intento de despliegue de la aplicacion), se le indica igualmente
que depende del servicio de la base de datos, se le pasan otros datos necesarios como la red interna a la que pertenece
y se vincula el puerto 8080 que expusimos en el dockerfile para la red interna al puerto 8080 para la red externa.

#### Problemas comunes

* En el caso de que no arranque alguno de los servicios es posible que los puertos ya esten ocupados,
en ese caso cerrar los servicios que esten utilizando los puertos 3306,3000 y 8080.

* Es posible que el servicio de la aplicacion no se inicie a la primera, eso es debido a que aun se esta 
configurando la base de datos o creando el volumen para la persistencia de datos. En ese caso
el servicio de la aplicacion se reiniciara automaticamente hasta que consiga hacer la conexion (unos pocos segundos).
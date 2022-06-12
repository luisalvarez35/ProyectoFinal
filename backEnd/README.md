# Despliegue GestionApp
___
En esta practica se describira como realizarse el despliegue de la aplicacion.
Para ellos se propondran dos formas distintas.

## Despliegue con Docker
Para este despliegue se ha optado por un despliegue con docker a partir de un empaquetado " .jar ".

### Pasos a seguir
1.Descargar la carpeta del proyecto o clonarlo del repositorio de [GitHub](https://github.com/luisalvarez35/GestionApp.git).

2.Iniciar Docker.

3.Ejecutar el archivo " docker-compose.yml ". ==> ``docker-compose up -d``

4.La aplicacion se encontrara en ``localhost:9000``

5.El servicio rest de productos se encontrara en ``localhost:9000/productos/rest`` y el de de filtrado por id en ``localhost:9000/productos/rest/(introducir id despues de la barra)``.


### Despliegue en detalle

En esta seccion abordaremos en detalle el despliegue y posibles problemas comunes que se puedan producir.

#### Dockerfile

En el archivo Dockerfile empezamos creando a partir de una imagen de 
maven a la cual asignamos el nombre de "build" un directorio de trabajo en el cual copiamos
los archivos necesarios para posteriormente generar el archivo ".jar" que a continuacion,
en una imagen del jdk11, copiamos con el nombre de " app.jar ". Despues de esto, exponemos el puerto
que necesitara la aplicacion (dentro de la red en docker) y la ejecutamos.

#### Docker-compose

En el archivo Docker-compose se han creado dos servicios, el primero para una base de
datos MySQL, se le indica que se reinicie si por algun motivo se parase, se expone el puerto necesario para una conexion externa,
se dan los datos de configuracion de la base de datos necesarios, se crea un volumen para la persistencia de los datos
y se vincula con una red interna de docker llamada GestionApp.

En el segundo servicio se utiliza el Dockerfile para crear la imagen ya con la aplicacion, se le
indica que se reinicie en el caso de que falle al iniciar la app (ya que es posible que la base de datos
no este preparada para una conexion en el primer intento de despliegue de la aplicacion), se le indica igualmente
que depende del servicio de la base de datos, se le pasan otros datos necesarios como la red interna a la que pertenece
y se vincula el puerto 8080 que expusimos en el dockerfile para la red interna al puerto 9000 para la red externa.

#### Problemas comunes

* En el caso de que no arranque alguno de los servicios es posible que los puertos ya esten ocupados,
en ese caso cerrar los servicios que esten utilizando los puertos 3306 y 9000, o cambiar los puertos 
expuestos en el archivo docker-compose.

* Es posible que el servicio de la aplicacion no se inicie a la primera, eso es debido a que aun se esta 
configurando la base de datos o creando el volumen para la persistencia de datos. En ese caso
el servicio de la aplicacion se reiniciara automaticamente hasta que consiga hacer la conexion (unos pocos segundos).

  
## Despliegue con Intellij y Docker 

Para este despliegue de la aplicacion se usara Intellij y docker para la base de datos

### Pasos a seguir
1.Descargar la carpeta del proyecto o clonarlo del repositorio de [GitHub](https://github.com/luisalvarez35/GestionApp.git).

2.Comprobar que todos las dependencias del " pom.xml " estan correctamente descargadas.

3.Modificar el archivo " application.properties ". Descomentar la configuracion para deploy con intellij y comentar la de deploy completo en docker.

4.Iniciar Docker. 

5.Ejecutar el archivo " docker-compose-mysql.yml ". ==> `` docker-compose -f docker-compose-mysql.yml up -d ``

6.Ejecutar GestionAppAplication en Intellij.

5.La aplicacion se encontrara en ``localhost:8080``.

6.El servicio rest de productos se encontrara en ``localhost:8080/productos/rest`` y el de de filtrado por id en ``localhost:8080/productos/rest/(introducir id despues de la barra)``.

### Despliegue en detalle

En esta seccion abordaremos en detalle el despliegue y posibles problemas comunes que se puedan producir.

#### Archivo application.properites

En este archivo es necesario modificar la coxecion a la base de datos que se ha dejado por defecto ya que es para el despliegue completo en docker,
para cambiarla a una conexion externa desde Intellij solo hay que descomentar la linea para la conexion con Intellij y comentar la de
deploy completo en docker como se indica en el propio archivo.

#### Docker-compose-mysql

En el archivo Docker-compose-mysql se han creado un servicio con una base de datos MySQL, se ha creado un volumen para la persistencia de
datos, se ha expuesto el puerto necesario para la conexion y se han pasado otros datos necesarios para la configuracion.


#### Problemas comunes

* En el caso de que la aplicacion no arranque es posible que el puerto 8080 o el 3306 ya esten ocupados por otro servicio,
es ese caso se deben cerrar esos servicios o cambiar los puertos en el archivo docker-compose-mysql y su respectiva conexion a
base de datos en el archivo " application.properties " donde tambien se puede cambiar el puerto por el que se despliega la aplicacion.

* En el caso de que la aplicacion no arranque revisar el archivo " pom.xml " y comprobar que no hay errores con las dependencias.
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-CClhon3)
# Desarrollo de aplicación web para HomeSafe

La empresa **HomeSafe** quiere desarrollar una aplicación web con **Angular** para permitirles a sus clientes administrar el sistema de seguridad instalado en los hogares. Para ello ha solicitado una serie de funcionalidades para el primer **MVP**.

## Funcionalidades solicitadas

### 1. Pantalla de ingreso
Se deberá realizar una pantalla de ingreso a la aplicación donde se solicita:

- **Email**: Debe tener el siguiente formato: `usuario@homesafe.io`.
- **Contraseña**: Debe cumplir con las siguientes condiciones:
  - Al menos 10 caracteres.
  - Contar con 1 mayúscula.
  - Contar con 1 minúscula.
  - Contar con al menos 1 carácter especial.

La validación de estos datos deberá realizarse a través del siguiente endpoint:  
**Endpoint**: `https://6317ca93f6b281877c5d7785.mockapi.io/users`.

### 2. Pantalla de armado y desarmado
Una vez ingresado al sistema, el usuario tendrá una pantalla para armar y desarmar el sistema de seguridad, dependiendo del estado actual. El comportamiento será el siguiente:

- **Estado desarmado**: Se mostrará el mensaje "ARMAR" con letras de color **verde**.
- **Estado armado**: Se mostrará el mensaje "DESARMAR" de color **rojo** junto con la cantidad de zonas afectadas.

El usuario podrá armar o desarmar la alarma eligiendo previamente el **modo** que desea configurar, consultando el siguiente endpoint:  
**Endpoint**: `https://674531d6b4e2e04abea50775.mockapi.io/alarm-mode`.

Al confirmar el armado/desarmado, se debe guardar el estado actual por usuario en el siguiente endpoint:  
**Endpoint**: `https://6317ca93f6b281877c5d7785.mockapi.io/alarm-status`.

Además, se debe registrar la **última fecha y hora** en la que la alarma cambió de estado.

### 3. Formulario de carga de un nuevo modo
En la pantalla de armado y desarmado se debe incluir un botón que redirija a otra pantalla para cargar un **nuevo modo**. Este modo tendrá los siguientes datos:

- **Nombre** (requerido, al menos 5 caracteres).
- **Usuario logueado**.
- **Zonas** (arreglo de zonas tomado de: `https://674531d6b4e2e04abea50775.mockapi.io/alarm-zones`).

**Validaciones del formulario:**
- Mostrar un mensaje de error si existe una zona con el mismo nombre para el usuario que ingresó al sistema.
- No permitir cargar dos zonas iguales.

**Endpoint para cargar el modo**:  
`https://674531d6b4e2e04abea50775.mockapi.io/alarm-mode`

**Ejemplo de request de la entidad "modo":**
```json
{
  "name": string,
  "userId": string,
  "creationDate": Date,
  "zones": string[]
}
```

## Consideraciones
- Implementar formularios reactivos.
- Implementar routing.
- El código debe ser programado en inglés.

## MockUps

**Login**
![Login](https://i.postimg.cc/2yhLKKTV/login.png)

**Panel #1**
![Panel #1](https://i.postimg.cc/ncfDDnc7/p1.png)

**Panel #2**
![Panel #2](https://i.postimg.cc/gcZhjxdm/p2.png)

**Formulario Nuevo Modo #1**
![Formulario Nuevo Modo #1](https://i.postimg.cc/TR0Jv52s/f1.png)

**Formulario Nuevo Modo #2**
![Formulario Nuevo Modo #2](https://i.postimg.cc/Jn9BKLNf/f2.png)


## Rúbrica

- **Login**: 3 puntos
- **Panel**: 2 puntos
- **Formulario Modo**: 4 puntos
- **Estilos**: 1 punto

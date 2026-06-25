# SIGA - Prototipo funcional

SPA desarrollada con React, TypeScript, Vite y Tailwind CSS v4 para simular un
Sistema Integrado de Gestión Aduanera en pasos fronterizos terrestres entre
Chile y Argentina.

## Ejecución

```bash
npm install
npm run dev
```

Validaciones técnicas:

```bash
npm run lint
npm run build
```

## Credenciales

| Perfil | RUT | Contraseña |
|---|---|---|
| Funcionario de Aduanas | `12.345.678-5` | `aduana123` |
| Administrador | `11.111.111-1` | `admin123` |

## Funcionalidades

- Login, cierre de sesión, roles y expiración por inactividad.
- Persistencia simulada mediante `localStorage`.
- Auditoría interna de accesos y operaciones.
- Control vehicular con captura QR y cámara LPR simuladas.
- Regla de permanencia de 180 días para particulares y 90 para diplomáticos.
- Permiso de admisión temporal con impresión obligatoria en dos copias.
- Declaración jurada SAG y derivación automática a inspección.
- Tótem de autoatención y validación de autorización de menores.
- Dashboard, estadísticas, exportación CSV e impresión/guardado PDF.
- Vista navegable con las seis iteraciones desde el MVP hasta la versión 1.0.

## Alcance

Es un prototipo académico sin backend. Las integraciones con PDI, SAG, Registro
Civil y Aduana Argentina se representan mediante respuestas y reglas simuladas.
No se utilizan datos personales reales.

## Evolución

El detalle de las seis iteraciones se encuentra en
[`docs/iteraciones.md`](docs/iteraciones.md). La planilla de pruebas y control
de cambios, junto con la presentación, se genera en `output/`.

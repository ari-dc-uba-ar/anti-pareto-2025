SET ROLE TO anti_pareto_user;

CREATE TABLE IF NOT EXISTS alumnos (
    numero_libreta TEXT PRIMARY KEY,
    apellido TEXT NOT NULL,
    nombre TEXT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    edad_inscripcion INTEGER NOT NULL
);

-- Datos de ejemplo
INSERT INTO alumnos (numero_libreta, apellido, nombre, fecha_inscripcion, edad_inscripcion) VALUES
('A001', 'Gómez', 'Juan', '2024-01-15', 20),
('A002', 'López', 'María', '2024-02-20', 22),
('A003', 'Pérez', 'Carlos', '2024-03-10', 19)
ON CONFLICT (numero_libreta) DO NOTHING;
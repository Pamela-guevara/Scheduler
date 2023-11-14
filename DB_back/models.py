from flask_sqlalchemy import SQLAlchemy  # Importamos SQLAlchemy
db = SQLAlchemy()  # Creamos la instancia db
from dataclasses import dataclass


@dataclass
class Entrenado(db.Model):

    __tablename__ = "Entrenado"

    id = db.Column(db.Integer, primary_key=True)
    sesiones = db.relationship(
        "Sesiones", back_populates="entrenado", cascade="all, delete-orphan")
    nombre = db.Column(db.String(45), nullable=False)
    apellido = db.Column(db.String(45), nullable=False)
    apodo = db.Column(db.String(45), nullable=False)
    dni = db.Column(db.Integer(), nullable=False)
    fecha_nacimiento = db.Column(db.DateTime, nullable=False)
    grupo_sanguineo = db.Column(db.String(5), nullable=False)
    antecedentes_salud = db.Column(db.String(255), nullable=False)
    talle = db.Column(db.String(5), nullable=False)
    direccion = db.Column(db.String(45), nullable=False)
    telefono = db.Column(db.String(15), nullable=False)
    correo = db.Column(db.String(45), nullable=False)

    def __init__(self, nombre, apellido, apodo, dni, fecha_nacimiento,
                 grupo_sanguineo, antecedentes_salud, talle, direccion,
                 telefono, correo):
        self.nombre = nombre
        self.apellido = apellido
        self.apodo = apodo
        self.dni = dni
        self.fecha_nacimiento = fecha_nacimiento
        self.grupo_sanguineo = grupo_sanguineo
        self.antecedentes_salud = antecedentes_salud
        self.talle = talle
        self.direccion = direccion
        self.telefono = telefono
        self.correo = correo


    def __repr__(self):
        return f'<Usuario {self.apodo}>'

    # Guardar en la base de datos
    def save(self):
        # Comprueba que el id no exista antes de agregarlo en la db
        if not self.id:
            db.session.add(self)  # agrega a la db
        db.session.commit()  # graba en la db


class Sesiones(db.Model):
    __tablename__ = "Sesiones"
    Id = db.Column(db.Integer, primary_key=True)

    # Clave foranea
    entrenado_id = db.Column(db.Integer, db.ForeignKey(
        'Entrenado.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    Subject = db.Column(db.String(255), nullable=False)
    StartTime = db.Column(db.DateTime, nullable=False)
    EndTime = db.Column(db.DateTime, nullable=False)
    Description = db.Column(db.String(255), nullable=True)
    RecurrenceRule = db.Column(db.String(255), nullable=True)

    # Relación- Tabla, back-populates -> atributo que lo relaciona en la otra tabla
    # uselist -> Falso para que no arme una lista con ella pues es solo un elemento
    entrenado = db.relationship(
        "Entrenado", back_populates="sesiones", uselist=False, single_parent=True)

    def __init__(self, Id, Subject, entrenado_id, StartTime, EndTime,
                 Description, RecurrenceRule):
        self.Id = Id
        self.Subject = Subject
        self.entrenado_id = entrenado_id
        self.StartTime = StartTime
        self.EndTime = EndTime
        self.Description = Description
        self.RecurrenceRule = RecurrenceRule

    def save(self):
        if not self.id:
            db.session.add(self)
        db.session.commit()

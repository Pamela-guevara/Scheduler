# Import
from flask import Flask, request, jsonify, redirect
import config  # importamos el archivo de configuración "config.py"
from models import db, Entrenado, Sesiones  # Importamos la DB
from flask_cors import CORS  # Librería que permite el intercambio de datos
from flask_marshmallow import Marshmallow

# Instancia +config
app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)
CORS(app)
ma = Marshmallow(app)


class EntrenadoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'apellido', 'apodo', 'dni', 'fecha_nacimiento', 'grupo_sanguineo',
                        'antecedentes_salud', 'talle', 'direccion', 'telefono', 'correo', 'es_activo', 'pago')


class SesionesSchema(ma.Schema):
    class Meta:
        fields = ('Id', 'Subject', 'entrenado_id', 'StartTime',
                  'EndTime', 'Description', 'RecurrenceRule')

# class SesionesSchema ToDo


entrenado_schema = EntrenadoSchema()
entrenados_schema = EntrenadoSchema(many=True)
sesion_schema = SesionesSchema()
sesions_schema = SesionesSchema(many=True)

# -------------------- Rutas para la tabla de entrenados ----------------------------

# Retorna todos los usuarios registrados


@app.route('/get_entrenados')
def entrenados():
    try:
        trainers = Entrenado.query.all()
        # print(type(trainers))
        res = entrenados_schema.dump(trainers)
        # print(jsonify(res))
        return jsonify(res)
    except Exception as e:
        print(e)
        return ("La lista está vacía")

# Retorna un entrenado por id


@app.route('/get_one_by_id/<id>', methods=['GET'])
def get_by_id(id):
    entrenado = db.session.get(Entrenado, id)
    if (entrenado):
        print('BE: get by id:', entrenado_schema.jsonify(entrenado))
        return entrenado_schema.jsonify(entrenado)
    else:
        return 'No encuentra por id'

# Retorna un entrenado por id


@app.route('/get_one/<doc>', methods=['GET'])
def get_by_dni(doc):
    print(type(doc), doc)
    entrenado_1 = Entrenado.query.filter_by(dni=int(doc)).first()
    if entrenado_1:
        res = entrenado_schema.dump(entrenado_1)
        return jsonify(res)
    else:
        return ('No existe el alumno')

# Devuelve el id buscando a través del dni, util para otras funciones


def get_id_by_dni(doc):

    try:
        entrenado = Entrenado.query.filter_by(dni=int(doc)).first()
        # print(entrenado.id)
        return (entrenado.id, entrenado.apodo)
    except Exception as e:
        return e
# Actualiza un entrenado


@app.route('/put_one/<doc>', methods=['PUT'])
def put_one(doc):
    try:
        id,  _ = get_id_by_dni(doc)
        entrenado_1 = db.session.get(Entrenado, id)
        # print("1:", entrenado_1)
        # print("2:", entrenado_1.apodo)
        # print("name", name)
        entrenado_1.nombre = request.json['nombre']
        entrenado_1.apellido = request.json['apellido']
        entrenado_1.apodo = request.json['apodo']
        entrenado_1.dni = request.json['dni']
        entrenado_1.fecha_nacimiento = request.json['fecha_nacimiento']
        entrenado_1.grupo_sanguineo = request.json['grupo_sanguineo']
        entrenado_1.antecedentes_salud = request.json['antecedentes_salud']
        entrenado_1.talle = request.json['talle']
        entrenado_1.direccion = request.json['direccion']
        entrenado_1.telefono = request.json['telefono']
        entrenado_1.correo = request.json['correo']
        entrenado_1.es_activo = request.json['es_activo']
        entrenado_1.pago = request.json['pago']

        db.session.commit()
        # print("3:", entrenado_1.grupo_sanguineo)
        return entrenado_schema.jsonify(entrenado_1)

    except:
        return ('No existe ese alumno')

# Elimina un usuario


@app.route('/delete_one/<doc>', methods=['DELETE'])
def borrar_uno(doc):
    id, _ = get_id_by_dni(doc)
    if id:
        try:
            # print("0")
            Entrenado.query.filter_by(id=id).delete()
            # print("1")
            db.session.commit()
            # print("2")
            return ("Borrado con éxito")
        except:
            return ("No se puede eliminar")
    else:
        return ("No existe el alumno")


# Graba un nuevo usuario en la db
@app.route('/post_entrenados', methods=['POST'])
def nuevo_entrenado():

    try:
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        apodo = request.json['apodo']
        dni = request.json['dni']
        fecha_nacimiento = request.json['fecha_nacimiento']
        grupo_sanguineo = request.json['grupo_sanguineo']
        antecedentes_salud = request.json['antecedentes_salud']
        talle = request.json['talle']
        direccion = request.json['direccion']
        telefono = request.json['telefono']
        correo = request.json['correo']
        es_activo = request.json['es_activo']
        pago = request.json['pago']

        new_ent = Entrenado(nombre, apellido, apodo, dni, fecha_nacimiento, grupo_sanguineo,
                            antecedentes_salud, talle, direccion, telefono, correo, es_activo, pago)

        db.session.add(new_ent)
        db.session.commit()
        return entrenado_schema.jsonify(new_ent)
    except Exception as e:
        return e

# ----------------------- Rutas para la tabla de sesiones ----------------------------------------

# Retorna todas las sesiones


@app.route('/get_sessions')
def sesiones():
    sessions = Sesiones.query.all()
    res = sesions_schema.dump(sessions)
    return jsonify(res)


@app.route('/post_session', methods=['POST'])
def nueva_sesion():

    doc = request.json['Subject']
    id_entrenado, apodo = get_id_by_dni(doc)
    if id_entrenado:
        # print('JSON:', request.json)

        Id = request.json['Id']
        Subject = apodo
        entrenado_id = id_entrenado
        StartTime = request.json['StartTime'][:-5]
        EndTime = request.json['EndTime'][:-5]
        Description = request.json['Description']
        RecurrenceRule = request.json['RecurrenceRule']
        # Devuelve el id de sesion
        new_ses = Sesiones(Id, Subject, entrenado_id, StartTime, EndTime,
                           Description, RecurrenceRule)
        db.session.add(new_ses)
        db.session.commit()

        return sesion_schema.dump(new_ses)
    else:
        return 'No se puede'


# Esta sentencia indica al app que si las tablas no existen, que las cree,
# sino continua con su ejecución normal
with app.app_context():
    db.create_all()
    db.session.commit()

# Run
if __name__ == '__main__':
    app.run(debug=True)

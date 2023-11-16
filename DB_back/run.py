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
                        'antecedentes_salud', 'talle', 'direccion', 'telefono', 'correo')


class SesionesSchema(ma.Schema):
    class Meta:
        fields = ('Id', 'Subject', 'entrenado_id', 'StartTime',
                  'EndTime', 'Description', 'RecurrenceRule', 'IsAllDay', 'RecurrenceID', 'RecurrenceException')


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
        return res, 200
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
        return (entrenado.id, entrenado.apodo)
    except Exception as e:
        return False
# Actualiza un entrenado


@app.route('/put_one/<doc>', methods=['PUT'])
def put_one(doc):
    try:
        id,  _ = get_id_by_dni(doc)
        entrenado_1 = db.session.get(Entrenado, id)
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
        

        db.session.commit()
        # print("3:", entrenado_1.grupo_sanguineo)
        return entrenado_schema.jsonify(entrenado_1)

    except:
        return ('No existe ese alumno')

# Elimina un usuario


@app.route('/delete_one/<doc>', methods=['DELETE'])
def borrar_uno(doc):
    id, _= get_id_by_dni(doc)
    if id != False:
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
    print("linea 139:",get_id_by_dni(request.json['dni']))
    print("linea 140:",request.json['dni'])

    id = get_id_by_dni(request.json['dni'])

    if id != False:
        raise Exception('El usuario ya existe')
    
    else:

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

            new_ent = Entrenado(nombre, apellido, apodo, dni, fecha_nacimiento, grupo_sanguineo,
                                antecedentes_salud, talle, direccion, telefono, correo)

            db.session.add(new_ent)
            db.session.commit()
            return entrenado_schema.jsonify(new_ent)
        except Exception as e:
            return e

# ----------------------- Rutas para la tabla de sesiones ----------------------------------------
########################### ToDo: Hacer rutas para actualizar sesiones y borrarlas ########################

# Retorna todas las sesiones

def get_by_nick(nick:str):
    try:
        entrenado = Entrenado.query.filter_by(apodo=nick).first()
        return entrenado.id
    except Exception as e:
        return False


@app.route('/get_sessions')
def sesiones():
    sessions = Sesiones.query.all()
    res = sesions_schema.dump(sessions)
    return jsonify(res)


@app.route('/post_session', methods=['POST'])
def nueva_sesion():
    print(request.json)
    try:
        if type(int(request.json['Subject'])) == int:
            doc = request.json['Subject']
            id_entrenado, apodo = get_id_by_dni(doc)
            if id_entrenado:
                
                Id = request.json['Id']
                Subject = apodo
                entrenado_id = id_entrenado
                StartTime = request.json['StartTime'][:-5]
                EndTime = request.json['EndTime'][:-5]
                Description = request.json['Description']
                RecurrenceRule = request.json['RecurrenceRule']
                IsAllDay = request.json['IsAllDay']
                RecurrenceID = request.json['RecurrenceID']
                RecurrenceException = request.json['RecurrenceException']
                # Devuelve el id de sesion
                new_ses = Sesiones(Id, Subject, entrenado_id, StartTime, EndTime,
                                Description, RecurrenceRule, IsAllDay, RecurrenceID, RecurrenceException)
                db.session.add(new_ses)
                db.session.commit()

                return sesion_schema.dump(new_ses)
            else:
                return 'No se puede'
    
    except:
        if type(request.json['Subject']) == str:  
            id_entrenado = get_by_nick(request.json['Subject'])
            try:
                Id = request.json['Id']
                Subject = request.json['Subject']
                entrenado_id = id_entrenado
                StartTime = request.json['StartTime'][:-5]
                EndTime = request.json['EndTime'][:-5]
                Description = request.json['Description']
                RecurrenceRule = request.json['RecurrenceRule']
                IsAllDay = request.json['IsAllDay']
                RecurrenceID = request.json['RecurrenceID']
                RecurrenceException = request.json['RecurrenceException']
                    # Devuelve el id de sesion
                new_ses = Sesiones(Id, Subject, entrenado_id, StartTime, EndTime,
                                    Description, RecurrenceRule, IsAllDay, RecurrenceID, RecurrenceException)
                db.session.add(new_ses)
                db.session.commit()
                return sesion_schema.dump(new_ses)
            except:
                return 'No se puede actualizar la sesión existente solicitada'
    
    #ToDo : Hacer edit sesiones y delete sesiones
@app.route('/delete_session', methods=['DELETE'])
def delete_session():
    # Borra un evento que no es recurrente o toda la recurrencia de un mismo evento
    if request.json['Type'] == "Single":    
        id = request.json['Id']
        try:
            Sesiones.query.filter_by(Id=id).delete()
            db.session.commit()
            return ("Sesión borrada con éxito")
        except:
            return ("No se puede eliminar la sesión")
    #elif request.json['Type'] == "Recurrence":

@app.route('/put_session', methods=['PUT'])
def put_session():

    Id = request.json['Id']
    recurrence = request.json['RecurrenceException']
    
    if request.json['Type'] == "Recurrence":  # Para eliminar solo una sesión de una serie
        
        try:
            session_1 = db.session.get(Sesiones, Id)
            session_1.RecurrenceException = recurrence
            db.session.commit()
            return sesion_schema.jsonify(session_1)
        except:
            return("No se pudo actualizar el registro")
        
    elif request.json['Type'] == "Modify":  # Para modificar uno dentro de una serie
        try:
            session_2 = db.session.get(Sesiones, Id)
            print("lnea 273", session_2)
            session_2.StartTime = request.json['StartTime'][:-5]
            print("lnea 275")
            session_2.EndTime = request.json['EndTime'][:-5]
            print("lnea 277")
            session_2.Description = request.json['Description']
            print("lnea 279")
            session_2.RecurrenceRule = request.json['RecurrenceRule']
            print("lnea 281")
            db.session.commit()
            print("279:",sesion_schema.jsonify(session_2))
            return sesion_schema.jsonify(session_2)
        except:
            return ("No se pudo modificar el evento de la serie")




   

# Esta sentencia indica al app que si las tablas no existen, que las cree,
# sino continua con su ejecución normal
with app.app_context():
    db.create_all()
    db.session.commit()

# Run
if __name__ == '__main__':
    app.run(debug=True)

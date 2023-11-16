import React, { useState, useRef, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  WorkWeek,
  Week,
  Month,
  Inject,
  EventSettingsModel,
  ViewDirective,
  ViewsDirective,
  ActionEventArgs,
  Timezone,
} from "@syncfusion/ej2-react-schedule";
import "./scheduler.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

// ToDo: Actualizar y borrar evento

export default function Agenda() {
  // Variables
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [data, setData] = useState<object[]>([]);
  const [dataManager, setDataManager] = useState<object[]>([]);
  var timezone = new Timezone();
  //----------------------------------------------------------------------
  //############# AGREGA NUEVO EVENTO CON Y SIN RECURRENCIA #########################
  const onActionComplete = async (args: ActionEventArgs) => {
    console.log("req type :" + args.requestType);
    if (args.requestType === "eventCreated") {
      const creado = args.addedRecords ? args.addedRecords[0] : null;
      const evento = {
        Id: creado?.Id,
        Subject: creado?.Subject,
        Description: creado?.Description || "",
        StartTime: timezone.removeLocalOffset(creado?.StartTime),
        EndTime: timezone.removeLocalOffset(creado?.EndTime),
        RecurrenceRule: creado?.RecurrenceRule || "",
        IsAllDay: null,
        RecurrenceID: creado?.RecurrenceID || null,
        RecurrenceException: creado?.RecurrenceException || "",
      };

      await axios
        .post("http://127.0.0.1:5000/post_session", evento)
        .then((response: any) => {
          let loadedEvent = response.data;
          const StartTime = new Date(loadedEvent.StartTime);
          const EndTime = new Date(loadedEvent.EndTime);
          loadedEvent["StartTime"] = StartTime;
          loadedEvent["EndTime"] = EndTime;
          data.unshift(loadedEvent);
          setData(data);
        })
        .catch(() => console.log("no hay API"));

      if (!data) {
        return "no data";
      } else {
        loadData(data);
        return;
      }
      //##################### REMOVER UN EVENTO CON Y SIN RECURRENCIA ####################
    } else if (args.requestType === "eventRemoved") {
      if (args.deletedRecords && args.changedRecords?.length === 0) {
        // Elimina un evento sin recurrencia
        const deleted = args.deletedRecords ? args.deletedRecords[0] : null;
        const evento = {
          Id: deleted?.Id,
          Type: "Single",
        };

        await axios
          .delete("http://127.0.0.1:5000/delete_session", { data: evento })
          .then((res) => res.data)
          .then((data) => console.log(data))
          .catch(() => alert("Hubo un error al eliminar el evento"));
      } else if (args.changedRecords && args.deletedRecords?.length === 0) {
        // Elimina dentro de una recurrencia
        const deleted = args.changedRecords ? args.changedRecords[0] : null;
        const evento = {
          Id: deleted?.Id,
          Type: "Recurrence",
          RecurrenceException: deleted?.RecurrenceException,
        };
        await axios
          .put("http://127.0.0.1:5000/put_session", evento)
          .then((res) => res.data)
          .then((data) => console.log("Modificada la Serie"))
          .catch(() => alert("Hubo un error al modificar el evento"));
      }
      //##################### EDITAR UN EVENTO CON Y SIN RECURRENCIA #####################
    } else if (args.requestType === "eventChanged") {
      if (
        args.addedRecords?.length !== 0 &&
        args.changedRecords?.length !== 0
      ) {
        console.log(args);
        const change = args.changedRecords ? args.changedRecords[0] : null;
        const event = {
          Type: "Recurrence",
          Id: change?.Id,
          RecurrenceException: change?.RecurrenceException,
        };
        await axios
          .put("http://127.0.0.1:5000/put_session", event)
          .then((res) => res.data)
          .then((data) => console.log("Modificada la Serie"))
          .catch(() =>
            alert("Hubo un error al modificar el evento de la serie")
          );

        const creado = args.addedRecords ? args.addedRecords[0] : null;

        if (creado?.RecurrenceRule) {
          const evento = {
            Id: creado?.Id,
            Subject: creado?.Subject,
            Description: creado?.Description || null,
            StartTime: timezone.removeLocalOffset(creado?.StartTime),
            EndTime: timezone.removeLocalOffset(creado?.EndTime),
            IsAllDay: null,
            RecurrenceRule: creado?.RecurrenceRule,
            RecurrenceException: creado?.RecurrenceException,
            RecurrenceID: creado?.RecurrenceID,
          };
          await axios
            .post("http://127.0.0.1:5000/post_session", evento)
            .then((response: any) => {
              let loadedEvent = response.data;
              const StartTime = new Date(loadedEvent.StartTime);
              const EndTime = new Date(loadedEvent.EndTime);
              loadedEvent["StartTime"] = StartTime;
              loadedEvent["EndTime"] = EndTime;
              data.unshift(loadedEvent);
              setData(data);
            })
            .then(() => console.log("Nuevo evento en la serie"))
            .catch(() => console.log("no hay API"));

          if (!data) {
            console.log("no data");
          } else {
            loadData(data);
          }
        }
      } else {
        const change = args.changedRecords ? args.changedRecords[0] : null;
        if (change?.RecurrenceRule) {
          const evento = {
            Id: change?.Id,
            Description: change?.Description || null,
            StartTime: timezone.removeLocalOffset(change?.StartTime),
            EndTime: timezone.removeLocalOffset(change?.EndTime),
            RecurrenceRule: change?.RecurrenceRule,
            RecurrenceException: null,
            Type: "Modify",
          };
          await axios
            .put("http://127.0.0.1:5000/put_session", evento)
            .then((res) => res.data)
            .then(() => console.log("Modifica un Solo y lo convierte en Serie"))
            .catch(() => alert("Hubo un error al modificar primer if"));
        } else {
          const evento = {
            Id: change?.Id,
            Description: change?.Description || null,
            StartTime: timezone.removeLocalOffset(change?.StartTime),
            EndTime: timezone.removeLocalOffset(change?.EndTime),
            RecurrenceRule: "",
            RecurrenceException: "",
            Type: "Modify",
          };
          await axios
            .put("http://127.0.0.1:5000/put_session", evento)
            .then((res) => res.data)
            .then((data) => {
              console.log("Modifica un Solo");
              console.log(data);
            })
            .catch(() => alert("Hubo un error al modificar segundo if"));
        }
      }
    }
  };

  const loadData = (data: object[]) => {
    scheduleObj.current?.saveEvent(data);
    data.pop();
    setData(data);
  };

  const getData = async () => {
    var res = await axios
      .get("http://127.0.0.1:5000/get_sessions")
      .then((response) => {
        return response.data;
      });

    return res;
  };

  useEffect(() => {
    const res = getData();
    res.then((datos: any) => {
      setDataManager(datos);
    });
  }, []);

  const eventSettings: EventSettingsModel = { dataSource: dataManager };

  return (
    <div>
      <div className="div-nav">
        <Navbar />
      </div>
      <ScheduleComponent
        ref={scheduleObj}
        currentView="Month"
        eventSettings={eventSettings}
        actionComplete={onActionComplete}
        /* enablePersistence={true} */
        /* timezone="America/Argentina/Buenos_Aires" */
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
}

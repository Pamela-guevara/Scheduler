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
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { Ajax } from "@syncfusion/ej2-base";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

export default function Agenda() {
  // Variables
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [dataManager, setDataManager] = useState<DataManager | undefined>(
    undefined
  );

  /* const data = async () => {
    const sesiones = await axios
      .get("http://127.0.0.1:5000/get_sessions")
      .then((res) => res.data)
      .then((data) => setDataManager(data))
      .catch(() => console.log("Veremos si funciona"));
  }; */

  /* const data: DataManager = new DataManager({
    url: "http://127.0.0.1:5000/get_sessions", // 'controller/actions'
    //crudUrl: "http://127.0.0.1:5000/get_sessions",
    adaptor: new UrlAdaptor(),
  }); */

  /*dataSource: [
    {
      Subject: "1",
      EndTime: new Date(2023, 9, 24, 18, 0),
        StartTime: new Date(2023, 9, 24, 17, 0),
      },
      {
        Subject: "2",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "3",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "4",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "5",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "6",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "7",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "8",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "9",
        EndTime: new Date(2023, 10, 24, 18, 0),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "Reunión con los compas",
        EndTime: new Date(2023, 10, 24, 20, 30),
        StartTime: new Date(2023, 10, 24, 17, 0),
      },
      {
        Subject: "Otra reunión con los compas",
        EndTime: new Date(2023, 10, 20, 20, 30),
        StartTime: new Date(2023, 10, 20, 17, 0),
      },
    ]}
  */

  const onActionComplete = async (args: ActionEventArgs) => {
    console.log(args);
    if (args.requestType === "eventCreated") {
      const creado = args.addedRecords ? args.addedRecords[0] : null;
      const evento = {
        subject: creado?.Subject,
        description: creado?.Description || "",
        inicio: creado?.StartTime,
        fin: creado?.EndTime,
      };
      const doc = creado?.Subject;
      console.log(doc);
      await axios
        .post("http://127.0.0.1:5000/post_session", evento)
        .then((response) => response.data)
        .then((data: any) => console.log(data.id))
        .catch(() => console.log("no hay API"));

      await axios
        .get("http://127.0.0.1:5000/get_one/" + doc)
        .then((response) => response.data)
        .then((data: any) => {
          evento.subject = data.apodo;
        })
        .catch(() => console.log("no por aqui"));

      console.log(dataManager);
      console.log(evento.subject);
    }
  };

  const data = async () => {
    await axios
      .get("http://127.0.0.1:5000/get_sessions")
      .then((res) => res.data)
      .then((data) => setDataManager(data))
      .catch(() => console.log("Veremos si funciona"));
  };

  /* useEffect(() => {
    const ajax = new Ajax("http://127.0.0.1:5000/get_sessions", "GET", false);
    ajax.send();
    ajax.onSuccess = function (value: DataManager) {
      setDataManager(value);
      console.log(DataManager);
    };
  }, []); */

  /* useEffect(() => {
    let aux = 0;
    while (aux < 1) {
      data();
      aux = aux + 1;
    }
  }); */

  const eventSettings: EventSettingsModel = {
    dataSource: dataManager,
  };

  return (
    <div>
      <ScheduleComponent
        ref={scheduleObj}
        currentView="WorkWeek"
        eventSettings={eventSettings}
        actionComplete={onActionComplete}
        enablePersistence={true}
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

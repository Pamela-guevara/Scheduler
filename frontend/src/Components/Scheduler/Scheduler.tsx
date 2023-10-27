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

export default function Agenda() {
  // Variables
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [data, setData] = useState<object[]>([]);
  const [dataManager, setDataManager] = useState<object[]>([]);
  //----------------------------------------------------------------------
  const onActionComplete = async (args: ActionEventArgs) => {
    if (args.requestType === "eventCreated") {
      const creado = args.addedRecords ? args.addedRecords[0] : null;
      const evento = {
        Id: creado?.Id,
        Subject: creado?.Subject,
        Description: creado?.Description || "",
        StartTime: creado?.StartTime,
        EndTime: creado?.EndTime,
        RecurrenceRule: creado?.RecurrenceRule || "",
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

import axios from "axios";
import { useEffect, useState } from "react";
import { AppointmentsShape } from "../shapes/shapes";

const ListGroup = () => {
  const [appointments, setAppointmentState] = useState<AppointmentsShape[]>([]);
  const [actions, setAction] = useState("initial");

  useEffect(() => {
    if (actions == "Fetch Data" || actions == "initial") {
      setAction("Fetching Appointments");
      const fetchAppointments = () => {
        axios
          .get("http://localhost:3000/appointment")
          .then((res) => {
            setAction("Data Fetched");
            console.log(res);
            setAppointmentState(res.data);
          })
          .catch(() => setAction("Fetch Failed."));
      };

      fetchAppointments();
    }
    return;
  }, [actions, appointments]);

  useEffect(() => {
    if (actions == "Add Data") {
      const fetchAppointments = () => {
        const appt = {
          name: "Appointment 1",
          date: "2021-03-02",
          status: "Pending",
        };
        axios
          .post("http://localhost:3000/appointment", appt)
          .then(() => {
            setAction("Data Fetched");
            setAction("Fetch Data");
          })
          .catch(() => setAction("Fetch Failed."));
      };

      fetchAppointments();
    }
    return;
  }, [actions, appointments]);

  const handleClickFour = (id: number) => {
    axios
      .delete(`http://localhost:3000/appointment/${id}`)
      .then((res) => {
        console.log(res);
        setAction("Fetch Data");
      })
      .catch(() => setAction("Fetch Failed."));
    console.log(id);
  };

  const handleClickThree = () => {
    setAction("Fetch Data");
  };

  return (
    <>
      <h2
        onClick={handleClickThree}
        className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100"
      >
        List Group
      </h2>

      <ul role="list">
        {appointments.map((schedule) => (
          <li key={schedule.id} className="py-2">
            <div className="rounded-lg p-3  shadow-secondary-1  shadow-lg hover:shadow-zinc-950 bg-slate-400 text-black text-surface">
              <div className="inline-block justify-between">

              <h5 className=" mb-1 text-xl font-medium leading-tight">
                {schedule.name}
              </h5>
              <p className="mb-4 text-base">{schedule.date}</p>
              </div>
              <p className="mb-4 text-base">{schedule.status}</p>

              <button
                type="button"
                data-value={schedule.id}
                onClick={() => {
                  handleClickFour(schedule.id);
                }}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;

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
      .then(() => {
        setAction("Fetch Data");
      })
      .catch(() => setAction("Fetch Failed."));
    console.log(id);
  };

  const handleClickThree = () => {
    setAction("Fetch Data");
  };

  const handleAddDataClick = () => {
    setAction("Add Data");
  };

  return (
    <>
      <div className="mt-10 mb-10 ">
        <h2
          onClick={handleClickThree}
          className="text-center text-2xl font-bold leading-9 tracking-tight text-neutral-500"
        >
          Appointments
        </h2>

        <button
          onClick={handleAddDataClick}
          className="button bg-blue-100 p-3"
        >
          Add Sample Data
        </button>
      </div>

      <ul role="list">
        {appointments.map((schedule) => (
          <li key={schedule.id} className="py-2">
            <div className="rounded-lg p-5 py-0 pr-1 px-10 shadow-secondary-1  shadow-lg hover:shadow-zinc-950  text-black text-surface flex  border-gray-300 border-2">
              <div className="flex-col mr-20 my-5">
                <h5 className="mb-1 text-xl font-medium leading-tight">
                  {schedule.name}
                </h5>
                <p className="mb-4 text-base">{schedule.date}</p>
                <p className="mb-4 text-base">{schedule.status}</p>
              </div>
              <button
                type="button"
                data-value={schedule.id}
                onClick={() => {
                  handleClickFour(schedule.id);
                }}
                className="inline-block border-r-gray-500 px-6 pr-2 my-0 rounded bg-primary text-xs font-medium uppercase leading-normal text-red-500 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:bg-gray-300 bg-primary-accent-300 shadow-primary-2 outline-none ring-0 bg-primary-600 shadow-primary-2 shadow-black/30 shadow-dark-strong shadow-dark-strong shadow-dark-strong bg-inherit border-l-1"
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

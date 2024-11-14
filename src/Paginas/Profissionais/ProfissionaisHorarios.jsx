import { useOutletContext, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProfissionaisService from "../../services/profissionaisService";
import "./Profissionais.css";
import { TbClockHour5 } from "react-icons/tb";

const profissionaisService = new ProfissionaisService();

function ProfissionaisHorarios() {
  const { show } = useOutletContext();
  const { idProfissional } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function fetchProfissional() {
      try {
        const profissionalData = await profissionaisService.obterPorId(idProfissional);
        setProfissional(profissionalData);
        console.log(profissionalData);

        // Simulando eventos salvos para o profissional
        const eventosData = [
          {
            title: "Consulta A",
            start: "2024-11-15T09:00:00",
            end: "2024-11-15T10:00:00",
          },
          {
            title: "Consulta B",
            start: "2024-11-16T14:00:00",
            end: "2024-11-16T15:00:00",
          },
        ];
        setEventos(eventosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchProfissional();
  }, [idProfissional]);

  const handleDateClick = (info) => {
    const title = prompt("Digite o título do atendimento:");
    if (title) {
      setEventos([
        ...eventos,
        {
          title,
          start: info.dateStr,
          end: info.dateStr, // Um evento de dia inteiro
        },
      ]);
    }
  };

  const handleEventDropOrResize = (eventInfo) => {
    const { start, end } = eventInfo.event;
    setEventos((prevEventos) =>
      prevEventos.map((evt) =>
        evt.title === eventInfo.event.title
          ? { ...evt, start: start.toISOString(), end: end?.toISOString() }
          : evt
      )
    );
  };

  return (
    <main className={`container-profissionais ${show ? "container-profissionais-active" : ""}`}>
      <header>
        <h1>
          <TbClockHour5 /> Horários de atendimento do profissional{" "}
          <strong className="text-primary"> {profissional?.Nome_Completo} </strong>
        </h1>
      </header>

      <Container>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={eventos}
          editable={true}
          droppable={true}
          selectable={true}
          dateClick={handleDateClick}
          eventDrop={handleEventDropOrResize}
          eventResize={handleEventDropOrResize}
          locale="pt-br"
        />
      </Container>
    </main>
  );
}

export default ProfissionaisHorarios;

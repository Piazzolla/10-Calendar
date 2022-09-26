import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { CalendarEvent } from "../calendar";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        // TODO: llegar al backend

        try {
            if (calendarEvent.id) {
                // actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return;
            }
            // creando
            const { data } = await calendarApi.post('/events', calendarEvent);
          //  console.log(data);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }


    }

    const startDeletingEvent = async () => {
        try {
            // borrando
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent())
            return;

        } catch (error) {
            console.log(error);
            Swal.fire('Error al borrar', error.response.data?.msg, 'error');

        }

    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }



    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
        startDeletingEvent,
    }
}

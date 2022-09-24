import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal, onCloseDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector( state => state.ui );


    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }
    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    return {
        // Propieades
        isDateModalOpen,
        // Metodos
        openDateModal,
        closeDateModal

    }
}
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedProduct } from '@/features/products/selectors';
import {
  openItemDetailsModal,
  closeItemDetailsModal,
  openSendConnectModal,
  closeSendConnectModal,
  setSelectedProduct,
  setSelectedColor,
  setSelectedSize,
  resetSelectedOptions,
} from '@/features/ui/uiSlice';

export function useSendFlow() {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const selectedOptions = useAppSelector((state) => state.ui.selectedOptions);
  const itemDetailsOpen = useAppSelector((state) => state.ui.itemDetailsModalOpen);
  const sendConnectOpen = useAppSelector((state) => state.ui.sendConnectModalOpen);

  const openDetails = useCallback(
    (productId: string) => {
      dispatch(setSelectedProduct(productId));
      dispatch(resetSelectedOptions());
      dispatch(openItemDetailsModal());
    },
    [dispatch],
  );

  const proceedToSend = useCallback(() => {
    dispatch(closeItemDetailsModal());
    dispatch(openSendConnectModal());
  }, [dispatch]);

  const goBackToDetails = useCallback(() => {
    dispatch(closeSendConnectModal());
    dispatch(openItemDetailsModal());
  }, [dispatch]);

  const closeFlow = useCallback(() => {
    dispatch(closeItemDetailsModal());
    dispatch(closeSendConnectModal());
    dispatch(setSelectedProduct(null));
    dispatch(resetSelectedOptions());
  }, [dispatch]);

  const selectColor = useCallback(
    (color: string) => dispatch(setSelectedColor(color)),
    [dispatch],
  );

  const selectSize = useCallback(
    (size: string) => dispatch(setSelectedSize(size)),
    [dispatch],
  );

  return {
    selectedProduct,
    selectedOptions,
    itemDetailsOpen,
    sendConnectOpen,
    openDetails,
    proceedToSend,
    goBackToDetails,
    closeFlow,
    selectColor,
    selectSize,
  };
}

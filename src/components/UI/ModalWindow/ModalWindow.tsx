import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Card from '../Card/Card';
import styles from './ModalWindow.module.scss';
import cn from 'classnames';
import CloseIcon from './CloseIcon';

interface ModalWindowProps {
   children: ReactNode,
   show: boolean,
   onClose: () => void
}

const overlaysElement = document.getElementById('overlays');

const ModalWindow: FC<ModalWindowProps> = ({children, show, onClose}) => {

   const overlayRef = React.useRef<HTMLDivElement>(null);

   const closeModalWindow = (e: React.MouseEvent<HTMLElement>) => {
      if (e.target === overlayRef.current) onClose() 
   }

   const keyPressed = React.useCallback((e: KeyboardEvent) => {     
      if (e.key === 'Escape' && show) onClose() 
   }, [onClose, show])

   React.useEffect(
      () => {
         document.addEventListener('keydown', keyPressed);
         return () => document.removeEventListener('keydown', keyPressed)
      }, [keyPressed]
   )

   return (
      <>
         {createPortal(<div 
            className={cn(styles.overlay, {[styles.active]: show})} 
            onClick={closeModalWindow}
            ref={overlayRef}>
            <div className={cn(styles['modal-window'], {[styles.active]: show})}>
               <Card>
                  <CloseIcon onClick={()=>{onClose()}}/>
                  {children}
               </Card>
            </div>
         </div>, overlaysElement!)}
      </>
   )
}

export default ModalWindow

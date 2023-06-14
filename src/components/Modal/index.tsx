import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode, RefObject } from "react";
import { CloseButton, Content, Overlay } from './styles';
import { X } from 'phosphor-react';

interface ModalProps {
    closedModalRef?: RefObject<HTMLButtonElement>;
    title: string;
    trigger: ReactNode;
    children: ReactNode;
}


export function Modal({closedModalRef, title, trigger, children}: ModalProps){
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Portal>
                <Overlay>
                    <Content>
                        <Dialog.Title>{title}</Dialog.Title>
                        <CloseButton ref={closedModalRef}>
                            <X size={24}/>
                        </CloseButton>
                        {children}
                    </Content>
                </Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
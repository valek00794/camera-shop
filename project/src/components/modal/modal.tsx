import classnames from 'classnames';
import { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';

type ModalProps = {
  children: JSX.Element | null;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

function Modal(props: ModalProps): JSX.Element {
  const modalElementRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let isMounted = true;
    const modalOverlay = modalElementRef.current;
    const onUpEsc = (evt: KeyboardEvent) => {
      if (isMounted && evt.key === 'Escape' && props.isModalOpen) {
        props.onCloseModal();
      }
    };
    window.addEventListener('keyup', onUpEsc);
    props.isModalOpen && document.body.classList.add('modal-open');
    isMounted && props.isModalOpen && modalOverlay && modalOverlay.addEventListener('click', props.onCloseModal);

    return () => {
      isMounted = false;
      window.removeEventListener('keyup', onUpEsc);
      props.isModalOpen && modalOverlay && modalOverlay.removeEventListener('click', props.onCloseModal);
      props.isModalOpen && document.body.classList.remove('modal-open');
    };
  }, [props]);

  const getModalBlockClassName = classnames(
    'modal',
    { 'is-active': props.isModalOpen },
  );

  return (
    <div className={getModalBlockClassName}>
      {
        props.isModalOpen &&
        <div className="modal__wrapper">
          <div className="modal__overlay" data-testid="close-overlay" ref={modalElementRef}></div>
          <FocusLock>
            {props.children}
          </FocusLock>
        </div>
      }
    </div>

  );
}

export default Modal;

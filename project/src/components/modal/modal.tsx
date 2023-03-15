import classnames from 'classnames';
import { useEffect } from 'react';
import FocusLock from 'react-focus-lock';

type ModalProps = {
  children: JSX.Element | null;
  isModalOpen: boolean;
  onCloseModal?: () => void;

}

function Modal(props: ModalProps): JSX.Element {
  useEffect(() => {
    let isMounted = true;
    const modalOverlay = document.querySelector('.modal__overlay');
    const onUpEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && props.isModalOpen && props.onCloseModal) {
        props.onCloseModal();
      }
    };

    if (isMounted) {
      window.addEventListener('keyup', onUpEsc);
      props.isModalOpen && document.body.classList.add('modal-open');
      props.isModalOpen && props.onCloseModal && modalOverlay && modalOverlay.addEventListener('click', props.onCloseModal);
    }
    return () => {
      isMounted = false;
      window.removeEventListener('keyup', onUpEsc);
      modalOverlay && props.onCloseModal && modalOverlay.removeEventListener('click', props.onCloseModal);
      props.isModalOpen && document.body.classList.remove('modal-open');
    };
  }, [props]);

  const getModalBlockClassName = classnames(
    'modal',
    { 'is-active': props.isModalOpen },
  );

  return (
    <div className={getModalBlockClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid="close-overlay"></div>
        <FocusLock>
          {props.children}
        </FocusLock>
      </div>
    </div>
  );
}

export default Modal;

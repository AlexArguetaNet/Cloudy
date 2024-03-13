import { useLockBodyScroll } from '@uidotdev/usehooks';


export const LoadingModal = () => {

  // Hook used to disable scrolling while data is being fetched
    useLockBodyScroll();

    return (
        <div className="loading">
        <h3>Loading</h3>
        <div className="lds-dual-ring"></div>
      </div>
    );
}
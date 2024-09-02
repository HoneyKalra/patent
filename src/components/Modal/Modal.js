import React, { useEffect } from "react";

export const Modal = ({
  handlePlayMusic,
  handleStopMusic,
  closeModal,
  showModal,
  setShowModal,
}) => {
  // useEffect(() => {
  //     setTimeout(() => {
  //         setShowModal(false)
  //     }, 4000);
  // }, [])

  return (
    <div>
      {showModal && (
        <div
          id="popup-modal"
          tabindex="-1"
          class="absolute  overflow-y-auto overflow-x-hidden   top-0 right-0 left-0 z-50 justify-center items-center w-full md:left-[20%] lg:left-[25%] xl:left-[33%] xxl:left-[38%] h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow ">
              <button
                onClick={closeModal}
                type="button"
                class="absolute top-3 end-2.5 text-black  hover:bg-gray-100 hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-200 dark:hover:text-black"
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <svg
                  class="mx-auto mb-4 text-black w-10 h-10 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-black">
                  Do you want to play music?
                </h3>
                <button
                  onClick={handlePlayMusic}
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-black bg-white dark:hover:bg-gray-100   border border-black  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes
                </button>
                <button
                  onClick={handleStopMusic}
                  data-modal-hide="popup-modal"
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium border border-black   bg-white rounded-lg  hover:bg-gray-100     dark:hover:text-black dark:hover:bg-gray-100"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

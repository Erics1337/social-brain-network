import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/outline"

function Modal() {
  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  //  loading variable to lock out upload function
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  // Get post id and upload to firebase firestore, get download url and re-attach to original post
  const uploadPost = async () => {
    if (loading) return

    setLoading(true)
  }

  // Stores a file in state
  const addImageToPost = (e) => {
    //   Initialize a file reader and give it a variable reader
    const reader = new FileReader()
    // Get the file the user selected (its 0 because its one file the user selected)
    if (e.target.files[0]) {
      // Read in data and fire onload function
      reader.readAsDataURL(e.target.files[0])
    }
    // Once browser is done reading in the file, we get the readerEvent object which is the file as an object that can be stored in state
    reader.onload = (readerEvent) => {
      // Store in state
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <Transition.Root show={open} as="Fragment">
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as="Fragment"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            {/* Trick the browser into centering the modal contents */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203
            </span>
          </Transition.Child>

          <Transition.Child
            as="Fragment"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
                            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                {/* Photo Upload Input */}
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    // If click picture after select file, reset picture to null
                    onClick={() => setSelectedFile(null)}
                    alt="Chosen File"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Upload a photo text w/ hidden input for customized file picker */}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>

                  <input
                    ref={filePickerRef}
                    type="file"
                    hidden
                    // File selection fires this function
                    onChange={addImageToPost}
                  />
                </div>

                {/* Caption Input */}
                <div className="mt-2">
                  <input
                    className="border-none focus:ring-0 w-full text-center"
                    type="text"
                    // Attach a reference to input field
                    ref={captionRef}
                    placeholder="Please enter a caption..."
                  />
                </div>

                {/* Upload Post Button */}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent
                                        shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg0gray-300
                                        disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    Upload Post
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal

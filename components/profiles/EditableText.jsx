import { doc, updateDoc } from "firebase/firestore";
import { useState, useRef, useEffect, useContext } from "react"
import UserContext from "../../context/userContext";
import { db } from "../../firebase";

const EditableInput = (props) => {
    const { currentUser } = useContext(UserContext);
	// We use hooks to declare "initial" states
	const inputRef = useRef(null)
	const [inputVisible, setInputVisible] = useState(false)
	const [text, setText] = useState(props.text)

	const editSubmit = () => {
        updateDoc(doc(db, 'users', currentUser.uid), {
            [props.type]: text
        })
        console.log('input updated')
		setInputVisible(false) // Disable text input
	}

	useEffect(() => {
		// Handle outside clicks on mounted state
		if (inputVisible) {
			document.addEventListener("mousedown", function (e) {
				// Check if user is clicking outside of <input>
				if (inputRef.current && !inputRef.current.contains(e.target))
					editSubmit(inputRef.current)
			})
			document.addEventListener("keypress", function (e) {
				if (e.key === "Enter") editSubmit(inputRef.current)
			})

			// This is a necessary step to "dismount" unnecessary events when we destroy the component
			return () => {
				document.removeEventListener("mousedown", function (e) {
					// Check if user is clicking outside of <input>
					if (
						inputRef.current &&
						!inputRef.current.contains(e.target)
					)
						editSubmit(inputRef.current)
				})
				document.removeEventListener("keypress", function (e) {
					if (e.key === "Enter") editSubmit(inputRef.current)
				})
			}
		}
	})

	return (
		<div>
			{inputVisible ? (
				<input
                    autoFocus="autofocus"
					className={`${
						props.type == "subName"
							? "text-gray-800 font-semibold"
							: "text-gray-600 w-full"
					}`}
					ref={inputRef} // Set the Ref
					value={text} // Now input value uses local state
					onChange={(e) => {
						setText(e.target.value)
					}}
				/>
			) : (
				<span
                className={`${
                    props.type == "subName"
                        ? "text-gray-800 font-semibold"
                        : "text-gray-600"
                }`}
                // Make input visible if profile belongs to logged in user
                onClick={() => currentUser.username == props.username && setInputVisible(true)}>
					{text}
				</span>
			)}
		</div>
	)
}

export default EditableInput // We got our component!

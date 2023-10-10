const FloatingInput = (props: {
	label: string,
	error: string | undefined,
	allowSpace?: boolean,
	labelBgColor: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!props.allowSpace && e.key === " ")
      e.preventDefault();
  };

	return (
		<div>   
			<div className="relative">
				<input 
					onKeyDown={handleKeyDown} 
					onChange={props.onChange} 
					type={props.label.includes("Password") ? "password" : "text"} 
					id={`${props.label}_floating_label`} 
					aria-describedby={`${props.label}_floating_label_help`} 
					className={`
						block px-2.5 pb-2.5 pt-4 w-full text-md text-white 
						bg-transparent rounded-lg border-1 autofill:!bg-gray-700 appearance-none 
						${props.error ? `border-red-500 focus:border-red-60` : `border-lightGray focus:border-lightGray`} 
						focus:outline-none focus:ring-0 peer
					`} 
					placeholder=" " />
				<label 
					htmlFor={`${props.label}_floating_label`} 
					className={`
						absolute cursor-text text-sm 
						${props.error ? `text-red-400` : `text-lightGray`} ${props.labelBgColor} 
						duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
						px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
						peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
						peer-focus:-translate-y-4 left-1
					`}
				>
					{props.label}
				</label>
			</div>
			<p 
				id={`${props.label}_floating_label_help`} 
				className="mt-2 text-xs text-red-600 dark:text-red-400"
			>
				{props.error || ""}
			</p>
		</div>
	)	
}

export default FloatingInput;
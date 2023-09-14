import { useState, useRef, useLayoutEffect } from 'react';

const MIN_TEXTAREA_HEIGHT = 32;

const CommentBox = ({ className } : { className: string }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    if (textareaRef.current) {
			console.log(textareaRef.current.scrollHeight);
			textareaRef.current.style.height = "32px";
			textareaRef.current.style.height = `${Math.max(
				textareaRef.current.scrollHeight,
				MIN_TEXTAREA_HEIGHT
			)}px`;
		}
  }, [value]);

  return (
		<div className={className}>
			<textarea
				className="w-full text-sm text-white resize-none overflow-hidden pb-1.5 pt-[5px] px-2.5 bg-mainBlue focus:outline-none focus:ring-0 rounded-2xl border border-lightGray"
				onChange={(event) => setValue(event.target.value)}
				ref={textareaRef}
				value={value}
				placeholder='Write your comment'
			/>
		</div>
  );
}

export default CommentBox;
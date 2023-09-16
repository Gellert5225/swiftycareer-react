import { ChangeEvent, useContext, useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';

import { AuthContext } from "../../context/AuthContext";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import addImage from ".././../images/addImage.png";

const PostFeedModal = (props: {
	onPost: (form: FormData) => void
	open: string,
	setOpen: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
	let [feedText, setFeedText] = useState("");
	let [images, setImages] = useState<Array<File>>([]);

	const { user } = useContext(AuthContext);

	const quillRef = useRef<ReactQuill>(null);

	const quillToolbarModules = [
		['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }]
	]

	const onQuillChange = () => {
		const editor = quillRef.current!.getEditor();
		const unprivilegedEditor = quillRef.current!.makeUnprivilegedEditor(editor);

		setFeedText(unprivilegedEditor.getHTML());
	}

	const addImages = (event : ChangeEvent<HTMLInputElement>) => {
		const targetFiles = event.target.files!;
		const targetFilesObject = [...targetFiles]

		let copy = [...images];
		targetFilesObject.forEach(file => {
			copy.push(file);
		})
		setImages(copy);
	}

	const clickPost = () => {
		const editor = quillRef.current!.getEditor();
		const unprivilegedEditor = quillRef.current!.makeUnprivilegedEditor(editor);

		let form = new FormData();
		images.forEach(image => {
			form.append("feedImage", image, image.name);
		})
		form.append('authorId', user!.id);
    form.append('text_JSON', JSON.stringify(unprivilegedEditor.getContents()));
    form.append('text_HTML', unprivilegedEditor.getHTML());
		
		props.onPost(form);
		props.setOpen(undefined)
	}

	return (
		<Modal show={props.open === 'post-feed-modal'} size="lg" popup onClose={() => props.setOpen(undefined)}>
			<Modal.Header className="border-b">
				Create a post
			</Modal.Header>
			<Modal.Body className='border-b border-gray-600'>
				<div className="space-y-6">
					<ReactQuill onChange={onQuillChange} ref={quillRef} className="post-feed !p-0 grow min-h-[200px] max-h-[600px] text-white !font-sans !text-xl" placeholder="What's on your mind?" modules={{ toolbar: quillToolbarModules }} value={feedText} />
				</div>
				<div className='flex flex-wrap gap-2'>
					{images.map((url, i) => (
						<img key={i} className='item w-14 h-14' src={URL.createObjectURL(url)} />
					))}
				</div>
			</Modal.Body>
			<Modal.Footer className="flex justify-between">
				<div>
					<label htmlFor="image-selector">
						<img className='w-10 hover:cursor-pointer' src={addImage} alt="" />
					</label>
					<input className='hidden' id="image-selector" onChange={addImages} type="file" accept="image/*" />
				</div>
				<Button className='bg-mainBlueTint' onClick={clickPost}>Post</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PostFeedModal;
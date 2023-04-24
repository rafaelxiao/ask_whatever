import { useRef } from 'react';
import './ChatInput.css';

export default function ChatInput({ handleSubmit }) {

    const form = useRef(null);

    return (
        <form className='chat-page-input-panel' ref={form} onSubmit={(event)=>{
            handleSubmit(event);
            form.current.reset();
        }}>
            <input className='chat-page-input-text' type='text'></input>
            <button className='chat-page-input-button' type='submit'>提问</button>
        </form>
    )
}
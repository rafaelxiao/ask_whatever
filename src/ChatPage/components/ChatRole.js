import './ChatRole.css';

export default function ChatRole( {roleName, onClick} ) {
    // const roleNameCapitalized = roleName.charAt(0).toUpperCase() + roleName.slice(1);
    return (
        <div className='chat-page-title-text'>
            Ask
            <button className='chat-page-title-button' onClick={onClick}>{roleName}</button>
            GPT
        </div>
    )
}
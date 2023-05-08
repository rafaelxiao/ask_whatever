import './ChatRoleSelector.css';
import { roles } from '../models/Roles.js';


export default function ChatRoleSelector({ isOpen, roleHandler }) {
    return (
        <div id='chat-role-selector' className={isOpen ? 'open' : ''}>
            {
                roles.map((role) => <button className='chat-role-selector-button' key={`chat-role-selector-${role.name}`} onClick={()=>roleHandler(role.name)}>{role.name}</button>)
            }
        </div>
    )
}
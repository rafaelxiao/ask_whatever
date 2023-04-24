import './QABlock.css';
import { marked } from 'marked';


function QABlock({ name, text, alignment, iconColor, isMarkdown }) {

    
    if(alignment === undefined) {
        alignment = 'left'
    }

    if(isMarkdown === undefined) {
        isMarkdown = false;
    }

    const content = [
        <div className='qa-block-icon' style={{backgroundColor: iconColor}}>{name}</div>,
        <div className='qa-block-text' dangerouslySetInnerHTML={{ __html: isMarkdown ? marked(text) : text}}></div>
    ]

    if(alignment === 'right') {
        content.reverse();
    }

    return (
        <div className='qa-block' style={{justifyContent: alignment}}>
            {content[0]}
            {content[1]}
        </div>
    )
}

function QuestionBlock({ question }) {
    return QABlock({
        name: '我',
        text: question,
        alignment: 'right',
        iconColor: '#3a6186'
    })
}

function AnswerBlock({ answer }) {
    return QABlock({
        name: 'AI',
        text: answer,
        alignment: 'left',
        iconColor: '#89253e',
        isMarkdown: true
    })
}

export {AnswerBlock, QuestionBlock};
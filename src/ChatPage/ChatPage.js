import { useEffect, useRef, useState } from 'react';
import './ChatPage.css';
import ChatInput from './components/ChatInput';
import { AnswerBlock, QuestionBlock } from './components/OABlock';

export default function ChatPage(){

    const baseURL = process.env.REACT_APP_BASE_URL;
    const scrollRef = useRef(null);
    
    const [talks, setTalks] = useState(()=>{
        return []
    });

    const [currentQuestion, setCurrentQuestion] = useState("");
    const [parentMessageId, setParentMessageId] = useState("");

    useEffect(()=>{
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: 'end'});
        }
    }, [talks]);

    useEffect(()=>{
        if(currentQuestion !== ''){
            try {
                const eventSource = new EventSource(
                    `${baseURL}sendMessageStream?text=${currentQuestion.trim()}&parentMessageId=${parentMessageId}`,
                );
                var res = '';
                eventSource.onmessage = (event) => {
                    const dataJSON = JSON.parse(event.data);
                    function decompose(rawData) {
                        if(rawData.length === 2) {
                            return rawData[0] + '\n';
                        } else if(rawData.length === 3) {
                            return rawData[0] + '\n\n';
                        } else {
                            return rawData[0];
                        }
                    }
                    const char =  decompose(dataJSON);
                    res += char;
                    setTalks((prev)=>{
                        const newState = [...prev];
                        newState[newState.length - 1].answer = res;
                        return newState;
                    })
                };
      
                eventSource.addEventListener('error', (event) => {
                  console.error('EventSource error:', event);
                });
      
                eventSource.addEventListener('over', (event) => {
                    eventSource.close();
                    const res = JSON.parse(event.data);
                    setParentMessageId(res.id);
                    setCurrentQuestion("");
                })
        
                eventSource.onclose = () => {
                    console.log('Connection closed');
                };

                } catch (error) {
                    console.log('Request error', error);
                }
        }
    }, [currentQuestion, baseURL, parentMessageId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.firstChild.value){
            setTalks((prev)=>{
                return [
                    ...prev,
                    {
                        question: event.target.firstChild.value,
                        answer: '',
                    }
                ]
            });
            setCurrentQuestion(event.target.firstChild.value);
        }
    }

    return(
        <div className='chat-page'>
            <div className='chat-page-title'>Ask Whatever GPT</div>
            <div className='chat-page-history' ref={scrollRef}>
                {
                    talks.map((item, index) => {
                        return (
                            <div key={`chat_hist_${index}`}>
                                <QuestionBlock question={item.question} />
                                <AnswerBlock answer={item.answer} />
                            </div>
                        )
                    })
                }
            </div>
            <div className='chat-page-input'>
                <ChatInput handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}
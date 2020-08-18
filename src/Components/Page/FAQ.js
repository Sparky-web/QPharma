import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import marked from 'marked';

function Faq(props) {
    return (
        <section className="FAQ">
            <div className="container">
                <h2 className="header">Ответы на вопросы</h2>
                <Tabs>
                    <TabList>
                        {props.data.map(qa => (<Tab key={qa.id}>{qa.question}</Tab>))}
                    </TabList>
                    {props.data.map(qa => <TabPanel key={qa.id}>
                        <div className="gray">ответ</div>
                        <div dangerouslySetInnerHTML={
                            {
                                __html: marked(qa.answer, { sanitize: true })
                            }
                        } />
                    </TabPanel>)}
                </Tabs>
            </div>
        </section>
    );
}

export default Faq;
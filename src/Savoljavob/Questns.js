import React, { useEffect, useState } from "react"
import axios from "axios"
import _ from "lodash"
import WordSave from "../Mathresul/WordSave"

import './Savol.css'
import AccountMenu from "../component/AccountMenu"
import Header from "../component/Header"
const Questns = () => {


    // usestates lessons 
    const [lessons, setLessons] = useState([])
    const [answers, setAnswers] = useState([])

    const [loading, setLoading] = useState(false)
    const [load, setload] = useState(false)
    // function answer 

    const Answers = (ansid, quesid) => {
        let arr = [];
        let t = true;
        // https://api.qtlms.uz/api/v1/course/diagnostics/test-check


        answers.forEach(item => {
            if (item.question_id == quesid) {
                t = false;
                arr.push({ question_id: quesid, answer_id: ansid })

            } else {
                arr.push(item)
            }
        });

        if (t) {
            arr.push({ question_id: quesid, answer_id: ansid })
        }

        setAnswers(arr);
        console.log(arr);



    }

    const [otvet, setAtvet] = useState()
    const [f, setF] = useState()
    //function post
    const getPost = () => {
        setLoading(true)

        const token = localStorage.getItem('token');
        var formData = new FormData();
        answers.forEach(item => {
            formData.append(`answers[${item.question_id}]`, item.answer_id);
        })
        axios.post('https://api.qtlms.uz/api/v1/course/diagnostics/test-check/', formData,
            {

                headers: {
                    Authorization: ' Bearer ' + token
                }
            })
            .then(res => {
                setLoading(false)
                setAtvet(_.get(res, 'data.lesson.passings.is_completed', 0));

                console.log(res.data.lesson.passings.is_completed);
            })
            .catch(ress => {
                setLoading(false)

                setAtvet(0)
            })



    }


    useEffect(() => {
        login()
        Lessons()
    }, [])

    //login token get 
    const login = () => {
        axios.post('https://api.qtlms.uz/api/v1/login', {
            name: 998999733810,
            password: '123654qaz'
        })
            .then(res => {
                const token = res.data.access_token
                localStorage.setItem('token', token)
            })
    }

    //lessons quesions
    const Lessons = () => {
        setload(true)
        const token = localStorage.getItem('token')
        axios.get('https://api.qtlms.uz/api/v1/course/diagnostics/lesson', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setLessons(_.get(res, 'data.data.vquestions'))
                // setLessons(_.get(res, 'data.data.vquestions.1'))
                setload(false)
                console.log(lessons);
            })
    }
    let indexs = 0

    return (<>
        <Header />
        <div className="fathe_blok">
            <AccountMenu />
            <div className="xx ">
                {loading === true ? <div className="modalLoader">
                    <div className="loader-03"> </div>
                </div> : <div></div>}

                <div>

                    {otvet > 0 ? <div className="loadin">
                        <div className="text-center modals">
                            <h1>Testni muvafaqqiyatli bajardingiz {otvet} ta to'g'ri javob </h1>

                            <button onClick={() => setAtvet(-1)} className="btn btn-success">Ok</button>

                        </div>

                    </div> : otvet === 0 ? <div className="loadin">
                        <div className="text-center modals">
                            <h1>Testni Muvafaqiyatli bajarmadingiz

                            </h1>
                            <button onClick={() => setAtvet(-1)} className="btn btn-success">Ok</button>
                        </div>

                    </div> : <div></div>}


                    <div className="w-75 mx-auto text-center"><h1>Malaka oshirish bo'yicha savollar</h1></div>

                    {load === true ? <div className="modalLoader">
                        <div className="loader-03"> </div>
                    </div> : <div>
                        {lessons.map((ques, qindex) => (<>

                            {ques.map((item, index) => {
                                indexs++;
                                return (
                                    <div key={index} className="lesson">
                                        <b>{indexs + '-savol'}</b>

                                        <p><WordSave text={item.question} /></p>
                                        <ul>
                                            {item.vanswers.map((ite, inde) => (

                                                <li>
                                                    <label className="d-flex ">
                                                        <input type="radio" onChange={(e) => Answers(ite.id, item.id)} name={'answer' + qindex + index} />
                                                        <div>
                                                            <p><WordSave text={ite.answer} /></p>
                                                        </div>
                                                        <span className="checmak"></span>

                                                    </label>
                                                </li>

                                            ))}
                                        </ul>


                                    </div>

                                )
                            })
                            }
                        </>
                        ))}
                        
                        <div className="text-center">
                            <button type="submit" onClick={() => getPost()} className="btn btn-success">Yuborish</button>
                        </div>
                    </div>}



                </div>
            </div>


        </div>


    </>);
}
export default Questns;
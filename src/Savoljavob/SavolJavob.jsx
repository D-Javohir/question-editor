import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash"
import Header from '../component/Header';
import AccountMenu from "../component/AccountMenu";
import WordSave from "../Mathresul/WordSave"
const SavolJavob = ({setprofile}) => {
    // savol api object
    const [savol, setSavol] = useState([])
    const [answer, setAnswer] = useState([])
    //answers 
    //loading 
    const [loading, setLoading] = useState(false)
    //errror
    const [error, setError] = useState(0)
    const [erorBlok, setErorBlok]=useState(false)
    // tokenn
    const token = localStorage.getItem('token')
    // UseEffects 
    useEffect(() => {
        SavolAPI()
    }, [])

    // Axios vquestions object api
    const SavolAPI = () => {
        setLoading(true)
        axios.get('https://api.qtlms.uz/api/v1/course/13/sections/test-694/lessons/8825', {
            headers: {
                Authorization: 'Bearer ' + token

            }
        }).then(res => {
            setSavol(res.data.data.vquestions);
            setLoading(false)
            if (res.message==="Unauthenticated.") {
                setprofile(false)

            }
        })
            .catch(err => {
                setprofile(false)

               setErorBlok(true)
               setLoading(false)
            })
    }


    // Answer ppost 
    const AnswerPost = (quesId, AnsId, type) => {
        let arr = []
        let b = true
        let k = true

        console.log(quesId, AnsId, type);
        if (type === "single") {

            answer.forEach(item => {
                if (item.question_id == quesId) {
                    b = false
                    arr.push({ question_id: quesId, answer_id: AnsId, type: type })
                } else {
                    arr.push(item)
                }


            })
            if (b) {
                arr.push({ question_id: quesId, answer_id: AnsId, type: type })
            }

        } else {
            answer.forEach(item => {
                if (item.question_id === quesId) {
                    k = false;
                    if (!item.answer_id.includes(AnsId)) {
                        arr.push({ question_id: quesId, answer_id: [...item.answer_id, AnsId], type: type })
                    } else {
                        let a = []
                        item.answer_id.forEach(ann => {
                            if (ann !== AnsId) {
                                a.push(ann)
                            }
                        })
                        arr.push({ question_id: quesId, answer_id: a, type: type })
                    }
                } else {
                    arr.push(item)
                }
            });

            if (k) {
                arr.push({ question_id: quesId, answer_id: [AnsId], type: type })
            }
        }


        setAnswer(arr)

        console.log(arr);
    }

    //  ANSWERS GET POST API

    const GetPost = () => {
        setLoading(true)
        if (answer.length == 0) {
            setError(1)
            setLoading(false)
        }
        const token = localStorage.getItem('token');
        var formData = new FormData();
        formData.append(`lesson_id`, 8825);
        formData.append(`section_slug`, 'test-694');

        answer.forEach(item => {
            if (item.type == "single") {
                formData.append(`answers[${item.question_id}]`, item.answer_id);
            } else {
                item.answer_id.map(ite => {
                    formData.append(`answers[${item.question_id}][]`, ite);
                })

            }






        })
        console.log(answer);

        axios.post('https://api.qtlms.uz/api/v1/course/test-check', formData,
            {
                headers: {
                    Authorization: ' Bearer ' + token
                }
            })
            .then(res => {
                setLoading(false)
                // setAtvet(_.get(res, 'data.lesson.passings.is_completed', 0));
                // setAtvet(1)
                console.log(res.data.lesson.passings.is_completed);
            })
            .catch(ress => {
                setLoading(false)

                // setAtvet(1)
            })

    }

    let indexs = 0
    return (<>
        <div className="blok">
            <Header />
            {erorBlok === true ? <div className='erorblok'><div>
                    <h2>Internet bilan muomo! Internetga ulanib qaytadan harakat qiling!</h2>
                    <button className='btn btn-success' onClick={() => {window.location = window.location.href}}>Ok</button>
                </div></div> : <div></div>}

            <div className="fathe_blok">
                <AccountMenu />
                <div className="main_savol">
                     {loading === true
                    ? <div className="modalblok">
                        <div className="modalLoader"><div className="loader-03"></div></div>
                    </div>
                    : <div className="main_savol">

                        {loading === true ? <div className="modalLoader"><div className="loader-03"></div></div> : <div></div>}

                        {error === 1 ? <div className="modalLoader flex-column">
                            <h2 className="text-danger">Test yeching</h2>
                            <button onClick={() => setError(0)} className="btn btn-success">Ok</button>
                        </div> : <div> </div>}

                        {savol.map((item, index) => {
                            indexs++;
                            return (
                                <div key={index} className="lesson">
                                    <b>{indexs + '-savol'}</b>

                                    <p><WordSave text={item.question} /></p>
                                    <ul>
                                        {item.vanswers.map((ite, inde) => (
                                            // onChange={(e) => Answers(ite.id, item.id, index)}
                                            <li>
                                                <label className="d-flex ">
                                                    <input
                                                        type={item.type === "single" ? "radio" : "checkbox"}
                                                        name={'answer' + index}
                                                        onChange={(e) => AnswerPost(ite.question_id, ite.id, item.type)}
                                                    />

                                                    <div>
                                                        <p><WordSave text={ite.answer} /></p>
                                                    </div>
                                                    <span className={item.type === "single" ? "checmak" : "checmakk"}></span>

                                                </label>
                                            </li>

                                        ))}
                                    </ul>


                                </div>

                            )
                        })
                        }
                        <div className="w-100 d-flex justify-content-center">
                            <button
                                className="btn btn-success"
                                style={{ fontSize: "17px", marginBottom: "40px" }}
                                onClick={() => GetPost()}
                            >Yuborish</button>
                        </div>

                    </div>
                }   
                </div>
            

            </div>

        </div>

    </>);
}
export default SavolJavob;
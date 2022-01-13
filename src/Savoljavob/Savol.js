import React, { useState, useEffect } from 'react';
import TinyEditorComponent from '../Mathresul/WordClone';
import WordSave from '../Mathresul/WordSave';
// import { AiOutlinePlus } from "@react-icons/all-files/fa/AiOutlinePlus";

import _ from "lodash"
import './Savol.css'
import Header from '../component/Header';
import AccountMenu from '../component/AccountMenu';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Savol = () => {

    const [activ, setActiv] = useState(1);
    const [value, setValue] = useState('')

    const [newvalue, setNewvalue] = useState('')
    const [answers, setAnswers] = useState('');

    const [editIndex, setEditIndex] = useState();

    //question write stateec 
    const [editIndexx, setEditIndexx] = useState()
    const [id, setId] = useState()

    // answer write index
    const [answerindex, setAnswerindex] = useState();
    //answer  edit state index 
    const [ansEdiX, setAnsEdiX] = useState()
    const [quesEdiX, setQuesEdiX] = useState()

    // answers[answer: id]
    const [ids, setAnsID] = useState()
    const [quesId, setqID] = useState()

    const [quest, setQuest] = useState([])

    //answer edit state 
    const [answerEdit, setAnswerEdit] = useState('')



    // loading state 
    const [load, setLoad] = useState(false)


    //setballllll 
    const [answerBall, setAnswerBall] = useState()


    //AXIOS POST 

    //question ball
    const [questionBall, setQuestionBall] = useState()
    // setType statte 
    const [questType, setType] = useState("multiple")


    //quest id 
    const [qId, setQuesId] = useState()

    // answer loading post 
    const [ansLoad, setAnsLoad] = useState(false)

    //Deleting loader 
    const [deletes, setDeletes] = useState(false)

    /// error 
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState(false)
    const [eror, setEror] = useState(false)
    const [erorBlok, setErorBlok] = useState(false)


    //navigate 
    const Navigate = useNavigate()
    ////////////////////////////////////// EDITOR //////////////////////////////////////////


    ////////////////////////////QUEST////////////////////
    //ADD quest



    const AxiosPost = () => {
        let b = true
        const token = localStorage.getItem('token')
        if (value === '') {
            setError(true)
            b = false
        }
        if (questionBall === '') {
            setError(true)
            b = false
        }


        if (b) {
            setAnsLoad(true)

            axios.post('https://api.qtlms.uz/api/v1/teacher/lesson/update-question', {
                question: value,
                lesson_id: 8825,
                score: questionBall,
                type: questType
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            )
                .then(res => {
                    const ids = res.data.data
                    const newitem = {
                        question: value,
                        score: questionBall,
                        type: questType,
                        lesson_id: ids.lesson_id,
                        id: ids.id,
                        answers: [

                        ]

                    }
                    const itemspost = [...quest, newitem]

                    setQuest(itemspost)
                    setAnsLoad(false)
                    setActiv(1)
                })
                .catch(err => {
                    setEror(true)
                    setAnsLoad(false)
                })
        }

    }

    // QUEST DELETE 
    const DeleteQuestion = (questindex, id) => {

        const token = localStorage.getItem('token')
        setDeletes(true)
        axios.post('https://api.qtlms.uz/api/v1/teacher/lesson/delete-question', {
            id: id
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                let dele = []
                quest.forEach((item, index) => {
                    if (index !== questindex) {
                        dele.push(item)
                    }
                })
                setQuest(dele)
                setDeletes(false)
            })
            .catch(err => {
                setEror(true)
                setDeletes(false)
                setAnsLoad(false)

            })
    }

    // write post
    const writePost = () => {

        setAnsLoad(true)
        const token = localStorage.getItem('token')

        axios.post('https://api.qtlms.uz/api/v1/teacher/lesson/update-question', {
            question: newvalue,
            lesson_id: editIndex,
            score: questionBall,
            type: questType,
            id: id
        },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
            .then(ress => {
                const ques = ress.data.data.id
                let l = [];
                quest.forEach((item, index) => {
                    if (index === editIndexx) {
                        l.push({ ...item, question: newvalue, type: questType, score: questionBall, id: ques });
                    } else {
                        l.push(item)
                    }
                })
                setAnsLoad(false)

                setQuest(l);
                setActiv(1)
            })
            .catch(err => {
                setEror(true)
                setDeletes(false)
                setAnsLoad(false)

            })
    }

    ////////////////////////////QUEST////////////////////




    /////////////////////////ANSWER///////////////////////
    //ADD answer 
    let s = true

    const AxiosAnswerPost = () => {
        const token = localStorage.getItem('token')

        if (answers === '') {
            setErrors(true)
            s = false
        }
        if (answerBall === '') {
            setErrors(true)
            s = false
        }
        if (s) {
            setAnsLoad(true)

            axios.post('https://api.qtlms.uz/api/v1/teacher/lesson/update-answer', {
                answer: answers,
                question_id: qId,
                score: answerBall
            },

                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })

                .then(res => {
                    const ans = res.data.data
                    console.log(ans);

                    setAnsLoad(false)
                    let l = [];
                    quest.forEach((item, index) => {
                        if (index === answerindex) {
                            const ar = [...item.answers, { answer: answers, score: answerBall, id: ans.id, question_id: ans.question_id }]
                            l.push({ ...item, answers: ar });
                        } else {
                            l.push(item)
                        }
                    })
                    setQuest(l);

                    setActiv(1)

                })
                .catch(err => {
                    setEror(true)
                    setDeletes(false)
                    setAnsLoad(false)

                })
        }


    }

    //ANSWER EDIT
    const AnswerEdit = () => {
        // console.log(parseInt(ansEdiX));
        // console.log(parseInt(quesEdiX));



        const token = localStorage.getItem('token')
        setAnsLoad(true)


        axios.post('https://api.qtlms.uz/api/v1/teacher/lesson/update-answer', {
            answer: answerEdit,
            question_id: quesId,
            score: answerBall,
            id: ids
        },

            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(res => {
                const ans = res.data.data.id

                let f = []
                quest.forEach((item, index) => {
                    if (index === quesEdiX) {
                        let al = [];
                        item.answers.forEach((ite, inde) => {
                            if (inde === ansEdiX) {
                                al.push({ ...ite, answer: answerEdit, score: answerBall, id: ans })
                            } else {
                                al.push(ite)
                            }
                        });
                        f.push({ ...item, answers: al });
                    } else {
                        f.push(item);
                    }
                })
                console.log(quest[quesEdiX]);
                setQuest(f)
                setActiv(1)
                setAnsLoad(false)
            })
            .catch(err => {
                setEror(true)
                setDeletes(false)
                setAnsLoad(false)

            })

    }


    /// ANSWER DELETE
    const AnswerDelete = (questindex, asnIndex, quesId, ansId) => {
        setDeletes(true)

        const token = localStorage.getItem('token')

        axios.post('https://api.qtlms.uz/api/v1/teacher/lesson/delete-answer', {
            id: ansId,
            question_id: quesId
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            setDeletes(false)
            let ff = []
            quest.forEach((item, index) => {
                let g = []
                if (index === questindex) {
                    item.answers.forEach((ite, inde) => {
                        if (inde !== asnIndex) {
                            g.push(ite)
                        }
                    })
                    ff.push({ ...item, answers: g })
                } else {
                    ff.push(item)
                }
            })
            setQuest(ff)
        })
            .catch(err => {
                setEror(true)
                setDeletes(false)
                setAnsLoad(false)

            })
    }

    /////////////////////////ANSWER///////////////////////




    // Axiso get  
    // useessfect
    useEffect(() => {
        AxiosGEt()
    }, [])


    const AxiosGEt = () => {
        const token = localStorage.getItem('token')
        setLoad(true)
        axios.get('https://api.qtlms.uz/api/v1/teacher/courses/357/sections/11919/lessons/8825/questions', {

            headers: {
                Authorization: 'Bearer ' + token
            }
        })

            .then(res => {
                setQuest(_.get(res, 'data.data', []))
                setLoad(false)
                if (res.data.status === 0) {
                    Navigate('/login')
                }
            })
            .catch(ress => {
                setErorBlok(true)
                setLoad(false)
            })

    }



    return (<>
        <div className='blok'>
            <Header />
            <div className='fathe_blok'>
                <AccountMenu />

                {erorBlok === true ? <div className='erorblok'><div>
                    <h2>Internet bilan yoki Xatolik yuz berdi! Qaytadan Xarakat qiling!</h2>
                    <button className='btn btn-success' onClick={() => { window.location = window.location.href }}>Ok</button>
                </div></div> : <div></div>}

                {/* ======write errror blopk================ */}
                {eror === true ? <div className='erorblok'><div>
                    <h2>Internet bilan muomo! Internetga ulanib qaytadan harakat qiling!</h2>
                    <button className='btn btn-success' onClick={() => { setEror(false); setAnsLoad(false);window.location = window.location.href }}>Ok</button>
                </div></div> : <div></div>}
                <div className="main_savol">
                    {
                        load === true
                            ? <div className='modalblok'>
                                <div className="modalLoader">
                                    <div className="loader-03"> </div>
                                </div>

                            </div>

                            : <div className="w-75 mx-auto editors">

                                <button className="btn btn-success btn_b" onClick={() => { setActiv(2); setType("single"); setValue(''); setQuestionBall('') }}><i className="fas fa-plus"></i>  Savol Qo'shish</button>

                                {deletes === true ? <div className='deletemodal'><div className="loader-03"></div></div> : <div></div>}

                                {

                                    activ === 5 ?

                                        <div className="blok_savol">
                                            <div className='exitbar'>
                                                <div>
                                                    <h4>{quesEdiX + 1}-savolni {ansEdiX + 1}-javobi</h4>
                                                    <p>javob sharti</p>
                                                </div>
                                                <button onClick={() => setActiv(1)} className="bg-transparent border-0 "> <i className="fas fa-times"></i> </button>

                                            </div>

                                            <TinyEditorComponent setText={v => setAnswerEdit(v)} value={answerEdit} />

                                            <div className='d-flex justify-content-between'>

                                                <input type="number" value={answerBall} onChange={(e) => setAnswerBall(e.target.value)} />
                                                <div className='lload'>
                                                    {ansLoad === true
                                                        ? <div className='loading'><div className="loader-03"></div></div>
                                                        : <button className="btn btn-success" onClick={() => { AnswerEdit(); }}> saqlash</button>
                                                    }
                                                </div>


                                            </div>
                                        </div>

                                        : activ === 4 ?

                                            <div className="blok_savol">
                                                <div className='exitbar'>
                                                    <div>
                                                        <h4> Javob qo'shish</h4>
                                                        <p>javob sharti</p>
                                                    </div>
                                                    <button onClick={() => setActiv(1)} className="bg-transparent border-0 "> <i className="fas fa-times"></i> </button>

                                                </div>
                                                <TinyEditorComponent setText={v => setAnswers(v)} value={answers} />
                                                {errors === true ? <span className='text-danger'>Qiymat kiriting</span> : <span></span>}

                                                {/* <WordSave setText={v=> setText(v)} text={value} /> */}
                                                <div className='d-flex justify-content-between'>

                                                    <input type="number" value={answerBall} onChange={(e) => { setAnswerBall(e.target.value); setErrors(false) }} />
                                                    <div className='lload'>
                                                        {ansLoad === true
                                                            ? <div className='loading'><div className="loader-03"></div></div>
                                                            : <button className="btn btn-success" onClick={() => { AxiosAnswerPost(); }}> saqlash</button>

                                                        }
                                                    </div>
                                                </div>
                                                {/* {error === true ? <span className='text-danger'>ball kiriting</span> : <span></span>} */}

                                            </div>

                                            : activ === 3 ?
                                                <div className="blok_savol">
                                                    <div className='exitbar'>
                                                        <div>
                                                            <h4>{editIndexx + 1}-savol</h4>
                                                            <p>Savol sharti</p>
                                                        </div>
                                                        <button onClick={() => setActiv(1)} className="bg-transparent border-0 "> <i className="fas fa-times"></i> </button>

                                                    </div>
                                                    <TinyEditorComponent setText={v => setNewvalue(v)} value={newvalue} />

                                                    {/* <WordSave setText={v=> setText(v)} text={value} /> */}
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <input type="number" value={questionBall} onChange={(e) => setQuestionBall(e.target.value)} />
                                                            <select value={questType} onChange={(e) => setType(e.target.value)}>
                                                                <option value="single">Bir Javobli</option>
                                                                <option value="multiple">Ko'p Javobli</option>
                                                            </select>
                                                        </div>
                                                        <div className='lload'>
                                                            {ansLoad === true
                                                                ? <div className='loading'><div className="loader-03"></div></div>
                                                                : <button className="btn btn-success" onClick={() => { writePost(); }}> saqlash</button>
                                                            }
                                                        </div>


                                                    </div>

                                                </div>

                                                : activ === 2 ?
                                                    <div className="blok_savol">
                                                        <div className='exitbar'>
                                                            <div>
                                                                <h4>Savol qo'shish</h4>
                                                                <p>Savol sharti</p>
                                                            </div>
                                                            <button onClick={() => setActiv(1)} className="bg-transparent border-0 "> <i className="fas fa-times"></i> </button>

                                                        </div>
                                                        <div onClick={() => setError(false)}>
                                                            <TinyEditorComponent setText={v => setValue(v)} value={value} />
                                                        </div>

                                                        {error === true ? <span className='text-danger'>Qiymatlarni kiriting</span> : <span></span>}
                                                        {/* <WordSave setText={v=> setText(v)} text={value} /> */}
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <input type="number" value={questionBall} onChange={(e) => { setQuestionBall(e.target.value); setError(false) }} />
                                                                <select onChange={(e) => setType(e.target.value)}>
                                                                    <option value="single">Bir Javobli</option>
                                                                    <option value="multiple">Ko'p Javobli</option>
                                                                </select>
                                                            </div>

                                                            <div className='lload'>
                                                                {ansLoad === true
                                                                    ? <div className='loading'><div className="loader-03"></div></div>
                                                                    : <button className="btn btn-success" onClick={() => { AxiosPost(); }}> saqlash</button>}

                                                            </div>

                                                        </div>

                                                    </div>

                                                    : <div> </div>

                                }




                                {
                                    quest.map((item, index) => (
                                        <div className="text_p " key={index}>
                                            <div className='d-flex justify-content-between'>
                                                <span className='savolindex'>{index + 1}- savol</span>
                                                <div>
                                                    <span
                                                        onClick={() => DeleteQuestion(index, item.id)}
                                                        className='text-danger mr-2'><i className="fas fa-trash-alt"></i>
                                                    </span>

                                                    <span className='float-right align-text-top text-success'
                                                        onClick={() => {
                                                            setEditIndexx(index); setEditIndex(item.lesson_id); setId(item.id); setActiv(3);
                                                            setNewvalue(item.question); setQuestionBall(item.score);
                                                            setType(item.type)
                                                        }}>
                                                        <a ><i className="fas fa-pen"></i></a>
                                                    </span>
                                                </div>


                                            </div>

                                            <div className='savol mb-3'>
                                                {/* <p>{item.q_text}</p> */}
                                                <p className='pp'><WordSave text={item.question} /></p>
                                                <span className='ball'>{item.type === "multiple" ? "Ko'p javobli" : "bir javobli"}</span>
                                                <span className='ball ml-4'>{item.score}</span>
                                            </div>


                                            {

                                                _.get(item, 'answers', []).map((ite, inde) => (
                                                    <div className=" pr-3" key={inde}>


                                                        <div className='savol ww float-right '>
                                                            <div className=' d-flex justify-content-between'>
                                                                <span className='javobindex'>{inde + 1}- javob</span>

                                                                <span className='float-right  text-success '
                                                                    onClick={() => {

                                                                        setqID(ite.question_id)
                                                                        setAnsID(ite.id)
                                                                        setQuesEdiX(index)
                                                                        setAnsEdiX(inde)
                                                                        setActiv(5);
                                                                        setAnswerEdit(ite.answer);
                                                                        setAnswerBall(ite.score);
                                                                    }}>

                                                                    <a className='ansicon'><i className="fas fa-pen"></i></a></span>

                                                            </div>
                                                            <p className='pp'><WordSave text={ite.answer} /></p>



                                                            <div>
                                                                <span className='ball'>{ite.score}</span>

                                                                <span
                                                                    className='float-right text-danger cursor-pointer ansicon'
                                                                    onClick={() => AnswerDelete(index, inde, ite.question_id, ite.id)}
                                                                >   <i className="fas fa-trash-alt"></i>
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            }


                                            <button onClick={() => { setAnswerBall(''); setActiv(4); setAnswers(''); setAnswerindex(index); setQuesId(item.id) }} className='btn  border-0 pt-0 pb-0 text-warning'>
                                                <a ><i className="fas fa-plus"></i> javob qo'shish</a>
                                            </button>
                                        </div>
                                    ))
                                }





                            </div>


                    }




                </div>
            </div>

        </div>

    </>);
}
export default Savol;
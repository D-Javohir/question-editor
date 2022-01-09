import axios from 'axios';
import { isValidElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import Headerr from './Headerr';
import './Login.css'
import './Profiles.css';
import _ from 'lodash';
import Header from '../component/Header';
import AccountMenu from '../component/AccountMenu';

const Profiles = () => {

    const navigate = useNavigate();
    const [text_fami, setText_fami] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');
    const [text6, setText6] = useState('');
    const [text7, setText7] = useState('');
    const [text8, setText8] = useState('');
    const [text9, setText9] = useState('');
    const [text10, setText10] = useState('');
    const [text11, setText11] = useState('');
    const [text12, setText12] = useState('');
    const [textArea, setTextarea] = useState('');
    const [textjinsi, setTextjinsi] = useState('')
    const [textyear, setTextYear] = useState('')
    const [text_lavo, setText_lavo] = useState('')
    const [files, setFile] = useState('')
    // errors text

    const [errors, setError] = useState(false);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);
    const [error6, setError6] = useState(false);
    const [error7, setError7] = useState(false);
    const [error8, setError8] = useState(false);
    const [error9, setError9] = useState(false);
    const [error10, setError10] = useState(false);
    const [error11, setError11] = useState(false);
    const [error12, setError12] = useState(false);
    const [errorTextarea, setErrortext] = useState(false)



    // Region 
    const [region, setRegion] = useState([]);
    const [city, setCity] = useState([])
    // Get userSelect: 
    const [user, setUser] = useState('');
    // let p='?parent_id='+id

    // position 
    const [position, setPosition] = useState([])

    // position type 
    const [posiType, setPosiType] = useState([]);

    // true false loading
    const [load, setLoad] = useState(false)
    //  ERRORS

    // active pos active
    const [acktiv, setAcktiv] = useState(2)

    // settfalsee true 
    const [falsee, setFalsee] = useState(false);

    // refreshh

    const [refresh, setRefresh] = useState(false)

    ///


    // city type 
    const [city_type, setCity_type] = useState([])
    const [sity, setSity] = useState('')
    console.log(city_type);
    const Cheek_submit = () => {
        let t = true

        if (text_fami.length < 3) {
            setError(true);
            t = false
        }
        if (text1.length < 3) {
            setError1(true);

            t = false
        }
        if (text2.length < 3) {
            setError2(true);

            t = false
        }

        if (text4.length < 3) {
            setError4(true);

            t = false
        }


        if (text6.length != 9) {
            setError6(true);
            t = false
        }




        if (text7.length < 3) {
            setError7(true);

            t = false
        }

        if (text10.length < 3) {
            setError10(true);

            t = false
        }
        if (text11.length < 3) {
            setError11(true);

            t = false
        }
        if (text12.length < 3) {
            setError12(true);

            t = false
        }
        if (textArea.length < 15) {
            setErrortext(true)
            t = false
        }
        if (t) {
            setLoad(true)
            const token = localStorage.getItem('token')
            // const token = localStorage.getItem('token')
            axios.post('https://api.qtlms.uz/api/v1/profil/update', {

                bio: textArea,
                birth_date: text4,
                city_id: text9,
                firstname: text1,
                gender: textjinsi,
                lastname: text_fami,
                middlename: text2,
                region_id: text8,
                passport_number: text6,
                education_level: text12,
                education_place: text11,
                education_year: textyear,
                work_place: text10,
                identification_number: text7
            }, {
                headers: {
                    Authorization: ' Bearer ' + token
                }
            })
                .then(res5 => {
                    console.log('togri');

                    setLoad(false)
                    window.location.reload(false)

                    setAcktiv(2)
                })
                .catch(e => {
                    console.log('errror');
                    setLoad(false)
                    setFalsee(true)
                })
        }
        setRefresh(true)
    }

    // USEEFFECT 
    useEffect(() => {
        GetUser()
        Regions()
        Position_type()
        login()
    }, []);
    // USEEFFECT 
    useEffect(() => {
        if (user.id) {
            Parentid(user.region_id);
            User_position(user.position_type);
        }
    }, [user])

    const login = () => {
        axios.post('https://api.qtlms.uz/api/v1/login', {
            name: 998121212121,
            password: 12121212
        })
            .then(res => {
                const token = res.data.access_token
                localStorage.setItem('token', token)
            })
    }

    const Regions = () => {
        const token = localStorage.getItem('token')

        axios.get('https://api.qtlms.uz/api/v1/profil/regions', {
            headers: {
                Authorization: ' Bearer ' + token
            }
        })
            .then(res => {
                setRegion(_.get(res, 'data.data', []));
            })


    }

    const Parentid = (v) => {
        let p = ''
        if (v) {
            p += '?parent_id=' + v
        }
        const token = localStorage.getItem('token')

        axios.get('https://api.qtlms.uz/api/v1/profil/regions' + p, {
            headers: {
                Authorization: ' Bearer ' + token
            }
        })
            .then(res1 => {
                setCity(res1.data.data)
            })



    }



    const GetUser = () => {
        setLoad(true)
        const token = localStorage.getItem('token')
        axios.get('https://api.qtlms.uz/api/v1/profil/get', {
            headers: {
                Authorization: ' Bearer ' + token
            }
        })
            .then(res2 => {
                setUser(res2.data.data)
                setLoad(false)
            })






    }

    //If city-type









    // position type 
    const Position_type = () => {
        const token = localStorage.getItem('token')
        axios.get('https://api.qtlms.uz/api/v1/profil/position-type', {
            headers: {
                Authorization: ' Bearer ' + token
            }
        })
            .then(res3 => {
                setPosition(res3.data.data)
            })
    }

    // userposition
    const User_position = (user_p) => {

        let p = '';
        if (user_p) {
            p += '?type_id=' + user_p
        }
        const token = localStorage.getItem('token')
        axios.get(`https://api.qtlms.uz/api/v1/profil/user-position` + p, {
            headers: {
                Authorization: ' Bearer ' + token
            }
        })
            .then(res3 => {
                setPosiType(res3.data.data)
            })
    }

    const filterRegion = () => {
        let r = {}
        region.filter(item => {
            if (item.id === user.region_id) {
                r = item;
            }
        })
        return r;
    }

    const filtrCity = () => {
        let sity = {}
        city.filter(item => {
            if (item.id === user.city_id) {
                sity = item
            }
        })
        return sity
    }
    return (<>
        <Header />

        <div className='fathe_blok'>
            <AccountMenu />
            {acktiv === 1 ?
                <div className={'blokks'}>

                    {load ? <div className='loadin'><div className='loadings'></div></div> : <div></div>}
                    {falsee ? <div className="loadingg text-center flex-column"> <h3>Malumot jo'natilmadi qaytadaan harakat qilib ko'ring!</h3>
                        <button className="btn btn-outline-success" onClick={() => setFalsee(false)}>Qaytadan</button>
                    </div> : <div></div>}
                    {/* <Headerr /> */}
                    <div className={'more_blok'}>


                        <h1>Bu sizning profilingiz</h1>

                        <div className={'Form_page'}>

                            <h2>Shahsiy ma'lumotlar</h2>
                            {/* ------------------Profil picture page ------------------- */}
                            <div style={{ display: 'flex', marginBottom: "30px" }}>
                                <div className={'image_upload'}>
                                    <div className={'image_sty'}>
                                        <img src={''}></img>
                                    </div>
                                </div>

                                <div className={'image_add'}>
                                    <button> <input type="file" onChange={(e) => setFile(e.target.value)} className="btn btn-secondary" name="avatar" accept=".jpg, .jpeg, .png" /></button>

                                </div>
                            </div>

                            {/* --------------------Form control Page start ---------------------*/}

                            <div className={'Form_control'}>
                                {/* FAMILIA INPUT */}
                                <div className={'form_input'}>
                                    <span>*Familia</span>
                                    <input type='text' className={'Inputs'} onChange={(e) => { setText_fami(e.target.value); setError(false) }}></input>
                                    {errors ? <div style={{ color: "red", fontSize: "12px" }}>Familiangizni kiritmadingiz</div> : ''}

                                </div>

                                {/* ISM INPUT */}
                                <div className={'form_input'}>
                                    <span>*Ism</span>

                                    <input type='text' className={'Inputs'} onChange={(e) => { setText1(e.target.value); setError1(false) }}></input>
                                    {error1 ? <div style={{ color: "red", fontSize: "12px" }}>Ismingizni kiritmadingiz</div> : ''}

                                </div>

                                {/* OTASINING ISMI INPUT */}
                                <div className={'form_input'}>
                                    <span>*Otasining ismi</span>

                                    <input type='text' className={'Inputs'} onChange={(e) => { setText2(e.target.value); setError2(false) }}></input>
                                    {error2 ? <div style={{ color: "red", fontSize: "12px" }}>Otangizni ismini kiritmadingiz </div> : ''}

                                </div>


                                {/* jINSI ISMI INPUT */}
                                <div className={'form_input'}>
                                    <span>*jins</span>

                                    <select className={'Inputs'} onChange={(e) => { setTextjinsi(e.target.value); setError(false) }} id="cars">
                                        <option value="jinsin">jinsingizni tanlang</option>
                                        <option value="ayol">Ayol</option>
                                        <option value="erkak" >Erkak</option>
                                    </select>
                                </div>

                                {/* TUGILGAN KUN INPUT */}
                                <div className={'form_input'}>
                                    <span>*Tug'ilgan kun</span>

                                    <input type='date' className={'Inputs'} onChange={(e) => { setText4(e.target.value); setError4(false) }}></input>
                                    {error4 ? <div style={{ color: "red", fontSize: "12px" }}>Tug'ilgan kuningizni kiriting</div> : ''}

                                </div>

                                <div className={'form_input'}>
                                    <span>*Telefon raqam</span>

                                    <input type='text' value={user.name} className={'Inputs'} onChange={(e) => { setText5(e.target.value); setError5(false) }}></input>
                                    {error5 ? <div style={{ color: "red", fontSize: "12px" }}>Telefon raqam kiritmadingiz</div> : ''}

                                </div>


                                <div className={'form_input'}>
                                    <span>*Pasport raqam</span>

                                    <input type='text' className={'Inputs'} onChange={(e) => { setText6(e.target.value); setError6(false) }}></input>
                                    {error6 ? <div style={{ color: "red", fontSize: "12px" }}>Pasport raqam kiritmadingiz</div> : ''}

                                </div>

                                <div className={'form_input'}>
                                    <span>*JSHSHiR</span>

                                    <input type='text' className={'Inputs'} onChange={(e) => { setText7(e.target.value); setError7(false) }}></input>
                                    {error7 ? <div style={{ color: "red", fontSize: "12px" }}>JSHSHiR Kiritmadingiz</div> : ''}
                                </div>

                            </div>
                            {/* --------------------Form control Page start ---------------------*/}




                            {/* --------------------job about  ---------------------*/}

                            <div className={'Form_select'}>
                                <h2>Ish joyi haqida ma'lumot</h2>
                                <div style={{ display: "flex" }}>
                                    <div className={'form_input'}>
                                        <span>*Lavozim turi</span>
                                        <form>


                                            <select className={'Inputs'} onChange={(e) => { User_position(e.target.value); setText_lavo(e.target.value); setError(false) }} id="cars">
                                                <option>Lavozimingiz turini tanlng</option>
                                                {position.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </select>

                                        </form>
                                    </div>
                                    <div className={'form_input'}>
                                        <span>*Lavozim/fani</span>
                                        <select className={'Inputs'} onChange={(e) => { setText_lavo(e.target.value); setError(false) }} >
                                            <option >Lavozimingizni tanlang</option>
                                            {posiType.map((item, index) => (
                                                <option key={index}>{item.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <div className={'form_input'}>
                                        <span>*Viloyat</span>

                                        <select className={'Inputs'} onChange={(e) => { Parentid(e.target.value); setText8(e.target.value); setError8(false) }} id="cars">
                                            <option>vilyationgizni tanlang</option>
                                            {region.map((item, index) => (
                                                <option key={index} value={item.id} >{item.name}</option>
                                            ))}


                                        </select>
                                        {error8 ? <div style={{ color: "red", fontSize: "12px" }}> Viloyatingizni</div> : ''}
                                    </div>

                                    <div className={'form_input'}>
                                        <span>*Tuman</span>
                                        <select className={'Inputs'} onChange={(e) => { setText9(e.target.value); setError9(false) }} id="cars">
                                            <option value="volvo" selected>Tumaningizni tanlang</option>
                                            {city.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}

                                        </select>
                                        {error9 ? <div style={{ color: "red", fontSize: "12px" }}>tumaningizni kiritmadingiz</div> : ''}
                                    </div>
                                </div>


                                <div className={'form_input textarea_p'}>
                                    <span>*Ish joy haqida qo'shimcha malumot</span><br />

                                    <textarea rows="4" cols="50" onChange={(e) => { setText10(e.target.value); setError10(false) }}></textarea>
                                    {error10 ? <div style={{ color: "red", fontSize: "12px" }}>Ish joyingizni kiritmadingiz</div> : ''}
                                </div>
                            </div>

                            {/* --------------------job about  ---------------------*/}



                            {/* --------------------Educatio about ---------------------*/}

                            <h2 style={{ marginTop: "30px" }}> *Ta'lim / ta'lim muassasasi</h2>

                            <div className={'Form_control'}>

                                <div className={'form_input'}>
                                    <span>*Ta'lim dargohi</span>
                                    <input type='text' className={'Inputs'} onChange={(e) => { setText11(e.target.value); setError11(false) }}></input>
                                    {error11 ? <div style={{ color: "red", fontSize: "12px" }}>Ta'lim joyingizni kiritmadingiz</div> : ''}

                                </div>
                                <div className={'form_input'}>
                                    <span>*fakultet</span>

                                    <input type='text' className={'Inputs'} onChange={(e) => { setText12(e.target.value); setError12(false) }}></input>
                                    {error12 ? <div style={{ color: "red", fontSize: "12px" }}>Fakultetingizni kiritmadingiz</div> : ''}
                                </div>
                                <div className={'form_input'}>
                                    <span>* Bitirgan yili</span>

                                    <input type='text' className={'Inputs'} onChange={(e) => { setTextYear(e.target.value); setError(false) }}></input>

                                </div>


                            </div>


                            {/* --------------------Abpout me  ---------------------*/}

                            <h2>Men haqimda</h2>
                            <div className={'form_input textarea_p'}>
                                <span>*Biografiya</span><br />
                                <textarea type="text" rows="4" cols="50" onChange={(e) => { setTextarea(e.target.value); setErrortext(false) }}></textarea>
                                {errorTextarea ? <div style={{ color: "red", fontSize: "12px" }}>Ma'lumot kiriting</div> : ''}

                            </div>
                            {/* --------------------Abpout me  ---------------------*/}

                        </div>


                    </div>
                    <div className={'saqlash '}>
                        <button onClick={() => { Cheek_submit() }}> Saqlash</button>
                    </div>
                </div>

                : acktiv === 2 ?
                    <div className={'blokks'}>

                        {load ? <div className='loadin'><div className='loadings'></div></div> : <div></div>}

                        <div className={'more_blok'}>


                            <h1>Bu sizning profilingiz</h1>

                            <div className={'Form_page'}>

                                <h2>Shahsiy ma'lumotlar</h2>
                                {/* ------------------Profil picture page ------------------- */}
                                <div style={{ display: 'flex', marginBottom: "30px" }}>
                                    <div className={'image_upload'}>
                                        <div className={'image_sty'}>
                                            <img src={''}></img>
                                        </div>
                                    </div>


                                </div>

                                {/* --------------------Form control Page start ---------------------*/}

                                <div className={'Form_control'}>
                                    {/* FAMILIA INPUT */}
                                    <div className={'form_input'}>
                                        <span>*Familia</span>
                                        <h4>{user.lastname}</h4>
                                    </div>

                                    {/* ISM INPUT */}
                                    <div className={'form_input'}>
                                        <span>*Ism</span>
                                        <h4>{user.firstname}</h4>



                                    </div>

                                    {/* OTASINING ISMI INPUT */}
                                    <div className={'form_input'}>
                                        <span>*Otasining ismi</span>

                                        <h4>{user.middlename}</h4>

                                    </div>


                                    {/* jINSI ISMI INPUT */}
                                    <div className={'form_input'}>
                                        <span>*jins</span>

                                        <h4>{user.gender}</h4>

                                    </div>

                                    {/* TUGILGAN KUN INPUT */}
                                    <div className={'form_input'}>
                                        <span>*Tug'ilgan kun</span>

                                        <h4>{user.birth_date}</h4>

                                    </div>

                                    <div className={'form_input'}>
                                        <span>*Telefon raqam</span>

                                        <h4>{user.name}</h4>
                                    </div>


                                    <div className={'form_input'}>
                                        <span>*Pasport raqam</span>

                                        <h4>{user.passport_number}</h4>
                                    </div>

                                    <div className={'form_input'}>
                                        <span>*JSHSHiR</span>

                                        <h4>{user.identification_number}</h4>

                                    </div>

                                </div>
                                {/* --------------------Form control Page start ---------------------*/}




                                {/* --------------------job about  ---------------------*/}

                                <div className={'Form_select'}>
                                    <h2>Ish joyi haqida ma'lumot</h2>
                                    <div style={{ display: "flex" }}>
                                        <div className={'form_input'}>
                                            <span>*Lavozim turi</span>
                                            <form>


                                                <h4>{user.work_place}</h4>


                                            </form>
                                        </div>
                                        <div className={'form_input'}>
                                            <span>*Lavozim/fani</span>
                                            <h4>{user.firstname}</h4>


                                        </div>
                                    </div>

                                    <div style={{ display: "flex" }}>
                                        <div className={'form_input'}>
                                            <span>*Viloyat</span>

                                            <h4>{filterRegion().name}</h4>

                                            {/* {error8 ? <div style={{ color: "red", fontSize: "12px" }}> Viloyatingizni</div> : ''} */}
                                        </div>

                                        <div className={'form_input'}>
                                            <span>*Tuman</span>

                                            <h4>{filtrCity().name}</h4>

                                            {/* {error9 ? <div style={{ color: "red", fontSize: "12px" }}>tumaningizni kiritmadingiz</div> : ''} */}
                                        </div>
                                    </div>


                                    <div className={'form_input textarea_p'}>
                                        <span>*Ish joy haqida qo'shimcha malumot</span><br />

                                        <h4>{user.work_place}</h4>

                                    </div>
                                </div>

                                {/* --------------------job about  ---------------------*/}



                                {/* --------------------Educatio about ---------------------*/}

                                <h2 style={{ marginTop: "30px" }}> *Ta'lim / ta'lim muassasasi</h2>

                                <div className={'Form_control'}>

                                    <div className={'form_input'}>
                                        <span>*Ta'lim dargohi</span>
                                        <h4>{user.education_place}</h4>

                                    </div>
                                    <div className={'form_input'}>
                                        <span>*fakultet</span>

                                        <h4>{user.education_level}</h4>

                                    </div>
                                    <div className={'form_input'}>
                                        <span>* Bitirgan yili</span>
                                        <h4>{user.education_year}</h4>

                                    </div>


                                </div>


                                {/* --------------------Abpout me  ---------------------*/}

                                <h2>Men haqimda</h2>
                                <div className={'form_input textarea_p'}>
                                    <span>*Biografiya</span><br />
                                    <h4>{user.bio}</h4>

                                </div>
                                {/* --------------------Abpout me  ---------------------*/}

                            </div>


                        </div>
                        <div className={'saqlash '}>
                            <button onClick={() => setAcktiv(1)}> Taxrirlash</button>
                        </div>
                    </div>
                    : <div> </div>}
        </div>

    </>);
}

export default Profiles;
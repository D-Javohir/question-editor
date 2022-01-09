import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../helpers/api'
import ReactPhoneInput from "react-phone-input-2";
import './Login.css'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const Navigate =useNavigate()
    const [phoneuz, setPhoneuz] = useState('');
    const [pasword, setPasword] = useState();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    const [h, setH] = useState(1);
    const loginUser = () => {
        setLoad(true)
        axios.post(API_URL + '/api/v1/login', {
            name: phoneuz,
            password: pasword
        })
            .then(res => {
                const token = res.data.access_token
                localStorage.setItem('token', token)
               Navigate('/')
                setLoad(false)
            })
            .catch(er => {
                setLoad(false)
                setError(true)
            })

    }

    return (
        <>
            {error === true ? <div className='modalblok'>
                <div className='modalLoaderr'>
                    <p className='text-danger'>Internet bilan muommo yuz berdi! qaytadan xarakat qiling!</p>
                    <button className='btn btn-success' onClick={() => setError(false)}>ok</button>
                </div>

            </div> : <div></div>}

            {load === true ? <div className='modalblok'>
                <div className="modalLoader">
                    <div className="loader-03"> </div>
                </div>

            </div> :
                <div className='form  mx-auto flex-column'>
                    <h1>Login</h1>




                    <ReactPhoneInput
                        value={phoneuz}
                        onChange={phoneuz => {
                            if (phoneuz.length > 3) {
                                setPhoneuz(phoneuz);
                            } else {
                                if (h == 1) {
                                    setPhoneuz('+998');
                                    setH(2);
                                } else {
                                    setPhoneuz('998');
                                    setH(1);
                                }
                            }

                        }}
                        inputExtraProps={{
                            name: "Uz phone number",
                            required: true,
                            autoFocus: true
                        }}
                        country={"uz"}
                        onlyCountries={["uz"]}
                        masks={{ uz: ' (..) ...-..-..' }}
                        placeholder={'+998 (__) ___-__-__'}
                        autocomplete="off"
                        name="phone"
                    // disabled={props.disabledInput ? props.disabledInput : false}
                    // inputClass={props.inputClass ? props.inputClass : ''}
                    />
                    <label>
                        password
                    </label>
                    <input type='password' className='form-control' onChange={(e) => setPasword(e.target.value)} />
                    <button onClick={() => loginUser()} className='btn btn-success'>Yuborish</button>
                </div>
            }

        </>

    )
}

export default Login;
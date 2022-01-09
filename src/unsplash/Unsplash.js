import React from "react"
import axios from "axios";
import { useEffect, useState } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Unsplash = () => {
    const [image, setImage] = useState('')
    const [develop, setDevelop] = useState([])
    const [load, setload] = useState(false)
    const [error, setError] = useState(false)
    const [upimage, setUpImage] = useState('')
    const [loading, setLoading] = useState(false)

    const UnsplashApi = () => {
        setload(true)
        const AcceptApi = "tB9AOrfIiPGX6y3eGhMdcg_4SJjmDnwrMopqr2vsWZU";
        const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + AcceptApi;

        axios.get(url)
            .then(res => {
                setDevelop(res.data.results)
                setload(false)
            })
            .catch(rees => {
                setError(true)
                setload(false)

            })
    }

    const options = {
        settings: {
            overlayColor: "rgb(25, 136, 124)",
            autoplaySpeed: 1500,
            transitionSpeed: 900,
        },
        buttons: {
            backgroundColor: "#1b5245",
            iconColor: "rgba(126, 172, 139, 0.8)",
        },
        caption: {
            captionColor: "#a6cfa5",
            captionFontFamily: "Raleway, sans-serif",
            captionFontWeight: "300",
            captionTextTransform: "uppercase",
        }
    };


    // search value 

    // const Fileimage= async e=>{
    //     const files= e.target.files
    //     const data= new FormData()
    //     data.append('file', files[0])
    //     data.append('upload_present', 'darwin')

    // }

    return (
        <SRLWrapper options={options}>
            <>
                <div className="Forms">
                    <h1>Search for Images</h1>
                    <input type="text" onChange={(e) => { setImage(e.target.value); setError(false) }} />

                    <button type="submit" onClick={() => { UnsplashApi(); setError(false) }}>search</button>
                </div>
                {error === true ? <div className="text-center pt-5 mt-5"><h3>Internetga ulanganligingizni tekshiring <small className="text-danger">Internetga ulanmagansz</small></h3></div> : <div></div>}
                {load === true ?
                    <div class="loader">Loading...</div>
                    : <div className="resultimg">
                        {develop.map((item, index) => (
                            <div className="card" key={index}>

                                <a >
                                    <LazyLoadImage
                                        className="resultimage"


                                        src={item.urls.full} // use normal <img> attributes as props

                                        effect="blur"
                                        delayTime={300}
                                    />


                                </a>
                                <span>{item.user.name}</span>
                            </div>

                        ))}
                    </div>
                }


            </>
        </SRLWrapper>
    );
}
export default Unsplash;